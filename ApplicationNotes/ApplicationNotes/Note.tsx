import * as React from "react";
import * as ReactDOM from "react-dom";
import { Stack, StackItem, Label, Icon, Text,Link, DocumentCardActivity, TextField, PrimaryButton, DefaultButton, MessageBarType, ICommandBarItemProps, CommandBarButton, CommandBar, Persona, PersonaSize } from "@fluentui/react";
import Comment from "./Comment";
import NoteForm from "./NoteForm";
import {ActivityStateCode, CMSAlertType, Interactiontypes} from "./Constants";
import { create } from "domain";
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
    statecode : number,
    interactiontype? : number,
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
    topic? : string,
    topicowner? : string,
    displayDetails? : boolean,
    interactiontype? : number,
    confluencepageid? : string,
    confluencespace? : string,
    confluencepagetitle? : string,
    enablesubmittoconfluence : boolean,
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
            confluencepageid : props.confluencepageid,
            confluencespace : props.confluencespace,
            confluencepagetitle : props.confluencepagetitle,
            enablesubmittoconfluence: false
        }
    }
    onEditClick(){
        this.setState({
            editmode : true
        })
    }
    onDeleteClick(){
        var obj = this;
        // this.props.context.navigation.openConfirmDialog({
        //     title: "Confirm Delete",
        //     text : "Do you want to delete the record? This action will permanently remove it.",
        //     confirmButtonLabel: "Delete",
        //     cancelButtonLabel: "Cancel"
        // }).then(function(resp){
        //     if(resp.confirmed){
        //         if(obj.props.recordid && obj.props.recordid !== "") {
        //                 obj.props.context?.webAPI.deleteRecord("camp_applicationnotes", obj.props.recordid!).then(function(resp){
        //                 obj.props.deleteCallBack(obj.props.recordid);
        //             },function(err){
        //                 obj.props.context.navigation.openErrorDialog({ message: "Error occured while deleting.", details: err.message })
        //             });
        //         };
        //     }
        // })
        if(obj.props.recordid && obj.props.recordid !== "") {
            obj.props.context?.webAPI.deleteRecord("camp_applicationnotes", obj.props.recordid!).then(function(resp){
                obj.props.deleteCallBack(obj.props.recordid);
            },function(err){
                obj.props.context.navigation.openErrorDialog({ message: "Error occured while deleting.", details: err.message })
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
                    camp_sharewithconfluence : true,
                    camp_confluenceurl : obj.state.confluencepageid,
                    camp_confluencespace : obj.state.confluencespace,
                    camp_confluencepagetitle : obj.state.confluencepagetitle
                }
                obj.props.context.webAPI.updateRecord("camp_applicationnotes",obj.props.recordid!,record).then(function(resp){
                    obj.setState({enablesubmittoconfluence : false})
                    obj.props.showalert(CMSAlertType.Success,"Submitting to confluence is completed successfully !");
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
                        dialogSubtext: "Do you want to delete the record? This action will permanently remove it.",
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
        overflowbuttons.push({key: `${this.props.recordid}_pushtoconfluence`, text: "Push to Confluence", iconProps:{iconName: "Upload"}, onClick: () => {this.setState({enablesubmittoconfluence : true, displayDetails : false})}}); 
        
        return <Stack tokens={{childrenGap: 3}} styles={{root: {border: "1px solid #d1d1d1", borderRadius: 6, padding: 5, backgroundColor: backgroundColor}}}>
                    <StackItem>
                        <Stack horizontal horizontalAlign="space-between">
                            {/* <StackItem>
                                <Stack horizontal tokens={{childrenGap: 10, padding: 2}}>
                                    <Label style = { {color : "#0078D4", fontSize: "15px"}}>{createdby}</Label>
                                    <span style={{ fontWeight: "bold", fontSize: 12, paddingTop: 7, color : statecode == 0 ? "#107C10" : statecode == 1 ? "#6BB700" : statecode == 2 ? "#D13438" : "#8661C5"}}>{ActivityStateCode[statecode]}</span>
                                    <Icon style={{ paddingTop: 10, color: "#0078D4", cursor: "pointer"}} title={this.state.displayDetails ? "Close Details" : "View Details"} iconName= {this.state.displayDetails ? "ChevronFold10": "ChevronUnfold10"} onClick={() => {this.setState({displayDetails: !this.state.displayDetails})}}></Icon> 
                                </Stack>
                            </StackItem> */}
                            <StackItem style={{paddingTop: 8, paddingLeft: 5}}  >
                                <Persona
                                    imageUrl={"/Image/download.aspx?Entity=systemuser&Attribute=entityimage&Id="+ this.props.createdbyid}
                                    size={PersonaSize.size40}
                                    hidePersonaDetails={false}
                                    text={createdby}
                                    onRenderPrimaryText={() => <Label style={{color: "#808080"}}>{createdby}</Label>}
                                    onRenderSecondaryText={() => 
                                        <div  style={{ alignContent: "start", padding: 6, borderRadius: 4, background: statecode == 0 ? "#107C10" : statecode == 1 ? "#6BB700" : statecode == 2 ? "#D13438" : "#8661C5", fontWeight: 600, color: "white"}}>
                                            {ActivityStateCode[statecode]} 
                                        </div>
                                    }
                                />
                                {/* { <span  style={{ alignContent: "start", padding: "2px", height: "48px", borderRadius: 4, background: statecode == 0 ? "#107C10" : statecode == 1 ? "#6BB700" : statecode == 2 ? "#D13438" : "#8661C5", fontWeight: 600, color: "white"}}>
                                    {ActivityStateCode[statecode]} 
                                </span> */ }
                                
                                    
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
                                    {/* <StackItem>
                                        <Icon iconName="upload" style={{color: "#0078D4"}} title="Push to Confluence" 
                                            styles={{
                                                root: {
                                                    cursor: "pointer",
                                                    ":hover": {
                                                        transform: "scale(1.3)", 
                                                        color: "#005A9E",
                                                        backgroundColor: "#f3f2f1",
                                                    },
                                                }
                                            }}
                                            onClick={() => {this.setState({enablesubmittoconfluence : true, displayDetails : false})}}
                                            >
                                        </Icon>
                                    </StackItem>
                                    <StackItem>
                                        <Icon iconName="edit" style={{color: "#0078D4"}} title="Edit Note" onClick={this.onEditClick.bind(this)} 
                                            styles={{root: {
                                                cursor: "pointer",
                                                ":hover": {
                                                        transform: "scale(1.3)",
                                                        color: "#005A9E",
                                                        backgroundColor: "#f3f2f1",
                                                },
                                            }}}>
                                        </Icon>
                                    </StackItem>
                                    <StackItem>
                                        <Icon iconName="delete" style={{color: "#0078D4"}} title="Delete Note" onClick={this.onDeleteClick.bind(this)} 
                                            styles={{root: {
                                                cursor: "pointer",
                                                ":hover": {
                                                    transform: "scale(1.3)",
                                                    color: "#005A9E",
                                                    backgroundColor: "#f3f2f1",
                                                },
                                            }}}>
                                        </Icon>
                                    </StackItem> */}
                                    
                                </Stack>
                            </StackItem>
                        </Stack>
                    </StackItem>
                    {this.state.displayDetails && (<StackItem style={{marginTop: 20}}>
                        <Stack horizontal tokens={{childrenGap: 100}}>
                            <Stack tokens={{childrenGap: 20}}>
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
                            <Stack tokens={{childrenGap: 20}}>
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
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Submitted to Confluence</Label>
                                    <Text>{this.props.submittoconfluence ? "Yes" : "No"}</Text>
                                </StackItem>
                            </Stack>
                            <Stack tokens={{childrenGap: 20}}>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Confluence Page ID</Label>
                                    <Text>{this.props.confluencepageid ?? "\u00A0"}</Text>
                                </StackItem>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Confluence Space</Label>
                                    <Text>{this.props.confluencespace ?? "\u00A0"}</Text>
                                </StackItem>
                                <StackItem>
                                    <Label style={{color: "#808080"}}>Confluence Page Title</Label>
                                    <Text>{this.props.confluencepagetitle ?? "\u00A0"}</Text>
                                </StackItem>
                            </Stack>

                            {/* <Stack tokens={{ childrenGap: 10, padding: 2 }} styles={{ root: { paddingRight: 50 } }}>
                                <Stack horizontal tokens={{childrenGap : 10}}>
                                    <table>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >Posted By </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding: 5}}><span style={{ fontSize: 12 }}>{createdby ?? ""}</span></td>
                                        </tr>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Posted On </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding: 5}}><span style={{ fontSize: 12 }}>{createdon?.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '') ?? ""}</span></td>
                                        </tr>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Updated By </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding: 5}}><span style={{ fontSize: 12 }}>{modifiedby ?? ""}</span></td>
                                        </tr>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Updated On </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding: 5}}><span style={{ fontSize: 12 }}>{modifiedon?.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '') ?? ""}</span></td>
                                        </tr>
                                    </table>
                                </Stack>
                            </Stack>
                            <Stack tokens={{ childrenGap: 10, padding: 2 }} styles={{ root: { paddingRight: 50 } }}>
                                <Stack horizontal tokens={{childrenGap : 10}}>
                                    <table>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Topic </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding: 5}}><span style={{ fontSize: 12 }}>{this.props.topic}</span></td>
                                        </tr>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Topic Owner </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding: 5}}><span style={{ fontSize: 12 }}>{this.props.topicowner ?? ""}</span></td>
                                        </tr>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >Interaction Type </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding: 5}}><span style={{ fontSize: 12 }}>{interactiontype != null ? Interactiontypes.filter(x => x.key == interactiontype)[0].text : ""}</span></td>
                                        </tr>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Submitted to Confluence </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding: 5}}><span style={{ fontSize: 12 }}>{this.props.submittoconfluence ? "Yes" : "No"}</span></td>
                                        </tr>
                                    </table>
                                </Stack>
                            </Stack>
                            <Stack tokens={{ childrenGap: 10, padding: 2 }} styles={{ root: { paddingBottom: 10 } }}>
                                <Stack horizontal tokens={{childrenGap: 10}}>
                                    <table>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Confluence Page ID </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding : 5}}><span style={{ fontSize: 12 }}>{this.props.confluencepageid}</span></td>
                                        </tr>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Confluence Space </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding: 5}}><span style={{ fontSize: 12 }}>{this.props.confluencespace ?? ""}</span></td>
                                        </tr>
                                        <tr style={{padding: 5}}>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >Confluence Page Title </span></td>
                                            <td style={{padding: 5}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >:</span></td>
                                            <td style={{padding: 5}}><span style={{ fontSize: 12 }}>{this.props.confluencepagetitle}</span></td>
                                        </tr>
                                    </table>
                                </Stack>
                            </Stack> */}
                        </Stack>
                    </StackItem>)}
                    {this.state.enablesubmittoconfluence && <StackItem style={{paddingBottom: 10}}>
                            <Stack tokens={{childrenGap : 10}}>
                                <Stack horizontal tokens={{childrenGap : 10}}>
                                    <StackItem><TextField label="Confluence Page ID" value={this.state.confluencepageid} onChange={(evt, newvalue) => {this.setState({confluencepageid : newvalue})}}/></StackItem>
                                    <StackItem><TextField label="Confluence Space" value={this.state.confluencespace} onChange={(evt,newvalue) => {this.setState({confluencespace : newvalue})}} /></StackItem>
                                    <StackItem><TextField label="Confluence Page Title" value={this.state.confluencepagetitle} onChange={(evt, newvalue) => {this.setState({confluencepagetitle : newvalue})}}/></StackItem>
                                </Stack>
                                <Stack horizontal style={{alignItems : "end"}} tokens={{childrenGap: 10}}>
                                    <PrimaryButton text="Submit" style={{borderRadius : 6}} styles={{rootHovered: { color: "black"}}} onClick={this.onSubmitToConfluence.bind(this)}/>
                                    <DefaultButton text="Cancel" style={{borderRadius : 6, borderColor:"#D20103" , backgroundColor: "#D20103"}} styles={{root: {color : "white"}}} onClick={() => {this.setState({enablesubmittoconfluence : false})}}/>
                                </Stack>
                            </Stack>
                        </StackItem>
                    }
                     {/* <StackItem><hr style={{ border: 'none',  height: '2px', background: 'linear-gradient(to right, #f3f3f3, #e0e0e0, #f3f3f3)', borderRadius: '1px',  margin: '1px 0'}} /></StackItem> */}
                    <StackItem style={{padding: 10}}>
                        {this.state.editmode && <NoteForm
                            context={this.props.context}
                            recordid={this.props.recordid}
                            cancelCallBack={this.editCancel.bind(this)}
                            submitCallBack={this.editSubmit.bind(this)}
                            content={ content ?? ""}
                            topic={this.props.topic}
                            topicowner={this.props.topicowner}
                            interactiontype={this.props.interactiontype}
                            submittoconfluence={this.props.submittoconfluence}
                            confluencepageid={this.props.confluencepageid}
                            confluencepagetitle={this.props.confluencepagetitle}
                            confluencespace={this.props.confluencespace}
                        />}
                        { !this.state.editmode && <>
                            <Comment 
                                context={this.props.context} 
                                text={ content ?? ""} 
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