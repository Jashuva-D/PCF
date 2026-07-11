import * as React from "react";
import { IconButton, PrimaryButton } from "@fluentui/react";

export interface IProps {
    onClick: () => void;
}

export const ReportIssueButton: React.FC<IProps> = ({ onClick }) => {

    return (
        <PrimaryButton style={{ width: "100%", borderRadius: "4px", color: "black", backgroundColor: "lightgray", border: "1px solid #ccc" }} text="Report Issue" onClick={onClick} />
        // <div
        //     style={{
        //         display: "flex",
        //         justifyContent: "flex-end",
        //         width: "100%"
        //     }}
        // >
        //     <IconButton
        //         iconProps={{ iconName: "Bug" }}
        //         title="Report Issue"
        //         ariaLabel="Report Issue"
        //         onClick={onClick}
        //     />
        // </div>
    );
};