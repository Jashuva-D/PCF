import * as React from "react";
import * as ReactDOM from "react-dom";
import { IInputs } from "./generated/ManifestTypes";
import { Icon, initializeIcons, Label, Stack, StackItem, Text, TextField } from "@fluentui/react";
import Note from "./Note";
import CommentWithScreenshot from "./ComponentWithScreenshot";

interface NotesProps {
    context: ComponentFramework.Context<IInputs>,
}
interface NotesState {
    notes: any[],
}
class Notes extends React.Component<NotesProps,NotesState> {
    constructor(props: NotesProps){
        initializeIcons();
        super(props)
    }
    GetFakeData(){
        var notes = [];
        for(var i=0;i<10;i++){
            notes.push({
                comments: i % 2 == 0 ? "Small lines of text" : "Innovation drives the modern world forward, shaping how we live, work, and communicate in ways that were once unimaginable. Technology has become an inseparable part of our daily existence, influencing everything from education and healthcare to entertainment and transportation. As digital transformation accelerates, the demand for smarter systems, faster communication, and safer online environments continues to grow. Artificial intelligence and machine learning are no longer futuristic ideas but active contributors to decision-making and automation across industries. In this dynamic era, adaptability has become the most valuable skill, enabling people to learn new tools, navigate uncertainty, and turn challenges into opportunities. Every innovation starts with curiosity—a single thought that challenges the status quo and evolves into something remarkable. When creativity meets persistence, boundaries dissolve, and new horizons emerge, proving that progress is not just about invention but about continuous improvement and meaningful impact.",
                createdon : new Date((new Date()).setDate(new Date().getDate() + i)),
                createdby: "Joshua Devireddy"
            })
        }
        return notes;
    }
    async componentDidMount(): Promise<void> {
        var obj = this;
        var currentrecordid = (this.props.context as any).page.entityId;
        await this.props.context.webAPI.retrieveMultipleRecords("camp_applicationnotes",`?$filter=_regardingobjectid_value eq ${currentrecordid}`).then((resp) => {
            let notes = [] as any[]
            resp.entities.forEach(x => {
                notes.push({
                    comments: x.camp_comment,
                    createdon: new Date(x.createdon),
                    createdby: x["_createdby_value@OData.Community.Display.V1.FormattedValue"] || x["_createdby_value"]
                })
            })
            obj.setState({ notes: notes });
        });
    }
    render(): React.ReactNode {
        const notes = this.state.notes;
        return <div>
            <Stack>
                {notes.map(x => {
                    return <StackItem>
                            <Note createdon={x.createdon} createdby={x.createdby} comment={x.comments}></Note>
                        </StackItem>
                })}
            </Stack>
            {/* <CommentWithScreenshot></CommentWithScreenshot> */}
        </div>
    }
}

export default Notes;