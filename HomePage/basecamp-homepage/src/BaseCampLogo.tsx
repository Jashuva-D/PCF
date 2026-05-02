import { Component } from "react";
// import type { IStackStyles } from "@fluentui/react";
//import { Stack } from "@fluentui/react";

interface BaseCampLogoProps {}
class BaseCampLogo extends Component<BaseCampLogoProps> {
  render() {
    // const stackStyles: IStackStyles = {
    //   root: {
    //     width: "100%",
    //     alignItems: "center",
    //     backgroundColor: "#AFCBE3",
    //   },
    // };

    // return <Stack verticalAlign="center" horizontalAlign="center" horizontal styles={{root: {backgroundColor: "#AFCBE3",}}}>
    //     <img
    //         src="./basecamplogo.png"
    //         alt="logo"
    //         style={{
    //           width: "100px",
    //           height: "100px",
    //           objectFit: "contain",
    //         }}
    //       />
    //       <div style={{maxWidth: "600px", textAlign: "left", fontSize: 14, fontFamily: "Segoe UI", color: "#0D2499"}}>
    //         Your centralized platform for managing applications, processes, reporting, and communication while connecting teams, data, and workflows in one seamless modern experience.
    //       </div>
    // </Stack>
    return <img
        src="./basecamplogo.png"
        alt="logo"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "contain",
        }}
      />  
  }
}

export default BaseCampLogo;