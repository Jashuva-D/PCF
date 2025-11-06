// ...existing code...
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IInputs } from "./generated/ManifestTypes";
import { DefaultButton, Icon, initializeIcons, Label, PrimaryButton, Stack, StackItem, Text, TextField,IconButton } from "@fluentui/react";
import Note from "./Note";
import CommentWithScreenshot from "./ComponentWithScreenshot";

interface NotesProps {
    context: ComponentFramework.Context<IInputs>,
}
interface NotesState {
    notes: any[],
    newnote: boolean,
    filteredNotes: any[],
    filterApplied?: boolean,
    searchText?: string,
    displaySummary?: boolean,
}
class Notes extends React.Component<NotesProps,NotesState> {
    constructor(props: NotesProps){
        initializeIcons();
        super(props);
        this.state = {
            notes: [],
            newnote: false,
            filteredNotes: [],
            filterApplied: false
        }
    }
    GetFakeData(){
        var notes = [];
        for(var i=0;i<10;i++){
            notes.push({
                comments: i % 2 == 0 ? "Small lines of text" : "Innovation drives the modern world forward, shaping how we live, work, and communicate in ways that were once unimaginable. Technology has become an inseparable part of our daily existence, influencing everything from education and healthcare to entertainment and transportation. As digital transformation accelerates, the demand for smarter systems, faster communication, and safer online environments continues to grow. Artificial intelligence and machine learning are no longer futuristic ideas but active contributors to decision-making and automation across industries. In this dynamic era, adaptability has become the most valuable skill, enabling people to learn new tools, navigate uncertainty, and turn challenges into opportunities. Every innovation starts with curiosity—a single thought that challenges the status quo and evolves into something remarkable. When creativity meets persistence, boundaries dissolve, and new horizons emerge, proving that progress is not just about invention but about continuous improvement and meaningful impact.",
                createdon : new Date((new Date()).setDate(new Date().getDate() + i)),
                createdby: "Anu Inampudi"
            })
        }
        this.setState({notes: notes});
    }
    componentDidMount(): void {
        //this.GetFakeData();
        var obj = this;
        var currentrecordid = (this.props.context as any).page.entityId;
        this.props.context.webAPI.retrieveMultipleRecords("camp_applicationnotes",`?$filter=_regardingobjectid_value eq ${currentrecordid}`).then((resp) => {
            let notes = [] as any[]
            resp.entities.forEach(x => {
                notes.push({
                    comments: x.camp_comment,
                    createdon: new Date(x.createdon),
                    createdby: x["_createdby_value@OData.Community.Display.V1.FormattedValue"] || x["_createdby_value"]
                })
            })
            obj.setState({ notes: notes });
        }).catch(function(err){
            console.log(err);
        });
        
    }
    onAddNoteClick(){
        this.setState({newnote: true});
        this.props.context.navigation.openForm({
            entityName: "camp_applicationnotes",
            createFromEntity: {
                entityType: (this.props.context as any).page.entityType,
                id: (this.props.context as any).page.entityId
            }
        });
    }
    onSearchClick(){
        if(this.state.filterApplied){
            this.setState({ filterApplied: false, searchText: "" });
        }
        else{
            const searchTerm = this.state.searchText?.toLowerCase();
            const filteredNotes = this.state.notes.filter(note =>
                note.comments?.toLowerCase().includes(searchTerm)
            );
            this.setState({ filterApplied: true, filteredNotes: filteredNotes });
        }
        
    }
    onGenerateSummaryClick(){
        this.setState({displaySummary: true});
    }
    render(): React.ReactNode {
        const notes = this.state.filterApplied ? this.state.filteredNotes : this.state.notes;
        return <div>
            <Stack tokens={{childrenGap: 10}}>
                <StackItem>
                    <Stack tokens={{childrenGap: 5}}>
                        <StackItem align ="start">
                            <Stack horizontal tokens={{childrenGap: 10}}>
                                <StackItem>
                                    <DefaultButton iconProps={{ iconName: "Add" }} text="Add Note" onClick={this.onAddNoteClick.bind(this)} style={{borderRadius: 6}}></DefaultButton>
                                </StackItem>
                                <StackItem>
                                    <DefaultButton iconProps={{ iconName: "Bot" }} text="Generate Summary" onClick={this.onGenerateSummaryClick.bind(this)} style={{borderRadius: 6}}></DefaultButton>
                                </StackItem>
                            </Stack>
                        </StackItem>
                        <StackItem>
                            <TextField  
                                value={this.state.searchText || ""}
                                placeholder="Search Notes..."
                                onChange={(e, newValue) => {
                                    this.setState({ searchText: newValue || "" });
                                    }}
                                    onRenderSuffix={() => (
                                        <IconButton
                                            iconProps={{ iconName: this.state.filterApplied ? "Clear" : "Search" }}
                                            ariaLabel="Search"
                                            styles={{ root: { cursor: "pointer", border: "none", outline: "none", background: "transparent" }, rootHovered: { cursor: "pointer", background: "transparent" }, rootFocused: { cursor: "pointer", background: "transparent", outline: "none", boxShadow: "none" }, rootPressed: { cursor: "pointer", background: "transparent", outline: "none", boxShadow: "none" }, icon: { color: "inherit" } }}
                                            onClick={this.onSearchClick.bind(this)}
                                            onMouseDown={(e) => {
                                            // prevent the button from taking focus on click which causes the highlight
                                            e.preventDefault();
                                        }}
                                    />
                                )}
                            /> 
                        </StackItem>
                        {this.state.newnote == true && <>
                            <StackItem>
                                <TextField placeholder="Add a new note..." styles={{root: {width: "100%"}}} multiline rows={6}></TextField>
                            </StackItem>
                            <StackItem align="end">
                                <PrimaryButton text="Submit" style={{borderRadius: 6}}></PrimaryButton>
                                <DefaultButton text="Cancel" style={{marginLeft: 10, borderRadius: 6}} onClick={() => this.setState({newnote: false})}></DefaultButton>
                            </StackItem>
                        </>}
                        {this.state.displaySummary == true &&
                            <StackItem>
                                <TextField placeholder="Summary..." styles={{root: {width: "100%"}}} multiline rows={10}>{this.props.context.parameters.summary.raw}</TextField>
                            </StackItem>
                        }
                    </Stack>
                </StackItem>
                <StackItem>
                    <Stack tokens={{ childrenGap: 15 }}>
                        {notes.map((x, idx) => (
                            <StackItem
                                key={idx}
                                styles={{
                                    root: {
                                        border: "1px solid #ddd",
                                        borderRadius: 6,
                                        padding: 12,
                                        marginBottom: 10,
                                        background: "#fff",
                                    },
                                }}
                            >
                                <Note
                                    createdon={x.createdon}
                                    createdby={x.createdby}
                                    comment={x.comments}
                                />
                            </StackItem>
                        ))}
                    </Stack>
                </StackItem>
            </Stack> 
            { <CommentWithScreenshot></CommentWithScreenshot> }
        </div>
    }
}

export default Notes;
// ...existing code...