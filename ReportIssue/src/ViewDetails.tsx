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
            maxWidth: 220,
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

    private renderPerson(
        title: string,
        person?: {
            name: string;
            email?: string;
        }
    ) {
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
                ) : (
                    <Text className="empty-value">
                        Not assigned
                    </Text>
                )}

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
                    subText: "Review the reported discrepancy details."
                }}
                modalProps={{
                    isBlocking: false,
                    className: "issue-details-dialog"
                }}
                minWidth={750}
                maxWidth={900}
            >

                <div className="issue-details-content">
                    <Stack className="section">
                        <Label className="detail-label"> ISSUE TITLE </Label>
                        <Text className="issue-title"> {issue.issuetitle} </Text>
                    </Stack>
                    <Stack className="section">
                        <Label className="detail-label"> ISSUE DESCRIPTION </Label>
                        <Text className="issue-description"> {issue.issuedescription || "-"} </Text>
                    </Stack>
                    <Separator />
                    <Stack horizontal wrap tokens={{ childrenGap: 30  }}  className="people-section" >
                        <Stack className="person-column">
                            {this.renderPerson(
                                "REPORTED BY",
                                issue.reportedby
                            )}
                        </Stack>
                        <Stack className="person-column">
                            {this.renderPerson("ASSIGNED TO", issue.assignedto )}
                        </Stack>
                        <Stack className="person-column">
                            {this.renderPerson("DELEGATED TO", issue.delegatedto )}
                        </Stack>
                    </Stack>
                    <Separator />
                    <Stack className="section">
                        <Label className="detail-label"> FIELD CHANGES </Label>
                        <div className="field-changes-table">
                            <DetailsList
                                items={issue.fields}
                                columns={this.columns}
                                selectionMode={0}
                                compact
                                isHeaderVisible={true}
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
                    {onResolve && (
                        <PrimaryButton
                            text="Resolve Issue"
                            iconProps={{
                                iconName: "CheckMark"
                            }}
                            onClick={() => onResolve(issue)}
                            styles={{
                                root: {
                                    backgroundColor: "#0D2499",
                                    borderColor: "#0D2499",
                                    borderRadius: 6,
                                    minWidth: 130
                                },
                                rootHovered: {
                                    backgroundColor: "#1636C4",
                                    borderColor: "#1636C4"
                                },
                                rootPressed: {
                                    backgroundColor: "#0A1B73",
                                    borderColor: "#0A1B73"
                                }
                            }}
                        />
                    )}
                </DialogFooter>
            </Dialog>
        );
    }
}