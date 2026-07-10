import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReportIssue from './ReportIssue.tsx'

const params = new URLSearchParams(window.location.search);

const appname = params.get("appname");
const recordid = params.get("recordid");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReportIssue appname={appname ?? ""} recordid={recordid ?? ""} />
  </StrictMode>,
)
