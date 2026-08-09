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
    onClose: () => void;
    onResolve?: (issue: IssueDetails) => void;
}

export default class IssueDetailsDialog extends React.Component<IssueDetailsDialogProps> {

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
    ];

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
                maxWidth={900}
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