import { Component } from "react";
// import type { IStackStyles } from "@fluentui/react";
import { Stack } from "@fluentui/react";

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

    return <Stack verticalAlign="center" horizontalAlign="center" horizontal styles={{root: {backgroundColor: "#AFCBE3",}}}>
        <img
            src="./basecamplogo.png"
            alt="logo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
          <div style={{maxWidth: "600px", textAlign: "left", fontSize: 14, fontFamily: "Segoe UI", color: "#0D2499"}}>
            Your centralized platform for managing applications, processes, reporting, and communication while connecting teams, data, and workflows in one seamless modern experience.
          </div>
    </Stack>
    //   <Stack
    //     horizontal
    //     verticalAlign="center"
    //     tokens={{ childrenGap: 15 }}
    //     styles={stackStyles}
    //   >
    //     <Stack>
    //       <img
    //         src="./basecamplogo.png"
    //         alt="logo"
    //         style={{
    //           width: "200px",
    //           height: "200px",
    //           objectFit: "contain",
    //         }}
    //       />
    //     </Stack>
    //     {/* <Stack grow>
    //         <div style={{maxWidth: "400px"}}>Your centralized workspace for managing applications, business processes, reporting, and communication seamlessly across one connected platform.
    //             Designed to improve collaboration, enhance visibility, and simplify day-to-day operations by bringing teams, data, and workflows together in a single modern experience.
    //         </div>
    //     </Stack> */}
    //   </Stack>
    // );
  }
}

export default BaseCampLogo;