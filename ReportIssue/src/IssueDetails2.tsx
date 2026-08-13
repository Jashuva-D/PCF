import * as React from "react";
import { Dialog, DialogType, DialogFooter, DefaultButton, PrimaryButton, Stack, Text, DetailsList, IColumn, Persona, PersonaSize, Separator, Label, Icon, IconButton } from "@fluentui/react";

export interface IssueFieldChange {
    fieldname: string;
    currentvalue: string;
    newvalue: string;
}

export interface IssueDetails2 {
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

interface IssueDetailsDialogProps2 {
    isOpen: boolean;
    issue?: IssueDetails2 | null;
    onClose: () => void;
    onResolve?: (issue: IssueDetails2) => void;
}
interface IssueDetailsDialogState2 {
    cmsdialog: boolean,
    dialogTitle?: string;
    dialogSubtext?: string;
    dialogConfirmButtonLabel?: string;
    dialogCancelButtonLabel?: string;
    confirmButtonColor?: string;
    dialogSubTextElement?: React.ReactElement;
    dialogConfirmCallback?: () => void;
    dialogCancelCallback?: () => void;
    dialogDismissCallback?: () => void;
}

export default class IssueDetailsDialog2 extends React.Component<IssueDetailsDialogProps2> {

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
            key: "actions",
            name: "Actions",
            minWidth: 60,
            onRender: (item: any) => {
                var validstatusforaction = true;
                if (item["status"] == "Resolved" || item["status"] == "Cancelled" || item["status"] == "Transferred to BaseCamp") validstatusforaction = false;
                var buttons = [
                    {
                        key: "hcinprogress",
                        text: "HC - In Progress",
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
                        onClick: this.onHCInprogressClick.bind(this, item)
                    },
                    {
                        key: "bcinprogress",
                        text: "BaseCamp - In Progress",
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
                        onClick: this.onBaseCampInprogressClick.bind(this, item)
                    },
                    {
                        key: "resolve",
                        text: "Resolved by HC",
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
                        onClick: this.onResolvedByHCClick.bind(this, item)
                    },
                    {
                        key: "resolve",
                        text: "Resolved by BaseCamp",
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
                        onClick: this.onResolvedByBaseCampClick.bind(this, item)
                    },
                    {
                        key: "delegate",
                        text: "Transfer to BaseCamp",
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
                                    iconName="people"
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

                return (
                    <IconButton
                        //disabled={!(enableaction && validstatusforaction)}
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

                    />)

            }
        }
    ];
    onResolvedByHCClick(item: any) {
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Resolve",
            dialogSubtext: "Are you sure you want to mark this discrepancy as resolved? \n Once confirmed, the status will be updated to Resolved by HC",
            dialogConfirmButtonLabel: "Resolve",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogConfirmCallback: () => {
                alert(`resolved ${item['issueid']}`);
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    onResolvedByBaseCampClick(item: any) {
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Resolve",
            dialogSubtext: "Are you sure you want to mark this discrepancy as resolved? \n Once confirmed, the status will be updated to Resolved by BaseCamp",
            dialogConfirmButtonLabel: "Resolve",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogConfirmCallback: () => {
                alert(`resolved ${item['issueid']}`);
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    onCacelClick(item: any) {
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Cancellation",
            dialogSubtext: "Are you sure you want to cancel this discrepancy? \n Once confirmed, the status will be updated to Cancelled",
            //dialogSubTextElement: <Text>Are you sure you want to cancel this discrepancy? <br></br> Once confirmed, the status will be updated to <Text style={{color: "#D13438", fontWeight: 600}}>Cancelled</Text></Text>,
            dialogConfirmButtonLabel: "Cancel Discrepancy",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#D13438",
            dialogConfirmCallback: () => {
                alert(`cancelled ${item['issueid']}`);
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    onDelegateClick(item: any) {
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Transfer to BaseCamp",
            dialogSubtext: "Are you sure you want to transfer this to BaseCamp team? \n Once confirmed, the BaseCamp team will be notified to review and resolve the issue",
            dialogConfirmButtonLabel: "Transfer",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogConfirmCallback: () => {
                alert(`resolved ${item['issueid']}`);
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    onHCInprogressClick(item: any){
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm HC - In Progress",
            dialogSubtext: "Are you sure you want to change the status to HC-In Progress. \n Once confirmed, the status will be changed to HC-In Progress",
            dialogConfirmButtonLabel: "Confirm",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogConfirmCallback: () => {
                alert(`resolved ${item['issueid']}`);
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    onBaseCampInprogressClick(item: any){
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm BaseCamp - In Progress",
            dialogSubtext: "Are you sure you want to change the status to BaseCamp-In Progress. \n Once confirmed, the status will be changed to BaseCamp-In Progress",
            dialogConfirmButtonLabel: "Confirm",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogConfirmCallback: () => {
                alert(`resolved ${item['issueid']}`);
            },
            dialogCancelCallback: () => {
                
            }
        })
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

    render() {
        const {isOpen, issue, onClose, onResolve } = this.props;
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