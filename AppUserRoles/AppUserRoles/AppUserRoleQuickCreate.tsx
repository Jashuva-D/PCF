import * as React from "react";
import { Panel, PrimaryButton } from "@fluentui/react";     
import { IInputs } from "./generated/ManifestTypes";

interface AppUserRoleQuickCreateProps {
    context: ComponentFramework.Context<IInputs>;
    onClose: () => void;
}
interface AppUserRoleQuickCreateState {
    
}   

class AppUserRoleQuickCreate extends React.Component<AppUserRoleQuickCreateProps, AppUserRoleQuickCreateState> {
    constructor(props: AppUserRoleQuickCreateProps) {
        super(props);
        this.state = {
            
        };
    }   

    onSave() {  
        
    }

    render() {
        return (
            <Panel
                headerText="Create New App User Role"
                isOpen={true}
                onDismiss={this.props.onClose}
                closeButtonAriaLabel="Close"
            >
                <p>Content goes here.</p>
                <PrimaryButton text="Save" onClick={this.onSave.bind(this)} />
            </Panel>
        );
    }
}

export default AppUserRoleQuickCreate;
        