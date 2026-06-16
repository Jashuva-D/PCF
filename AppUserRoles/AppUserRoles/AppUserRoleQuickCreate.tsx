import * as React from "react";
import { Panel, PrimaryButton, Stack, DefaultButton, Label } from "@fluentui/react";     
import { IInputs } from "./generated/ManifestTypes";
import LookupControl from "./LookupControl";

interface AppUserRoleQuickCreateProps {
    context: ComponentFramework.Context<IInputs>;
    onClose: () => void;
}
interface AppUserRoleQuickCreateState {
    
}   

class AppUserRoleQuickCreate extends React.Component<AppUserRoleQuickCreateProps, AppUserRoleQuickCreateState> {
    constructor(props: AppUserRoleQuickCreateProps) {
        super(props);
        this.state = {
            
        };
    }   

    onSave() {  

    }

    render() {
        return (
            <Panel
                headerText="New App User Role"
                isOpen={true}
                onDismiss={this.props.onClose}
                closeButtonAriaLabel="Close"
            >
                <Stack tokens={{ childrenGap: 20 }}>
                    <Stack tokens={{ childrenGap: 10 }}>
                    <Stack>
                        <Label>Person</Label>
                        <LookupControl
                            context={this.props.context}
                            recordId={null}
                            entityType="cr549_person"
                            onRecordSelect={(id, name) => {
                                console.log(`Selected record ID: ${id}, Name: ${name}`);

                            }}
                        />
                    </Stack>
                    <Stack>
                        <Label>Role</Label>
                        <LookupControl
                            context={this.props.context}
                            recordId={null}
                            entityType="cr549_role"
                            onRecordSelect={(id, name) => {
                                console.log(`Selected record ID: ${id}, Name: ${name}`);
                            }}
                        />
                    </Stack>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="end" styles={{ root: { marginTop: "auto" } }}>
                    <PrimaryButton text="Save" onClick={this.onSave.bind(this)} style={{ borderRadius: 6, backgroundColor: "#0D2499"  , color: "white" }}/>
                    <DefaultButton text="Cancel" onClick={this.props.onClose} style={{ borderRadius: 6 }}/>
                </Stack>
                </Stack>
            </Panel>
        );
    }
}

export default AppUserRoleQuickCreate;
        