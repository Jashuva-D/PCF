import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReportIssue from './ReportIssue.tsx'
import Alert from './Alert.tsx'
import { initializeIcons } from '@fluentui/react'
import DataDiscrepancies from './DataDiscrepancies.tsx'

const params = new URLSearchParams(window.location.search);
const data = JSON.parse(params.get("data") || "{}");

initializeIcons();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataDiscrepancies
        appname={data.appname}
        tabname={data.tabname}
        sectionname={data.sectionname}
        appuserroleid={data.appuserroleid}
        recordid={data.recordid}
    />
  </StrictMode>,
)
