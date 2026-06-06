import { Component } from "react";
import { Stack, Label, Text } from "@fluentui/react";

interface PowerBIReportProps {
    environmentVariableName?: string;
    title?: string;
    subtitle?: string;
    reporticon?: React.ReactNode;
}
interface PowerBIReportState {embedUrl: string}

class PowerBIReport extends Component<PowerBIReportProps, PowerBIReportState> {
    constructor(props: PowerBIReportProps) {
        super(props);
        this.state = {
            embedUrl: ""
        };
    }
    componentDidMount(): void {
        var obj = this;
        (parent as any).Xrm?.WebApi.retrieveMultipleRecords("environmentvariabledefinition", `?$select=defaultvalue,schemaname&$filter=schemaname eq '${this.props.environmentVariableName}'&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)`).then(function (result: any) {
            if (result.entities.length > 0) {
                var reporturl = "";
                let record = result.entities[0];
                if (record.environmentvariabledefinition_environmentvariablevalue &&
                    record.environmentvariabledefinition_environmentvariablevalue.length > 0 &&
                    record.environmentvariabledefinition_environmentvariablevalue[0].value)
                {
                    reporturl = record.environmentvariabledefinition_environmentvariablevalue[0].value;
                }
                else {
                    reporturl = record.defaultvalue;
                }
            }
            obj.setState({ embedUrl: reporturl! });
        });
    }

    render() {
        return <Stack tokens={{ childrenGap: 10 }}>
            <Stack horizontal verticalAlign='center'>
                {this.props.reporticon}
                <Stack tokens={{ childrenGap: 2 }} style={{ paddingLeft: 10 }}>
                    <Label style={{ fontWeight: "bold", fontSize: 16, color: "#0D2499" }}>{this.props.title}</Label>
                    <Text style={{ color: "#6A7A99", fontWeight: "semibold" }}>{this.props.subtitle}</Text>
                </Stack>
            </Stack>

            <div
                style={{
                    borderRadius: "6px",
                    overflow: "hidden", 
                    border: "1px solid #ddd",
                    boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
                    backgroundColor: "white"
                }}
            >
                <iframe
                    width="100%"
                    height="600px"
                    src={this.state.embedUrl}
                    frameBorder="0"
                    allowFullScreen
                    style={{ display: "block" }} 
                />
            </div>
        </Stack>
    }
}

export default PowerBIReport;