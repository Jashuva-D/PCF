import * as React from "react";
const ReactQuill: any = require("react-quill");
import "react-quill/dist/quill.snow.css";
import { Stack, StackItem,PrimaryButton, DefaultButton, Label, TextField, Dropdown } from "@fluentui/react";
import { IInputs } from "./generated/ManifestTypes";
import { Interactiontypes } from "./Constants";


interface NoteFormProps{
    context: ComponentFramework.Context<IInputs>,
    cancelCallBack: () => void,
    submitCallBack: (record: any) => void,
    content? : string,
    recordid?: string,
    topic?: string,
    topicowner?: string,
    interactiontype? : number
}
interface NoteFormState {
  comment: string;
  topic?: string;
  topicowner?: string,
  interactiontype? : number
}

class NoteForm extends React.Component<NoteFormProps, NoteFormState> {
  constructor(props: NoteFormProps) {
    super(props);
    this.state = {
      comment: props.content ?? "",
      topic: props.topic ?? "",
      topicowner: props.topicowner ?? "",
      interactiontype: props.interactiontype
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
    this.setState({ comment: content });
  };
  onSubmit() {
    var obj = this;
    if(this.props.recordid && this.props.recordid !== "") {
      const record = {
        camp_comment: this.state.comment,
        subject: this.state.topic,
        camp_topicowner: this.state.topicowner,
        camp_interactiontype : this.state.interactiontype,
      }
      this.props.context?.webAPI.updateRecord("camp_applicationnotes", this.props.recordid!, record).then(function(resp){
          obj.props.submitCallBack && obj.props.submitCallBack({ recordid: obj.props.recordid!, comments: obj.state.comment, topic: obj.state.topic, topicowner: obj.state.topicowner, interactiontype: obj.state.interactiontype});
      });
    }
    else {
        const record = {
          camp_comment: this.state.comment,
          "regardingobjectid_camp_application_camp_applicationnotes@odata.bind": `/camp_applications(${(this.props.context as any).page.entityId})`,
          subject: this.state.topic,
          camp_topicowner: this.state.topicowner,
          camp_interactiontype : this.state.interactiontype,
        }
        this.props.context?.webAPI.createRecord("camp_applicationnotes",record).then(function(resp){
            obj.props.submitCallBack && obj.props.submitCallBack({ recordid: resp.id, comments: obj.state.comment, topic: obj.state.topic, topicowner: obj.state.topicowner, interactiontype: obj.state.interactiontype});
        });
    }
  }

  render() {
    
    return (<>
        <Stack tokens = {{ childrenGap: 10 }} styles={{ root: { width: "100%" } }}>
          <StackItem>
            <Stack horizontal tokens={{childrenGap: 10}}>
              <StackItem>
                <TextField label="Topic" value={this.state.topic} onChange={(evt, newvalue) => {this.setState({topic: newvalue})}}/>
              </StackItem>
              <StackItem>
                <TextField label="Topic Owner" value={this.state.topicowner} onChange={(evt, newvalue) => {this.setState({topicowner: newvalue})}}></TextField>
              </StackItem>
              <StackItem>
                <Dropdown 
                  label="Interaction Type"
                  options={Interactiontypes}
                  dropdownWidth={200}
                  onChange={(evt,option) => {this.setState({interactiontype : option?.key as number})}}
                  selectedKey={this.state.interactiontype}
                  styles={{
                    root: {width: 200},
                    dropdown: {width: 200}
                  }}
                />
              </StackItem>
            </Stack>
          </StackItem>
            
            <StackItem styles={{ root: { flexGrow: 0}}}>
                <Label>Comments</Label>
                <ReactQuill
                    theme="snow"
                    value={this.state.comment}
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