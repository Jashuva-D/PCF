// ...existing code...
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IInputs } from "./generated/ManifestTypes";
import { DefaultButton, Icon, initializeIcons, Label, PrimaryButton, Stack, StackItem, Text, TextField, IconButton, ProgressIndicator,MessageBar, MessageBarType } from "@fluentui/react";
import Note from "./Note";
import CommentWithScreenshot from "./ComponentWithScreenshot";
import NoteForm from "./NoteForm";
import GenerateSummary from "./GenerateSummary";
import TestComponent from "./TestComponent";


interface NotesProps {
    context: ComponentFramework.Context<IInputs>,
}
interface NotesState {
    notes: any[],
    newnote: boolean,
    filteredNotes: any[],
    filterApplied?: boolean,
    searchText?: string,
    generateSummary?: boolean,
    summary?: string,
    enablesearch?: boolean,
    showalert : boolean,
    alert? : {
        messagetype : MessageBarType,
        message : string
    }
}
class Notes extends React.Component<NotesProps, NotesState> {
    constructor(props: NotesProps) {
        initializeIcons();
        super(props);
        this.state = {
            notes: [],
            newnote: false,
            filteredNotes: [],
            filterApplied: false,
            searchText: "",
            generateSummary: false,
            summary: "",
            enablesearch: true,
            showalert : false
        }
    }
    GetFakeData() {
        var notes = [];
        for (var i = 0; i < 10; i++) {
            notes.push({
                comments: i % 2 == 0 ? "Small lines of text" : "Innovation drives the modern world forward, shaping how we live, work, and communicate in ways that were once unimaginable. Technology has become an inseparable part of our daily existence, influencing everything from education and healthcare to entertainment and transportation. As digital transformation accelerates, the demand for smarter systems, faster communication, and safer online environments continues to grow. Artificial intelligence and machine learning are no longer futuristic ideas but active contributors to decision-making and automation across industries. In this dynamic era, adaptability has become the most valuable skill, enabling people to learn new tools, navigate uncertainty, and turn challenges into opportunities. Every innovation starts with curiosity—a single thought that challenges the status quo and evolves into something remarkable. When creativity meets persistence, boundaries dissolve, and new horizons emerge, proving that progress is not just about invention but about continuous improvement and meaningful impact.",
                createdon: new Date((new Date()).setDate(new Date().getDate() + i)),
                createdby: "Anuradha Inampudi",
                modifiedon: new Date((new Date().setDate(new Date().getDate() + i + 1))),
                recordid: `noteid-${i}`,
                topic: "Test",
                topicowner: "Anuradha Inampudi",
                modifiedby: "Anuradha Inampudi",
                statecode: i%3 == 0 ? 3 : (i%2 == 0 ? 0 : 1),
                submittoconfluence: i%3 == 0 ? false : (i%2 == 0 ? true : false),
            })
        }
        this.setState({ notes: notes });
    }
    componentDidMount(): void {
        this.GetFakeData();
        this.Refresh();
        // var obj = this;
        // var currentrecordid = (this.props.context as any).page.entityId;
        // this.props.context.webAPI.retrieveMultipleRecords("camp_applicationnotes", `?$filter=_regardingobjectid_value eq ${currentrecordid}&$orderby=createdon desc`).then((resp) => {
        //     let notes = [] as any[]
        //     resp.entities.forEach(x => {
        //         notes.push({
        //             recordid: x.activityid,
        //             comments: x.camp_comment,
        //             createdon: new Date(x.createdon),
        //             createdby: x["_createdby_value@OData.Community.Display.V1.FormattedValue"] || x["_createdby_value"],
        //             modifiedon: new Date(x.modifiedon),
        //             modifiedby: x["_modifiedby_value@OData.Community.Display.V1.FormattedValue"] || x["_modifiedby_value"],
        //             topicowner: x.camp_topicowner,
        //             topic: x.subject,
        //             statecode: x.statecode,
        //             interactiontype: x.camp_interactiontype
        //         })
        //     })
        //     obj.setState({ notes: notes });
        // }).catch(function (err) {
        //     console.log(err);
        // });

    }
    onAddNoteClick() {
        this.setState({ newnote: true, enablesearch: false, generateSummary: false });
    }
    onSearchClick() {
        const searchTerm = this.state.searchText?.toLowerCase();
        const filteredNotes = this.state.notes.filter(note =>
            note.comments?.toLowerCase().includes(searchTerm)
        );
        this.setState({ filterApplied: true, filteredNotes: filteredNotes });
    }
    onGenerateSummaryClick() {
        this.setState({ generateSummary: true, enablesearch: false, newnote: false });
    }
    onSearchClear() {
        this.setState({ filterApplied: false, searchText: "" });
    }
    onSubmitCallBack(recordid?: string, content?: string) {
        this.Refresh();
    }
    deleteCallBack(recordid?:string) {
        var updatedNotes = this.state.notes.filter(note => note.recordid !== recordid);
        this.setState({ notes: updatedNotes });
        this.showAlertMessage(MessageBarType.success, "Record deleted successfully");
    }
    Refresh() {
        var obj = this;
        this.props.context.webAPI.retrieveMultipleRecords("camp_applicationnotes", `?$filter=_regardingobjectid_value eq ${(this.props.context as any).page.entityId}&$orderby=createdon desc`).then((resp) => {
            let notes = [] as any[]
            resp.entities.forEach(x => {
                notes.push({
                    recordid: x.activityid,
                    comments: x.camp_comment,
                    createdon: new Date(x.createdon),
                    createdby: x["_createdby_value@OData.Community.Display.V1.FormattedValue"] || x["_createdby_value"],
                    modifiedon: new Date(x.modifiedon),
                    modifiedby: x["_modifiedby_value@OData.Community.Display.V1.FormattedValue"] || x["_modifiedby_value"],
                    topic: x.subject,
                    topicowner: x.camp_topicowner,
                    statecode: x.statecode,
                    interactiontype: x.camp_interactiontype,
                    submittoconfluence: x.camp_sharewithconfluence,
                    confluencepageid : x.camp_confluenceurl,
                    confluencespace : x.camp_confluencespace,
                    confluencepagetitle : x.camp_confluencepagetitle
                })
            })
            obj.setState({ notes: notes, newnote: false });
        }).catch(function (err) {
            console.log(err);
        });
    }
    showAlertMessage(messagetype: MessageBarType, message: string){
        var obj = this;
        this.setState({ 
            showalert: true, 
            alert : {
                messagetype : messagetype,
                message : message
            }
        });
        setTimeout(() => {
            obj.setState({showalert : false})
        }, 10000);
    }

