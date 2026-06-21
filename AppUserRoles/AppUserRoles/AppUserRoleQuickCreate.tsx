import * as React from "react";
import { Panel, PrimaryButton, DefaultButton, Label, Stack, Text, PanelType } from "@fluentui/react";     
import { IInputs } from "./generated/ManifestTypes";
import LookupControl from "./LookupControl";
import CMSDialog from "./CMSDialog";

interface AppUserRoleQuickCreateProps {
    context: ComponentFramework.Context<IInputs>;
    onClose: () => void;
    onComplete: () => void;
    appid: string;
}
interface AppUserRoleQuickCreateState {
    person : { id: string, name: string } | null;
    roles : { id: string, name: string }[];
    showDialog?: boolean;
    dialogTitle?: string;
    dialogSubtext?: string;
    dialogConfirmButtonLabel?: string;
    dialogCancelButtonLabel?: string;
    dialogConfirmCallback?: () => void;
    dialogCancelCallback?: () => void;
    dialogDismissCallback?: () => void;
    dialogIsError?: boolean;
}   

class AppUserRoleQuickCreate extends React.Component<AppUserRoleQuickCreateProps, AppUserRoleQuickCreateState> {
    constructor(props: AppUserRoleQuickCreateProps) {
        super(props);
        this.state = {
            person: null,
            roles: [],
            showDialog: false,
        };
    }   

    async onSave() {
        var obj = this;
        if(this.state.person && this.state.roles.length > 0){

            var existingroles = await obj.props.context.webAPI.retrieveMultipleRecords("cr549_appuserrole", `?$filter=_cr549_personid_value eq '${obj.state.person?.id}' and _cr549_appid_value eq ${obj.props.appid}`).then(function(resp){
                return resp.entities;
            }).catch(function(error){
                console.log("Error while fetching existing roles for the person");
            });

            var targetroles = this.state.roles.filter(role => existingroles?.filter((x: any) => x["_cr549_role_value"] == role.id).length == 0);
            
            var promises : Promise<any>[] = [];
            targetroles.forEach(function(role){
                var data = {
                    "cr549_person@odata.bind": `/cr549_persons(${obj.state.person!.id})`,
                    "cr549_role@odata.bind": `/cr549_roles(${role.id})`,
                    "cr549_app@odata.bind": `/cr549_applications(${obj.props.appid})`
                };
                promises.push(obj.props.context.webAPI.createRecord("cr549_appuserrole", data));
            }, this);
            Promise.all(promises).then(() => {
                obj.props.onComplete();
            }).catch((error) => {
                obj.setState({
                    showDialog: true,
                    dialogTitle: "Error creating App User Role",
                    dialogSubtext: error?.message || "An unexpected error occurred while creating App User Role.",
                    dialogIsError: true,
                    dialogConfirmButtonLabel: "OK",
                    dialogCancelButtonLabel: "Cancel",
                    dialogConfirmCallback: () => {
                        obj.setState({ showDialog: false });
                    },
                    dialogCancelCallback: () => {
                        obj.setState({ showDialog: false });
                    },
                    dialogDismissCallback: () => {
                        obj.setState({ showDialog: false });
                    }
                });
            });
        }
    }
    onCancel() {
        var obj = this;
        if(this.state.person == null && this.state.roles.length == 0){
            this.props.onClose();
        }
        else {
            this.setState({
                showDialog: true,
                dialogTitle: "Unsaved Changes",
                dialogSubtext: `You have unsaved changes. Are you sure you want to discard them?`,
                dialogConfirmButtonLabel: "Discard",
                dialogCancelButtonLabel: "Keep Editing",
                dialogConfirmCallback: async () => {
                    obj.setState({ showDialog: false });
                    obj.props.onClose();
                },
                dialogCancelCallback: () => {
                    obj.setState({ showDialog: false });
                },
                dialogDismissCallback: () => {
                    obj.setState({ showDialog: false });
                }
            })
        }
    }

    render() {
        return (
            <Panel
                headerText="New App User Role"
                isOpen={true}
                onDismiss={this.props.onClose}
                closeButtonAriaLabel="Close"
                type={PanelType.custom}
                customWidth="600px"
            >
                <Stack tokens={{childrenGap: 20}} styles={{root: {paddingTop: 40}}}>
                    <table className="appuserroles-quickcreate-table">
                        <tbody>
                            <tr>
                                <td className="appuserroles-quickcreate-label-cell">
                                    Person <span style={{ color: "red" }}>*</span>
                                </td>
                                <td><Text>:</Text></td>
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
                                    Role <span style={{ color: "red" }}>*</span>
                                </td>
                                <td><Text>:</Text></td>
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
                        <PrimaryButton text="Save & Close" onClick={this.onSave.bind(this)} style={{ borderRadius: 6, backgroundColor: "#0D2499"  , color: "white" }}/>
                        <DefaultButton text="Cancel" onClick={this.onCancel.bind(this)} style={{ borderRadius: 6 }}/>
                    </div>
                </Stack>
                <CMSDialog
                    isOpen={this.state.showDialog!}
                    title={this.state.dialogTitle}
                    subText={this.state.dialogSubtext}
                    confirmButtonText={this.state.dialogConfirmButtonLabel}
                    cancelButtonText={this.state.dialogCancelButtonLabel}
                    iserror={this.state.dialogIsError}
                    onDismiss={() => {
                        this.setState({ showDialog: false });
                        this.state.dialogDismissCallback && this.state.dialogDismissCallback();
                    }}
                    onConfirm={() => {
                        this.setState({ showDialog: false });
                        this.state.dialogConfirmCallback && this.state.dialogConfirmCallback();
                    }}
                    onCancel={() => {
                        this.setState({ showDialog: false });
                        this.state.dialogCancelCallback && this.state.dialogCancelCallback();
                    }}
                />
            </Panel>
        );
    }
}

export default AppUserRoleQuickCreate;
        