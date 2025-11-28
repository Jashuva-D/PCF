import * as React from "react";
import * as ReactDOM from "react-dom";
import { Stack, StackItem, Label, Icon, Text,Link, DocumentCardActivity, TextField, PrimaryButton, DefaultButton, MessageBarType } from "@fluentui/react";
import Comment from "./Comment";
import NoteForm from "./NoteForm";
import {ActivityStateCode, Interactiontypes} from "./Constants";

interface NoteProps {
    context: ComponentFramework.Context<any>,
    recordid?: string,
    comment?: string,
    createdon: Date,
    createdby: string,
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
    showalert : (type: MessageBarType, message: string) => void,
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
    enablesubmittoconfluence : boolean
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
        this.props.context.navigation.openConfirmDialog({
            title: "Confirm Delete",
            text : "Do you want to delete the record? This action will permanently remove it.",
            confirmButtonLabel: "Delete",
            cancelButtonLabel: "Cancel"
        }).then(function(resp){
            if(resp.confirmed){
                if(obj.props.recordid && obj.props.recordid !== "") {
                        obj.props.context?.webAPI.deleteRecord("camp_applicationnotes", obj.props.recordid!).then(function(resp){
                        obj.props.deleteCallBack(obj.props.recordid);
                    },function(err){
                        obj.props.context.navigation.openErrorDialog({ message: "Error occured while deleting.", details: err.message })
                    });
                };
            }
        })
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
                    obj.props.showalert(MessageBarType.success,"Submitting to confluence is completed successfully !");
                },function(err){
                    obj.props.showalert(MessageBarType.error,`Record update failed: ERROR: ${err.message}`);
                });
            }
        })
        
    }
    render(): React.ReactNode {
        const {createdon,createdby,modifiedon, modifiedby, statecode, interactiontype} = this.props;
        const {editmode, content} = this.state;
        const backgroundColor = editmode ?  "#ffffff" : "#f3f2f1" ;
        return <Stack tokens={{childrenGap: 3}} styles={{root: {border: "1px solid #d1d1d1", borderRadius: 6, padding: 5, marginBottom: 10, backgroundColor: backgroundColor}}}>
                    <StackItem>
                        <Stack horizontal horizontalAlign="space-between">
                            <StackItem>
                                <Stack horizontal tokens={{childrenGap: 10, padding: 2}}>
                                    <Label style = { {color : "#0078D4"}}>{createdby}</Label>
                                    {/* <Label style = {{color : statecode == 0 ? "green" : statecode == 1 ? "black" : statecode == 2 ? "red" : "yellow"}}>{ActivityStateCode[statecode]}</Label> */}
                                    <span style={{ fontWeight: "bold", fontSize: 12, paddingTop: 7, color : statecode == 0 ? "#107C10" : statecode == 1 ? "#6BB700" : statecode == 2 ? "#D13438" : "#8661C5"}}>{ActivityStateCode[statecode]}</span>
                                    <Icon style={{ paddingTop: 10, color: "#0078D4", cursor: "pointer"}} title="View Details" iconName= {this.state.displayDetails ? "ChevronFold10": "ChevronUnfold10"} onClick={() => {this.setState({displayDetails: !this.state.displayDetails})}}></Icon> 
                                </Stack>
                                
                            </StackItem>
                            <StackItem>
                                <Stack horizontal tokens={{childrenGap: 10, padding: 2}}>
                                    <StackItem>
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
                                    </StackItem>
                                    <StackItem>
                                        <Text style={{padding: 10}}>Posted: {(createdon as Date).toLocaleDateString("en-US")}</Text>
                                    </StackItem>
                                </Stack>
                            </StackItem>
                        </Stack>
                    </StackItem>
                    {this.state.displayDetails && (<StackItem>
                        <Stack horizontal>
                            <Stack tokens={{ childrenGap: 10, padding: 2 }} styles={{ root: { paddingRight: 50 } }}>
                                <Stack horizontal tokens={{childrenGap: 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >Posted By: </span><span style={{ fontSize: 12 }}>{createdby}</span></Stack>
                                <Stack horizontal tokens={{childrenGap: 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Posted On: </span><span style={{ fontSize: 12 }}>{createdon?.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '')}</span></Stack>
                                <Stack horizontal tokens={{childrenGap: 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Updated By: </span><span style={{ fontSize: 12 }}>{modifiedby}</span></Stack>
                                <Stack horizontal tokens={{childrenGap: 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Updated On: </span><span style={{ fontSize: 12 }}>{modifiedon?.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '')}</span></Stack>
                            </Stack>
                            <Stack tokens={{ childrenGap: 10, padding: 2 }} styles={{ root: { paddingRight: 50 } }}>
                                <Stack horizontal tokens={{childrenGap : 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Topic: </span><span style={{ fontSize: 12 }}>{this.props.topic}</span></Stack>
                                <Stack horizontal tokens={{childrenGap : 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Topic Owner: </span><span style={{ fontSize: 12 }}>{this.props.topicowner ?? ""}</span></Stack>
                                <Stack horizontal tokens={{childrenGap : 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >Interaction Type: </span><span style={{ fontSize: 12 }}>{interactiontype != null ? Interactiontypes.filter(x => x.key == interactiontype)[0].text : ""}</span></Stack>
                                <Stack horizontal tokens={{childrenGap : 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Submitted to Confluence: </span><span style={{ fontSize: 12 }}>{this.props.submittoconfluence ? "Yes" : "No"}</span></Stack>
                            </Stack>
                            <Stack tokens={{ childrenGap: 10, padding: 2 }} styles={{ root: { paddingBottom: 10 } }}>
                                <Stack horizontal tokens={{childrenGap : 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Confluence Page ID: </span><span style={{ fontSize: 12 }}>{this.props.confluencepageid}</span></Stack>
                                <Stack horizontal tokens={{childrenGap : 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }}>Confluence Space: </span><span style={{ fontSize: 12 }}>{this.props.confluencespace ?? ""}</span></Stack>
                                <Stack horizontal tokens={{childrenGap : 10}}><span style={{ color: "#0078D4", fontSize: 12, fontWeight: "bold" }} >Confluence Page Title: </span><span style={{ fontSize: 12 }}>{this.props.confluencepagetitle}</span></Stack>
                            </Stack>
                            
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
                                    <PrimaryButton text="Submit" style={{borderRadius : 6}} onClick={this.onSubmitToConfluence.bind(this)}/>
                                    <DefaultButton text="Cancel" style={{borderRadius : 6}} onClick={() => {this.setState({enablesubmittoconfluence : false})}}/>
                                </Stack>
                            </Stack>
                        </StackItem>
                    }
                    <StackItem><hr style={{ border: 'none',  height: '2px', background: 'linear-gradient(to right, #f3f3f3, #e0e0e0, #f3f3f3)', borderRadius: '1px',  margin: '1px 0'}} /></StackItem>
                    <StackItem>
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
                        { !this.state.editmode && <Comment 
                            context={this.props.context} 
                            text={ content ?? ""} 
                            recordid={this.props.recordid} 
                            editmode={editmode}
                        />}
                    </StackItem>
                </Stack>
    }
}

export default Note;