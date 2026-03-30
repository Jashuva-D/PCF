import * as React from "react";
import { Stack, StackItem, Label, Text, ICommandBarItemProps, CommandBar, Persona, PersonaSize, DetailsList, PrimaryButton, MarqueeSelection, Selection, SelectionMode, IColumn, Checkbox, createTheme, DefaultButton } from "@fluentui/react";
import Comment from "./Comment";
import NoteForm from "./NoteForm";
import { CMSAlertType, Interactiontypes, NoteTabs} from "./Constants";
import CMSDialog from "./CMSDialog";
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
    name? : string,
    statecode : number,
    interactiontype? : number,
    interactiondescription? : string,
    application_id? : string,
    application_name? : string,
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
    currenttab: NoteTabs
}

class Note extends React.Component<NoteProps,NoteState> {
    _selection : Selection;
    constructor(props: NoteProps){
        super(props);
        this.state = {
            editmode : false,
            content : props.comment,
            actionitems : props.actionitems,
            displayDetails : false,
            enablesubmittoconfluence: false,
            showStatusChangeDialog : false,
            displayApps : false,
            applications: [],
            selectedapps: [],
            currenttab: NoteTabs.Comments
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
            obj.props.context?.webAPI.deleteRecord("cr549_inquirynotes", obj.props.recordid!).then(function(resp){
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
        const {createdon,createdby,modifiedon, modifiedby, interactiontype} = this.props;
        const {editmode} = this.state;
        const backgroundColor = editmode ?  "#ffffff" : "#ffffff";

        var buttons = [
            {key: `${this.props.recordid}_edit`, text: "Edit", iconOnly:true, iconProps:{iconName: "Edit"}, buttonStyles: {icon: { fontSize: 15 }}, onClick: this.onEditClick.bind(this), fontsize: 10, disabled: this.state.displayApps}, 
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
                },
                disabled: this.state.displayApps
            }
        ] as ICommandBarItemProps[];

        //var overflowbuttons = [] as ICommandBarItemProps[];

        // if(!this.state.displayDetails) overflowbuttons.push({key: `${this.props.recordid}_expanddetails`, text: "Expand Details", iconProps:{iconName: "ChevronUnfold10"}, onClick: () => {this.setState({displayDetails: !this.state.displayDetails, displayApps: false})}});
        // else overflowbuttons.push({key: `${this.props.recordid}_collapsedetails`, text: "Collapse Details", iconProps:{iconName: "ChevronFold10"}, onClick: () => {this.setState({displayDetails: !this.state.displayDetails})}});
        
        return <Stack tokens={{childrenGap: 3}} styles={{root: {border: "1px solid #d1d1d1", borderRadius: 6, padding: 5, backgroundColor: backgroundColor}}}>
                    <StackItem>
                        <Stack horizontal horizontalAlign="space-between">
                            <StackItem style={{paddingLeft: 5}}  >
                                <Stack tokens={{childrenGap: 10}} horizontal>
                                    <Persona
                                        styles={{root: {paddingTop: 10}}}
                                        imageUrl={`/Image/download.aspx?Entity=systemuser&Attribute=entityimage&Id=${this.props.createdbyid}&Timestamp=${new Date().valueOf()}`}
                                        size={PersonaSize.size40}
                                        hidePersonaDetails={false}
                                        text={createdby}
                                        onRenderPrimaryText={() => <Label style={{color: "#808080"}}>{createdby}</Label>}
                                    />
                                    <StackItem style={{paddingTop : 15, paddingLeft: 10}}><Stack horizontal tokens={{childrenGap: 5}}><Text style={{fontWeight: "bold"}}>Topic:</Text><Text>{this.props.topic ?? ""}</Text></Stack></StackItem>
                                </Stack>
                            </StackItem>
                            <StackItem>
                                <Stack horizontal>
                                    <Text style={{paddingTop: 12}}>{`${(createdon as Date).toLocaleDateString("en-US")} ${(createdon as Date).toLocaleTimeString("en-US",{hour : "2-digit", minute: "2-digit", hour12: true}).toUpperCase()}`}</Text>
                                    <CommandBar
                                        items={buttons}
                                        //overflowItems={overflowbuttons}
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
                    {!this.state.editmode && <StackItem style={{paddingTop : 10}}>
                        <DefaultButton 
                            style={{border: 0, borderBottom: this.state.currenttab === NoteTabs.Details ? "2px solid #0D2499" : "none"}} 
                            onClick={() => this.setState({currenttab: NoteTabs.Details})}>
                                Details
                        </DefaultButton>
                        <DefaultButton 
                            style={{border: 0, borderBottom: this.state.currenttab === NoteTabs.Comments ? "2px solid #0D2499" : "none"}} 
                            onClick={() => this.setState({currenttab: NoteTabs.Comments})}>
                                Comments
                        </DefaultButton>
                        <DefaultButton 
                            style={{border: 0, borderBottom: this.state.currenttab === NoteTabs.ActionItems ? "2px solid #0D2499" : "none"}} 
                            onClick={() => this.setState({currenttab: NoteTabs.ActionItems})}>
                                Action Items
                        </DefaultButton>
                    </StackItem>}
                    { !this.state.editmode && 
                        <StackItem>
                            {this.state.currenttab === NoteTabs.Details && 
                                <StackItem style={{marginTop: 20, marginLeft: 20, borderBottom: "2px solid #d1d1d1", paddingBottom: 10}}>
                                    <DetailsTab 
                                        context={this.props.context}
                                        name = {this.props.name}
                                        topic={this.props.topic}
                                        topicowner={this.props.topicowner}
                                        interactiontype={this.props.interactiontype}
                                        interactiondescription={this.props.interactiondescription}
                                        application_id={this.props.application_id}
                                        application_name={this.props.application_name}
                                        createdby={this.props.createdby}
                                        createdon={this.props.createdon}
                                        modifiedby={this.props.modifiedby}
                                        modifiedon={this.props.modifiedon}
                                    />
                                </StackItem>
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
                    }
                    { this.state.editmode && 
                        <StackItem style={{padding: 10}}>
                            <NoteForm
                                context={this.props.context}
                                recordid={this.props.recordid}
                                cancelCallBack={this.editCancel.bind(this)}
                                submitCallBack={this.editSubmit.bind(this)}
                                content={ this.props.comment ?? ""}
                                actionitems={ this.props.actionitems ?? ""}
                                name = {this.props.name}
                                topic={this.props.topic}
                                topicowner={this.props.topicowner}
                                interactiontype={this.props.interactiontype}
                                interactiondescription={this.props.interactiondescription}
                                application_id={this.props.application_id!}
                                application_name={this.props.application_name!}
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
                </Stack>
    }
}

export default Note;