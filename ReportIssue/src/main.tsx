import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReportIssue from './ReportIssue.tsx'
import Alert from './Alert.tsx'
import { initializeIcons } from '@fluentui/react'

const params = new URLSearchParams(window.location.search);
const data = JSON.parse(params.get("data") || "{}");

initializeIcons();
alert(JSON.stringify(data));
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReportIssue 
      appname={data.appname ?? ""} 
      recordid={data.recordid ?? ""} 
      tabname={data.tabname ?? ""} 
      sectionname={data.sectionname ?? ""} 
      appuserroleid={data.appuserroleid ?? ""} 
    />
  </StrictMode>,
)
