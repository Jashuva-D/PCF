import * as React from "react";
import { Dialog, DialogType, DialogFooter, DefaultButton, Icon, Stack, Text, DetailsList, IColumn, Persona, PersonaSize, Separator, Label, StackItem, TooltipHost, IconButton } from "@fluentui/react";
import CMSDialog from "./CMSDialog";
import ActionDialog, { IssueActionKey } from "./SendForReviewPopup";
import StatusHistoryPanel, { StatusHistoryItem } from "./StatusHistoryPanel";
import { SendForReviewICon } from "./icons";

export interface IssueFieldChange {
    recordid: string;
    name: string;
    fieldname: string;
    currentvalue: string;
    newvalue: string;
    status_value: number | null | undefined;
    status_label: string | null | undefined;
    reviewwith: string | null,
    reviewwith_value: number | null
    reviewer: {
        name: string,
        email: string | null
    } | null
    modifiedby: {
        name: string,
        email: string | null
    } | null
    modifiedon: string,
    resolutionnotes: string,
    statushistory?: StatusHistoryItem[]
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
    actiondialog: boolean;
    actionitem: IssueFieldChange | null;
    sendforreviewdialog: boolean,
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
    sendForReviewCallback?: (reviewwith: number, reviewer: any, notes: string) => void;
    showFieldStatusTile: boolean,
    selectedrecordid: string | null,
    showStatusHistory: boolean,
}

class IssueDetailsDialog extends React.Component<IssueDetailsDialogProps, IssueDetailsDialogState> {