    render(): React.ReactNode {
        const notes = this.state.filterApplied ? this.state.filteredNotes : this.state.notes;
        return <div>
            <Stack tokens={{ childrenGap: 10 }} style={{padding: 20}}>
                <StackItem>
                    <Stack tokens={{ childrenGap: 5 }}>
                        <StackItem>
                            <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
                                <StackItem style={{ width: "min(400px, 50vw)" }}>
                                    <TextField
                                        style={{ borderRadius: "10" }}
                                        value={this.state.searchText || ""}
                                        placeholder="Search Notes..."
                                        onChange={(e, newValue) => {
                                            if(newValue == null || newValue == ""){
                                                this.setState({searchText: "", filterApplied : false})
                                            }
                                            else {
                                                this.setState({ searchText: newValue || "" });
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                this.onSearchClick.bind(this)();
                                            }
                                        }}
                                        styles={{
                                            fieldGroup: { background: "transparent", borderRadius: 6, border: "1px solid #d1d1d1" },
                                            field: { borderRadius: 6 },
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
                                            this.state.searchText != "" ? (
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
                                            <PrimaryButton iconProps={{ iconName: "Robot" }} text="Generate Summary" onClick={this.onGenerateSummaryClick.bind(this)} style={{ borderRadius: 6 }}></PrimaryButton>
                                        </StackItem>
                                    </Stack>
                                </StackItem>
                            </Stack>
                        </StackItem>
                        
                        {this.state.newnote == true && <><br></br>
                            <NoteForm context={this.props.context} submitCallBack={this.onSubmitCallBack.bind(this)} cancelCallBack={() => this.setState({ newnote: false, enablesearch: true, generateSummary: false })} ></NoteForm>
                        </>}
                        {this.state.generateSummary == true && <><br /><GenerateSummary context={this.props.context} closeCallback={() => this.setState({ generateSummary: false })} /></>}
                    </Stack>
                </StackItem>
                <StackItem>
                    <hr style={{ border: "1px solid #ddd", margin: "10px 0" }} />
                </StackItem>
                { this.state.showalert && <StackItem>
                    <MessageBar  messageBarType={this.state.alert?.messagetype}>{this.state.alert?.message}</MessageBar>
                </StackItem> }
                <StackItem>
                    {notes.length == 0 && <Label style={{ color: "#D13438", fontStyle: "italic", textAlign: "center" }} > No Records Found </Label>}
                    {notes.map((x, idx) => (
                        <Note
                            key={x.recordid}
                            context={this.props.context}
                            recordid={x.recordid}
                            createdon={x.createdon}
                            modifiedon={x.modifiedon}
                            modifiedby={x.modifiedby}
                            createdby={x.createdby}
                            comment={x.comments}
                            topicowner={x.topicowner}
                            topic={x.topic}
                            statecode={x.statecode}
                            interactiontype={x.interactiontype}
                            submittoconfluence={x.submittoconfluence}
                            confluencepageid={x.confluencepageid}
                            confluencespace={x.confluencespace}
                            confluencepagetitle={x.confluencepagetitle}
                            deleteCallBack={this.deleteCallBack.bind(this)}
                            refresh = {this.Refresh.bind(this)}
                            showalert = {this.showAlertMessage.bind(this)}
                        />
                    ))} 
                </StackItem>
            </Stack>
        </div>
    }
}

export default Notes;