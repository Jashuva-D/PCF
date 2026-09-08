import * as React from "react";
import { DefaultButton, Dialog, Icon, PrimaryButton, Link, Stack, StackItem, Label, Text, TextField } from "@fluentui/react";   

interface CMSDialogProps {
    isOpen: boolean;
    iserror?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    title: string | null | undefined;
    subText: string | null | undefined;
    confirmbuttoncolor: string | null;
    subTextElement: React.ReactElement | null;
    takenotes?: boolean 
    noteslabel? : string
    onDismiss: () => void | undefined;
    onConfirm: (notes: string) => void | undefined;
    onCancel: () => void | undefined;


}
interface CMSDialogState {
    notes: string
}

class CMSDialog extends React.Component<CMSDialogProps, CMSDialogState>{
    constructor(props: CMSDialogProps) {
        super(props);
        this.state = {
            notes: ""
        }
    }

    render() {
        return (
            <Dialog
                hidden={!this.props.isOpen}
                onDismiss={this.props.onDismiss}
                dialogContentProps={{
                    //title: <div style={{ display: "inline-flex", alignItems: "center"}}><Icon iconName={this.props.iserror == true ? "Error" : "Info"} style={{ color: this.props.iserror == true ? "red" : "#0D2499", fontSize: 22, paddingRight: 6}} /><Text>{this.props.title}</Text></div>,
                    title: <Text style={{fontSize: 14, fontWeight: 600, color: "#107C10"}}>{this.props.title}</Text>,
                    subText: this.props.takenotes != true ? this.props.subText! : "",
                    styles: {
                        subText: { whiteSpace: "pre-line" }
                    },
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { 
                        main: {maxWidth: 2000, minWidth: 2000 },
                    }
                }}
                minWidth={400}
            >
            <Stack style={{border: "1px solid", borderColor: "#107C10",backgroundColor: "#ECFDF5", borderRadius: 6, padding: 10 }}>
                {this.props.takenotes && <TextField multiline label={this.props.noteslabel ?? ""} style={{ borderRadius: 10}} styles={{root: {borderRadius: 10}}} placeholder="Enter Notes" onChange={ (evt, newvalue) => { this.setState({notes: newvalue ?? ""})} }></TextField>}
                <Stack horizontal tokens={{childrenGap: 10}} style={{marginTop: 20}}>
                    <PrimaryButton 
                        text={this.props.confirmButtonText || "OK"} 
                        onClick={() => this.props.onConfirm(this.state.notes)}
                        style={{ borderRadius: 6, backgroundColor: this.props.confirmbuttoncolor ?? "#0D2499", borderColor: this.props.confirmbuttoncolor ?? "#0D2499" }} 
                    />
                    <DefaultButton 
                        text={this.props.cancelButtonText || "Cancel"} 
                        onClick={this.props.onCancel}
                        style={{ borderRadius: 6 }} 
                    />
                </Stack>
            </Stack>
            
            </Dialog>
        );      
    }
}
export default CMSDialog;