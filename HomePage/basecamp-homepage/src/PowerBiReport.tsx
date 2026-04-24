import { Component } from "react";
import { Stack, Label } from "@fluentui/react";

interface PowerBIReportProps {}
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
        (parent as any).Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", `?$select=defaultvalue,schemaname&$filter=schemaname eq 'crm2_crmmainpage_reporturl'&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)`).then(function (result: any) {
            if (result.entities.length > 0) {
                var reporturl = "";
                let record = result.entities[0];
                if (
                    record.environmentvariabledefinition_environmentvariablevalue &&
                    record.environmentvariabledefinition_environmentvariablevalue.length > 0 &&
                    record.environmentvariabledefinition_environmentvariablevalue[0].value
                ) {
                    reporturl = record.environmentvariabledefinition_environmentvariablevalue[0].value;
                }
                reporturl = record.defaultvalue;
            }
            obj.setState({ embedUrl: reporturl! });
        });
    }

    render() {
        return <Stack tokens={{ childrenGap: 10 }}>
            <Label style={{ fontWeight: "bold", fontSize: 16 }}>
                Applications By Platform
            </Label>

            <div
                style={{
                    borderRadius: "6px",
                    overflow: "hidden", // ✅ IMPORTANT
                    border: "1px solid #ddd" // optional
                }}
            >
                <iframe
                    width="100%"
                    height="600px"
                    src={this.state.embedUrl}
                    frameBorder="0"
                    allowFullScreen
                    style={{ display: "block" }} // avoids tiny gaps
                />
            </div>
        </Stack>
    }
}

export default PowerBIReport;