import * as React from 'react';
import { Interactiontypes, NoteTabs } from './Constants';
import { Label, Stack, StackItem, Text } from '@fluentui/react';

interface DetailsTabProps {
    name?: string;
    topic?: string;
    topicowner?: string;
    interactiontype? : number;
    interactiondescription? : string;
    submittoconfluence? : boolean,
    confluencepageid? : string,
    confluencespace? : string,
    confluencepagetitle? : string,
    createdby?: string;
    createdon?: Date;
    modifiedby?: string;
    modifiedon?: Date;
}

class DetailsTab extends React.Component<DetailsTabProps> {
    constructor(props: DetailsTabProps) {
        super(props);
    }   
    render() {
        return <Stack horizontal tokens={{ childrenGap: 100 }}>
            <Stack tokens={{ childrenGap: 10 }}>
                <StackItem>
                    <Label style={{ color: "#808080" }}>Posted By</Label>
                    <Text>{this.props.createdby ?? "\u00A0"}</Text>
                </StackItem>
                <StackItem>
                    <Label style={{ color: "#808080" }}>Posted On</Label>
                    <Text>{this.props.createdon?.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '') ?? "\u00A0"}</Text>
                </StackItem>
                <StackItem>
                    <Label style={{ color: "#808080" }}>Updated By</Label>
                    <Text>{this.props.modifiedby ?? "\u00A0"}</Text>
                </StackItem>
                <StackItem>
                    <Label style={{ color: "#808080" }}>Updated On</Label>
                    <Text>{this.props.modifiedon?.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '') ?? "\u00A0"}</Text>
                </StackItem>
            </Stack>
            <Stack tokens={{ childrenGap: 10 }}>
                <StackItem>
                    <Label style={{ color: "#808080" }}>Topic</Label>
                    <Text>{this.props.topic ?? "\u00A0"}</Text>
                </StackItem>
                <StackItem>
                    <Label style={{ color: "#808080" }}>Topic Owner</Label>
                    <Text>{this.props.topicowner ?? "\u00A0"}</Text>
                </StackItem>
                <StackItem>
                    <Label style={{ color: "#808080" }}>Interaction Type</Label>
                    <Text>{this.props.interactiontype != null ? Interactiontypes.filter(x => x.key == this.props.interactiontype)[0].text : "\u00A0"}</Text>
                </StackItem>
                <StackItem>
                    <Label style={{ color: "#808080" }}>Submitted to Confluence</Label>
                    <Text>{this.props.submittoconfluence ? "Yes" : "No"}</Text>
                </StackItem>
            </Stack>
            {this.props.submittoconfluence &&
                <Stack tokens={{ childrenGap: 10 }}>
                    <StackItem>
                        <Label style={{ color: "#808080" }}>Confluence Page ID</Label>
                        <Text>{this.props.confluencepageid ?? "\u00A0"}</Text>
                    </StackItem>
                    <StackItem>
                        <Label style={{ color: "#808080" }}>Confluence Space</Label>
                        <Text>{this.props.confluencespace ?? "\u00A0"}</Text>
                    </StackItem>
                    <StackItem>
                        <Label style={{ color: "#808080" }}>Confluence Page Title</Label>
                        <Text>{this.props.confluencepagetitle ?? "\u00A0"}</Text>
                    </StackItem>
                </Stack>}
        </Stack>
    }
}

export default DetailsTab;
        