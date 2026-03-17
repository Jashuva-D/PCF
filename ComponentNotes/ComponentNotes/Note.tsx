import * as React from "react";
import { Stack, StackItem, Label, Text, ICommandBarItemProps, CommandBar, Persona, PersonaSize, DetailsList, PrimaryButton, MarqueeSelection, Selection, SelectionMode } from "@fluentui/react";
import Comment from "./Comment";
import NoteForm from "./NoteForm";
import { CMSAlertType, Interactiontypes} from "./Constants";
import CMSDialog from "./CMSDialog";

interface NoteProps {
    context: ComponentFramework.Context<any>,
    recordid?: string,
    comment?: string,
    createdon: Date,
    createdby: string,
    createdbyid?: string,
    modifiedon?: Date,
    modifiedby?: string,
    topicowner? : string,
    topic? : string,
    name? : string,
    statecode : number,
    interactiontype? : number,
    interactiondescription? : string,
    refresh: () => void,
    deleteCallBack: (recordid?:string) => void,
    showalert : (type: CMSAlertType, message: string) => void,
}
interface NoteState {
    editmode : boolean,
    content? : string,
    topic? : string,
    topicowner? : string,
    displayDetails? : boolean,
    displayApps? : boolean,
    interactiontype? : number,
    interactiondescription? : string,
    confluencepageid? : string,
    confluencespace? : string,
    confluencepagetitle? : string,
    enablesubmittoconfluence : boolean,
    showStatusChangeDialog : boolean,
    showDialog?: boolean,
    dialogTitle?: string,
    dialogSubtext?: string,
    dialogConfirmButtonLabel? : string,
    dialogCancelButtonLabel? : string,
    applications : any[],
    selectedapps : string[],
    dialogConfirmCallback?: () => void,
    dialogCancelCallback?: () => void,
    dialogDismissCallback?: () => void,
}

