import * as React from "react";
import * as ReactDOM from "react-dom";
import { Stack, StackItem, Label, Icon, Text,TextField } from "@fluentui/react";
import Comment from "./Comment";

interface NoteProps {
    comment?: string,
    createdon: Date,
    createdby: string
}
interface NoteState {
    editmode : boolean
}

class Note extends React.Component<NoteProps,NoteState> {
    constructor(props: NoteProps){
        super(props);
        this.state = {
            editmode : false
        }
    }
    onEditClick(){
        this.setState({
            editmode : !this.state.editmode
        })
    }
    render(): React.ReactNode {
        const {comment,createdon,createdby} = this.props;
        const {editmode} = this.state;
        return <Stack>
                    <StackItem>
                        <Stack horizontal horizontalAlign="space-between">
                            <StackItem>
                                <Label style = { {color : "#0078D4"}}>{createdby}</Label>
                            </StackItem>
                            <StackItem>
                                <Stack horizontal tokens={{childrenGap: 10, padding: 10}}>
                                    <StackItem>
                                        <Icon iconName="upload" style={{color: "#0078D4"}}></Icon>
                                    </StackItem>
                                    <StackItem>
                                        <Icon iconName="download" style={{color: "#0078D4"}}></Icon>
                                    </StackItem>
                                    <StackItem>
                                        <Icon iconName="edit" style={{color: "#0078D4"}} onClick={this.onEditClick.bind(this)}></Icon>
                                    </StackItem>
                                    <StackItem>
                                        <Icon iconName="save" style={{color: "#0078D4"}} onClick={this.onEditClick.bind(this)}></Icon>
                                    </StackItem>
                                    <StackItem>
                                        <Text style={{padding: 10}}>Posted: {(createdon as Date).toLocaleDateString("en-US")}</Text>
                                    </StackItem>
                                </Stack>
                            </StackItem>
                        </Stack>
                    </StackItem>
                    <StackItem>
                        <Comment text={comment ?? ""} editmode={editmode} ></Comment>
                    </StackItem>
                </Stack>
    }
}

export default Note;