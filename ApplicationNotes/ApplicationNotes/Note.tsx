import * as React from "react";
import * as ReactDOM from "react-dom";
import { Stack, StackItem, Label, Icon, Text,Link, DocumentCardActivity, TextField, PrimaryButton, DefaultButton, MessageBarType, ICommandBarItemProps, CommandBarButton, CommandBar, Persona, PersonaSize } from "@fluentui/react";
import Comment from "./Comment";
import NoteForm from "./NoteForm";
import { CMSAlertType, Interactiontypes, NoteTabs} from "./Constants";
import CMSDialog from "./CMSDialog";
import StatusChangeDialogue from "./StatusChangeDialogue";
import DetailsTab from "./DetailsTab";

interface NoteProps {
    context: ComponentFramework.Context<any>,
    recordid?: string,
    comment?: string,
    actionitems?: string,
    createdon: Date,
    createdby: string,
    createdbyid?: string,
    modifiedon?: Date,
    modifiedby?: string,
    topicowner? : string,
    topic? : string,
    statecode : number,
    interactiontype? : number,
    otherinteractiontype? : string,
    submittoconfluence? : boolean
    confluencepageid? : string,
    confluencespace? : string,
    confluencepagetitle? : string
    refresh: () => void,
    deleteCallBack: (recordid?:string) => void,
    showalert : (type: CMSAlertType, message: string) => void,
}
interface NoteState {
    editmode : boolean,
    content? : string,
    actionitems? : string,
    topic? : string,
    topicowner? : string,
    displayDetails? : boolean,
    interactiontype? : number,
    otherinteractiontype? : string,
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
    dialogConfirmCallback?: () => void,
    dialogCancelCallback?: () => void,
    dialogDismissCallback?: () => void,
    currenttab: NoteTabs
}

