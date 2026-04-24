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
              width: "80%",
              height: "80%",
              objectFit: "contain",
            }}
          />
    </Stack>
  }
}

export default ReleaseBanner;