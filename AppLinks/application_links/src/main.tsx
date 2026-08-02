import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ApplicationLinks from './ApplictionLinks'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApplicationLinks />
  </StrictMode>,
)
