import * as React from "react";
import {
    Icon,
    IconButton,
    Spinner,
    Stack,
    Text
} from "@fluentui/react";

export interface StatusHistoryUser {
    name: string;
    email?: string | null;
}

export interface StatusHistoryItem {
    id: string;
    statusLabel: string;
    updatedBy?: StatusHistoryUser | null;
    updatedOn: string;
    comments?: string | null;
}

export interface StatusHistoryPanelProps {
    isOpen: boolean;
    issueName: string;
    items: StatusHistoryItem[];
    isLoading?: boolean;
    errorMessage?: string | null;
    onDismiss: () => void;
}

interface StatusHistoryTheme {
    legend: string;
    background: string;
    iconName: string;
}

const defaultTheme: StatusHistoryTheme = {
    legend: "#605E5C",
    background: "#F3F2F1",
    iconName: "CircleRing"
};

class StatusHistoryPanel extends React.Component<StatusHistoryPanelProps> {
    private getStatusLabel = (item: StatusHistoryItem): string => {
        return item.statusLabel?.trim() || "Status Updated";
    };

    private getTheme = (item: StatusHistoryItem): StatusHistoryTheme => {
        const status = this.getStatusLabel(item).trim().toLowerCase();

        if (status === "new") {
            return { legend: "#0369A1", background: "#E0F2FE", iconName: "Add" };
        }

        if (status === "in progress") {
            return { legend: "#2563EB", background: "#EFF6FF", iconName: "Clock" };
        }

        if (status === "send for review" || status === "sent for review" || status === "in review") {
            return { legend: "#9333EA", background: "#FAF5FF", iconName: "Send" };
        }

        if (status === "transfer to basecamp support" || status === "transferred to basecamp support" || status === "transferred") {
            return { legend: "#7C3AED", background: "#F5F3FF", iconName: "People" };
        }

        if (status === "resolved" || status === "closed") {
            return { legend: "#107C10", background: "#ECFDF5", iconName: "CheckMark" };
        }

        if (status === "cancelled" || status === "canceled") {
            return { legend: "#D13438", background: "#FEF2F2", iconName: "Cancel" };
        }

        if (status === "unable to resolve") {
            return { legend: "#B45309", background: "#FEF9C3", iconName: "Warning" };
        }

        return defaultTheme;
    };

    private renderPanelHeader = (): React.ReactElement => {
        const { issueName, items, onDismiss } = this.props;
        const changeLabel = items.length === 1 ? "status change" : "status changes";

        return (
            <Stack
                horizontal
                verticalAlign="center"
                horizontalAlign="space-between"
                styles={{
                    root: {
                        width: "100%",
                        padding: "18px 16px 12px 24px",
                        borderBottom: "1px solid #EDEBE9"
                    }
                }}
            >
                <Stack tokens={{ childrenGap: 8 }}>
                    <Text style={{ color: "#0D2499", fontSize: 20, fontWeight: 600 }}>
                        Status History
                    </Text>
                    <Text style={{ color: "#605E5C", fontSize: 12 }}>
                        {issueName || "Selected discrepancy"} · {items.length} {changeLabel} · newest first
                    </Text>
                </Stack>
                <IconButton
                    iconProps={{ iconName: "Cancel" }}
                    ariaLabel="Close status history"
                    title="Close"
                    onClick={onDismiss}
                />
            </Stack>
        );
    };

