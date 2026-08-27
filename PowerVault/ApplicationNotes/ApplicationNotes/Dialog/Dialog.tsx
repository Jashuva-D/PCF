import * as React from "react";

interface DialogProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
}

export class Dialog extends React.Component<DialogProps>  {
    constructor(props: DialogProps) {
        super(props);
    }
    render() {
        return <>
            <div></div>
        </>
    }
}

export default Dialog;
