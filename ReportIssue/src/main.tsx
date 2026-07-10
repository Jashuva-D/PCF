import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReportIssue from './ReportIssue.tsx'

const params = new URLSearchParams(window.location.search);
alert(window.location.search);
alert(params.get("data"));
const data = JSON.parse(params.get("data") || "{}");


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReportIssue appname={data.appname ?? ""} recordid={data.recordid ?? ""} />
  </StrictMode>,
)
