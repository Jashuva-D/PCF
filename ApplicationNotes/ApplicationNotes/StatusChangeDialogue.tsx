import * as React from "react";
import { DefaultButton, Dialog, DialogFooter, PrimaryButton, Link, Stack, StackItem, Label, Dropdown } from "@fluentui/react";  
import { IInputs } from "./generated/ManifestTypes"; 
import { ActivityStateCode } from "./Constants";

interface StatusChangeDialogProps {
    isOpen: boolean;
    context: ComponentFramework.Context<IInputs>,
    recordid: string,
    onComplete: () => void
}
interface StatusChangeDialogState {
    status : number
}

class StatusChangeDialog extends React.Component<StatusChangeDialogProps, StatusChangeDialogState>{
    constructor(props: StatusChangeDialogProps) {
        super(props);
    }
    onSave(){
        var rec = {
            "statecode": this.state.status,
            "statuscode": this.state.status === ActivityStateCode.Open ? 0 : this.state.status === ActivityStateCode.Completed ? 1 : 2
        }
        this.props.context.webAPI.updateRecord("cr549_applicationnotes", this.props.recordid, rec).then(() => {
            this.props.onComplete && this.props.onComplete();
        });
    }

    render() {
        const options = [
            { key: '0', text: 'Completed'}, 
            { key: '1', text: 'Cancelled'},
            { key: "2", text: "Open" }
        ];
        return (
            <Dialog
                hidden={!this.props.isOpen}
                onDismiss={this.props.onComplete}
                dialogContentProps={{
                    title: "Change Status",
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { 
                        main: { maxWidth: 600 },
                    }
                }}
                minWidth={400}
            >   
                <Stack tokens={{childrenGap: 30}}>
                    <Dropdown 
                        placeholder="Select Status"
                        label="Select Status"
                        options={options}
                        onChange={(event, option) => {
                            if(option === undefined) {
                                this.setState({ status: -1 });
                            } else {
                                this.setState({ status: option?.key as number });
                            }
                        }}
                        style={{borderBottom: 20}}
                    />
                    <Stack horizontal tokens={{childrenGap: 10}}>
                        <PrimaryButton 
                            text={"Save"} 
                            onClick={this.onSave.bind(this)}
                            style={{ borderRadius: 6, backgroundColor: "#0D2499" }} 
                        />
                        <DefaultButton 
                            text={"Cancel"} 
                            onClick={this.props.onComplete}
                            style={{ borderRadius: 6 }} 
                        />
                    </Stack>
                </Stack>
                
                
                
                
            </Dialog>
        );      
    }
}
export default StatusChangeDialog;