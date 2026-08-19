import * as React from "react";
import { Icon, IconButton, Link, PrimaryButton, Stack, Text, DefaultButton } from "@fluentui/react";
import { IInputs } from "./generated/ManifestTypes";
import { DetailsIcon } from "./Icons";
import { TabSectionDetails } from "./Constants";

interface ReportIssueProps {
    headerName: string | null;
    bgcolor: string | null;
    context: ComponentFramework.Context<IInputs>
}
interface ReportIssueState{

}

class ReportIssueButton extends React.Component<ReportIssueProps, ReportIssueState> {
    constructor(props: ReportIssueProps) {
        super(props);
    }
    render() {
        //const iconcomp = TabSectionDetails.find((item) => item.tab === this.props.tabName && item.section === this.props.sectionName)?.icon;
        
        return <Stack
            horizontal
            horizontalAlign="space-between"
            verticalAlign="center"
            styles={{
                root: {
                    background: this.props.bgcolor ?? "rgb(243,243, 243)",
                    borderLeft: "4px solid #0D2499",
                    padding: "6px 6px",
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
        </Stack>
    }
}

export default ReportIssueButton;