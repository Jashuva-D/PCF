import * as React from "react";
import Notifications from "./Notifications";
import Applications from "./Applications";
import PowerBIReport from "./PowerBiReport";
import {Stack, StackItem} from "@fluentui/react";
import BaseCampLogo from "./BaseCampLogo";
import { CMSMyAppsIcon, CMSHCTADDashBoardIcon, CMSExecutiveDashboardIcon, CMSAuditingDashboardIcon } from "./Icons";

interface HomePageProps {

}
interface HomePageState {
    enableNotifications: boolean;
    enableApplications: boolean;
    enableHCTAFAReport: boolean;
    enableManagerDashboard: boolean;
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            enableNotifications: false,
            enableApplications: false,
            enableHCTAFAReport: false,
            enableManagerDashboard: false
        }
    }
    componentDidMount(): void {
        var hctafadashboardallowedroles = ["Hosting Coordinator", "Financial Analyst", "Technical Advisor", "System Administrator"];
        var managerdashboardallowedroles = ["Manager", "System Administrator"];
        
        var roles = (parent as any).Xrm?.Utility.getGlobalContext().userSettings.roles.get();

        if(roles?.some((x: any) => hctafadashboardallowedroles.includes(x.name))) {
            this.setState({ enableHCTAFAReport: true });
        }
        if(roles?.some((x: any) => managerdashboardallowedroles.includes(x.name))) {
            this.setState({ enableManagerDashboard: true });
        }
    }
    render() {
        return <>
            <BaseCampLogo/>
            <Stack tokens={{childrenGap: 10}}>
                <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10, backgroundColor: "white"}}><Notifications /></StackItem>
                <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10, backgroundColor: "white"}}><Applications /></StackItem>
                {this.state.enableManagerDashboard && <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10, backgroundColor: "white"}}>
                    <PowerBIReport 
                        environmentVariableName="crm2_mainpage_executivedashboard_url"
                        title="Executive BaseCamp Dashboard"
                        subtitle="Executive visibility across cloud platforms and operational activities"
                        reporticon={<CMSExecutiveDashboardIcon size={24} />}
                    />
                </StackItem>}
                {this.state.enableHCTAFAReport && <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10, backgroundColor: "white"}}>
                    <PowerBIReport 
                        environmentVariableName="crm2_mainpage_hctafadashboard_url"
                        title="HC/TA/FA Dashboard"
                        subtitle="View and manage your assigned applications and Jira tickets."
                        reporticon={<CMSHCTADDashBoardIcon size={24} />}
                    />
                </StackItem>}
                {this.state.enableManagerDashboard && <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10, backgroundColor: "white"}}>
                    <PowerBIReport 
                        environmentVariableName="crm2_mainpage_auditingdashboard_url"
                        title="Auditor Dashboard"
                        subtitle="View and manage audit records, compliance reviews, and audit findings."
                        reporticon={<CMSAuditingDashboardIcon size={24} />}
                    />
                </StackItem>}
            </Stack>
        </>
    }
}

export default HomePage;