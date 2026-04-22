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
    render() {
        return <>
            
            <BaseCampLogo/>
            <Stack tokens={{childrenGap: 10}}>
                <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10}}><Notifications /></StackItem>
                <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10}}><Applications /></StackItem>
                <StackItem style={{border:"1px solid #ccc", borderRadius:6, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10}}><PowerBIReport /></StackItem>
            </Stack>
        </>
    }
}

export default HomePage;