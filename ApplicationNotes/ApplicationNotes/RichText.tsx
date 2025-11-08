import * as React from "react";
const ReactQuill: any = require("react-quill");
import "react-quill/dist/quill.snow.css";
import { Stack, StackItem,PrimaryButton, DefaultButton } from "@fluentui/react";
interface RichTextProps{
    closeCallBack: () => void;
}
interface RichTextState {
  value: string;
}

export default class RichText extends React.Component<RichTextProps, RichTextState> {
  constructor(props: RichTextProps) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleChange = (content: string) => {
    this.setState({ value: content });
  };
  handleSave() {

  }

  render() {
    return (
        <Stack tokens={{ childrenGap: 10 }} styles={{ root: { width: "100%" } }}>
            <StackItem>
                <ReactQuill theme="snow" value={this.state.value} onChange={this.handleChange} />
            </StackItem>

            <StackItem align="end">
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <StackItem>
                        <PrimaryButton
                            text="Submit"
                            onClick={this.handleSave.bind(this)}
                            style={{ borderRadius: 6 }}
                        />
                    </StackItem>

                    <StackItem>
                        <DefaultButton
                            text="Cancel"
                            onClick={() => {
                                this.handleChange("");
                                this.props.closeCallBack && this.props.closeCallBack();
                            }}
                            style={{ borderRadius: 6 }}
                        />
                    </StackItem>
                </Stack>
            </StackItem>
        </Stack>
    );
  }
}