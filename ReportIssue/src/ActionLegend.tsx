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
                grow
                style={{
                    border: `1px solid ${color}30`,
                    borderRadius: 6,
                    backgroundColor: backgroundColor,
                    padding: "8px 10px",
                    minHeight: 68,
                    boxSizing: "border-box"
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
                                backgroundColor: `${color}18`
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
                                    fontWeight: 600,
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
                    borderRadius: 6,
                    padding: 10,
                    backgroundColor: "#FFFFFF",
                    boxSizing: "border-box"
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
                <Stack
                    horizontal
                    verticalAlign="stretch"
                    tokens={{ childrenGap: 8 }}
                >
                    {this.renderLegendItem(
                        "Clock",
                        "In Progress",
                        "Start working on the discrepancy.",
                        "#174EA6",
                        "#F5F8FF"
                    )}

                    {this.renderLegendItem(
                        "CheckMark",
                        "Resolve",
                        "Mark the discrepancy as resolved.",
                        "#107C10",
                        "#F4FBF4"
                    )}

                    {this.renderLegendItem(
                        "People",
                        "Transfer to BaseCamp Support",
                        "Send to the BaseCamp team for further review.",
                        "#6B1FAE",
                        "#FBF5FF"
                    )}

                    {this.renderLegendItem(
                        "Cancel",
                        "Cancel",
                        "Close the discrepancy without resolution.",
                        "#A4262C",
                        "#FFF7F7"
                    )}
                </Stack>
            </Stack>
        );
    }
}