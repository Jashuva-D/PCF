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
  modules : any = {
    toolbar: [
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  formats : any = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'header', 'list', 'bullet',
    'align',
    'link', 'image', 'video'
  ];

  handleChange = (content: string) => {
    this.setState({ value: content });
  };
  handleSave() {

  }

  render() {
    return (<>
        <Stack tokens = {{ childrenGap: 10 }} styles={{ root: { width: "100%" } }}>
            <StackItem styles={{ root: { flexGrow: 0}}}>
                <ReactQuill
                    theme="snow"
                    value={this.state.value == ""}
                    onChange={this.handleChange.bind(this)}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="Start typing..."
                    styles={{ root: { borderRadius: 6 } }}
                    style={{
                        borderRadius: 6,
                        border: "1px solid #d1d1d1",
                        overflow: "hidden", // ensures inner content stays rounded
                    }}
                    rows={6}
                />
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
    </>);
  }
}