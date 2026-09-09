import * as React from "react";
import { Dialog, DialogType, DialogFooter, DefaultButton, Icon, Stack, Text, DetailsList, IColumn, Persona, PersonaSize, Separator, Label, StackItem, TooltipHost, IconButton } from "@fluentui/react";
import CMSDialog from "./CMSDialog";

export interface IssueFieldChange {
    fieldname: string;
    currentvalue: string;
    newvalue: string;
    status_value: number | null | undefined;
    status_label: string | null | undefined;
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
    cmsdialog: boolean;
    dialogTitle?: string;
    dialogSubtext?: string;
    dialogConfirmButtonLabel?: string;
    dialogCancelButtonLabel?: string;
    confirmButtonColor?: string;
    dialogSubTextElement?: React.ReactElement;
    dialogtakenotes?: boolean,
    dialognoteslabel?: string,
    dialogcolors?: {
        legend: string,
        background: string
    }
    dialogConfirmCallback?: (notes: string) => void;
    dialogCancelCallback?: () => void;
    dialogDismissCallback?: () => void;
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
        },
        {
            key: "status",
            name: "Status",
            fieldName: "status",
            minWidth: 80,
            onRender: (item: any) => {
                var textcolor = "#107C10";
                var bgcolor = "#0D47A1";

                if (item["status_value"] == 289940001) { bgcolor = "#E5EFFF"; textcolor = "#0D47A1"; }
                if (item["status_value"] == 289940000) { bgcolor = "#E0F2FE"; textcolor = "#0369A1"; }
                if (item["status_value"] == 289940003) { bgcolor = "#F0E7FA"; textcolor = "#6B2FA0"; }
                if (item["status_value"] == 289940002) { bgcolor = "#DFF3E4"; textcolor = "#0E7433"; }
                //if(item["status_value"] == 289940003) { bgcolor = "#F1E4F7"; textcolor= "#7F2A9E";}
                //if(item["status"] == "Unable to Resolve") { bgcolor = "#FDE7E5"; textcolor= "#C42B1C";}
                if (item["status_value"] == 289940004) { bgcolor = "#EDEDED"; textcolor = "#605E5C"; }

                return <Stack verticalAlign="center" horizontalAlign="start" style={{ height: "100%" }}><TooltipHost content={item["status"]}><Text style={{ color: textcolor, backgroundColor: bgcolor, paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px" }}>{item["status_label"]}</Text></TooltipHost></Stack>;
            }
        },
        {
            key: "actions",
            name: "Action",
            minWidth: 50,
            isResizable: true,
            onRender: (item: any) => {
                var validstatusforaction = true;
                if (item["status_value"] == 289940002 || item["status_value"] == 289940004) validstatusforaction = false;
                var buttons = [
                    {
                        key: "bcinprogress",
                        text: "In Progress",
                        iconProps: { iconName: "sync" },
                        onRenderIcon: () => (
                            <span
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    border: "1px solid #7F2A9E",
                                    borderRadius: "50%",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#7F2A9E",
                                    backgroundColor: "#F1E4F7",
                                    padding: 2
                                }}
                            >
                                <Icon
                                    iconName="sync"
                                    styles={{
                                        root: {
                                            color: "#7F2A9E"
                                        }
                                    }}
                                    style={{ color: "#7F2A9E" }}
                                />
                            </span>
                        ),
                        onClick: this.onInProgressClick.bind(this, item)
                    },
                    {
                        key: "resolve",
                        text: "Resolve",
                        iconProps: { iconName: "checkMark" },
                        onRenderIcon: () => (
                            <span
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    border: "1px solid #107C10",
                                    borderRadius: "50%",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#107C10",
                                    backgroundColor: "#E8F5E8",
                                    padding: 2
                                }}
                            >
                                <Icon
                                    iconName="checkMark"
                                    styles={{
                                        root: {
                                            color: "#107C10"
                                        }
                                    }}
                                    style={{ color: "#107C10" }}
                                />
                            </span>
                        ),
                        onClick: this.onResolvedClick.bind(this, item)
                    },
                    {
                        key: "delegate",
                        text: "Transfer to BaseCamp Support",
                        iconProps: {
                            iconName: "people",
                        },
                        onRenderIcon: () => (
                            <span
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    border: "1px solid #0D2499",
                                    borderRadius: "50%",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#0D2499",
                                    backgroundColor: "#E8ECFF",
                                    padding: 2
                                }}
                            >
                                <Icon
                                    iconName="people"
                                    styles={{
                                        root: {
                                            color: "#0D2499"
                                        }
                                    }}
                                    style={{ color: "#0D2499" }}
                                />
                            </span>
                        ),
                        onClick: this.onDelegateClick.bind(this, item)
                    },
                    {
                        key: "cancel",
                        text: "Cancel",
                        iconProps: { iconName: "cancel" },
                        onRenderIcon: () => (
                            <span
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    border: "1px solid #D13438",
                                    borderRadius: "50%",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#D13438",
                                    backgroundColor: "#FDE8E9",
                                    padding: 2
                                }}
                            >
                                <Icon
                                    iconName="cancel"
                                    styles={{
                                        root: {
                                            color: "#D13438"
                                        }
                                    }}
                                    style={{ color: "#D13438" }}
                                />
                            </span>
                        ),
                        onClick: this.onCacelClick.bind(this, item),
                    }
                ] as any
                return <IconButton
                        disabled={!validstatusforaction}
                        title="Actions"
                        ariaLabel="Actions"
                        styles={{
                            root: {
                                width: 32,
                                height: 20,
                                backgroundColor: "transparent"
                            },
                            rootHovered: {
                                backgroundColor: "#F3F3F3"
                            },
                            icon: {
                                fontSize: 24
                            },
                            menuIcon: {
                                fontSize: 16,
                                text: "Select",
                                color: "#0D2499",
                                fontWeight: 600
                            },
                        }}
                        menuProps={{ items: buttons }}
                    />
            }
        }
    ];;

    constructor(props: IssueDetailsDialogProps){
        super(props);
        this.state = {
            issue : null,
            cmsdialog: false
        }
    }
    
    onInProgressClick(item: any) {
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm BaseCamp - In Progress",
            dialogSubtext: "Are you sure you want to change the status to BaseCamp-In Progress. \n Once confirmed, the status will be changed to BaseCamp-In Progress",
            dialogtakenotes: true,
            dialognoteslabel: "In Progress Notes",
            dialogcolors: {
                legend: "#7C3AED",
                background: "#F3E8FF"
            },
            dialogConfirmButtonLabel: "Confirm",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogConfirmCallback: () => {
                (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["datadiscrepancyfieldid"],{ crm2_status: 289940001 }).then(function(resp: any){
                    obj.componentDidMount.bind(obj)();
                    obj.setState({cmsdialog: false});
                    
                },function(err: any){
                    alert("error occured"+err?.message)
                })
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    onResolvedClick(item: any){
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Resolve",
            dialogSubtext: "Are you sure you want to mark this discrepancy as resolved? \n Once confirmed, the status will be updated to Resolved by BaseCamp",
            dialogtakenotes: true,
            dialognoteslabel: "Resolution Notes",
            dialogConfirmButtonLabel: "Resolve",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogcolors: {
                legend: "#107C10",
                background: "#ECFDF5"
            },
            dialogConfirmCallback: (notes: string) => {
                (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["datadiscrepancyfieldid"],{ crm2_status: 289940002 }).then(function(resp: any){
                    obj.componentDidMount.bind(obj)();
                    obj.setState({cmsdialog: false})
                },function(err: any){
                    alert("error occured"+err?.message)
                })
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    onDelegateClick(item: any){
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Transfer to BaseCamp",
            dialogSubtext: "Are you sure you want to transfer this to BaseCamp team? \n Once confirmed, the BaseCamp team will be notified to review and resolve the issue",
            dialogtakenotes: true,
            dialognoteslabel: "Transfer Notes",
            dialogConfirmButtonLabel: "Transfer",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogcolors: {
                legend: "#2563EB",
                background: "#EFF6FF"
            },
            dialogConfirmCallback: (notes: string) => {
                (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["datadiscrepancyfieldid"],{ crm2_status: 289940003 }).then(function(resp: any){
                    obj.componentDidMount.bind(obj)();
                    obj.setState({cmsdialog: false})
                },function(err: any){
                    alert("error occured"+err?.message)
                })
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    onCacelClick(item: any){
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Cancellation",
            dialogSubtext: "Are you sure you want to cancel this discrepancy? \n Once confirmed, the status will be updated to Cancelled",
            //dialogSubTextElement: <Text>Are you sure you want to cancel this discrepancy? <br></br> Once confirmed, the status will be updated to <Text style={{color: "#D13438", fontWeight: 600}}>Cancelled</Text></Text>,
            dialogtakenotes: true,
            dialognoteslabel: "Cancellation Notes",
            dialogConfirmButtonLabel: "Cancel Discrepancy",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#D13438",
            dialogcolors: {
                legend: "#DC2626",
                background: "#FEF2F2"
            },
            dialogConfirmCallback: (notes: string) => {
               (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["datadiscrepancyfieldid"],{ crm2_status: 289940004 }).then(function(resp: any){
                    obj.componentDidMount.bind(obj)();
                    obj.setState({cmsdialog: false})
                },function(err: any){
                    alert("error occured"+err?.message)
                })
            },
            dialogCancelCallback: () => {
                
            }
        })
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
                    fields: [{
                        fieldname: "Application Short Name",
                        currentvalue: "Current Value",
                        newvalue: "New Value",
                        status_value: 289940002,
                        status_label: "Resolved"
                    }],
                    reportedby: {
                        name: "Test Contact",
                        email: "test@test.com"
                    }
        } as IssueDetails
        this.setState({ issue: issuedetails });
        
        (parent as any).Xrm.WebApi.retrieveRecord("crm2_datadiscrepancy", this.props.issuerecordid, "?$select=createdon,crm2_issuetitle,crm2_issuedescription,crm2_status&$expand=crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy($select=crm2_datadiscrepancyfieldid,crm2_currentvalue,crm2_fieldname,crm2_newvalue,crm2_status),crm2_AssignedTo($select=cr549_email_address,cr549_name),crm2_DelegateTo($select=cr549_email_address,cr549_name),crm2_ReportedBy($select=cr549_email_address,cr549_name)").then(
            function success(result: any) {

                var issuedetails = {
                    issuetitle : result.crm2_issuetitle,
                    issuedescription: result.crm2_issuedescription,
                    reportedon: result["createdon@OData.Community.Display.V1.FormattedValue"],
                    status_label: result["crm2_status@OData.Community.Display.V1.FormattedValue"],
                    status_value: result.crm2_status,
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
                        newvalue: result.crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy[j]["crm2_newvalue"],
                        status_label: result.crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy[j]["crm2_status@OData.Community.Display.V1.FormattedValue"],
                        status_value: result.crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy[j]["crm2_status"],
                        datadiscrepancyfieldid: result.crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy[j]["crm2_datadiscrepancyfieldid"]
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
                <CMSDialog
                    isOpen={this.state.cmsdialog!}
                    title={this.state.dialogTitle}
                    subText={this.state.dialogSubtext}
                    confirmButtonText={this.state.dialogConfirmButtonLabel}
                    cancelButtonText={this.state.dialogCancelButtonLabel}
                    confirmbuttoncolor={this.state.confirmButtonColor ?? ""}
                    subTextElement={null}
                    takenotes={this.state.dialogtakenotes}
                    noteslabel={this.state.dialognoteslabel}
                    colors={this.state.dialogcolors}
                    onDismiss={() => {
                        this.setState({ cmsdialog: false });
                    }}
                    onConfirm={(notes: string) => {
                        //this.setState({ cmsdialog: false });
                        this.state.dialogConfirmCallback && this.state.dialogConfirmCallback(notes);
                    }}
                    onCancel={() => {
                        this.setState({ cmsdialog: false });
                    }}
                />
            </Dialog>
        );
    }
}

export default IssueDetailsDialog;