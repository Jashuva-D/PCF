import * as React from "react";
import { Icon, IconButton, Link, PrimaryButton, Stack, Text, DefaultButton } from "@fluentui/react";
import { IInputs } from "./generated/ManifestTypes";
import { DetailsIcon } from "./Icons";
import { TabSectionDetails } from "./Constants";

interface ReportIssueProps {
    headerName: string | null;
    appName: string | null;
    tabName: string | null;
    sectionName: string | null;
    bgcolor: string | null;
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
        };
        var pageInput = {
            pageType: "webresource",
            webresourceName: "crm2_/reportissue/index.html",
            data: JSON.stringify(data)
        };
        var navigationOptions = {
            target: 2,          
            width: {
                value: 800,
                unit: "px"
            },
            height: {
                value: 800,
                unit: "px"
            },
            position: 1         
        };
        //(this.props.context.navigation as any).openWebResource("crm2_/reportissue/index.html",{ height: 900, width: 800, openInNewWindow: false}, JSON.stringify(data))
        (this.props.context.navigation as any).navigateTo(pageInput,navigationOptions).then(function(resp: any){},function(err: any){});
    }
    render() {
        const iconcomp = TabSectionDetails.find((item) => item.tab === this.props.tabName && item.section === this.props.sectionName)?.icon;
        
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
                {iconcomp && React.createElement(iconcomp, { size: 22, color: "#0D2499" })}
                <Text variant="mediumPlus" style={{ fontWeight: 600 }}>
                    {this.props.headerName ?? "Title"}
                </Text>
            </Stack>
            <DefaultButton
                text="Report Data Discrepancy"
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
}

export default ReportIssueButton;