class Note extends React.Component<NoteProps,NoteState> {
    constructor(props: NoteProps){
        super(props);
        this.state = {
            editmode : false,
            content : props.comment,
            actionitems : props.actionitems,
            displayDetails : false,
            confluencepageid : props.confluencepageid,
            confluencespace : props.confluencespace,
            confluencepagetitle : props.confluencepagetitle,
            enablesubmittoconfluence: false,
            showStatusChangeDialog : false,
            currenttab: NoteTabs.Comments
        }
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
            obj.props.context?.webAPI.deleteRecord("cr549_applicationnotes", obj.props.recordid!).then(function(resp){
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
    editSubmit(record: any){ //recordid:string, content?:string, topic?: string, topicOwner? : string){
        // this.setState({
        //     editmode : false,
        //     content : record.comments ?? "",
        //     topic : record.topic ?? "",
        //     topicowner : record.topicOwner ?? "",
        //     interactiontype : record.interactiontype
        // })
        this.setState({
            editmode : false
        })
        this.props.refresh();
        
    }
    onSubmitToConfluence(){
        var obj = this;
        this.props.context.navigation.openConfirmDialog({
            title: "Confirm Submit",
            text : "Are you sure you want to submit to confluence ?",
            confirmButtonLabel: "Submit",
            cancelButtonLabel: "Cancel"
        }).then(function(resp){
            if(resp.confirmed){
                var record = {
                    cr549_sharewithconfluence : true,
                    cr549_confluenceurl : obj.state.confluencepageid,
                    cr549_confluencespace : obj.state.confluencespace,
                    cr549_confluencepagetitle : obj.state.confluencepagetitle
                }
                obj.props.context.webAPI.updateRecord("cr549_applicationnotes",obj.props.recordid!,record).then(function(resp){
                    // obj.setState({enablesubmittoconfluence : false});
                    // obj.props.showalert(CMSAlertType.Success,"Submitting to confluence is completed successfully !");
                    var request = {
                        entity: { entityType: "cr549_applicationnotes", id: obj.props.recordid! },
                        getMetadata: function () {
                        return {
                            boundParameter: "entity",
                            parameterTypes: {
                            entity: { typeName: "mscrm.cr549_applicationnotes", structuralProperty: 5 }
                            },
                            operationType: 0, operationName: "crm2_PushToConfluencePage"
                        };
                        }
                    };

                    (obj.props.context.webAPI as any).execute(request).then(
                        function success(response : any) {
                        if (response.ok) { 
                            console.log("Success"); 
                            obj.setState({enablesubmittoconfluence : false});
                            obj.props.showalert(CMSAlertType.Success,"Submitting to confluence is completed successfully !");
                        }
                        }
                    ).catch(function (error : any) {
                        obj.props.context.navigation.openErrorDialog({
                            message: error.message
                        });
                    });
                },function(err){
                    obj.props.showalert(CMSAlertType.Error,`Record update failed: ERROR: ${err.message}`);
                });
            }
        })
        
    }
    render(): React.ReactNode {
        const {createdon,createdby,modifiedon, modifiedby, statecode, interactiontype} = this.props;
        const content = this.state.editmode ? this.state.content : this.props.comment;
        const {editmode} = this.state;
        const backgroundColor = editmode ?  "#ffffff" : "#ffffff";

        var buttons = [
            {key: `${this.props.recordid}_edit`, text: "Edit", ariaLabel: "Edit", iconOnly:true, iconProps:{iconName: "Edit"}, buttonStyles: {icon: { fontSize: 15 }}, onClick: this.onEditClick.bind(this), fontsize: 10}, 
            { 
                key: `${this.props.recordid}_delete`, 
                text: "Delete", ariaLabel: "Delete", iconOnly:true, 
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
        // if(!this.state.displayDetails)
        //     overflowbuttons.push({key: `${this.props.recordid}_expanddetails`, text: "Expand Details", ariaLabel: "Expand Details", iconProps:{iconName: "ChevronUnfold10"}, onClick: () => {this.setState({displayDetails: !this.state.displayDetails})}});
        // else overflowbuttons.push({key: `${this.props.recordid}_collapsedetails`, text: "Collapse Details", ariaLabel: "Collapse Details", iconProps:{iconName: "ChevronFold10"}, onClick: () => {this.setState({displayDetails: !this.state.displayDetails})}});
        overflowbuttons.push({key: `${this.props.recordid}_pushtoconfluence`, text: "Submit to Confluence", ariaLabel: "Submit to Confluence", iconProps:{iconName: "Upload"}, disabled: this.state.editmode, onClick: () => {this.setState({enablesubmittoconfluence : true, displayDetails : false})}});
        //overflowbuttons.push({key: `${this.props.recordid}_updatestatus`, text: "Change Status", ariaLabel: "Change Status", iconProps:{iconName: "Accept"}, onClick: () => {this.setState({ showStatusChangeDialog: true })}});
        
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
                                            },
                                            ariaLabel: "More Options",
                                        }}
                                    />
                                </Stack>
                            </StackItem>
                        </Stack>
                    </StackItem>
                    {this.state.enablesubmittoconfluence && <StackItem style={{padding: 20}}>
                            <Stack tokens={{childrenGap : 10}}>
                                <Stack horizontal tokens={{childrenGap : 10}}>
                                    <StackItem><TextField label="Confluence Page ID" value={this.state.confluencepageid} onChange={(evt, newvalue) => {this.setState({confluencepageid : newvalue})}}/></StackItem>
                                    <StackItem><TextField label="Confluence Space" value={this.state.confluencespace} onChange={(evt,newvalue) => {this.setState({confluencespace : newvalue})}} /></StackItem>
                                    <StackItem><TextField label="Confluence Page Title" value={this.state.confluencepagetitle} onChange={(evt, newvalue) => {this.setState({confluencepagetitle : newvalue})}}/></StackItem>
                                </Stack>
                                <Stack horizontal style={{alignItems : "end"}} tokens={{childrenGap: 10}}>
                                    <DefaultButton 
                                        text= "Submit"
                                        style={{ borderRadius: 4, borderColor: "#0D2499", color: "#0D2499" }}
                                        onClick={this.onSubmitToConfluence.bind(this)}
                                    />
                                    <DefaultButton 
                                        text="Cancel"
                                        style={{ borderRadius: 4,  backgroundColor: "rgb(243,243,243)"}}
                                        onClick={() => {this.setState({enablesubmittoconfluence : false})}}
                                    />
                                </Stack>
                            </Stack>
                        </StackItem>
                    }
                    {!this.state.editmode && 
                        <><StackItem style={{paddingTop : 10}}>
                            <DefaultButton 
                                style={{border: 0, borderBottom: this.state.currenttab === NoteTabs.Details ? "3px solid #0D2499" : "none"}} 
                                onClick={() => this.setState({currenttab: NoteTabs.Details})}>
                                    Details
                            </DefaultButton>
                            <DefaultButton 
                                style={{border: 0, borderBottom: this.state.currenttab === NoteTabs.Comments ? "3px solid #0D2499" : "none"}} 
                                onClick={() => this.setState({currenttab: NoteTabs.Comments})}>
                                    Comments
                            </DefaultButton>
                            <DefaultButton 
                                style={{border: 0, borderBottom: this.state.currenttab === NoteTabs.ActionItems ? "3px solid #0D2499" : "none"}} 
                                onClick={() => this.setState({currenttab: NoteTabs.ActionItems})}>
                                    Action Items
                            </DefaultButton>
                        </StackItem>
                        <StackItem style={{padding: 10}}>
                            {this.state.currenttab === NoteTabs.Details && 
                                <DetailsTab 
                                    createdby={createdby}
                                    createdon={createdon}
                                    modifiedby={modifiedby}
                                    modifiedon={modifiedon}
                                    topic={this.props.topic}
                                    topicowner={this.props.topicowner}
                                    interactiontype={this.props.interactiontype}
                                    interactiondescription={this.props.otherinteractiontype}
                                    submittoconfluence={this.props.submittoconfluence}
                                    confluencepageid={this.props.confluencepageid}
                                    confluencespace={this.props.confluencespace}
                                    confluencepagetitle={this.props.confluencepagetitle}
                                />
                            }
                            {this.state.currenttab === NoteTabs.Comments && 
                                <Comment 
                                    context={this.props.context} 
                                    text={ this.props.comment ?? ""} 
                                    recordid={this.props.recordid} 
                                    editmode={editmode}
                                />
                            }
                            {this.state.currenttab === NoteTabs.ActionItems && 
                                <Comment 
                                    context={this.props.context} 
                                    text={ this.props.actionitems ?? ""} 
                                    recordid={this.props.recordid} 
                                    editmode={editmode}
                                />
                            }
                        </StackItem>
                        </>
                    }
                    {this.state.editmode &&
                        <StackItem style={{padding: 10}}>
                            <NoteForm
                                context={this.props.context}
                                recordid={this.props.recordid}
                                cancelCallBack={this.editCancel.bind(this)}
                                submitCallBack={this.editSubmit.bind(this)}
                                content={ this.props.comment ?? ""}
                                actionitems={this.props.actionitems ?? ""}
                                topic={this.props.topic}
                                topicowner={this.props.topicowner}
                                interactiontype={this.props.interactiontype}
                                otherinteractiontype={this.props.otherinteractiontype}
                                submittoconfluence={this.props.submittoconfluence}
                                confluencepageid={this.props.confluencepageid}
                                confluencepagetitle={this.props.confluencepagetitle}
                                confluencespace={this.props.confluencespace}
                                showalert={this.props.showalert}
                            />

                        </StackItem>
                    }
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
                    <StatusChangeDialogue
                        isOpen={this.state.showStatusChangeDialog}
                        context={this.props.context}
                        recordid={this.props.recordid!}
                        onComplete={() => {
                            this.setState({ showStatusChangeDialog: false });
                            this.props.refresh();
                        }}
                    />
                </Stack>
    }
}

export default Note;