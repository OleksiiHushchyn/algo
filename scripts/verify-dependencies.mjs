import { readFile, writeFile } from 'node:fs/promises'

// Check every locked package, including optional packages for other platforms.
const root = new URL('../', import.meta.url)
const lock = JSON.parse(
  await readFile(new URL('package-lock.json', root), 'utf8'),
)
const manifest = JSON.parse(
  await readFile(new URL('package.json', root), 'utf8'),
)
const npmrc = await readFile(new URL('.npmrc', root), 'utf8')
const configuredCutoff = npmrc.match(/^before=(.+)$/m)?.[1]
const cutoff = Math.min(
  Date.parse(configuredCutoff ?? ''),
  Date.now() - 7 * 24 * 60 * 60 * 1000,
)
if (!Number.isFinite(cutoff))
  throw new Error('A valid .npmrc before date is required.')

const direct = { ...manifest.dependencies, ...manifest.devDependencies }
for (const [name, version] of Object.entries(direct)) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`${name} must use an exact stable version.`)
  }
}

const packages = new Map()
for (const [path, entry] of Object.entries(lock.packages)) {
  if (!path) continue
  const name = entry.name ?? path.split('node_modules/').at(-1)
  const parentPath = path.slice(0, path.lastIndexOf('/node_modules/'))
  const source = entry.inBundle
    ? lock.packages[parentPath]?.resolved
    : entry.resolved
  if (!source?.startsWith('https://registry.npmjs.org/')) {
    throw new Error(`Unexpected package source: ${name}`)
  }
  packages.set(`${name}@${entry.version}`, { name, version: entry.version })
}

const byName = Map.groupBy([...packages.values()], ({ name }) => name)
const queue = [...byName.entries()]
const verified = []
const failures = []
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const [name, entries] = queue.shift()
      const source = `https://registry.npmjs.org/${encodeURIComponent(name)}`
      const response = await fetch(source, {
        signal: AbortSignal.timeout(30000),
      })
      if (!response.ok)
        throw new Error(`${name}: registry returned ${response.status}`)
      const metadata = await response.json()
      for (const { version } of entries) {
        const published = metadata.time?.[version]
        const release = metadata.versions?.[version]
        if (
          !Number.isFinite(Date.parse(published)) ||
          !release ||
          Date.parse(published) > cutoff
        ) {
          failures.push(
            `${name}@${version}: missing evidence or released after cutoff`,
          )
        }
        if (release?.deprecated) {
          failures.push(
            `${name}@${version}: deprecated — ${release.deprecated}`,
          )
        }
        verified.push({ name, version, published, source })
      }
    }
  }),
)

if (failures.length) throw new Error(failures.join('\n'))
verified.sort((a, b) =>
  `${a.name}@${a.version}`.localeCompare(`${b.name}@${b.version}`),
)
await writeFile(
  new URL('dependency-verification.json', root),
  `${JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      cutoff: new Date(cutoff).toISOString(),
      source: 'npm registry publication timestamps and deprecation metadata',
      packages: verified,
    },
    null,
    2,
  )}\n`,
)
console.log(
  `Verified ${verified.length} non-deprecated package versions published by ${new Date(cutoff).toISOString()}; all direct dependencies use exact stable versions.`,
)
