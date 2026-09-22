import * as React from "react";
import {
    Icon,
    IconButton,
    Panel,
    PanelType,
    Persona,
    PersonaSize,
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
    statusValue?: number | null;
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
    private getTheme = (item: StatusHistoryItem): StatusHistoryTheme => {
        const status = (item.statusLabel || "").trim().toLowerCase();

        if (status === "new") {
            return { legend: "#0369A1", background: "#E0F2FE", iconName: "Add" };
        }

        if (status === "in progress") {
            return { legend: "#2563EB", background: "#EFF6FF", iconName: "Clock" };
        }

        if (status === "sent for review" || status === "in review") {
            return { legend: "#9333EA", background: "#FAF5FF", iconName: "Send" };
        }

        if (status === "transferred to basecamp support" || status === "transferred") {
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
        const { issueName, onDismiss } = this.props;

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
                <Stack tokens={{ childrenGap: 3 }}>
                    <Text style={{ color: "#0D2499", fontSize: 20, fontWeight: 600 }}>
                        Status History
                    </Text>
                    <Text style={{ color: "#605E5C", fontSize: 12 }}>
                        {issueName || "Selected discrepancy"}
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
        const isLast = index === this.props.items.length - 1;
        const userName = item.updatedBy?.name || "System";

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
                            width: 20,
                            height: 20,
                            marginTop: 12,
                            zIndex: 2,
                            borderRadius: "50%",
                            border: `2px solid ${theme.legend}`,
                            backgroundColor: theme.background,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Icon
                            iconName={theme.iconName}
                            styles={{ root: { color: theme.legend, fontSize: 10 } }}
                        />
                    </span>
                    {!isLast && (
                        <span
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                top: 32,
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
                                borderRadius: 12,
                                padding: "2px 9px",
                                fontSize: 12,
                                fontWeight: 600
                            }}
                        >
                            {item.statusLabel || "Status updated"}
                        </Text>
                        <Text style={{ color: "#605E5C", fontSize: 12, textAlign: "right" }}>
                            {item.updatedOn || "---"}
                        </Text>
                    </Stack>

                    <Persona
                        text={userName}
                        secondaryText={item.updatedBy?.email || undefined}
                        size={PersonaSize.size32}
                        hidePersonaDetails={false}
                    />

                    {item.comments && (
                        <Stack
                            tokens={{ childrenGap: 4 }}
                            styles={{ root: { borderTop: "1px solid #EDEBE9", paddingTop: 8 } }}
                        >
                            <Text style={{ fontSize: 12, fontWeight: 600 }}>Comments</Text>
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

        return (
            <Panel
                isOpen={isOpen}
                type={PanelType.medium}
                onDismiss={onDismiss}
                onRenderHeader={this.renderPanelHeader}
                isLightDismiss={true}
                closeButtonAriaLabel="Close status history"
                styles={{
                    main: { borderTop: "4px solid #0D2499" },
                    content: { paddingTop: 18, paddingBottom: 24 }
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
            </Panel>
        );
    }
}

export default StatusHistoryPanel;
