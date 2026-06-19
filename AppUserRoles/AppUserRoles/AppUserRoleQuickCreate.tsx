import * as React from "react";
import { Panel, PrimaryButton, DefaultButton, Label, Stack } from "@fluentui/react";     
import { IInputs } from "./generated/ManifestTypes";
import LookupControl from "./LookupControl";

interface AppUserRoleQuickCreateProps {
    context: ComponentFramework.Context<IInputs>;
    onClose: () => void;
    onComplete: () => void;
    appid: string;
}
interface AppUserRoleQuickCreateState {
    person : { id: string, name: string } | null;
    roles : { id: string, name: string }[];
}   

class AppUserRoleQuickCreate extends React.Component<AppUserRoleQuickCreateProps, AppUserRoleQuickCreateState> {
    constructor(props: AppUserRoleQuickCreateProps) {
        super(props);
        this.state = {
            person: null,
            roles: []
        };
    }   

    onSave() {
        var obj = this;
        if(this.state.person && this.state.roles.length > 0){
            var promises : Promise<any>[] = [];
            this.state.roles.forEach(function(role){
                var data = {
                    "cr549_person@odata.bind": `/cr549_persons(${obj.state.person!.id})`,
                    "cr549_role@odata.bind": `/cr549_roles(${role.id})`,
                    "cr549_app@odata.bind": `/cr549_applications(${obj.props.appid})`
                };
                promises.push(obj.props.context.webAPI.createRecord("cr549_appuserrole", data));
            }, this);
            Promise.all(promises).then(() => {
                obj.props.onComplete();
            });
        }
    }

    render() {
        return (
            <Panel
                headerText="New App User Role"
                isOpen={true}
                onDismiss={this.props.onClose}
                closeButtonAriaLabel="Close"
                customWidth="1000px"
            >
                <Stack tokens={{childrenGap: 20}} styles={{root: {padding: 40}}}>
                    <table className="appuserroles-quickcreate-table">
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
                                        onRecordSelect={(items) => {
                                            if (items && items.length > 0) {
                                                const { id, text } = items[0];
                                                this.setState({ person: { id, name: text } });
                                            }
                                            else {
                                                this.setState({ person: null });
                                            }
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
                                        onRecordSelect={(items) => {
                                            if (items && items.length > 0) {
                                                const roles = items.map((item) => ({ id: item.id as string, name: item.text as string }));
                                                this.setState({ roles });
                                            }
                                            else {
                                                this.setState({ roles: [] });
                                            }
                                        }}
                                        allowMultiSelect={true}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
                        <PrimaryButton text="Save" onClick={this.onSave.bind(this)} style={{ borderRadius: 6, backgroundColor: "#0D2499"  , color: "white" }}/>
                        <DefaultButton text="Cancel" onClick={this.props.onClose} style={{ borderRadius: 6 }}/>
                    </div>
                </Stack>
            </Panel>
        );
    }
}

export default AppUserRoleQuickCreate;
        