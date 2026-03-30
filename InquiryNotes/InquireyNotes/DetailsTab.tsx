import * as React from 'react';
import { Interactiontypes, NoteTabs } from './Constants';
import { Label, Link, Stack, StackItem, Text } from '@fluentui/react';

interface DetailsTabProps {
    context: ComponentFramework.Context<any>;
    name?: string;
    topic?: string;
    topicowner?: string;
    interactiontype? : number;
    interactiondescription? : string;
    application_id? : string;
    application_name? : string;
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
                {/* <StackItem>
                    <Label style={{ color: "#808080" }}>Name</Label>
                    <Text>{this.props.name ?? "\u00A0"}</Text>
                </StackItem> */}
                <StackItem>
                    <Label style={{ color: "#808080" }}>Topic</Label>
                    <Text>{this.props.topic ?? "\u00A0"}</Text>
                </StackItem>
                <StackItem>
                    <Label style={{ color: "#808080" }}>Interaction Type</Label>
                    <Text>{this.props.interactiontype != null ? Interactiontypes.filter(x => x.key == this.props.interactiontype)[0].text : "\u00A0"}</Text>
                </StackItem>
                {this.props.interactiontype === 512150005 && 
                    <StackItem>
                        <Label style={{ color: "#808080" }}>Other Interaction Type</Label>
                        <Text>{this.props.interactiondescription ?? "\u00A0"}</Text>
                    </StackItem>
                }
                <StackItem>
                    <Label style={{ color: "#808080" }}>Application</Label>
                    <Link onClick={() => {
                        this.props.context.navigation.openForm({
                            entityName: "cr549_application",
                            entityId: this.props.application_id!,
                        })
                    }}>{this.props.application_name ?? "\u00A0"}</Link>
                </StackItem>
            </Stack>
        </Stack>
    }
}

export default DetailsTab;
        