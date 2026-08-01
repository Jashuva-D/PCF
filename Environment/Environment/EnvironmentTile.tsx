import * as React from "react";
import { Icon, Stack, StackItem, VerticalDivider, initializeIcons } from "@fluentui/react";
import {EnvironmentIcon, OpenInNewWindowIcon} from "./Icons";

initializeIcons();

interface EnvironmentTileProps {
    type: string;
    environmentname: string;
    applicationname: string;
    color: string;
    environmenturl: string;
}
interface EnvironmentTileState {
}

class EnvironmentTile extends React.Component<EnvironmentTileProps, EnvironmentTileState>{
    
    constructor(props: EnvironmentTileProps) {
        super(props);
        this.state = {
        };
    }
    onClickOpenInNewWindow = () => {
        var targeturl = `${this.props.environmenturl}/WebResources/crm2_/HTML/OpenApplication`;
        window.open(targeturl, "_blank");
    }

    render() {
        if(this.props.type === "fullwidth") {
            return (
                <Stack horizontal>
                    <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%" } }}>
                        <EnvironmentIcon size={64} color={this.props.color} />
                        <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                            <div style={{ fontSize: 24, color: this.props.color, fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                                Environment Details
                            </div>
                            <div style={{ fontSize: 16, color: this.props.color }}>
                                Quik access to application environments
                            </div>
                        </Stack>
                    </Stack>
                    <div style={{ width: 1, backgroundColor: "#D1D1D1",  margin: "0 16px", alignSelf: "stretch" }} />
                    <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%" } }} horizontalAlign="space-between">
                        <EnvironmentIcon size={64} color={this.props.color} />
                        <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                            <div style={{ fontSize: 24, color: this.props.color, fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                                DEV
                            </div>
                            <div style={{ fontSize: 16, color: this.props.color }}>
                                Application URL: {this.props.applicationname}
                            </div>
                        </Stack>
                        <StackItem style={{ marginLeft: "auto", paddingRight: 10 }} onClick={this.onClickOpenInNewWindow}><OpenInNewWindowIcon size={24} color={this.props.color} /></StackItem>
                    </Stack>
                    <div style={{ width: 1, backgroundColor: "#D1D1D1",  margin: "0 16px", alignSelf: "stretch" }} />
                    <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%" } }} horizontalAlign="space-between">
                        <EnvironmentIcon size={64} color={this.props.color} />
                        <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                            <div style={{ fontSize: 24, color: this.props.color, fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                                UAT
                            </div>
                            <div style={{ fontSize: 16, color: this.props.color }}>
                                Application URL: {this.props.applicationname}
                            </div>
                        </Stack>
                        <StackItem style={{ marginLeft: "auto", paddingRight: 10 }} onClick={this.onClickOpenInNewWindow}><OpenInNewWindowIcon size={24} color={this.props.color} /></StackItem>
                    </Stack>
                    <div style={{ width: 1, backgroundColor: "#D1D1D1",  margin: "0 16px", alignSelf: "stretch" }} />
                    <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%" } }} horizontalAlign="space-between">
                        <EnvironmentIcon size={64} color={this.props.color} />
                        <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                            <div style={{ fontSize: 24, color: this.props.color, fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                                PROD
                            </div>
                            <div style={{ fontSize: 16, color: this.props.color }}>
                                Application URL: {this.props.applicationname}
                            </div>
                        </Stack>
                        <StackItem style={{ marginLeft: "auto", paddingRight: 10 }} onClick={this.onClickOpenInNewWindow}><OpenInNewWindowIcon size={24} color={this.props.color} /></StackItem>
                    </Stack>
                </Stack>
                
            );
        }
        else {
            return (
                <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%" } }} horizontalAlign="space-between">
                    <EnvironmentIcon size={64} color={this.props.color} />
                    <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                        <div style={{ fontSize: 24, color: this.props.color, fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                            {this.props.environmentname}
                        </div>
                        <div style={{ fontSize: 16, color: this.props.color }}>
                            Application URL: {this.props.applicationname}
                        </div>
                    </Stack>
                    <StackItem style={{ marginLeft: "auto", paddingRight: 10 }} onClick={this.onClickOpenInNewWindow}><OpenInNewWindowIcon size={24} color={this.props.color} /></StackItem>
                </Stack>
            );
        }
        
    }
}

export default EnvironmentTile;