import * as React from "react";
import {
    Stack,
    StackItem,
    Text,
    Icon
} from "@fluentui/react";
import { InfoIcon } from "./icons";

export class ActionLegend extends React.Component {

    private renderLegendItem = (
        iconName: string,
        title: string,
        description: string,
        color: string,
        backgroundColor: string
    ): React.ReactElement => {
        return (
            <StackItem
                style={{
                    border: `1px solid ${color}30`,
                    borderRadius: 8,
                    backgroundColor: backgroundColor,
                    padding: "10px 12px",
                    minHeight: 78,
                    minWidth: 0,
                    width: "100%",
                    boxSizing: "border-box",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)"
                }}
            >
                <Stack
                    horizontal
                    verticalAlign="center"
                    tokens={{ childrenGap: 8 }}
                >
                    <StackItem>
                        <Stack
                            horizontalAlign="center"
                            verticalAlign="center"
                            style={{
                                width: 32,
                                height: 32,
                                minWidth: 32,
                                borderRadius: "50%",
                                backgroundColor: "#FFFFFF",
                                border: `1px solid ${color}25`
                            }}
                        >
                            <Icon
                                iconName={iconName}
                                styles={{
                                    root: {
                                        fontSize: 17,
                                        color: color
                                    }
                                }}
                            />
                        </Stack>
                    </StackItem>

                    <StackItem grow>
                        <Text
                            block
                            styles={{
                                root: {
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: color,
                                    marginBottom: 2
                                }
                            }}
                        >
                            {title}
                        </Text>

                        <Text
                            block
                            styles={{
                                root: {
                                    fontSize: 11,
                                    lineHeight: "15px",
                                    color: "#555555"
                                }
                            }}
                        >
                            {description}
                        </Text>
                    </StackItem>
                </Stack>
            </StackItem>
        );
    };

    public render(): React.ReactElement {
        return (
            <Stack
                style={{
                    border: "1px solid #D8D8D8",
                    borderRadius: 8,
                    padding: 12,
                    backgroundColor: "#FFFFFF",
                    boxSizing: "border-box",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)"
                }}
            >
                {/* Header */}
                <Stack
                    horizontal
                    verticalAlign="center"
                    tokens={{ childrenGap: 7 }}
                    style={{ marginBottom: 8 }}
                >
                    <InfoIcon size = {28}/>

                    <StackItem>
                        <Text
                            block
                            styles={{
                                root: {
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: "#0D2499",
                                    marginBottom: 1
                                }
                            }}
                        >
                            Action Legend
                        </Text>

                        <Text
                            block
                            styles={{
                                root: {
                                    fontSize: 11,
                                    color: "#555555"
                                }
                            }}
                        >
                            Use the actions below to manage the selected discrepancy.
                        </Text>
                    </StackItem>
                </Stack>

                {/* Legend Items */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: 10,
                        alignItems: "stretch"
                    }}
                >
                    {this.renderLegendItem(
                        "Clock",
                        "In Progress",
                        "Start working on the discrepancy.",
                        "#0369A1",
                        "#E0F2FE"
                    )}

                    {this.renderLegendItem(
                        "CheckMark",
                        "Resolve",
                        "Mark the discrepancy as resolved.",
                        "#107C10",
                        "#E8F5E8"
                    )}

                    {this.renderLegendItem(
                        "Send",
                        "Send for Review",
                        "Send the discrepancy to a reviewer for validation.",
                        "#9333EA",
                        "#FAF5FF"
                    )}

                    {this.renderLegendItem(
                        "People",
                        "Transfer to BaseCamp Support",
                        "Escalate the discrepancy to BaseCamp Support.",
                        "#7C3AED",
                        "#F5F3FF"
                    )}

                    {this.renderLegendItem(
                        "Cancel",
                        "Cancel",
                        "Close the discrepancy without resolution.",
                        "#D13438",
                        "#FDE7E5"
                    )}

                    {this.renderLegendItem(
                        "Warning",
                        "Unable to Resolve",
                        "Indicate that the discrepancy cannot be resolved.",
                        "#B45309",
                        "#FEF9C3"
                    )}
                </div>
            </Stack>
        );
    }
}
