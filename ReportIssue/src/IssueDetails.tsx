import * as React from "react";
import { Dialog, DialogType, DialogFooter, DefaultButton, Icon, Stack, Text, DetailsList, IColumn, Persona, PersonaSize, Separator, Label, StackItem, TooltipHost } from "@fluentui/react";

export interface IssueFieldChange {
    fieldname: string;
    currentvalue: string;
    newvalue: string;
}

export interface IssueDetails {
    issuetitle: string;
    issuedescription: string;
    reportedon: string,
    reportedby?: {
        name: string;
        email?: string;
    };
    assignedto?: {
        name: string;
        email?: string;
    };
    delegatedto?: {
        name: string;
        email?: string;
    };
    status_value?: number
    status_label?: string;
    fields: IssueFieldChange[];
}

interface IssueDetailsDialogProps {
    isOpen: boolean;
    issue?: IssueDetails | null;
    issuerecordid: string,
    onClose: () => void;
    onResolve?: (issue: IssueDetails) => void;
}
interface IssueDetailsDialogState{
    issue: IssueDetails | null;
}

class IssueDetailsDialog extends React.Component<IssueDetailsDialogProps, IssueDetailsDialogState> {

    private columns: IColumn[] = [
        {
            key: "fieldname",
            name: "Field Name",
            fieldName: "fieldname",
            minWidth: 150,
            maxWidth: 200,
            isResizable: true
        },
        {
            key: "currentvalue",
            name: "Current Value",
            fieldName: "currentvalue",
            minWidth: 180,
            isResizable: true
        },
        {
            key: "newvalue",
            name: "New Value",
            fieldName: "newvalue",
            minWidth: 180,
            isResizable: true,
            onRender: (item: IssueFieldChange) => (
                <span className="new-value">
                    {item.newvalue || "-"}
                </span>
            )
        }
    ];;

    constructor(props: IssueDetailsDialogProps){
        super(props);
        this.state = {
            issue : null
        }
    }

