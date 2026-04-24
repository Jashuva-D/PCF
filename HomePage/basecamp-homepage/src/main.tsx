import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import HomePage from './HomePage.tsx'
import ReleaseBanner from './ReleaseBanner.tsx';

async function renderHomePage() {

  var showreleasebanner = false;
  showreleasebanner = await (parent as any).Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", `?$select=defaultvalue,schemaname&$filter=schemaname eq 'crm2_showreleasebanner'&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)`).then(function (result: any) {
    if (result.entities.length > 0) {
      let record = result.entities[0];
      if (
        record.environmentvariabledefinition_environmentvariablevalue &&
        record.environmentvariabledefinition_environmentvariablevalue.length > 0 &&
        record.environmentvariabledefinition_environmentvariablevalue[0].value
      ) {
        return record.environmentvariabledefinition_environmentvariablevalue[0].value;
      }
      return record.defaultvalue;
    }
    return null;
  });
  if (showreleasebanner) {
    const url = new URL(parent.window.location.href);
    if (!url.searchParams.has("navbar")) {
        url.searchParams.set("navbar", "off");
        parent.window.location.replace(url.toString());
    }
    createRoot(document.getElementById('root')!).render(
          <ReleaseBanner></ReleaseBanner>
    )
  }
  else {
    if (!sessionStorage.getItem("landingRedirectDone")) {
      sessionStorage.setItem("landingRedirectDone", "true");
      var roles = (parent as any).Xrm.Utility.getGlobalContext().userSettings.roles.get();
      if (roles.some((x: any) => x.name == "System Administrator")) {
        createRoot(document.getElementById('root')!).render(
          <StrictMode>
            <HomePage />
          </StrictMode>,
        )
      }
      else if (roles.some((x: any) => x.name == "Manager")) {
        var dashboardid = "";
        dashboardid = await (parent as any).Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", `?$select=defaultvalue,schemaname&$filter=schemaname eq 'crm2_managerdefaultdashboardid'&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)`).then(function (result: any) {
          if (result.entities.length > 0) {
            let record = result.entities[0];
            if (
              record.environmentvariabledefinition_environmentvariablevalue &&
              record.environmentvariabledefinition_environmentvariablevalue.length > 0 &&
              record.environmentvariabledefinition_environmentvariablevalue[0].value
            ) {
              return record.environmentvariabledefinition_environmentvariablevalue[0].value;
            }
            return record.defaultvalue;
          }
          return null;
        });
        console.log("Dashboardid Retrieved: ", dashboardid);
        (parent as any).Xrm.Navigation.navigateTo({ pageType: "dashboard", dashboardid: dashboardid });
      }
      else if (roles.some((x: any) => x.name == "Financial Operations (Funding)" || x.name == "Hosting Coordinator" || x.name == "Financial Analyst" || x.name == "Technical Advisor")) {
        createRoot(document.getElementById('root')!).render(
          <StrictMode>
            <HomePage />
          </StrictMode>,
        )
      }
      else if (roles.some((x: any) => x.name == "Communications Team")) {
        (parent as any).Xrm.Navigation.navigateTo({ pageType: "entitylist", entityName: "cr549_notification" });
      }
      else if (roles.some((x: any) => x.name == "General Consumer")) {
        (parent as any).Xrm.Navigation.navigateTo({ pageType: "entitylist", entityName: "cr549_application" });
      }
      else {
        createRoot(document.getElementById('root')!).render(
          <StrictMode>
            <HomePage />
          </StrictMode>,
        )
      }
    }
    else {
      createRoot(document.getElementById('root')!).render(
        <StrictMode>
          <HomePage />
        </StrictMode>,
      )
    }
  }

}

renderHomePage();

