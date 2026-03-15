import * as React from "react";
import { Stack, StackItem, Label, Text, ICommandBarItemProps, CommandBar, Persona, PersonaSize } from "@fluentui/react";
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
    dialogConfirmCallback?: () => void,
    dialogCancelCallback?: () => void,
    dialogDismissCallback?: () => void,
}

class Note extends React.Component<NoteProps,NoteState> {
    constructor(props: NoteProps){
        super(props);
        this.state = {
            editmode : false,
            content : props.comment,
            displayDetails : false,
            enablesubmittoconfluence: false,
            showStatusChangeDialog : false,
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
        if(!this.state.displayDetails)
            overflowbuttons.push({key: `${this.props.recordid}_expanddetails`, text: "Expand Details", iconProps:{iconName: "ChevronUnfold10"}, onClick: () => {this.setState({displayDetails: !this.state.displayDetails})}});
        else overflowbuttons.push({key: `${this.props.recordid}_collapsedetails`, text: "Collapse Details", iconProps:{iconName: "ChevronFold10"}, onClick: () => {this.setState({displayDetails: !this.state.displayDetails})}});
        
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
                                    <Label style={{color: "#808080"}}>Topic</Label>
                                    <Text>{this.props.topic ?? "\u00A0"}</Text>
                                </StackItem>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Topic Owner</Label>
                                    <Text>{this.props.topicowner ?? "\u00A0"}</Text>
                                </StackItem>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Interaction Type</Label>
                                    <Text>{interactiontype != null ? Interactiontypes.filter(x => x.key == interactiontype)[0].text : "\u00A0"}</Text>
                                </StackItem>
                            </Stack>
                        </Stack>
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