import * as React from "react";
import { Dialog, DialogFooter, PrimaryButton, DefaultButton } from "@fluentui/react";

interface CustomDialogProps {
    
}
interface CustomDialogState {
    hideDialog: boolean
}
export class CustomDialog extends React.Component<CustomDialogProps, CustomDialogState> {
    constructor(props: CustomDialogProps){
        super(props);
        this.state = {
            hideDialog: true
        }
    }

    render(): React.ReactNode {
        return <Dialog
        hidden={this.state.hideDialog}
        onDismiss={() => {}}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => {}} text="Delete" />
          <DefaultButton onClick={() => {}} text="Cancel" />
        </DialogFooter>
      </Dialog>
    }
}

export default CustomDialog;