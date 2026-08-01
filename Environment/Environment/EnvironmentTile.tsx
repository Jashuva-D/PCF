import * as React from "react";
import { Icon, Stack, StackItem, initializeIcons } from "@fluentui/react";
import {EnvironmentIcon, OpenInNewWindowIcon} from "./Icons";

initializeIcons();

interface EnvironmentTileProps {
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
        var targeturl = `${this.props.environmenturl}/WebResources/crm2_/HTML/FeedbackFactoryApp`;
        window.open(targeturl, "_blank");
    }

    render() {
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

export default EnvironmentTile;