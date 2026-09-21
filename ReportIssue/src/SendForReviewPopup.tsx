import * as React from "react";
import {
    ChoiceGroup,
    DefaultButton,
    Dialog,
    Dropdown,
    IChoiceGroupOption,
    Label,
    PrimaryButton,
    Stack,
    Text,
    TextField
} from "@fluentui/react";
import Lookup from "./Lookup";

export type IssueActionKey =
    | "inprogress"
    | "resolve"
    | "sendforreview"
    | "transfer"
    | "cancel"
    | "unabletoresolve";

interface ActionDialogProps {
    isOpen: boolean;
    issueName: string;
    onDismiss: () => void;
    onConfirm: (
        action: IssueActionKey,
        notes: string,
        reviewwith?: number,
        reviewer?: any
    ) => void;
}

interface ActionDialogState {
    selectedAction: IssueActionKey | null;
    actionConfirmed: boolean;
    notes: string;
    reviewwith: number;
    person: {
        id: string;
        text: string | null;
        secondaryText: string | null | undefined;
    } | null;
}

const actionOptions: IChoiceGroupOption[] = [
    { key: "inprogress", text: "In Progress" },
    { key: "resolve", text: "Resolve" },
    { key: "sendforreview", text: "Send for Review" },
    { key: "transfer", text: "Transfer to BaseCamp Support" },
    { key: "cancel", text: "Cancel" },
    { key: "unabletoresolve", text: "Unable to Resolve" }
];

const actionDetails: Record<IssueActionKey, {
    title: string;
    message: string;
    notesLabel: string;
    buttonText: string;
    color: string;
    background: string;
}> = {
    inprogress: {
        title: "Confirm In Progress",
        message: "Are you sure you want to mark this discrepancy as In Progress? Once confirmed, the status will be updated to In Progress.",
        notesLabel: "In Progress Notes",
        buttonText: "Confirm",
        color: "#2563EB",
        background: "#EFF6FF"
    },
    resolve: {
        title: "Confirm Resolution",
        message: "Are you sure you want to mark this discrepancy as resolved? Once confirmed, the status will be updated to Resolved.",
        notesLabel: "Resolution Notes",
        buttonText: "Resolve",
        color: "#107C10",
        background: "#ECFDF5"
    },
    sendforreview: {
        title: "Confirm Send for Review",
        message: "Select the reviewer details and enter any notes before sending this discrepancy for review.",
        notesLabel: "Reason / Comments",
        buttonText: "Send",
        color: "#9333EA",
        background: "#FAF5FF"
    },
    transfer: {
        title: "Confirm Transfer to BaseCamp Support",
        message: "Are you sure you want to transfer this discrepancy to BaseCamp Support? Once confirmed, the team will be notified.",
        notesLabel: "Transfer Notes",
        buttonText: "Transfer",
        color: "#7C3AED",
        background: "#F5F3FF"
    },
    cancel: {
        title: "Confirm Cancellation",
        message: "Are you sure you want to cancel this discrepancy? Once confirmed, the status will be updated to Cancelled.",
        notesLabel: "Cancellation Notes",
        buttonText: "Cancel Discrepancy",
        color: "#D13438",
        background: "#FEF2F2"
    },
    unabletoresolve: {
        title: "Confirm Unable to Resolve",
        message: "Are you sure you want to mark this discrepancy as Unable to Resolve?",
        notesLabel: "Reason / Notes",
        buttonText: "Confirm",
        color: "#B45309",
        background: "#FEF9C3"
    }
};

class ActionDialog extends React.Component<ActionDialogProps, ActionDialogState> {
    constructor(props: ActionDialogProps) {
        super(props);
        this.state = this.getInitialState();
    }

    private getInitialState(): ActionDialogState {
        return {
            selectedAction: null,
            actionConfirmed: false,
            notes: "",
            reviewwith: 0,
            person: null
        };
    }

    componentDidUpdate(previousProps: ActionDialogProps): void {
        if (this.props.isOpen && (!previousProps.isOpen || previousProps.issueName !== this.props.issueName)) {
            this.setState(this.getInitialState());
        }
    }

    private isConfirmDisabled(): boolean {
        return this.state.selectedAction === "sendforreview" &&
            (this.state.reviewwith === 0 || this.state.person === null);
    }

