import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { App } from '@/app/app'
import '@/styles.css'

const root = document.getElementById('root')

if (!root) throw new Error('The root element is missing from index.html.')

createRoot(root).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
