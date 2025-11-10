import * as React from "react";
import * as ReactDOM from "react-dom";
import { Stack, StackItem, Label, Icon, Text,Link } from "@fluentui/react";
import Comment from "./Comment";

interface NoteProps {
    context: ComponentFramework.Context<any>,
    recordid?: string,
    comment?: string,
    createdon: Date,
    createdby: string,
    modifiedon?: Date,
    modifiedby?: string,
    topicowner? : string,
    deleteCallBack: (recordid?:string) => void
}
interface NoteState {
    editmode : boolean,
    content? : string,
    displayDetails? : boolean
}

class Note extends React.Component<NoteProps,NoteState> {
    constructor(props: NoteProps){
        super(props);
        this.state = {
            editmode : false,
            content : props.comment,
            displayDetails : false
        }
    }
    onEditClick(){
        this.setState({
            editmode : true
        })
    }
    onDeleteClick(){
        var obj = this;
        if(this.props.recordid && this.props.recordid !== "") {
            this.props.context?.webAPI.deleteRecord("camp_applicationnotes", this.props.recordid!).then(function(resp){
                obj.props.deleteCallBack(obj.props.recordid);
            });
        }
    }
    editCancel(){
        this.setState({
            editmode : false
        })
    }
    editSubmit(recordid:string, content?:string){
        this.setState({
            editmode : false,
            content : content!
        })
    }
    render(): React.ReactNode {
        const {createdon,createdby,modifiedon, modifiedby} = this.props;
        const {editmode, content} = this.state;
        const backgroundColor = editmode ?  "#ffffff" : "#f3f2f1" ;
        return <Stack tokens={{childrenGap: 3}} styles={{root: {border: "1px solid #d1d1d1", borderRadius: 6, padding: 10, marginBottom: 10, backgroundColor: backgroundColor}}}>
                    <StackItem>
                        <Stack horizontal horizontalAlign="space-between">
                            <StackItem>
                                <Stack horizontal tokens={{childrenGap: 10, padding: 2}}><Label style = { {color : "#0078D4"}}>{createdby}</Label> <Link underline={false} onClick={() => {this.setState({displayDetails: !this.state.displayDetails})}}>view details</Link></Stack>
                                {this.state.displayDetails && (
                                    <Stack horizontal tokens={{childrenGap: 10, padding: 2}}>
                                        <span style={{padding: 5, color:"#0078D4"}}>Posted By: </span><span style={{padding: 5}}>{createdby}</span>
                                        <span style={{padding: 5, color:"#0078D4"}}>Posted On: </span><span style={{padding: 5}}>{createdon?.toLocaleDateString('en-US')}</span>
                                        <span style={{padding: 5, color:"#0078D4"}}>Updated By:</span><span style={{padding: 5}}>{modifiedby}</span>
                                        <span style={{padding: 5, color:"#0078D4"}}>Updated On: </span><span style={{padding: 5}}>{modifiedon?.toLocaleDateString('en-US')}</span>
                                        <span style={{padding: 5, color:"#0078D4"}}>Topic Owner: </span><span>{this.props.topicowner ?? ""}</span>
                                    </Stack>
                                )}
                            </StackItem>
                            <StackItem>
                                <Stack horizontal tokens={{childrenGap: 10, padding: 2}}>
                                    <StackItem>
                                        <Icon iconName="upload" style={{color: "#0078D4"}} title="Push to Confluence" 
                                            styles={{
                                                root: {
                                                    cursor: "pointer",
                                                    ":hover": {
                                                        transform: "scale(1.3)", // 💥 increase size on hover
                                                        color: "#005A9E",
                                                        backgroundColor: "#f3f2f1",
                                                    },
                                                }
                                            }}>
                                        </Icon>
                                    </StackItem>
                                    <StackItem>
                                        <Icon iconName="edit" style={{color: "#0078D4"}} title="Edit Note" onClick={this.onEditClick.bind(this)} 
                                            styles={{root: {
                                                cursor: "pointer",
                                                ":hover": {
                                                        transform: "scale(1.3)", // 💥 increase size on hover
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
                                                    transform: "scale(1.3)", // 💥 increase size on hover
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
                    <StackItem>
                        <Comment context={this.props.context} text={content ?? ""} recordid={this.props.recordid} editmode={editmode} editCancel={this.editCancel.bind(this)} editSubmit={this.editSubmit.bind(this)}></Comment>
                    </StackItem>
                </Stack>
    }
}

export default Note;