import * as React from "react";
import { Icon, IconButton, Link, PrimaryButton, Stack, Text } from "@fluentui/react";

export interface IProps {
    headerName: string | null;
    onClick: () => void;
}

class ReportIssueButton extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return <Stack
            horizontal
            horizontalAlign="space-between"
            verticalAlign="center"
            styles={{
                root: {
                    background: "lightgray",
                    borderLeft: "4px solid #0D2499",
                    padding: "10px 14px",
                    borderRadius: 6,
                    marginBottom: 12
                }
            }}
        >
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                <Text variant="mediumPlus" style={{ fontWeight: 600 }}>
                    {this.props.headerName ?? "Title"}
                </Text>
            </Stack>

            <Link
                onClick={this.props.onClick}
                styles={{
                    root: {
                        fontWeight: 600,
                        color: "#0D2499",
                    }
                }}
            >
                🐞 Report Issue
            </Link>
        </Stack>
    }

    // return (
    //     <PrimaryButton style={{ width: "100%", borderRadius: "4px", color: "black", backgroundColor: "lightgray", border: "1px solid #ccc" }} text="Report Issue" onClick={onClick} />
    //     // <div
    //     //     style={{
    //     //         display: "flex",
    //     //         justifyContent: "flex-end",
    //     //         width: "100%"
    //     //     }}
    //     // >
    //     //     <IconButton
    //     //         iconProps={{ iconName: "Bug" }}
    //     //         title="Report Issue"
    //     //         ariaLabel="Report Issue"
    //     //         onClick={onClick}
    //     //     />
    //     // </div>
    // );

}

export default ReportIssueButton;