    private renderHistoryItem = (item: StatusHistoryItem, index: number): React.ReactElement => {
        const theme = this.getTheme(item);
        const statusLabel = this.getStatusLabel(item);
        const isLast = index === this.props.items.length - 1;
        const userName = item.updatedBy?.name || "System";
        const updatedByLabel = statusLabel.toLowerCase() === "new" ? "Created by" : "Updated by";

        return (
            <Stack
                key={item.id}
                horizontal
                tokens={{ childrenGap: 12 }}
                styles={{ root: { position: "relative" } }}
            >
                <Stack
                    horizontalAlign="center"
                    styles={{ root: { width: 22, minWidth: 22, position: "relative" } }}
                >
                    <span
                        aria-hidden="true"
                        style={{
                            width: 12,
                            height: 12,
                            marginTop: 15,
                            zIndex: 2,
                            borderRadius: "50%",
                            backgroundColor: theme.legend,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    />
                    {!isLast && (
                        <span
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                top: 27,
                                bottom: -12,
                                width: 2,
                                backgroundColor: "#D2D0CE"
                            }}
                        />
                    )}
                </Stack>

                <Stack
                    tokens={{ childrenGap: 8 }}
                    styles={{
                        root: {
                            flex: 1,
                            minWidth: 0,
                            marginBottom: 12,
                            padding: 12,
                            border: `1px solid ${index === 0 ? theme.legend : "#EDEBE9"}`,
                            borderRadius: 6,
                            backgroundColor: index === 0 ? theme.background : "#FFFFFF"
                        }
                    }}
                >
                    <Stack horizontal verticalAlign="center" horizontalAlign="space-between" tokens={{ childrenGap: 8 }}>
                        <Text
                            style={{
                                color: theme.legend,
                                backgroundColor: theme.background,
                                borderRadius: 4,
                                padding: "4px 9px",
                                fontSize: 12,
                                fontWeight: 600
                            }}
                        >
                            {statusLabel}
                        </Text>
                        <Text style={{ color: "#605E5C", fontSize: 12, textAlign: "right" }}>
                            {item.updatedOn || "---"}
                        </Text>
                    </Stack>

                    <Text style={{ fontSize: 12 }}>
                        {updatedByLabel} {userName}
                    </Text>

                    {item.comments && (
                        <Stack
                            tokens={{ childrenGap: 4 }}
                            styles={{ root: { borderTop: "1px solid #EDEBE9", paddingTop: 8 } }}
                        >
                            <Text style={{ fontSize: 13, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                                {item.comments}
                            </Text>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        );
    };

    public render(): React.ReactElement {
        const { isOpen, items, isLoading, errorMessage, onDismiss } = this.props;

        if (!isOpen) {
            return <React.Fragment />;
        }

        return (
            <Stack
                role="presentation"
                onClick={onDismiss}
                styles={{
                    root: {
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        zIndex: 20,
                        backgroundColor: "rgba(0, 0, 0, 0.20)"
                    }
                }}
            >
                <Stack
                    role="dialog"
                    aria-modal="true"
                    aria-label="Status history"
                    onClick={(event) => event.stopPropagation()}
                    styles={{
                        root: {
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: "430px",
                            maxWidth: "calc(100% - 32px)",
                            overflow: "hidden",
                            backgroundColor: "#FFFFFF",
                            borderTop: "4px solid #0D2499",
                            boxShadow: "-6px 0 18px rgba(0, 0, 0, 0.18)"
                        }
                    }}
                >
                    {this.renderPanelHeader()}
                    <Stack
                        styles={{
                            root: {
                                flex: 1,
                                minHeight: 0,
                                overflowY: "auto",
                                padding: "18px 24px 24px"
                            }
                        }}
                    >
                        {isLoading && <Spinner label="Loading status history..." />}

                        {!isLoading && errorMessage && (
                            <Stack
                                role="alert"
                                horizontal
                                verticalAlign="center"
                                tokens={{ childrenGap: 8 }}
                                styles={{
                                    root: {
                                        color: "#A4262C",
                                        backgroundColor: "#FDE7E9",
                                        border: "1px solid #A4262C",
                                        borderRadius: 6,
                                        padding: 10
                                    }
                                }}
                            >
                                <Icon iconName="ErrorBadge" />
                                <Text>{errorMessage}</Text>
                            </Stack>
                        )}

                        {!isLoading && !errorMessage && items.length === 0 && (
                            <Stack horizontalAlign="center" tokens={{ childrenGap: 8 }} styles={{ root: { paddingTop: 32 } }}>
                                <Icon iconName="History" styles={{ root: { color: "#605E5C", fontSize: 24 } }} />
                                <Text style={{ color: "#605E5C" }}>No status history is available.</Text>
                            </Stack>
                        )}

                        {!isLoading && !errorMessage && items.length > 0 && (
                            <Stack aria-label={`${items.length} status history records`}>
                                {items.map(this.renderHistoryItem)}
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        );
    }
}

export default StatusHistoryPanel;
