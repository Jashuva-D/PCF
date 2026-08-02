import * as React from 'react';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { EnvironmentIcon } from './Icons';
import { OpenInNewWindowIcon } from './Icons';

interface IEnvironmentTileProps {
    environmentname: string;
    applicationname: string;
    environment_url?: string;
    color?: string;
    bgcolor?: string;
}

class EnvironmentTile extends React.Component<IEnvironmentTileProps> {
    constructor(props: IEnvironmentTileProps) {
        super(props);
    }
    onClickOpenInNewWindow(url: string) {
        if(url && url.trim() !== "") 
            window.open(url, "_blank");
        else
            alert("No URL provided for this environment.");
    }
    render() {
        return (
            <Stack horizontal verticalAlign="center" styles={{ root: { width: "100%", height: "100%", backgroundColor: this.props.bgcolor, borderRadius: 6, padding: 10 } }} horizontalAlign="space-between">
                <EnvironmentIcon size={36} color={this.props.color} />
                <Stack verticalAlign="center" styles={{ root: { marginLeft: 10 } }}>
                    <div style={{ fontSize: 16, color: this.props.color, fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                        {this.props.environmentname}
                    </div>
                </Stack>
                
                <StackItem style={{ marginLeft: "auto", paddingRight: 10 }} onClick={() => this.onClickOpenInNewWindow(this.props.environment_url || "")}>
                    <Stack horizontal verticalAlign="center" horizontalAlign="center" styles={{ root: { cursor: "pointer" } }} tokens={{ childrenGap: 5 }}>
                        <div style={{ fontSize: 12, color: this.props.color }}><b>Open</b></div>
                        <OpenInNewWindowIcon size={20} color={this.props.color} />
                    </Stack>
                </StackItem>
            </Stack>
        );
    }
}

export default EnvironmentTile;