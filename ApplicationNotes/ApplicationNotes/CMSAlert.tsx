import * as React from "react";
import { Label, Stack, StackItem } from "@fluentui/react";
import { SuccessIcon, WarningIcon, ErrorIcon, InfoIcon } from "./icons";
import { CMSAlertType } from "./Constants";

interface CMSAlertProps {
    message?: string,
    color?: string,
    type: CMSAlertType
}
interface CMSAlertState {

}

class CMSAlert extends React.Component<CMSAlertProps, CMSAlertState> {
    constructor(props: CMSAlertProps) {
        super(props);
    }
    render() {
        
        var bgcolor = this.props.type === CMSAlertType.Success ? "#F6FAF5" : this.props.type === CMSAlertType.Info ? "#E7E9F5 " : this.props.type === CMSAlertType.Warning ? "#FFFCE6" : "#FEF5F7";
        var pipecolor = this.props.type === CMSAlertType.Success ? "#12890E" : this.props.type === CMSAlertType.Info ? "#0D2499" : this.props.type === CMSAlertType.Warning ? "#FFE400" : "#E31C3D";
        return <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 12 }}
            style={{backgroundColor: bgcolor}}
        >
            <span style={{
                backgroundColor: pipecolor,
                width: 10,
                height: 40
            }}>
            </span>
            {this.props.type === CMSAlertType.Success && <SuccessIcon size={20} color="#262626" />}
            {this.props.type === CMSAlertType.Info && <InfoIcon size={20} color="#262626" />}
            {this.props.type === CMSAlertType.Warning && <WarningIcon size={20} color="#262626" />}
            {this.props.type === CMSAlertType.Error && <ErrorIcon size={20} color="#262626" />}
            <Label>{this.props.message}</Label>
        </Stack>
    }
}

export default CMSAlert;