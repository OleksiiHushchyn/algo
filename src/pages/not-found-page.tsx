import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section>
      <p className="text-sm font-semibold text-emerald-700">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight">
        Page not found.
      </h1>
      <p className="mt-6 text-emerald-950/65">
        This address doesn’t lead anywhere yet.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block font-semibold underline underline-offset-4"
      >
        Back to home
      </Link>
    </section>
  )
}