    private renderPerson(title: string, person?: { name: string; email?: string; }) {
        return (
            <Stack className="person-container">
                <Label> {title} </Label>
                {person ? (
                    <Persona
                        text={person.name}
                        secondaryText={person.email}
                        size={PersonaSize.size40}
                        showSecondaryText={!!person.email}
                    />
                ) : (<Text className="empty-value"> Not assigned </Text>)}
            </Stack>
        );
    }
    private renderStatus(status_value: number | null, status_label: string) {
        var textcolor = "#107C10";
        var bgcolor = "#0D47A1";
        
        if(status_value == 289940001) { bgcolor = "#E5EFFF"; textcolor= "#0D47A1";}
        if(status_value == 289940000 ) { bgcolor = "#E0F2FE"; textcolor= "#0369A1";}
        if(status_value == 289940003) { bgcolor = "#F0E7FA"; textcolor= "#6B2FA0";}
        if(status_value == 289940002) { bgcolor = "#DFF3E4"; textcolor= "#0E7433";}
        if(status_value == 289940004) { bgcolor = "#EDEDED"; textcolor= "#605E5C"; }
                            
        return <Stack verticalAlign="center" horizontalAlign="start" style={{ height: "100%", paddingLeft: "8px" }}><TooltipHost content={status_label}><Text style={{ color: textcolor, backgroundColor: bgcolor, paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px" }}>{status_label}</Text></TooltipHost></Stack>;
    }
    componentDidMount(): void {
        var obj = this;

        var issuedetails = {
                    issuetitle : "Test",
                    issuedescription: "Test Description",
                    reportedon: new Date().toLocaleDateString(),
                    status_label: "In Progress",
                    status_value: 289940002,
                    fields: [],
                    reportedby: {
                        name: "Test Contact",
                        email: "test@test.com"
                    }
        } as IssueDetails
        this.setState({ issue: issuedetails });
        
        (parent as any).Xrm.WebApi.retrieveRecord("crm2_datadiscrepancy", this.props.issuerecordid, "?$select=createdon,crm2_issuetitle,crm2_issuedescription,crm2_status&$expand=crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy($select=crm2_currentvalue,crm2_fieldname,crm2_newvalue),crm2_AssignedTo($select=cr549_email_address,cr549_name),crm2_DelegateTo($select=cr549_email_address,cr549_name),crm2_ReportedBy($select=cr549_email_address,cr549_name)").then(
            function success(result: any) {

                var issuedetails = {
                    issuetitle : result.crm2_issuetitle,
                    issuedescription: result.crm2_issuedescription,
                    reportedon: result["createdon@OData.Community.Display.V1.FormattedValue"],
                    fields: []
                } as IssueDetails
                if (result.hasOwnProperty("crm2_AssignedTo") && result["crm2_AssignedTo"] !== null) {
                    var assignedto = {
                        name: result["crm2_AssignedTo"]["cr549_name"],
                        email: result["crm2_AssignedTo"]["cr549_email_address"]
                    }
                    issuedetails.assignedto = assignedto;
                }
                if (result.hasOwnProperty("crm2_DelegateTo") && result["crm2_DelegateTo"] !== null) {
                    var delegateto = {
                        name: result["crm2_DelegateTo"]["cr549_name"],
                        email: result["crm2_DelegateTo"]["cr549_email_address"]
                    }
                    issuedetails.delegatedto = delegateto;
                }
                if (result.hasOwnProperty("crm2_ReportedBy") && result["crm2_ReportedBy"] !== null) {
                    var reportedby = {
                        name: result["crm2_ReportedBy"]["cr549_name"],
                        email: result["crm2_ReportedBy"]["cr549_email_address"]
                    }
                    issuedetails.reportedby = reportedby;
                }
                if(result.hasOwnProperty("crm2_status") && result["crm2_status"] !== null){
                    issuedetails.status_value = result["crm2_status"];
                    issuedetails.status_label = result["crm2_status@OData.Community.Display.V1.FormattedValue"]
                }

                for (var j = 0; j < result.crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy.length; j++) {
                    var field = {
                        fieldname: result.crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy[j]["crm2_fieldname"],
                        currentvalue: result.crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy[j]["crm2_currentvalue"],
                        newvalue: result.crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy[j]["crm2_newvalue"]
                    }
                    issuedetails.fields.push(field);
                }
                obj.setState({issue: issuedetails})
            },
            function(error: any) {
                console.log(error.message);
            }
        );
    }

    render() {
        const {isOpen,  onClose, onResolve } = this.props;
        const {issue} = this.state;
        if (!issue) return null;

        return (
            <Dialog
                hidden={!isOpen}
                onDismiss={onClose}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: "Issue Details",
                    styles: {
                        title: {
                            color: "#0D2499"
                        },
                        content: {
                            borderTop: "4px solid #0D2499"
                        },
                    }
                }}
                styles={{
                    main: {
                        borderColor: "#0D2499"
                    }
                }}
                modalProps={{
                    isBlocking: false,
                    className: "issuedetails-dialog"
                }}
                minWidth={800}
                maxWidth={700}
            >
                <div>
                    <Stack horizontal tokens={{ childrenGap: 20 }}>
                        <StackItem grow>
                            <Stack style={{padding: 5}}>
                                <Label style={{padding:0}} className="detail-label"> Issue Title </Label>
                                <Text> {issue.issuetitle} </Text>
                            </Stack>
                            <Stack style={{padding: 5}}>
                                <Label style={{padding:0}} className="detail-label"> Issue Description </Label>
                                <Text className="issue-description"> {issue.issuedescription || "-"} </Text>
                            </Stack>
                        </StackItem>
                        <StackItem align="start">
                            <Stack tokens={{childrenGap: 5}} verticalAlign="start" horizontalAlign="start">
                                <Stack horizontal horizontalAlign="end" verticalAlign="start">
                                    <Text style={{fontSize: 12, fontWeight: 600}}>Status: </Text>
                                    {this.renderStatus(issue.status_value ?? 0,issue.status_label ?? "")}
                                </Stack>
                                <Stack horizontal tokens={{childrenGap: 5}} horizontalAlign="end" verticalAlign="start">
                                    <Text style={{fontSize: 12, fontWeight: 600}}>Reported On: </Text>
                                    <Text> {issue.reportedon || "---"} </Text>
                                </Stack>
                            </Stack>
                            
                        </StackItem>
                    </Stack>
                    <Separator/>
                    <Stack horizontal wrap tokens={{ childrenGap: 30  }}  className="people-section" >
                        <Stack className="person-column">
                            {this.renderPerson("Reported By", issue.reportedby)}
                        </Stack>
                        <Stack className="person-column">
                            {this.renderPerson("Assigned To", issue.assignedto )}
                        </Stack>
                        <Stack className="person-column">
                            {this.renderPerson("Delegated To", issue.delegatedto )}
                        </Stack>
                    </Stack>
                    <Separator style={{paddingBottom: 0, marginBottom: 0}}/>
                    <Stack className="section">
                        <Label className="detail-label"> Field Changes </Label>
                        <div className="field-changes-table">
                            <DetailsList
                                items={issue.fields}
                                columns={this.columns}
                                selectionMode={0}
                                compact
                                isHeaderVisible={true}
                                styles={{
                                    headerWrapper: {
                                        paddingTop: 0
                                    }
                                }}
                            />
                        </div>
                    </Stack>
                    
                    {this.state.issue?.status_value == 289940002 &&
                    <Stack style={{backgroundColor: "#DFF3E4", marginTop: 10, border: "1px solid", borderRadius: 6, borderColor: "#107C10"}}>
                        <Stack verticalAlign="center" horizontalAlign="start" horizontal style={{marginTop: 6, marginLeft: 6}}>
                            <span style={{ width: "12px", height: "12px", border: "1px solid #107C10", borderRadius: "50%", display: "inline-flex", alignItems: "center",justifyContent: "center", color: "#107C10", backgroundColor: "#E8F5E8",  padding: 2 }}>
                                <Icon  iconName="checkMark" styles={{ root: { color: "#107C10" }}} style={{ color: "#107C10" }} />
                            </span>
                            <Text style={{ color: "#107C10", paddingLeft: "8px", paddingRight: "8px", fontSize: 14, fontWeight: 600 }}>Resolution Information</Text>
                        </Stack>
                        <Stack horizontal wrap tokens={{ childrenGap: 30  }}  className="people-section" style={{paddingLeft: 30}}>
                            <Stack className="person-column">
                                {this.renderPerson("Resolved By", issue.reportedby)}
                            </Stack>
                            <Stack className="person-column">
                                <Stack className="person-container">
                                    <Label> {"Resolved On"} </Label>
                                    <Stack horizontal tokens={{childrenGap: 10}}><Icon iconName="calendar" style={{paddingTop: 3}}></Icon><Text className="empty-value"> {issue.reportedon} </Text></Stack>
                                </Stack>
                            </Stack>
                            <Stack className="person-column">
                                <Stack className="person-container">
                                    <Label> {"Resolution Notes"} </Label>
                                    <Text className="empty-value"> {"Resoluction Notes"} </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>}
                    {this.state.issue?.status_value == 289940001 &&
                    <Stack style={{backgroundColor: "#F1E4F7", marginTop: 10, border: "1px solid", borderRadius: 6, borderColor: "#7F2A9E"}}>
                        <Stack verticalAlign="center" horizontalAlign="start" horizontal style={{marginTop: 6, marginLeft: 6}}>
                            <span style={{ width: "12px", height: "12px", border: "1px solid #7F2A9E", borderRadius: "50%", display: "inline-flex", alignItems: "center",justifyContent: "center", color: "#7F2A9E", backgroundColor: "#F1E4F7",  padding: 2 }}>
                                <Icon  iconName="checkMark" styles={{ root: { color: "#7F2A9E" }}} style={{ color: "#7F2A9E" }} />
                            </span>
                            <Text style={{ color: "#7F2A9E", paddingLeft: "8px", paddingRight: "8px", fontSize: 14, fontWeight: 600 }}>Unable to Resolve Information</Text>
                        </Stack>
                        <Stack horizontal wrap tokens={{ childrenGap: 30  }}  className="people-section" style={{paddingLeft: 30}}>
                            <Stack className="person-column">
                                {this.renderPerson("Updated By", issue.reportedby)}
                            </Stack>
                            <Stack className="person-column">
                                <Stack className="person-container">
                                    <Label> {"Updated On"} </Label>
                                    <Stack horizontal tokens={{childrenGap: 10}}><Icon iconName="calendar" style={{paddingTop: 3}}></Icon><Text className="empty-value"> {issue.reportedon} </Text></Stack>
                                </Stack>
                            </Stack>
                            <Stack className="person-column">
                                <Stack className="person-container">
                                    <Label> {"Reason"} </Label>
                                    <Text className="empty-value"> {"Resoluction Notes"} </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>}
                </div>
                <DialogFooter>
                    <DefaultButton
                        text="Close"
                        onClick={onClose}
                        styles={{
                            root: {
                                borderRadius: 6,
                                minWidth: 100
                            }
                        }}
                    />
                </DialogFooter>
            </Dialog>
        );
    }
}

export default IssueDetailsDialog;