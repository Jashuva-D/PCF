import * as React from "react";
import { Icon, Stack, StackItem, VerticalDivider, initializeIcons } from "@fluentui/react";
import {EnvironmentIcon, OpenInNewWindowIcon} from "./Icons";

initializeIcons();

interface EnvironmentTileProps {
    type: string;
    environmentname: string;
    applicationname: string;
    color: string;
    environment_url?: string | null;
    environment_dev_url?: string | null;
    environment_uat_url?: string | null;
    environment_prod_url?: string | null;
}
interface EnvironmentTileState {
}

class EnvironmentTile extends React.Component<EnvironmentTileProps, EnvironmentTileState>{
    
    constructor(props: EnvironmentTileProps) {
        super(props);
        this.state = {
        };
    }
    onClickOpenInNewWindow = (targeturl: string) => {
        if(targeturl === undefined || targeturl === null || targeturl === "") {
            alert("Target environment URL is not defined for this application. please contact hosting coordinator to get the URL for this application");
        }
        else 
            window.open(targeturl, "_blank");
    }

    render() {
        if(this.props.type === "fullwidth") {
            return (
                <Stack horizontal>
                    <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%" } }}>
                        <EnvironmentIcon size={48} color="#0D2499" />
                        <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                            <div style={{ fontSize: 16, color: "#0D2499", fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                                Environment Details
                            </div>
                            <div style={{ fontSize: 16, color: "#0D2499" }}>
                                Quik access to application environments
                            </div>
                        </Stack>
                    </Stack>
                    <div style={{ width: 1, backgroundColor: "#D1D1D1",  margin: "0 16px", alignSelf: "stretch" }} />
                    <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%" } }} horizontalAlign="space-between">
                        <EnvironmentIcon size={48} color="#175CD3" />
                        <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                            <div style={{ fontSize: 16, color: "#175CD3", fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                                DEV
                            </div>
                            <div style={{ fontSize: 12, color: "#175CD3" }}>
                                <b>Application URL:</b> {this.props.applicationname}
                            </div>
                        </Stack>
                        <StackItem style={{ marginLeft: "auto", paddingRight: 10 }} onClick={() => this.onClickOpenInNewWindow(this.props.environment_dev_url || "")}><OpenInNewWindowIcon size={20} color="#175CD3" /></StackItem>
                    </Stack>
                    <div style={{ width: 1, backgroundColor: "#D1D1D1",  margin: "0 16px", alignSelf: "stretch" }} />
                    <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%" } }} horizontalAlign="space-between">
                        <EnvironmentIcon size={48} color="#53389E" />
                        <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                            <div style={{ fontSize: 16, color: "#53389E", fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                                UAT
                            </div>
                            <div style={{ fontSize: 12, color: "#53389E" }}>
                                <b>Application URL:</b> {this.props.applicationname}
                            </div>
                        </Stack>
                        <StackItem style={{ marginLeft: "auto", paddingRight: 10 }} onClick={() => this.onClickOpenInNewWindow(this.props.environment_uat_url || "")}><OpenInNewWindowIcon size={20} color="#53389E" /></StackItem>
                    </Stack>
                    <div style={{ width: 1, backgroundColor: "#D1D1D1",  margin: "0 16px", alignSelf: "stretch" }} />
                    <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%" } }} horizontalAlign="space-between">
                        <EnvironmentIcon size={48} color="#0E7433" />
                        <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                            <div style={{ fontSize: 16, color: "#0E7433", fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                                PROD
                            </div>
                            <div style={{ fontSize: 12, color: "#0E7433" }}>
                                <b>Application URL:</b> {this.props.applicationname}
                            </div>
                        </Stack>
                        <StackItem style={{ marginLeft: "auto", paddingRight: 10 }} onClick={() => this.onClickOpenInNewWindow(this.props.environment_prod_url || "")}><OpenInNewWindowIcon size={20} color="#0E7433" /></StackItem>
                    </Stack>
                </Stack>
            );
        }
        else {
            return (
                <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%" } }} horizontalAlign="space-between">
                    <EnvironmentIcon size={48} color={this.props.color} />
                    <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                        <div style={{ fontSize: 16, color: this.props.color, fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                            {this.props.environmentname}
                        </div>
                        <div style={{ fontSize: 12, color: this.props.color }}>
                            <b>Application URL:</b> {this.props.applicationname}
                        </div>
                    </Stack>
                    <StackItem style={{ marginLeft: "auto", paddingRight: 10 }} onClick={() => this.onClickOpenInNewWindow(this.props.environment_url || "")}><OpenInNewWindowIcon size={20} color={this.props.color} /></StackItem>
                </Stack>
            );
        }
        
    }
}

export default EnvironmentTile;