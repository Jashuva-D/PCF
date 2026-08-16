import * as React from "react";
import ReportIssue from "./ReportIssue";
import DiscrepanciesList from "./DiscrepanciesList";
import {DefaultButton, PrimaryButton, Stack, StackItem,Label,Text, Separator, Icon } from "@fluentui/react";
import { FlagIcon } from "./icons";
import { TabOptions } from "./data";

interface DataDiscrepnaciesProps {
    appname?: string | null;
    recordid?: string | null;
    tabname?: string | null;
    sectionname?: string | null;
    appuserroleid?: string | null;
}

interface DataDiscrepanciesState {
    openreportissue: boolean;
    displaylist: boolean;
}

class DataDescripancies extends React.Component<DataDiscrepnaciesProps, DataDiscrepanciesState> {

    constructor(props: DataDiscrepnaciesProps) {
        super(props);
        this.state = {
            openreportissue: false,
            displaylist: true
        };
    }

    render(): React.ReactNode {
        const selectedtab = TabOptions.filter(x => x.key == this.props.tabname).length > 0 ? TabOptions.filter(x => x.key == this.props.tabname)[0] : null;
        const selectedsection = selectedtab?.sections?.filter(x => x.key == this.props.sectionname!)?.length! > 0 ? selectedtab?.sections?.filter(x => x.key == this.props.sectionname)[0] : null;
        return (
            <Stack styles={{ root: { minHeight: "95vh", display: "flex",   flexDirection: "column" }}}>
                <Stack horizontal horizontalAlign="space-between">
                    <StackItem>
                        <div className="report-header">
                            <div className="report-header-icon">
                                <FlagIcon />
                            </div>
                            <div>
                                <h1 className="report-title">Application: {this.props.appname}</h1>
                                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} styles={{ root: { paddingTop: 0 } }}>
                                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} style={{paddingTop: 5}}>
                                        <Text style={{ fontWeight: 800 }}>Tab:</Text>
                                        <Text>{selectedtab?.text ?? "Not Defined"}</Text>
                                    </Stack>
                                    <Text styles={{ root: { color: "#A19F9D", fontSize: 20, fontWeight: 600, lineHeight: "20px" } }}>|</Text>
                                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} style={{paddingTop: 5}}>
                                        <Text style={{ fontWeight: 800 }}>Section:</Text>
                                        <Text>{selectedsection?.text ?? "Not Defined"}</Text>
                                    </Stack>
                                </Stack>
                            </div>
                        </div>
                    </StackItem>
                    {/* <StackItem style={{backgroundColor: "#E6E9FF", borderRadius: 6, height: 60, width: 300}}>
                        <Stack horizontal horizontalAlign="center" verticalAlign="center" style={{padding: 10}} tokens={{childrenGap: 10}}>
                        <Icon iconName="info" color="#0D2499" style={{color: "#0D2499", fontSize: 24, }}></Icon>
                        <Text >This view shows all data discrepancies for the selected application, tab and section</Text>
                        </Stack>
                    </StackItem> */}
                    {!this.state.openreportissue && <StackItem align="center" style={{paddingRight: 10}} >
                        <PrimaryButton
                            text="Add New"
                            iconProps={{ iconName: "add" }}
                            style={{ alignItems: "end",padding:10, borderRadius: 6, backgroundColor: this.state.openreportissue ? "#F2F2F2" : "#0D2499", color: this.state.openreportissue ? "#5A5A5A" : "white" }}
                            disabled={this.state.openreportissue}
                            onClick={() => {
                                this.setState({
                                    openreportissue: true,
                                    displaylist: false
                                });
                            }}
                        />
                    </StackItem>}
                    {this.state.openreportissue && <StackItem align="center" style={{paddingRight: 10}} >
                        <PrimaryButton
                            text="Go Back"
                            iconProps={{iconName: "chevronleftmed"}}
                            style={{ alignItems: "end",padding:10, borderRadius: 6, backgroundColor: this.state.openreportissue ? "#F2F2F2" : "#0D2499", color: this.state.openreportissue ? "#5A5A5A" : "white" }}
                            onClick={() => {
                                this.setState({
                                    openreportissue: false,
                                    displaylist: true
                                });
                            }}
                        />
                    </StackItem>}
                </Stack>
                <StackItem style={{backgroundColor: "#E6E9FF", borderRadius: 6}}>
                        <Stack horizontal horizontalAlign="center" verticalAlign="center" style={{padding: 5}} tokens={{childrenGap: 10}}>
                            <Icon iconName="info" color="#0D2499" style={{color: "#0D2499", fontSize: 24, }}></Icon>
                            <Text >This view shows all data discrepancies for the selected application, tab and section</Text>
                        </Stack>
                </StackItem>
                {/* <Separator></Separator> */}
                {this.state.displaylist && (
                    <StackItem style={{border: "1px solid #EDEBE9", marginTop: 5, paddingBottom: 5}}><DiscrepanciesList 
                        applicationid={this.props.recordid!}
                        tabname={this.props.tabname!}
                        sectionname={this.props.sectionname!}
                    />
                    </StackItem>
                )}
                {this.state.openreportissue && (
                    <ReportIssue
                        appname={this.props.appname ?? ""}
                        recordid={this.props.recordid ?? ""}
                        tabname={this.props.tabname ?? ""}
                        sectionname={this.props.sectionname ?? ""}
                        appuserroleid={this.props.appuserroleid ?? ""}
                        onClose={() => {
                            this.setState({
                                openreportissue: false,
                                displaylist: true
                            });
                        }}
                    />
                )}

                {!this.state.openreportissue && 
                <Stack horizontal horizontalAlign="end" styles={{ root: { marginTop: "auto",  paddingTop: 10  } }}>
                    <DefaultButton
                        text="Close"
                        style={{
                            borderRadius: 6,
                            paddingLeft: 20,
                            paddingRight: 20
                        }}
                        onClick={() => {
                            window.close();
                        }}
                    />
                </Stack>
                }
            </Stack>
        );
    }
}

export default DataDescripancies;