class Note extends React.Component<NoteProps,NoteState> {
    _selection : Selection;
    constructor(props: NoteProps){
        super(props);
        this.state = {
            editmode : false,
            content : props.comment,
            displayDetails : false,
            enablesubmittoconfluence: false,
            showStatusChangeDialog : false,
            displayApps : false,
            applications: [],
            selectedapps: []
        }
        var obj = this;
        this._selection = new Selection({
            onSelectionChanged : obj.onSelectionChanged.bind(this),
            onItemsChanged : () => {
                console.log("on item changed");
            },
            getKey: (item) => {
                return item.key as string;
            }
        });
    }
    onSelectionChanged(){
        var items = this._selection.getSelection();
        this.setState({selectedapps: items.map(x => x.key as string)});
    }
    onEditClick(){
        this.setState({
            editmode : true,
            enablesubmittoconfluence : false
        })
    }
    onDeleteClick(){
        var obj = this;
        if(obj.props.recordid && obj.props.recordid !== "") {
            obj.props.context?.webAPI.deleteRecord("cr549_componentnotes", obj.props.recordid!).then(function(resp){
                obj.props.showalert(CMSAlertType.Success, "Note deleted successfully.");
                obj.props.deleteCallBack(obj.props.recordid);
            },function(err){
                obj.props.context.navigation.openErrorDialog({ message: "Error occured while deleting.", details: err.message });
            });
        };
    }
    editCancel(){
        this.setState({
            editmode : false
        })
    }
    editSubmit(record: any){ 
        this.setState({
            editmode : false
        })
        this.props.refresh();
    }
    showApplications() {
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
        if(!this.state.displayApps){
            this.props.context.webAPI.retrieveMultipleRecords("cr549_application", `?fetchXml=${encodeURI(fetchxml)}`).then((response) => {
                let apps = [] as any[];
                response.entities.forEach((app: any) => {
                     apps.push({
                        key: app.cr549_applicationid,
                        cr549_id: app.cr549_id,
                        cr549_long_app_name: app.cr549_long_app_name,
                        cr549_app_live_status: app.cr549_app_live_status,
                        cr549_date_golive: app.cr549_date_golive ? new Date(app.cr549_date_golive) : null,
                        cr549_platform_name: app.cr549_platform_name
                     });
                });
                
                obj.setState({ applications: apps, displayApps: true, displayDetails: false });
            }, (error) => {
                console.error("Error fetching applications: ", error);
            }); 
        }
    }
    render(): React.ReactNode {
        const {createdon,createdby,modifiedon, modifiedby, statecode, interactiontype} = this.props;
        const content = this.state.editmode ? this.state.content : this.props.comment;
        const {editmode} = this.state;
        const backgroundColor = editmode ?  "#ffffff" : "#ffffff";

        var buttons = [
            {key: `${this.props.recordid}_edit`, text: "Edit", iconOnly:true, iconProps:{iconName: "Edit"}, buttonStyles: {icon: { fontSize: 15 }}, onClick: this.onEditClick.bind(this), fontsize: 10}, 
            { 
                key: `${this.props.recordid}_delete`, 
                text: "Delete", iconOnly:true, 
                iconProps:{iconName: "Delete"}, 
                buttonStyles: {icon: { fontSize: 15 }}, 
                onClick: () => {
                    this.setState({
                        showDialog: true,
                        dialogCancelButtonLabel: "Cancel",
                        dialogConfirmButtonLabel: "Delete",
                        dialogTitle: "Confirm Delete",
                        dialogSubtext: "Do you want to delete the record? \n This action will permanently remove it.",
                        dialogConfirmCallback: () => {
                            this.onDeleteClick();
                        }
                    })
                }
            }
        ] as ICommandBarItemProps[];

        var overflowbuttons = [] as ICommandBarItemProps[];

        if(!this.state.displayDetails) overflowbuttons.push({key: `${this.props.recordid}_expanddetails`, text: "Expand Details", iconProps:{iconName: "ChevronUnfold10"}, onClick: () => {this.setState({displayDetails: !this.state.displayDetails, displayApps: false})}});
        else overflowbuttons.push({key: `${this.props.recordid}_collapsedetails`, text: "Collapse Details", iconProps:{iconName: "ChevronFold10"}, onClick: () => {this.setState({displayDetails: !this.state.displayDetails})}});
        
        if(!this.state.displayApps) overflowbuttons.push({key: `${this.props.recordid}_expandapps`, text: "Show Apps", iconProps:{iconName: "ChevronUnfold10"}, onClick: this.showApplications.bind(this)});
        else overflowbuttons.push({key: `${this.props.recordid}_collapseapps`, text: "Hide Apps", iconProps:{iconName: "ChevronFold10"}, onClick: () => {this.setState({displayApps: !this.state.displayApps})}});
        
        return <Stack tokens={{childrenGap: 3}} styles={{root: {border: "1px solid #d1d1d1", borderRadius: 6, padding: 5, backgroundColor: backgroundColor}}}>
                    <StackItem>
                        <Stack horizontal horizontalAlign="space-between">
                            <StackItem style={{paddingLeft: 5}}  >
                                <Stack tokens={{childrenGap: 10}}>
                                    <Persona
                                        styles={{root: {paddingTop: 10}}}
                                        imageUrl={`/Image/download.aspx?Entity=systemuser&Attribute=entityimage&Id=${this.props.createdbyid}&Timestamp=${new Date().valueOf()}`}
                                        size={PersonaSize.size40}
                                        hidePersonaDetails={false}
                                        text={createdby}
                                        onRenderPrimaryText={() => <Label style={{color: "#808080"}}>{createdby}</Label>}
                                    />
                                </Stack>
                            </StackItem>
                            <StackItem>
                                <Stack horizontal>
                                    <Text style={{paddingTop: 12}}>{`${(createdon as Date).toLocaleDateString("en-US")} ${(createdon as Date).toLocaleTimeString("en-US",{hour : "2-digit", minute: "2-digit", hour12: true}).toUpperCase()}`}</Text>
                                    <CommandBar
                                        items={buttons}
                                        overflowItems={overflowbuttons}
                                        overflowButtonProps={{
                                            menuIconProps: {
                                                iconName: "MoreVertical",
                                                style: { fontSize: 15   }
                                            }
                                        }}
                                    />
                                </Stack>
                            </StackItem>
                        </Stack>
                    </StackItem>
                    {this.state.displayDetails && (<StackItem style={{marginTop: 20, marginLeft: 20, borderBottom: "2px solid #d1d1d1", paddingBottom: 10}}>
                        <Stack horizontal tokens={{childrenGap: 100}}>
                            <Stack tokens={{childrenGap: 10}}>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Posted By</Label>
                                    <Text>{createdby ?? "\u00A0"}</Text>
                                </StackItem>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Posted On</Label>
                                    <Text>{createdon?.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '') ?? "\u00A0"}</Text>
                                </StackItem>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Updated By</Label>
                                    <Text>{modifiedby ?? "\u00A0"}</Text>
                                </StackItem>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Updated On</Label>
                                    <Text>{modifiedon?.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '') ?? "\u00A0"}</Text>
                                </StackItem>
                            </Stack>
                            <Stack tokens={{childrenGap: 10}}>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Name</Label>
                                    <Text>{this.props.name ?? "\u00A0"}</Text>
                                </StackItem>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Topic</Label>
                                    <Text>{this.props.topic ?? "\u00A0"}</Text>
                                </StackItem>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Interaction Type</Label>
                                    <Text>{interactiontype != null ? Interactiontypes.filter(x => x.key == interactiontype)[0].text : "\u00A0"}</Text>
                                </StackItem>
                            </Stack>
                        </Stack>
                    </StackItem>)}
                    {this.state.displayApps && (<StackItem style={{marginTop: 20, marginLeft: 20, borderBottom: "2px solid #d1d1d1", paddingBottom: 10}}>
                        <Stack style={{paddingBottom: 10}} tokens={{childrenGap: 10}} horizontal horizontalAlign="end">
                            <PrimaryButton 
                                text="Add App"
                                iconProps={{iconName: "add"}}
                                style={{borderRadius: 6, backgroundColor: "#0D2499"}}
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
                                                obj.showApplications.bind(obj)();
                                            }
                                        ).catch(function (error: any) {
                                            console.log(error)
                                        });

                                    },(err) => {
                                            console.error(err?.message);
                                    });
                                }}
                            />
                            <PrimaryButton 
                                text="Remove App"
                                iconProps={{iconName: "delete"}}
                                style={{borderRadius: 6, backgroundColor: "#0D2499"}}
                                onClick={() => {
                                    var obj = this;
                                    Promise.all(obj.state.selectedapps.map((appId) => {
                                        var disAssociateRequest = {
                                            target: { entityType: "cr549_componentnotes", id: obj.props.recordid },
                                            relatedEntityId: appId,
                                            relationship: "crm2_cr549_ComponentNotes_cr549_Application_cr549_Application",
                                            getMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Associate" }; }
                                        };
                                        return (obj.props.context.webAPI as any).execute(disAssociateRequest);
                                    })).then((resp) => {
                                        obj.showApplications.bind(obj)();
                                    },function(err){
                                        console.log(err?.message);
                                    });
                                    
                                }}
                            />
                        </Stack>
                        
                        <MarqueeSelection selection={this._selection}>
                            <DetailsList
                                items={this.state.applications}
                                columns={[
                                    {key: "cr549_id", name: "Application Name (short)", fieldName: "cr549_id", minWidth: 100, maxWidth: 200, isResizable: true},
                                    {key: "cr549_long_app_name", name: "Application Name (long)", fieldName: "cr549_long_app_name", minWidth: 100, maxWidth: 300, isResizable: true},
                                    {key: "cr549_app_live_status", name: "Application Live Status", fieldName: "cr549_app_live_status", minWidth: 100, maxWidth: 300, isResizable: true},
                                    {key: "cr549_date_golive", name: "Application Go Live Date", fieldName: "cr549_date_golive", minWidth: 100, maxWidth: 300, isResizable: true},
                                    {key: "cr549_platform_name", name: "Application Platform", fieldName: "cr549_platform_name", minWidth: 100, maxWidth: 300, isResizable: true},
                                ]}
                                styles={{root: {border: "1px solid #d1d1d1", borderRadius: 6}}}
                                selection={this._selection}
                                selectionMode={SelectionMode.multiple}
                            />
                        </MarqueeSelection>
                        
                    </StackItem>)}
                    <StackItem style={{padding: 10}}>
                        {this.state.editmode && <NoteForm
                            context={this.props.context}
                            recordid={this.props.recordid}
                            cancelCallBack={this.editCancel.bind(this)}
                            submitCallBack={this.editSubmit.bind(this)}
                            content={ this.props.comment ?? ""}
                            name = {this.props.name}
                            topic={this.props.topic}
                            topicowner={this.props.topicowner}
                            interactiontype={this.props.interactiontype}
                            interactiondescription={this.props.interactiondescription}
                            showalert={this.props.showalert}
                        />}
                        { !this.state.editmode && <>
                            <Comment 
                                context={this.props.context} 
                                text={ this.props.comment ?? ""} 
                                recordid={this.props.recordid} 
                                editmode={editmode}
                            />
                        </>}
                    </StackItem>
                    <CMSDialog 
                        isOpen={this.state.showDialog!} 
                        title={this.state.dialogTitle}
                        subText={this.state.dialogSubtext}
                        confirmButtonText={this.state.dialogConfirmButtonLabel}
                        cancelButtonText={this.state.dialogCancelButtonLabel}
                        onDismiss={() => {
                            this.setState({showDialog: false});
                            this.state.dialogDismissCallback && this.state.dialogDismissCallback();
                        }}
                        onConfirm={() => {
                            this.setState({showDialog: false});
                            this.state.dialogConfirmCallback && this.state.dialogConfirmCallback();
                        }} 
                        onCancel={() => {
                            this.setState({showDialog: false});
                            this.state.dialogCancelCallback && this.state.dialogCancelCallback();
                        }}
                    />
                </Stack>
    }
}

export default Note;