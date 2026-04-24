import { Component } from "react";
// import type { IStackStyles } from "@fluentui/react";
import { Stack } from "@fluentui/react";

interface ReleaseBannerProps {}
class ReleaseBanner extends Component<ReleaseBannerProps> {
  render() {

    return <Stack verticalAlign="center" horizontalAlign="center" horizontal styles={{root: {backgroundColor: "#AFCBE3",}}}>
        <img
            src="./releasebanner.png"
            alt="logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <div style={{maxWidth: "600px", textAlign: "left", fontSize: 14, fontFamily: "Segoe UI", color: "#0D2499"}}>
            Your centralized platform for managing applications, processes, reporting, and communication while connecting teams, data, and workflows in one seamless modern experience.
          </div>
    </Stack>
  }
}

export default ReleaseBanner;