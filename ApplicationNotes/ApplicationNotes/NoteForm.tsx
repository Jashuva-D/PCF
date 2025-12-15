import * as React from "react";
const ReactQuill: any = require("react-quill");
import "react-quill/dist/quill.snow.css";
import { Stack, StackItem,PrimaryButton, DefaultButton, Label, TextField, Dropdown, Toggle, Text } from "@fluentui/react";
import { IInputs } from "./generated/ManifestTypes";
import { Interactiontypes } from "./Constants";
import Quill from "quill";
import ProgressBarAlert from "./ProgressBarAlert";


interface NoteFormProps{
    context: ComponentFramework.Context<IInputs>,
    cancelCallBack: () => void,
    submitCallBack: (record: any) => void,
    content? : string,
    recordid?: string,
    topic?: string,
    topicowner?: string,
    interactiontype? : number,
    submittoconfluence? : boolean,
    confluencepageid? : string,
    confluencespace? : string,
    confluencepagetitle? : string,
}
interface NoteFormState {
  comment: string;
  topic?: string;
  topicowner?: string,
  interactiontype? : number,
  submittoconfluence? : boolean,
  confluencepageid? : string,
  confluencespace? : string,
  confluencepagetitle? : string,
  progressmessage : string,
  displayprogress : boolean
}

class NoteForm extends React.Component<NoteFormProps, NoteFormState> {
  private RQ = ReactQuill.Quill;
  private expand = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none">
      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
      <path fill="currentColor" d="M8.94 12.94a1.5 1.5 0 0 1 2.224 2.007l-.103.114L7.12 19H8.5a1.5 1.5 0 0 1 .144 2.993L8.5 22h-5a1.5 1.5 0 0 1-1.493-1.356L2 20.5v-5a1.5 1.5 0 0 1 2.993-.144L5 15.5v1.379zM20.5 2a1.5 1.5 0 0 1 1.493 1.356L22 3.5v5a1.5 1.5 0 0 1-2.993.144L19 8.5V7.121l-3.94 3.94a1.5 1.5 0 0 1-2.224-2.008l.103-.114L16.88 5H15.5a1.5 1.5 0 0 1-.144-2.993L15.5 2z" />
    </g>
  </svg>`;
  private collapse = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <rect width="24" height="24" fill="none" />
    <g fill="none">
      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
      <path fill="currentColor" d="M10.5 12a1.5 1.5 0 0 1 1.493 1.356L12 13.5v5a1.5 1.5 0 0 1-2.993.144L9 18.5v-1.379l-3.94 3.94a1.5 1.5 0 0 1-2.224-2.008l.103-.114L6.88 15H5.5a1.5 1.5 0 0 1-.144-2.993L5.5 12zm8.44-9.06a1.5 1.5 0 0 1 2.224 2.007l-.103.114L17.12 9h1.38a1.5 1.5 0 0 1 .144 2.993L18.5 12h-5a1.5 1.5 0 0 1-1.493-1.356L12 10.5v-5a1.5 1.5 0 0 1 2.993-.144L15 5.5v1.379l3.94-3.94Z" />
    </g>
  </svg>`;
  private icons = this.RQ.import("ui/icons");

  constructor(props: NoteFormProps) {
    super(props);
    this.state = {
      comment: props.content ?? "",
      topic: props.topic ?? "",
      topicowner: props.topicowner ?? "",
      interactiontype: props.interactiontype,
      submittoconfluence : props.submittoconfluence,
      confluencepageid : props.confluencepageid,
      confluencepagetitle : props.confluencepagetitle,
      confluencespace : props.confluencespace,
      progressmessage : "",
      displayprogress : false
    };
    //const RQ = ReactQuill.Quill;
    //const fluentChevronDown = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M8.94 12.94a1.5 1.5 0 0 1 2.224 2.007l-.103.114L7.12 19H8.5a1.5 1.5 0 0 1 .144 2.993L8.5 22h-5a1.5 1.5 0 0 1-1.493-1.356L2 20.5v-5a1.5 1.5 0 0 1 2.993-.144L5 15.5v1.379zM20.5 2a1.5 1.5 0 0 1 1.493 1.356L22 3.5v5a1.5 1.5 0 0 1-2.993.144L19 8.5V7.121l-3.94 3.94a1.5 1.5 0 0 1-2.224-2.008l.103-.114L16.88 5H15.5a1.5 1.5 0 0 1-.144-2.993L15.5 2z"/></g></svg>`;
    
//     const fluentChevronDown = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
// 	<rect width="24" height="24" fill="none" />
// 	<g fill="none">
// 		<path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
// 		<path fill="currentColor" d="M10.5 12a1.5 1.5 0 0 1 1.493 1.356L12 13.5v5a1.5 1.5 0 0 1-2.993.144L9 18.5v-1.379l-3.94 3.94a1.5 1.5 0 0 1-2.224-2.008l.103-.114L6.88 15H5.5a1.5 1.5 0 0 1-.144-2.993L5.5 12zm8.44-9.06a1.5 1.5 0 0 1 2.224 2.007l-.103.114L17.12 9h1.38a1.5 1.5 0 0 1 .144 2.993L18.5 12h-5a1.5 1.5 0 0 1-1.493-1.356L12 10.5v-5a1.5 1.5 0 0 1 2.993-.144L15 5.5v1.379l3.94-3.94Z" />
// 	</g>
// </svg>`;
    //const icons = RQ.import("ui/icons");
    this.icons["expand"] = this.expand;
    this.icons["collapse"] = this.collapse;
  }
  

  modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean'],
        [{ expand: "expand", class: "expand-button" }],
        [{ collapse: "collapse", class: "collapse-button"}]
      ],
      handlers: {
        expand: () => {
          const root = document.querySelector(".ql-container")!.parentElement!;
          if (root.classList.contains("quill-fullscreen")) {
            //root.classList.remove("quill-fullscreen");
          } else {
            root.classList.add("quill-fullscreen");
          }
        },
        collapse: () => {
          const root = document.querySelector(".ql-container")!.parentElement!;
          if (root.classList.contains("quill-fullscreen")) {
            root.classList.remove("quill-fullscreen");
          } else {
            //root.classList.add("quill-fullscreen");
          }
        }
      }

    }
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
    obj.setState({displayprogress: true, progressmessage: "Submitting..."})
    if(this.props.recordid && this.props.recordid !== "") {
      const record = {
        camp_comment: this.state.comment,
        subject: this.state.topic,
        camp_topicowner: this.state.topicowner,
        camp_interactiontype : this.state.interactiontype,
        camp_sharewithconfluence : this.state.submittoconfluence,
        camp_confluenceurl : this.state.confluencepageid,
        camp_confluencespace : this.state.confluencespace,
        camp_confluencepagetitle : this.state.confluencepagetitle
      }
      this.props.context?.webAPI.updateRecord("camp_applicationnotes", this.props.recordid!, record).then(function(resp){
          var request = {
            entity: { entityType: "camp_applicationnotes", id: obj.props.recordid! },
            getMetadata: function () {
              return {
                boundParameter: "entity",
                parameterTypes: {
                  entity: { typeName: "mscrm.camp_applicationnotes", structuralProperty: 5 }
                },
                operationType: 0, operationName: "camp_PushToConfluencePage"
              };
            }
          };

          (obj.props.context.webAPI as any).execute(request).then(
            function success(response : any) {
              if (response.ok) { 
                console.log("Success"); 
                obj.props.submitCallBack && obj.props.submitCallBack({ recordid: obj.props.recordid!, comments: obj.state.comment, topic: obj.state.topic, topicowner: obj.state.topicowner, interactiontype: obj.state.interactiontype});
                obj.setState({displayprogress : false})
              }
            }
          ).catch(function (error : any) {
              obj.setState({displayprogress: false})
              obj.props.context.navigation.openErrorDialog({
                message: error.message
              })
          });
      });
    }
    else {
        const record = {
          camp_comment: this.state.comment,
          "regardingobjectid_camp_application_camp_applicationnotes@odata.bind": `/camp_applications(${(this.props.context as any).page.entityId})`,
          subject: this.state.topic,
          camp_topicowner: this.state.topicowner,
          camp_interactiontype : this.state.interactiontype,
          camp_sharewithconfluence : this.state.submittoconfluence,
          camp_confluenceurl : this.state.confluencepageid,
          camp_confluencespace : this.state.confluencespace,
          camp_confluencepagetitle : this.state.confluencepagetitle
        }
        this.props.context?.webAPI.createRecord("camp_applicationnotes",record).then(function(resp){
            obj.props.submitCallBack && obj.props.submitCallBack({ recordid: resp.id, comments: obj.state.comment, topic: obj.state.topic, topicowner: obj.state.topicowner, interactiontype: obj.state.interactiontype});
        });
    }
  }

  render() {
    
    return (<>
        <Stack tokens = {{ childrenGap: 15 }} styles={{root: {border: "1px solid #d1d1d1", borderRadius: 6, padding: 5, marginBottom: 10, backgroundColor: "#ffffff"}}}>
          <StackItem><Text variant="xxLarge">Add Note</Text></StackItem>
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
            {this.state.submittoconfluence && <Stack horizontal tokens={{childrenGap: 10}} style={{marginTop : 10}} >
              <StackItem>
                <TextField label="Confluence Page ID" value={this.state.confluencepageid} onChange={(evt, newvalue) => {this.setState({confluencepageid : newvalue})}}/>
              </StackItem>
              <StackItem>
                <TextField label="Confluence Space" value={this.state.confluencespace} onChange={(evt, newvalue) => {this.setState({confluencespace : newvalue})}}></TextField>
              </StackItem>
              <StackItem>
                <TextField label="Confluence Page Title" style = {{width : 200}} value={this.state.confluencepagetitle} onChange={(evt, newvalue) => {this.setState({confluencepagetitle : newvalue})}}/>
              </StackItem>
            </Stack>}
            <Stack horizontal tokens={{childrenGap : 10}} style={{marginTop : 10}}>
                <StackItem>
                    <Toggle inlineLabel label="Share with Confluence"  defaultChecked={this.state.submittoconfluence} onChange={() => this.setState({submittoconfluence: !this.state.submittoconfluence})} styles={{label: {order: 1}, container: {display: 'flex', flexDirection: 'row-reverse'}}} />
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
                        "min-height" : "200px"
                    }}
                    rows={8}
                />
            </StackItem>
             <StackItem align="end">
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <StackItem>
                        <PrimaryButton
                            text="Submit"
                            onClick={this.onSubmit.bind(this)}
                            style={{ borderRadius: 6 }}
                            styles={{rootHovered: {color : "black"}}}
                        />
                    </StackItem>
                    <StackItem>
                        <DefaultButton
                            text="Cancel"
                            onClick={() => {
                                this.handleChange("");
                                this.props.cancelCallBack && this.props.cancelCallBack();
                            }}
                            style={{ borderRadius: 6, borderColor:"#D20103" , backgroundColor: "#D20103"}}
                            styles={{root: {color : "white"}}}
                        />
                    </StackItem>
                </Stack>
            </StackItem> 
        </Stack>
        {this.state.displayprogress && <ProgressBarAlert message={this.state.progressmessage}></ProgressBarAlert>}
    </>);
  }
}

export default NoteForm;