    render() {
        const selectedAction = this.state.selectedAction;
        const details = selectedAction ? actionDetails[selectedAction] : null;

        return (
            <Dialog
                hidden={!this.props.isOpen}
                onDismiss={this.props.onDismiss}
                dialogContentProps={{
                    title: (
                        <Text style={{ fontSize: 18, fontWeight: 600, color: "#0D2499" }}>
                            Action For: {this.props.issueName}
                        </Text>
                    )
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { minWidth: 540, maxWidth: 620 } }
                }}
                minWidth={540}
            >
                <Stack tokens={{ childrenGap: 12 }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: "#0D2499" }}>
                        Select Action
                    </Text>
                    <ChoiceGroup
                        selectedKey={selectedAction || undefined}
                        options={actionOptions}
                        onChange={(_event, option) => {
                            this.setState({
                                selectedAction: option?.key as IssueActionKey,
                                actionConfirmed: false,
                                notes: "",
                                reviewwith: 0,
                                person: null
                            });
                        }}
                    />

                    {details && (
                        <Stack
                            tokens={{ childrenGap: 14 }}
                            verticalAlign="start"
                            style={{
                                border: "1px solid #E1DFDD",
                                backgroundColor: "#FFFFFF",
                                borderRadius: 6,
                                padding: 16,
                                marginTop: 4
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, color: "#0D2499" }}>
                                {details.title}
                            </Text>
                            <div style={{ lineHeight: "21px", width: "100%" }}>
                                {details.message}
                            </div>

                            <Stack horizontal tokens={{ childrenGap: 10 }}>
                                <PrimaryButton
                                    text={details.buttonText}
                                    onClick={() => this.setState({ actionConfirmed: true })}
                                    style={{
                                        borderRadius: 6,
                                        backgroundColor: details.color,
                                        borderColor: details.color
                                    }}
                                />
                                <DefaultButton
                                    text="Go Back"
                                    onClick={() => this.setState(this.getInitialState())}
                                    style={{ borderRadius: 6 }}
                                />
                            </Stack>
                        </Stack>
                    )}

                    {details && this.state.actionConfirmed && (
                        <Stack
                            tokens={{ childrenGap: 14 }}
                            verticalAlign="start"
                            style={{
                                border: `1px solid ${details.color}`,
                                backgroundColor: details.background,
                                borderRadius: 6,
                                padding: 16,
                                marginTop: 4
                            }}
                        >
                            {selectedAction === "sendforreview" && (
                                <Stack horizontal tokens={{ childrenGap: 18 }}>
                                    <Dropdown
                                        label="Review with"
                                        options={[
                                            { key: 289940000, text: "Auditor" },
                                            { key: 289940001, text: "HA" },
                                            { key: 289940002, text: "FA" },
                                            { key: 289940003, text: "BaseCamp Team" },
                                            { key: 289940004, text: "Other" }
                                        ]}
                                        styles={{ root: { minWidth: 190 } }}
                                        onChange={(_event, value) => {
                                            this.setState({ reviewwith: value?.key as number });
                                        }}
                                    />
                                    <Stack>
                                        <Label>Reviewer</Label>
                                        <Lookup
                                            entityType="cr549_person"
                                            allowMultiSelect={false}
                                            applystyles={true}
                                            onRecordSelect={(items) => {
                                                this.setState({ person: items.length > 0 ? items[0] : null });
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                            )}

                            <TextField
                                multiline
                                rows={4}
                                label={details.notesLabel}
                                placeholder="Enter Notes"
                                value={this.state.notes}
                                onChange={(_event, newValue) => {
                                    this.setState({ notes: newValue || "" });
                                }}
                            />

                            <Stack horizontal tokens={{ childrenGap: 10 }}>
                                <PrimaryButton
                                    text={details.buttonText}
                                    disabled={this.isConfirmDisabled()}
                                    onClick={() => {
                                        if (!selectedAction) return;
                                        this.props.onConfirm(
                                            selectedAction,
                                            this.state.notes,
                                            this.state.reviewwith,
                                            this.state.person
                                        );
                                    }}
                                    style={{
                                        borderRadius: 6,
                                        backgroundColor: details.color,
                                        borderColor: details.color
                                    }}
                                />
                                <DefaultButton
                                    text="Clear"
                                    onClick={() => this.setState({
                                        notes: "",
                                        reviewwith: 0,
                                        person: null
                                    })}
                                    style={{ borderRadius: 6 }}
                                />
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            </Dialog>
        );
    }
}

export default ActionDialog;
