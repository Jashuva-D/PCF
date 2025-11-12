import * as React from "react";
const ReactQuill: any = require("react-quill");
import "react-quill/dist/quill.snow.css";
import { Stack, StackItem,PrimaryButton, DefaultButton, Label, TextField, Dropdown } from "@fluentui/react";
import { IInputs } from "./generated/ManifestTypes";


interface NoteFormProps{
    context: ComponentFramework.Context<IInputs>,
    cancelCallBack: () => void,
    submitCallBack: (recordid: string,content?: string) => void,
    content? : string,
    recordid?: string,
    topic?: string,
    topicowner?: string
}
interface NoteFormState {
  value: string;
  topic?: string;
  topicowner?: string
}

class NoteForm extends React.Component<NoteFormProps, NoteFormState> {
  constructor(props: NoteFormProps) {
    super(props);
    this.state = {
      value: props.content ?? "",
      topic: props.topic ?? "",
      topicowner: props.topicowner ?? ""
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
  onSubmit() {
    var obj = this;
    if(this.props.recordid && this.props.recordid !== "") {
        this.props.context?.webAPI.updateRecord("camp_applicationnotes", this.props.recordid!, { camp_comment: this.state.value }).then(function(resp){
            obj.props.submitCallBack && obj.props.submitCallBack(obj.props.recordid!, obj.state.value);
        });
    }
    else {
        let record = {
          camp_comment: this.state.value,
          "regardingobjectid_camp_application_camp_applicationnotes@odata.bind": `/camp_applications(${(this.props.context as any).page.entityId})`
        }
        this.props.context?.webAPI.createRecord("camp_applicationnotes",record).then(function(resp){
            obj.props.submitCallBack && obj.props.submitCallBack(resp.id, obj.state.value);
        });
    }
  }

  render() {
    const options = [
      {key: "1", text: "Routine Check-In Meeting"},
      {key: "2", text: "Quarterly Strategic Review Meeting"},
      {key: "3", text: "Security Deep Dive"},
      {key: "4", text: "Cost Optimization"},
      {key: "5", text: "Technical Deep Dive"},
      {key: "6", text: "Other"}
    ]
    return (<>
        <Stack tokens = {{ childrenGap: 10 }} styles={{ root: { width: "100%" } }}>
          <StackItem>
            <Stack horizontal tokens={{childrenGap: 10}}>
              <StackItem>
                <TextField label="Topic" value={this.state.topic} onChange={(evt, newvalue) => {this.setState({topic: newvalue})}}/>
              </StackItem>
              <StackItem>
                <TextField label="Topic Owner" value={this.state.topicowner}></TextField>
              </StackItem>
              <StackItem>
                <Dropdown 
                  label="Interaction Type"
                  options={options}
                  dropdownWidth={200}
                />
              </StackItem>
            </Stack>
          </StackItem>
            
            <StackItem styles={{ root: { flexGrow: 0}}}>
                <Label>Comments</Label>
                <ReactQuill
                    theme="snow"
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="Start typing..."
                    style={{
                        borderRadius: 6,
                        border: "1px solid #d1d1d1",
                        overflow: "hidden", 
                    }}
                    rows={6}
                />
            </StackItem>
             <StackItem align="end">
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <StackItem>
                        <PrimaryButton
                            text="Submit"
                            onClick={this.onSubmit.bind(this)}
                            style={{ borderRadius: 6 }}
                        />
                    </StackItem>
                    <StackItem>
                        <DefaultButton
                            text="Cancel"
                            onClick={() => {
                                this.handleChange("");
                                this.props.cancelCallBack && this.props.cancelCallBack();
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

export default NoteForm;