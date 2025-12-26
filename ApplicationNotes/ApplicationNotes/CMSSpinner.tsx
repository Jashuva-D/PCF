import * as React from "react";
import { SpinnerIcon } from "./icons";

interface CMSSpinnerProps {

}
interface CMSSpinnerState {

}

class CMSSpinner extends React.Component<CMSSpinnerProps, CMSSpinnerState> {
    constructor(props: CMSSpinnerProps) {
        super(props);
    }   
    render(): React.ReactNode {
        return <>
            <style>
                {`
                @keyframes rotateSpinner {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                `}
            </style>
            <SpinnerIcon />
        </>
    }
}

export default CMSSpinner;

        