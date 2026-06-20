import * as React from "react";
import { DefaultButton, Dialog, Icon, PrimaryButton, Link, Stack, StackItem, Label } from "@fluentui/react";   

interface CMSDialogProps {
    isOpen: boolean;
    iserror?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    title: string | null | undefined;
    subText: string | null | undefined;
    onDismiss: () => void | undefined;
    onConfirm: () => void | undefined;
    onCancel: () => void | undefined;
}
interface CMSDialogState {

}

class CMSDialog extends React.Component<CMSDialogProps, CMSDialogState>{
    constructor(props: CMSDialogProps) {
        super(props);
    }    

    render() {
        return (
            <Dialog
                hidden={!this.props.isOpen}
                onDismiss={this.props.onDismiss}
                dialogContentProps={{
                    title: <div style={{ display: "inline-flex", alignItems: "center"}}><Icon iconName={this.props.iserror ? "Error" : "Info"} style={{ color: this.props.iserror ? "red" : "#0D2499", fontSize: 24, marginRight: 6}} />{this.props.title} </div>,
                    subText: this.props.subText!,
                    styles: {
                        subText: { whiteSpace: "pre-line" }
                    }
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { 
                        main: { maxWidth: 600 },
                    }
                }}
                minWidth={400}
            >   
                <Stack horizontal tokens={{childrenGap: 10}}>
                    <PrimaryButton 
                        text={this.props.confirmButtonText || "OK"} 
                        onClick={this.props.onConfirm}
                        style={{ borderRadius: 6, backgroundColor: "#0D2499" }} 
                    />
                    <DefaultButton 
                        text={this.props.cancelButtonText || "Cancel"} 
                        onClick={this.props.onCancel}
                        style={{ borderRadius: 6 }} 
                    />
                </Stack>
            </Dialog>
        );      
    }
}
export default CMSDialog;