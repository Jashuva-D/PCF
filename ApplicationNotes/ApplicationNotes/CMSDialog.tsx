import * as React from "react";
import { DefaultButton, Dialog, DialogFooter, PrimaryButton, Link, Stack, StackItem, Label } from "@fluentui/react";   

interface CMSDialogProps {
    isOpen: boolean;
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
                    title: this.props.title!,
                    subText: this.props.subText!,
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
                    <Link text={this.props.cancelButtonText || "Cancel"} underline={true} onClick={this.props.onCancel}> <Label style={{ color: "#0D2499" }}>Cancel</Label></Link>
                </Stack> 
                
                
                
            </Dialog>
        );      
    }
}
export default CMSDialog;