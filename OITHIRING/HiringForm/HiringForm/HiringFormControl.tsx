import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";

interface HiringFormProps {
    context: ComponentFramework.Context<IInputs>;
}
interface HiringFormState {

}

class HiringFormControl extends React.Component<HiringFormProps, HiringFormState> {
    constructor(props: HiringFormProps) {
        super(props);
        this.state = {};
    }   

    render() {
        return (
            <div> Hello  </div>
        );
    }
}

export default HiringFormControl;