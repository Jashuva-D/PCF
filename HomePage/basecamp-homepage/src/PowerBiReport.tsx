import { Component } from "react";
import { Stack, Label } from "@fluentui/react";

interface PowerBIReportProps {}
interface PowerBIReportState {embedUrl: string}

class PowerBIReport extends Component<PowerBIReportProps, PowerBIReportState> {
  constructor(props: PowerBIReportProps) {
    super(props);
    this.state = {
      embedUrl: "",//"https://app.powerbigov.us/reportEmbed?reportId=0c535aed-3343-4710-8416-75dc1aab2bac&autoAuth=true&ctid=fbdcedc1-70a9-414b-bfa5-c3063fc3395e"
    };
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