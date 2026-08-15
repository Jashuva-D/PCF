import * as React from "react";
import { Dialog, DialogType, DialogFooter, DefaultButton, PrimaryButton, Stack, Text, DetailsList, IColumn, Persona, PersonaSize, Separator, Label } from "@fluentui/react";

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
                <Label className="detail-label"> {title} </Label>
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
    componentDidMount(): void {
        var obj = this;
        (parent as any).Xrm.WebApi.retrieveRecord("crm2_datadiscrepancy", this.props.issuerecordid, "?$select=createdon,crm2_issuetitle,crm2_issuedescription,crm2_status&$expand=crm2_datadiscrepancyfield_DataDiscrepancy_crm2_datadiscrepancy($select=crm2_currentvalue,crm2_fieldname,crm2_newvalue),crm2_AssignedTo($select=cr549_email_address,cr549_name),crm2_DelegateTo($select=cr549_email_address,cr549_name),crm2_ReportedBy($select=cr549_email_address,cr549_name)").then(
            function success(result: any) {

                var issuedetails = {
                    issuetitle : result.crm2_issuetitle,
                    issuedescription: result.crm2_issuedescription,
                    reportedon: result.createdon,
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
                    <Stack style={{padding: 5}}>
                        <Label style={{padding:0}} className="detail-label"> Issue Title </Label>
                        <Text> {issue.issuetitle} </Text>
                    </Stack>
                    <Stack style={{padding: 5}}>
                        <Label style={{padding:0}} className="detail-label"> Issue Description </Label>
                        <Text className="issue-description"> {issue.issuedescription || "-"} </Text>
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