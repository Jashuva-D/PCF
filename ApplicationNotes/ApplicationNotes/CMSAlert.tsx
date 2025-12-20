import * as React from "react";
import { Label, Stack, StackItem } from "@fluentui/react";
import { ClockIcon, TestICon, TickIcon } from "./icons";
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
        return <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 12 }}
        >
            <span style={{
                backgroundColor: this.props.type === CMSAlertType.Success ? "green" : this.props.type === CMSAlertType.Info ? "blue" : this.props.type === CMSAlertType.Warning ? "orange" : "red", 
                width: 10,
                height: 40
            }}>
            </span>
            {this.props.type === CMSAlertType.Success && <TickIcon size={20} color="green" />}
            {this.props.type === CMSAlertType.Info && <TickIcon size={20} color="blue" />}
            {this.props.type === CMSAlertType.Warning && <TickIcon size={20} color="orange" />}
            {this.props.type === CMSAlertType.Error && <TickIcon size={20} color="red" />}
            <Label>{this.props.message}</Label>
        </Stack>
    }
}

export default CMSAlert;