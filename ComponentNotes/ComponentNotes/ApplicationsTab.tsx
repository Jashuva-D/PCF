import * as React from "react";
import {  Stack, PrimaryButton,DetailsList, Checkbox, IColumn, SelectionMode, createTheme} from "@fluentui/react";
import CMSDialog from "./CMSDialog";

interface ApplicationsProps {
    context: ComponentFramework.Context<any>;
    recordid?: string;
}
interface ApplicationsState {
    apps: any[];
    selectedapps: string[];
    showDialog?: boolean;
    dialogTitle?: string;
    dialogSubtext?: string;
    dialogConfirmButtonLabel?: string;
    dialogCancelButtonLabel?: string;
    dialogConfirmCallback?: () => void;
    dialogCancelCallback?: () => void;
    dialogDismissCallback?: () => void;
}

class Applications extends React.Component<ApplicationsProps, ApplicationsState> {
    constructor(props: ApplicationsProps) {
        super(props);
        this.state = {
            apps: [],
            selectedapps: []
        };
    }
    componentDidMount(): void {
        this.LoadApplications();
    }
    LoadApplications() {
        var obj = this;
        var fetchxml = `<fetch version="1.0" mapping="logical">
                            <entity name="cr549_application">
                                <attribute name="cr549_id"/>
                                <attribute name="cr549_applicationid"/>
                                <attribute name="cr549_long_app_name"/>
                                <attribute name="cr549_app_live_status"/>
                                <attribute name="cr549_date_golive"/>
                                <attribute name="cr549_platform_name"/>
                                <order attribute="cr549_id" descending="false"/>
                                <link-entity name="crm2_cr549_componentnotes_cr549_application" intersect="true" visible="false" to="cr549_applicationid" from="cr549_applicationid">
                                    <link-entity name="cr549_componentnotes" from="cr549_componentnotesid" to="cr549_componentnotesid" alias="bb">
                                        <filter type="and">
                                            <condition attribute="cr549_componentnotesid" operator="eq" uitype="cr549_componentnotes" value="${this.props.recordid}"/>
                                        </filter>
                                    </link-entity>
                                </link-entity>
                            </entity>
                        </fetch>`;
        
        this.props.context.webAPI.retrieveMultipleRecords("cr549_application", `?fetchXml=${encodeURI(fetchxml)}`).then((response) => {
            let apps = [] as any[];
            response.entities.forEach((app: any) => {
                apps.push({
                    key: app.cr549_applicationid,
                    cr549_id: app.cr549_id,
                    cr549_long_app_name: app.cr549_long_app_name,
                    cr549_app_live_status: app["cr549_app_live_status@OData.Community.Display.V1.FormattedValue"],//app.cr549_app_live_status,
                    cr549_date_golive: app.cr549_date_golive ? app["cr549_date_golive@OData.Community.Display.V1.FormattedValue"] : null,
                    cr549_platform_name: app["cr549_platform_name@OData.Community.Display.V1.FormattedValue"]//app.cr549_platform_name
                });
            });
            obj.setState({ apps: [...apps], selectedapps: []});
        }, (error) => {
            console.error("Error fetching applications: ", error);
        }); 
        
    }
    render() {
        return <>
            <Stack style={{ paddingBottom: 10 }} tokens={{ childrenGap: 10 }} horizontal horizontalAlign="end">
                <PrimaryButton
                    text="Add"
                    iconProps={{ iconName: "add" }}
                    style={{ borderRadius: 6, backgroundColor: this.state.selectedapps.length != 0 ? "#F2F2F2" : "#0D2499", color: this.state.selectedapps.length != 0 ? "#5A5A5A" : "white" }}
                    onClick={() => {
                        var obj = this;
                        this.props.context.utils.lookupObjects({
                            allowMultiSelect: true,
                            entityTypes: ["cr549_application"],
                            defaultEntityType: "cr549_application",
                        }).then((selectedapps) => {
                            var associateRequest = {
                                target: { entityType: "cr549_componentnotes", id: obj.props.recordid },
                                relatedEntities: selectedapps.map((app: any) => ({
                                    entityType: "cr549_application",
                                    id: app.id
                                })),
                                relationship: "crm2_cr549_ComponentNotes_cr549_Application_cr549_Application",
                                getMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Associate" }; }
                            };

                            (obj.props.context.webAPI as any).execute(associateRequest).then(
                                function success(response: any) {
                                    console.log(response);
                                    obj.LoadApplications.bind(obj)();
                                }
                            ).catch(function (error: any) {
                                console.log(error)
                            });

                        }, (err) => {
                            console.error(err?.message);
                        });
                    }}
                    disabled={this.state.selectedapps.length != 0}
                />
                <PrimaryButton
                    text="Remove"
                    iconProps={{ iconName: "delete" }}
                    style={{ borderRadius: 6, backgroundColor: this.state.selectedapps.length == 0 ? "#F2F2F2" : "#0D2499", color: this.state.selectedapps.length == 0 ? "#5A5A5A" : "white" }}
                    onClick={() => {
                        var obj = this;
                        obj.setState({
                            showDialog: true,
                            dialogCancelButtonLabel: "Cancel",
                            dialogConfirmButtonLabel: "Remove",
                            dialogTitle: "Confirm Remove",
                            dialogSubtext: `Do you want to remove the link of ${obj.state.selectedapps.length} application(s)? \n This action will not delete the application(s) but will only remove the link.`,
                            dialogConfirmCallback: () => {
                                Promise.all(obj.state.selectedapps.map((appId) => {
                                    var disAssociateRequest = {
                                        target: { entityType: "cr549_componentnotes", id: obj.props.recordid },
                                        relatedEntityId: appId,
                                        relationship: "crm2_cr549_ComponentNotes_cr549_Application_cr549_Application",
                                        getMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Disassociate" }; }
                                    };
                                    return (obj.props.context.webAPI as any).execute(disAssociateRequest);
                                })).then((resp) => {
                                    obj.LoadApplications.bind(obj)();
                                }, function (err) {
                                    console.log(err?.message);
                                });
                            },
                            dialogCancelCallback: () => {
                            },
                            dialogDismissCallback: () => { }
                        })
                    }}
                    disabled={this.state.selectedapps.length == 0}
                />
            </Stack>
            <DetailsList
                className="associatedapps"
                items={this.state.apps}
                columns={[
                    {
                        key: "selectioncolumn",
                        minWidth: 25,
                        maxWidth: 50,
                        isResizable: true,
                        onRender: (item: any) => {
                            return <Checkbox
                                checked={this.state.selectedapps.includes(item.key)}
                                onChange={(evt, checked) => {
                                    if (checked) { this.setState({ selectedapps: [...this.state.selectedapps, item.key] }) }
                                    else { this.setState({ selectedapps: this.state.selectedapps.filter(x => x != item.key) }) }
                                }}
                                theme={createTheme({
                                    palette: {
                                        themePrimary: "#0D2499",
                                        themeDark: "#091a70",
                                        themeDarker: "#06124d"
                                    },
                                })}
                            />
                        }
                    } as IColumn,
                    { key: "cr549_id", name: "Application Name (short)", fieldName: "cr549_id", minWidth: 100, maxWidth: 200, isResizable: true },
                    { key: "cr549_long_app_name", name: "Application Name (long)", fieldName: "cr549_long_app_name", minWidth: 100, maxWidth: 300, isResizable: true },
                    { key: "cr549_app_live_status", name: "Application Live Status", fieldName: "cr549_app_live_status", minWidth: 100, maxWidth: 300, isResizable: true },
                    { key: "cr549_date_golive", name: "Application Go Live Date", fieldName: "cr549_date_golive", minWidth: 100, maxWidth: 300, isResizable: true },
                    { key: "cr549_platform_name", name: "Application Platform", fieldName: "cr549_platform_name", minWidth: 100, maxWidth: 300, isResizable: true },
                ]}
                styles={{ root: { border: "1px solid #d1d1d1", borderRadius: 6, paddingTop: 0 } }}
                selectionMode={SelectionMode.none}
            />
            <CMSDialog
                isOpen={this.state.showDialog!}
                title={this.state.dialogTitle}
                subText={this.state.dialogSubtext}
                confirmButtonText={this.state.dialogConfirmButtonLabel}
                cancelButtonText={this.state.dialogCancelButtonLabel}
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
        </>
    }
}

export default Applications;