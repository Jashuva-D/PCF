import * as React from "react";
import { Panel, PrimaryButton, DefaultButton, Label } from "@fluentui/react";     
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
                customWidth="60vw"
            >
                <table className="appuserroles-quickcreate-table" style={{ paddingTop: 40, paddingLeft: 10, paddingRight: 10 }}>
                    <tbody>
                        <tr>
                            <td className="appuserroles-quickcreate-label-cell">
                                <Label>Person</Label>
                            </td>
                            <td className="appuserroles-quickcreate-control-cell">
                                <LookupControl
                                    context={this.props.context}
                                    recordId={""}
                                    entityType="cr549_person"
                                    onRecordSelect={(id, name) => {
                                        console.log(`Selected record ID: ${id}, Name: ${name}`);

                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="appuserroles-quickcreate-label-cell">
                                <Label>Role</Label>
                            </td>
                            <td className="appuserroles-quickcreate-control-cell">
                                <LookupControl
                                    context={this.props.context}
                                    recordId={""}
                                    entityType="cr549_role"
                                    onRecordSelect={(id, name) => {
                                        console.log(`Selected record ID: ${id}, Name: ${name}`);
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
                    <PrimaryButton text="Save" onClick={this.onSave.bind(this)} style={{ borderRadius: 6, backgroundColor: "#0D2499"  , color: "white" }}/>
                    <DefaultButton text="Cancel" onClick={this.props.onClose} style={{ borderRadius: 6 }}/>
                </div>
            </Panel>
        );
    }
}

export default AppUserRoleQuickCreate;
        