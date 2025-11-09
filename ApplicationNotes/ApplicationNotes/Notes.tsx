// ...existing code...
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IInputs } from "./generated/ManifestTypes";
import { DefaultButton, Icon, initializeIcons, Label, PrimaryButton, Stack, StackItem, Text, TextField,IconButton } from "@fluentui/react";
import Note from "./Note";
import CommentWithScreenshot from "./ComponentWithScreenshot";
import RichText from "./RichText";

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
    summary?: string,
    enablesearch? : boolean,
}
class Notes extends React.Component<NotesProps,NotesState> {
    constructor(props: NotesProps){
        initializeIcons();
        super(props);
        this.state = {
            notes: [],
            newnote: false,
            filteredNotes: [],
            filterApplied: false,
            searchText: "",
            displaySummary: false,
            summary: "",
            enablesearch: true
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
        this.GetFakeData();
        var obj = this;
        var currentrecordid = (this.props.context as any).page.entityId;
        this.props.context.webAPI.retrieveMultipleRecords("camp_applicationnotes",`?$filter=_regardingobjectid_value eq ${currentrecordid}&$orderby=createdon desc`).then((resp) => {
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
        this.setState({newnote: true, enablesearch: false, displaySummary: false});
    }
    onSearchClick(){
       const searchTerm = this.state.searchText?.toLowerCase();
        const filteredNotes = this.state.notes.filter(note =>
            note.comments?.toLowerCase().includes(searchTerm)
        );
        this.setState({ filterApplied: true, filteredNotes: filteredNotes });
    }
    onGenerateSummaryClick(){
        var obj = this;
        var currentrecordid = (this.props.context as any).page.entityId;
        var request = {
            entity: { entityType: "camp_application", id: currentrecordid }, // entity

            getMetadata: function () {
                return {
                    boundParameter: "entity",
                    parameterTypes: {
                        entity: { typeName: "mscrm.camp_application", structuralProperty: 5 }
                    },
                    operationType: 0, operationName: "camp_GenerateAppNotesSummary"
                };
            }
        };

        (obj.props.context.webAPI as any).execute(request).then(
            function success(response : any) {
                if (response.ok) { return response.json(); }
            }
        ).then(function (responseBody : any) {
            var result = responseBody;
            console.log(result);
            var summary = result["summary"] as string;
            obj.setState({ summary: summary }); // Edm.String
        }).catch(function (error : any) {
            console.log(error.message);
        });
        this.setState({displaySummary: true, enablesearch: false, newnote: false});
    }
    onSearchClear(){
        this.setState({ filterApplied: false, searchText: "" });
    }
    onSubmitCallBack(){
        this.Refresh();
    }
    Refresh(){
        var obj = this;
        this.props.context.webAPI.retrieveMultipleRecords("camp_applicationnotes",`?$filter=_regardingobjectid_value eq ${(this.props.context as any).page.entityId}&$orderby=createdon desc`).then((resp) => {
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

    render(): React.ReactNode {
        const notes = this.state.filterApplied ? this.state.filteredNotes : this.state.notes;
        return <div>
            <Stack tokens={{childrenGap: 10}}>
                <StackItem>
                    <Stack tokens={{childrenGap: 5}}>
                        <StackItem>
                            <Stack horizontal tokens={{childrenGap: 10}} horizontalAlign="space-between">
                                <StackItem style={{ width: "min(400px, 50vw)" }}>
                                    <TextField
                                        style={{ borderRadius: "10" }}
                                        value={this.state.searchText || ""}
                                        placeholder="Search Notes..."
                                        onChange={(e, newValue) => {
                                            this.setState({ searchText: newValue || "" });
                                        }}
                                        styles={{
                                            fieldGroup: { background: "transparent",borderRadius: 6, border: "1px solid #d1d1d1" },
                                            field: {borderRadius: 6},
                                            prefix: { background: "#0078D4" },
                                            suffix: { background: "transparent" },
                                        }}
                                        onRenderPrefix={() => (
                                            <IconButton
                                                iconProps={{ iconName: "Search" }}
                                                ariaLabel="Search"
                                                styles={{
                                                    root: {
                                                        cursor: "pointer",
                                                        border: "none",
                                                        outline: "none",
                                                        background: "transparent",
                                                        backgroundColor: "transparent",
                                                        boxShadow: "none",
                                                    },
                                                    rootHovered: {
                                                        cursor: "pointer",
                                                        background: "transparent",
                                                        backgroundColor: "transparent",
                                                    },
                                                    rootFocused: {
                                                        cursor: "pointer",
                                                        background: "transparent",
                                                        backgroundColor: "transparent",
                                                        outline: "none",
                                                        boxShadow: "none",
                                                    },
                                                    rootPressed: {
                                                        cursor: "pointer",
                                                        background: "transparent",
                                                        backgroundColor: "transparent",
                                                        outline: "none",
                                                        boxShadow: "none",
                                                    },
                                                    icon: { color: "white" },
                                                }}
                                                onClick={this.onSearchClick.bind(this)}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                }}
                                            />
                                        )}
                                        onRenderSuffix={() =>
                                            this.state.filterApplied ? (
                                                <Icon
                                                    iconName="Clear"
                                                    style={{ marginRight: 8, cursor: "pointer" }}
                                                    onClick={this.onSearchClear.bind(this)}
                                                />
                                            ) : null
                                        }
                                    />
                                </StackItem>
                                <StackItem align="end">
                                    <Stack horizontal tokens={{ childrenGap: 10 }}>
                                        <StackItem>
                                            <PrimaryButton iconProps={{ iconName: "Add" }} text="Add Note" onClick={this.onAddNoteClick.bind(this)} style={{ borderRadius: 6 }}></PrimaryButton>
                                        </StackItem>
                                        <StackItem>
                                            <PrimaryButton iconProps={{ iconName: "Robot" }} text="Generate Summary" onClick={this.onGenerateSummaryClick.bind(this)} style={{ borderRadius: 6    }}></PrimaryButton>
                                        </StackItem>
                                    </Stack>
                                </StackItem>
                            </Stack>
                        </StackItem>
                        <br></br>
                        {this.state.newnote == true && <>
                            <RichText context={this.props.context} submitCallBack={this.onSubmitCallBack.bind(this)} closeCallBack={() => this.setState({ newnote: false, enablesearch: true, displaySummary: false })}></RichText>
                        </>}
                        {this.state.displaySummary == true && <>
                                <StackItem>
                                    <TextField 
                                        placeholder="Summary..." 
                                        styles={{
                                            root: { width: "100%" },
                                            fieldGroup: { background: "transparent",borderRadius: 6, border: "1px solid #d1d1d1" },
                                            field: {borderRadius: 6}
                                        }}
                                        multiline rows={10} 
                                        value={this.state.summary} 
                                    />
                                </StackItem>
                                <StackItem align="end">
                                    <PrimaryButton text="Close" style={{borderRadius: 6}} onClick={() => this.setState({displaySummary: false, enablesearch: true, newnote: false, summary: ""})}></PrimaryButton>
                                </StackItem>
                            </>
                        }
                    </Stack>
                </StackItem>
                <StackItem>
                        {notes.map((x, idx) => (
                            // <StackItem
                            //     key={idx}
                            //     styles={{
                            //         root: {
                            //             border: "1px solid #ddd",
                            //             borderRadius: 6,
                            //             padding: 12,
                            //             marginBottom: 10,
                            //             background: "#fff",
                            //         },
                            //     }}
                            // >
                                <Note
                                    createdon={x.createdon}
                                    createdby={x.createdby}
                                    comment={x.comments}
                                />
                            // </StackItem>
                        ))}
                </StackItem>
            </Stack> 
        </div>
    }
}

export default Notes;