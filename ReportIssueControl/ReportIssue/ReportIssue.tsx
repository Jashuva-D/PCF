import * as React from "react";
import { Icon, IconButton, Link, PrimaryButton, Stack, Text, DefaultButton } from "@fluentui/react";
import { IInputs } from "./generated/ManifestTypes";

interface ReportIssueProps {
    headerName: string | null;
    appName: string | null;
    tabName: string | null;
    sectionName: string | null;
    context: ComponentFramework.Context<IInputs>
}
interface ReportIssueState{

}

class ReportIssueButton extends React.Component<ReportIssueProps, ReportIssueState> {
    constructor(props: ReportIssueProps) {
        super(props);
    }
    onClick(){
        var data = {
            appname: this.props.appName,
            recordid: (this.props.context as any).page.entityId,
            tabname: this.props.tabName,
            sectionname: this.props.sectionName
        }
        this.props.context.navigation.openWebResource("crm2_/reportissue/index.html",{ height: 900, width: 800, openInNewWindow: false}, JSON.stringify(data))
        
    }
    render() {
        return <Stack
            horizontal
            horizontalAlign="space-between"
            verticalAlign="center"
            styles={{
                root: {
                    background: "rgb(243,243, 243)",
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

            <DefaultButton
                text="Report Issue"
                iconProps={{ iconName: "Bug", style: { color: "#a83240" } }}
                onClick={this.onClick.bind(this)}
                styles={{
                    root: {
                        minWidth: "auto",
                        padding: "0 6px",
                        border: 0,
                        backgroundColor: "transparent",
                        color: "#0D2499",
                        hover: {
                            backgroundColor: "transparent",
                            color: "#0D2499"
                        }
                    }
                }}
                
            />
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