    private columns: IColumn[] = [
        {
            key: "name",
            name: "Issue ID",
            fieldName: "name",
            minWidth: 90,
            isResizable: true,
            onRender: (item: IssueFieldChange) => (
                <a
                    href="#"
                    style={{
                        color: "#0D2499",
                        fontWeight: 600,
                        textDecoration: "none"
                    }}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.setState({
                            selectedrecordid: item.recordid,
                            showFieldStatusTile: true,
                            showStatusHistory: false
                        });
                    }}
                >
                    {item.name || "-"}
                </a>
            )
        },
        {
            key: "fieldname",
            name: "Field Name",
            fieldName: "fieldname",
            minWidth: 120,
            isResizable: true
        },
        {
            key: "currentvalue",
            name: "Current Value",
            fieldName: "currentvalue",
            minWidth: 120,
            isResizable: true
        },
        {
            key: "newvalue",
            name: "New Value",
            fieldName: "newvalue",
            minWidth: 120,
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
                if (item["status_value"] == 289940005) { bgcolor = "#FEF9C3"; textcolor = "#B45309"; }
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
                        key: "sendforreview",
                        text: "Send for Review",
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
                        onClick: this.onSendForReviewClick.bind(this, item)
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
                void buttons;
                return <IconButton
                        disabled={!validstatusforaction}
                        title="Actions"
                        ariaLabel="Actions"
                        iconProps={{ iconName: "More" }}
                        onClick={() => {
                            this.setState({ actiondialog: true, actionitem: item });
                        }}
                        styles={{
                            root: {
                                width: 32,
                                height: 28,
                                backgroundColor: "transparent"
                            },
                            rootHovered: {
                                backgroundColor: "#F3F3F3"
                            },
                            icon: {
                                fontSize: 20,
                                color: "#0D2499",
                                fontWeight: 600
                            },
                        }}
                    />
            }
        }
    ];;

    constructor(props: IssueDetailsDialogProps){
        super(props);
        this.state = {
            issue : null,
            actiondialog: false,
            actionitem: null,
            cmsdialog: false,
            sendforreviewdialog: false,
            showFieldStatusTile: false,
            selectedrecordid: null,
            showStatusHistory: false,
        }
    }

    private onActionConfirm(
        action: IssueActionKey,
        notes: string,
        reviewwith?: number,
        reviewer?: any
    ) {
        const item = this.state.actionitem;
        if (!item) return;

        const statusByAction: Record<IssueActionKey, number> = {
            inprogress: 289940001,
            resolve: 289940002,
            sendforreview: 289940003,
            transfer: 289940003,
            cancel: 289940004,
            unabletoresolve: 289940005
        };

        const data: any = {
            crm2_status: statusByAction[action],
            crm2_resolutionnotes: notes
        };

        if (action === "sendforreview") {
            data.crm2_reviewwith = reviewwith;
            data["crm2_Reviewer@odata.bind"] = `/cr549_persons(${reviewer.id})`;
        }

        if (action === "transfer") {
            data.crm2_reviewwith = 289940003;
        }

        (parent as any).Xrm.WebApi.updateRecord(
            "crm2_datadiscrepancyfield",
            item.recordid,
            data
        ).then(
            () => {
                this.setState({ actiondialog: false, actionitem: null });
                this.componentDidMount();
            },
            (err: any) => {
                alert("Error occurred: " + (err?.message || err));
            }
        );
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
            dialogConfirmCallback: (notes: string) => {
                (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["datadiscrepancyfieldid"],{ crm2_status: 289940001, crm2_resolutionnotes: notes }).then(function(resp: any){
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
                (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["datadiscrepancyfieldid"],{ crm2_status: 289940002, crm2_resolutionnotes: notes }).then(function(resp: any){
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
    onSendForReviewClick(item: any){
        var obj = this;
        this.setState({
            sendforreviewdialog: true,
            dialogTitle: "Confirm Send for Review",
            dialogSubtext: "Are you sure you want to transfer this to BaseCamp team? \n Once confirmed, the BaseCamp team will be notified to review and resolve the issue",
            dialogtakenotes: true,
            dialognoteslabel: "Reason / Comments",
            dialogConfirmButtonLabel: "Send",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogcolors: {
                legend: "#2563EB",
                background: "#EFF6FF"
            },
            sendForReviewCallback: (reviewwith: number, reviewer: any, notes: string) => {
                (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["datadiscrepancyfieldid"],{ crm2_status: 289940003, crm2_reviewwith: reviewwith, "crm2_Reviewer@odata.bind": `/cr549_persons(${reviewer.id})`, crm2_resolutionnotes: notes }).then(function(resp: any){
                    obj.componentDidMount.bind(obj)();
                    obj.setState({sendforreviewdialog: false})
                },function(err: any){
                    alert("error occured" + err?.message)
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
                (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["datadiscrepancyfieldid"],{ crm2_status: 289940003, crm2_reviewwith: 289940003, crm2_resolutionnotes: notes }).then(function(resp: any){
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
               (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["datadiscrepancyfieldid"],{ crm2_status: 289940004, crm2_resolutionnotes: notes }).then(function(resp: any){
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

    private renderPerson(title: string, person?: { name: string; email?: string; bgcolor?:string }) {
        return (
            <Stack className="person-container">
                <Label> {title} </Label>
                {person ? (
                    <Persona
                        text={person.name}
                        secondaryText={person.email}
                        size={PersonaSize.size40}
                        showSecondaryText={!!person.email}
                        styles={{
                            root: {
                                selectors: {
                                    '.ms-Persona-initials': {
                                        backgroundColor: person.bgcolor ?? undefined,
                                        color: "#FFFFFF"
                                    }
                                }
                            }
                        }}
                    />
                ) : (<Text className="empty-value"> Not assigned </Text>)}
            </Stack>
        );
    }
    private renderStatus(status_value: number | null, status_label: string) {
        var textcolor = "#107C10";
        var bgcolor = "#0D47A1";
        
        if(status_value == 289940000 ) { bgcolor = "#E0F2FE"; textcolor= "#0369A1";}//New
        if(status_value == 289940001) { bgcolor = "#E5EFFF"; textcolor= "#0D47A1";} //In Progress
        if(status_value == 289940002) { bgcolor = "#F0E7FA"; textcolor= "#6B2FA0";}//Review
        if(status_value == 289940006) { bgcolor = "#DFF3E4"; textcolor= "#0E7433";} //Closed (parent status)
        
                            
        return <Stack verticalAlign="center" horizontalAlign="start" style={{ height: "100%", paddingLeft: "8px" }}><TooltipHost content={status_label}><Text style={{ color: textcolor, backgroundColor: bgcolor, paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px" }}>{status_label}</Text></TooltipHost></Stack>;
    }
    private renderStatusTile(title: string, persontitle: string, person: { name: string | null; email?: string | null;} | null, datetitle: string, date: string | null, notestitle: string, notes: string, iconname: string, colors: { background: string, legend: string}){
        const selectedField = this.state.issue?.fields.find(
            field => field.recordid === this.state.selectedrecordid
        );
        const historyCount = selectedField?.statushistory?.length ?? 0;

        return <Stack style={{ backgroundColor: colors.background, marginTop: 10, border: "1px solid", borderRadius: 6, borderColor: colors.legend }}>
            <Stack verticalAlign="center" horizontalAlign="space-between" horizontal style={{ marginTop: 6, marginLeft: 6, marginRight: 6 }}>
                <Stack horizontal verticalAlign="center">
                    <span style={{ width: "12px", height: "12px", border: `1px solid ${colors.legend}`, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", color: colors.legend, backgroundColor: colors.background, padding: 2 }}>
                        {iconname != "sendforreview" && <Icon iconName={iconname} styles={{ root: { color: colors.legend } }} style={{ color: colors.legend }} />}
                        {iconname == "sendforreview" && <SendForReviewICon size={28} color="#7028E8" />}
                    </span>
                    <Text style={{ color: colors.legend, paddingLeft: "8px", paddingRight: "8px", fontSize: 14, fontWeight: 600 }}>{title}</Text>
                </Stack>
                <TooltipHost content={`View status history (${historyCount})`}>
                    <IconButton
                        iconProps={{ iconName: "History" }}
                        ariaLabel={`View ${historyCount} status history records`}
                        onClick={() => this.setState({ showStatusHistory: true })}
                        styles={{
                            root: {
                                width: 26,
                                height: 26,
                                color: colors.legend,
                                backgroundColor: "#FFFFFF",
                                border: `1px solid ${colors.legend}`,
                                borderRadius: 4
                            },
                            rootHovered: {
                                color: colors.legend,
                                backgroundColor: colors.background
                            },
                            icon: {
                                fontSize: 14
                            }
                        }}
                    />
                </TooltipHost>
            </Stack>
            <Stack horizontal wrap tokens={{ childrenGap: 30 }} className="people-section" style={{ paddingLeft: 30 }}>
                <Stack className="person-column">
                    {this.renderPerson(persontitle,{name : person?.name ?? "", email: person?.email ?? "", bgcolor: colors.legend})}
                </Stack>
                <Stack className="person-column">
                    <Stack className="person-container">
                        <Label> {datetitle} </Label>
                        <Stack horizontal tokens={{ childrenGap: 10 }}><Icon iconName="calendar" style={{ paddingTop: 3, color:colors.legend }} styles={{root: { color: colors.legend}}}></Icon><Text className="empty-value"> {date} </Text></Stack>
                    </Stack>
                </Stack>
                <Stack className="person-column">
                    <Stack className="person-container">
                        <Label> {notestitle} </Label>
                        <Text className="empty-value"> {notes} </Text>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>;
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
                        name: "DDF100",
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
        
        (parent as any).Xrm.WebApi.retrieveRecord("crm2_datadiscrepancy", this.props.issuerecordid, "?$select=createdon,crm2_issuetitle,crm2_issuedescription,crm2_status&$expand=crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy($select=crm2_datadiscrepancyfieldid,crm2_currentvalue,crm2_fieldname,crm2_newvalue,crm2_status,crm2_reviewwith,_crm2_reviewer_value,modifiedon),crm2_AssignedTo($select=cr549_email_address,cr549_name),crm2_DelegateTo($select=cr549_email_address,cr549_name),crm2_ReportedBy($select=cr549_email_address,cr549_name)").then(
            function success(result: any) {
                //console.log(JSON.stringify(result));
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

                

                (parent as any).Xrm.WebApi.retrieveMultipleRecords("crm2_datadiscrepancyfield",`?$select=crm2_datadiscrepancyfieldid,crm2_name,crm2_currentvalue,crm2_fieldname,crm2_newvalue,crm2_status,crm2_reviewwith,_crm2_reviewer_value,modifiedon,crm2_resolutionnotes&$expand=crm2_Reviewer($select=cr549_email_address,cr549_name),modifiedby($select=fullname,internalemailaddress),crm2_datadiscrepancystatuschangelog_DataDiscrepancyField_crm2_datadiscrepancyfield($select=crm2_comment,createdon,crm2_status,_crm2_updatedby_value)&$filter=_crm2_datadiscrepancy_value eq ${obj.props.issuerecordid}`).then(function(resp: any){
                    var fields = [] as IssueFieldChange[];
                    for (var j = 0; j < resp.entities.length; j++) {
                        const statusHistoryRecords = resp.entities[j]["crm2_datadiscrepancystatuschangelog_DataDiscrepancyField_crm2_datadiscrepancyfield"] ?? [];
                        const statusHistory = [...statusHistoryRecords]
                            .sort((left: any, right: any) =>
                                new Date(right["createdon"] ?? 0).getTime() - new Date(left["createdon"] ?? 0).getTime()
                            )
                            .map((history: any, index: number): StatusHistoryItem => ({
                                id: `${resp.entities[j]["crm2_datadiscrepancyfieldid"]}-${history["createdon"] ?? index}`,
                                statusValue: history["crm2_status"],
                                statusLabel: history["crm2_status@OData.Community.Display.V1.FormattedValue"] ?? "Status Updated",
                                updatedBy: {
                                    name: history["_crm2_updatedby_value@OData.Community.Display.V1.FormattedValue"] ?? "System"
                                },
                                updatedOn: history["createdon@OData.Community.Display.V1.FormattedValue"] ?? history["createdon"] ?? "---",
                                comments: history["crm2_comment"] ?? ""
                            }));

                        var field = {
                            recordid: resp.entities[j]["crm2_datadiscrepancyfieldid"],
                            name: resp.entities[j]["crm2_name"] ?? "",
                            fieldname: resp.entities[j]["crm2_fieldname"],
                            currentvalue: resp.entities[j]["crm2_currentvalue"],
                            newvalue: resp.entities[j]["crm2_newvalue"],
                            status_label: resp.entities[j]["crm2_status@OData.Community.Display.V1.FormattedValue"] ?? "",
                            status_value: resp.entities[j]["crm2_status"],
                            datadiscrepancyfieldid: resp.entities[j]["crm2_datadiscrepancyfieldid"],
                            reviewwith: resp.entities[j]["crm2_reviewwith@OData.Community.Display.V1.FormattedValue"] ?? "",
                            reviewwith_value: resp.entities[j]["crm2_reviewwith"],
                            modifiedon: resp.entities[j]["modifiedon@OData.Community.Display.V1.FormattedValue"],
                            modifiedby: { name: resp.entities[j]["modifiedby"]["fullname"], email: resp.entities[j]["modifiedby"]["internalemailaddress"] ?? "" },
                            reviewer: resp.entities[j]["crm2_Reviewer"] == null ? null : { name: resp.entities[j]["crm2_Reviewer"]["cr549_name"] ?? "", email: resp.entities[j]["crm2_Reviewer"]["cr549_email_address"] ?? ""},
                            resolutionnotes: resp.entities[j]["crm2_resolutionnotes"] ?? "",
                            statushistory: statusHistory
                        }
                        fields.push(field);
                    }
                    issuedetails.fields = fields;
                    console.log(JSON.stringify(issuedetails));
                    obj.setState({ issue: issuedetails});
                },function(err: any) {
                    
                });
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
                        borderColor: "#0D2499",
                        position: "relative",
                        overflow: "hidden"
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
                    
                    {   this.state.showFieldStatusTile && 
                        this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0]["status_value"] == 289940001 &&  
                        this.renderStatusTile("In Progress Information","In Progress By",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedby,"In Progress On",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedon, "In Progress Notes", this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].resolutionnotes,"Clock", { background: "#E0F2FE", legend: "#0369A1"})
                    }
                    {   this.state.showFieldStatusTile && 
                        this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0]["status_value"] == 289940002 &&  
                        this.renderStatusTile("Resolution Information","Resolved By",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedby,"Resolved On",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedon, "Resolution Notes", this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].resolutionnotes,"CheckMark",{ background: "#E8F5E8", legend: "#107C10"})
                    }
                    {   this.state.showFieldStatusTile && 
                        this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0]["status_value"] == 289940003 &&
                        this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0]["reviewwith_value"] != 289940003 &&
                        this.renderStatusTile("Sent for Review Information","Sent for Review To",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].reviewer,"Sent for Review On",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedon, "Review Notes", this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].resolutionnotes,"sendforreview", { background: "#FAF5FF", legend: "#9333EA"})
                    }
                    {   this.state.showFieldStatusTile && 
                        this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0]["status_value"] == 289940003 &&
                        this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0]["reviewwith_value"] == 289940003 &&
                        this.renderStatusTile("Transferred to BaseCamp Support Information","Transferred By",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedby,"Transferred On",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedon, "BaseCamp Support Issue ID", this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].resolutionnotes,"people", { background: "#F5F3FF", legend: "#7C3AED"})
                    }
                    {   this.state.showFieldStatusTile && 
                        this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0]["status_value"] == 289940004 &&  
                        this.renderStatusTile("Cancellation Information","Cancelled By",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedby,"Cancelled On",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedon, "Cancellation Notes", this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].resolutionnotes,"Cancel", { background: "#FDE7E5", legend: "#D13438"})
                    }
                    {   this.state.showFieldStatusTile && 
                        this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0]["status_value"] == 289940005 &&  
                        this.renderStatusTile("Unable to Resolve Information","Marked By",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedby,"Marked On",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].modifiedon, "Reason / Notes",this.state.issue?.fields.filter(x => x.recordid == this.state.selectedrecordid)[0].resolutionnotes,"Warning", { background: "#FEF9C3", legend: "#B45309"})
                    }
                    

                    {/* {this.state.issue?.status_value == 289940002 &&
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
                    </Stack>} */}
                    {/* {this.state.issue?.status_value == 289940001 &&
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
                    </Stack>} */}
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
                <ActionDialog
                    isOpen={this.state.actiondialog}
                    issueName={this.state.actionitem?.name || ""}
                    onDismiss={() => {
                        this.setState({ actiondialog: false, actionitem: null });
                    }}
                    onConfirm={(action, notes, reviewwith, reviewer) => {
                        this.onActionConfirm(action, notes, reviewwith, reviewer);
                    }}
                />
                <StatusHistoryPanel
                    isOpen={this.state.showStatusHistory}
                    issueName={this.state.issue?.fields.find(
                        field => field.recordid === this.state.selectedrecordid
                    )?.name || ""}
                    items={this.state.issue?.fields.find(
                        field => field.recordid === this.state.selectedrecordid
                    )?.statushistory || []}
                    onDismiss={() => this.setState({ showStatusHistory: false })}
                />
            </Dialog>
        );
    }
}

export default IssueDetailsDialog;
