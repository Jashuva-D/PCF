import * as React from "react";
import * as ReactDOM from "react-dom";
import { Stack, StackItem, Label, Icon, Text,Tooltip } from "@fluentui/react";
import Comment from "./Comment";

interface NoteProps {
    context: ComponentFramework.Context<any>,
    recordid?: string,
    comment?: string,
    createdon: Date,
    createdby: string
}
interface NoteState {
    editmode : boolean,
    content? : string
}

class Note extends React.Component<NoteProps,NoteState> {
    constructor(props: NoteProps){
        super(props);
        this.state = {
            editmode : false,
            content : props.comment
        }
    }
    onEditClick(){
        this.setState({
            editmode : true
        })
    }
    editCancel(){
        this.setState({
            editmode : false
        })
    }
    editSubmit(content?:string){
        this.setState({
            editmode : false,
            content : content!
        })
    }
    render(): React.ReactNode {
        const {createdon,createdby} = this.props;
        const {editmode, content} = this.state;
        const backgroundColor = editmode ?  "#ffffff" : "#f3f2f1" ;
        return <Stack tokens={{childrenGap: 3}} styles={{root: {border: "1px solid #d1d1d1", borderRadius: 6, padding: 10, marginBottom: 10, backgroundColor: backgroundColor}}}>
                    <StackItem>
                        <Stack horizontal horizontalAlign="space-between">
                            <StackItem>
                                <Label style = { {color : "#0078D4"}}>{createdby}</Label>
                            </StackItem>
                            <StackItem>
                                <Stack horizontal tokens={{childrenGap: 10, padding: 2}}>
                                    <StackItem>
                                        <Icon iconName="upload" style={{color: "#0078D4"}} title="Push to Confluence"></Icon>
                                    </StackItem>
                                    <StackItem>
                                        <Icon iconName="edit" style={{color: "#0078D4"}} onClick={this.onEditClick.bind(this)} title="Edit"></Icon>
                                    </StackItem>
                                    <StackItem>
                                        <Icon iconName="delete" style={{color: "#0078D4"}} title="Delete Note"></Icon>
                                    </StackItem>
                                    <StackItem>
                                        <Text style={{padding: 10}}>Posted: {(createdon as Date).toLocaleDateString("en-US")}</Text>
                                    </StackItem>
                                </Stack>
                            </StackItem>
                        </Stack>
                    </StackItem>
                    <StackItem>
                        <Comment context={this.props.context} text={content ?? ""} editmode={editmode} editCancel={this.editCancel.bind(this)} editSubmit={this.editSubmit.bind(this)}></Comment>
                    </StackItem>
                </Stack>
    }
}

export default Note;