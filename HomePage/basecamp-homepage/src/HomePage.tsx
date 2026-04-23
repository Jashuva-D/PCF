import * as React from "react";
import Notifications from "./Notifications";
import Applications from "./Applications";
import PowerBIReport from "./PowerBiReport";
import {Stack, StackItem} from "@fluentui/react";
import BaseCampLogo from "./BaseCampLogo";

interface HomePageProps {

}
interface HomePageState {
    enableNotifications: boolean;
    enableApplications: boolean;
    enablePowerBIReport: boolean;
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            enableNotifications: false,
            enableApplications: false,
            enablePowerBIReport: false
        }
    }
    componentDidMount(): void {
        var allowedroles = ["Financial Operations (Funding)", "Hosting Coordinator", "Financial Analyst", "Technical Advisor", "System Administrator", "Manager", "Communications Team"];
        var roles = (parent as any).Xrm.Utility.getGlobalContext().userSettings.roles.get();
        if(roles.some((x: any) => allowedroles.includes(x.name))) {
            this.setState({ enablePowerBIReport: true });
        }
    }
    render() {
        return <>
            
            <BaseCampLogo/>
            <Stack tokens={{childrenGap: 10}}>
                <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10}}><Notifications /></StackItem>
                <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10}}><Applications /></StackItem>
                {this.state.enablePowerBIReport && <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10}}><PowerBIReport /></StackItem>}
            </Stack>
        </>
    }
}

export default HomePage;