import * as React from "react";
const ReactQuill: any = require("react-quill");
import "react-quill/dist/quill.snow.css";
import { Stack, StackItem,DefaultButton, Label, TextField, Dropdown, Text } from "@fluentui/react";
import { IInputs } from "./generated/ManifestTypes";
import { CMSAlertType, Interactiontypes, NoteTabs } from "./Constants";
import CMSSpinner from "./CMSSpinner";
import * as ReactDOM from "react-dom";
import Note from "./Note";
import LookupControl from "./LookupControl";


interface NoteFormProps{
  context: ComponentFramework.Context<IInputs>,
  cancelCallBack: () => void,
  submitCallBack: (record: any) => void,
  content? : string,
  actionitems? : string,
  recordid?: string,
  name?: string,
  topic?: string,
  topicowner?: string,
  interactiontype? : number,
  interactiondescription? : string,
  application_id? : string,
  application_name? : string,
  submittoconfluence? : boolean,
  confluencepageid? : string,
  confluencespace? : string,
  confluencepagetitle? : string,
  showalert : (type: CMSAlertType, message: string) => void,
}
interface NoteFormState {
  comment: string
  actionitems: string
  name?: string
  topic?: string
  topicowner?: string,
  interactiontype? : number,
  interactiondescription? : string,
  application_id? : string,
  application_name? : string,
  submittoconfluence? : boolean,
  confluencepageid? : string,
  confluencespace? : string,
  confluencepagetitle? : string,
  progressmessage : string,
  displayprogress : boolean,
  expand : boolean,
  currenttab: NoteTabs
}

class NoteForm extends React.Component<NoteFormProps, NoteFormState> {
  private RQ = ReactQuill.Quill;
  private expand = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE --><path fill="currentColor" d="M4.22 6.53a.75.75 0 0 0 1.06 0L8 3.81l2.72 2.72a.75.75 0 1 0 1.06-1.06L8.53 2.22a.75.75 0 0 0-1.06 0L4.22 5.47a.75.75 0 0 0 0 1.06m0 2.94a.75.75 0 0 1 1.06 0L8 12.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 0 1 0-1.06"/></svg>`;
  private collapse = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE --><path fill="currentColor" d="M11.78 3.53L8.53 6.78a.75.75 0 0 1-1.06 0L4.22 3.53a.75.75 0 0 1 1.06-1.06L8 5.19l2.72-2.72a.75.75 0 1 1 1.06 1.06M8.53 9.22a.75.75 0 0 0-1.06 0l-3.25 3.25a.75.75 0 1 0 1.06 1.06L8 10.81l2.72 2.72a.75.75 0 1 0 1.06-1.06z"/></svg>`;
  private icons = this.RQ.import("ui/icons");

  constructor(props: NoteFormProps) {
    super(props);
    this.state = {
      comment: props.content ?? "",
      actionitems: props.actionitems ?? "",
      name: props.name ?? "",
      topic: props.topic ?? "",
      topicowner: props.topicowner ?? "",
      interactiontype: props.interactiontype,
      interactiondescription: props.interactiondescription,
      application_id: props.application_id,
      application_name: props.application_name,
      submittoconfluence : props.submittoconfluence,
      confluencepageid : props.confluencepageid,
      confluencepagetitle : props.confluencepagetitle,
      confluencespace : props.confluencespace,
      progressmessage : "",
      displayprogress : false,
      expand : false,
      currenttab: NoteTabs.Comments
    };
    
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
        [{ expand: "expand", class: "expand-button", title: "Expand" }],
        [{ collapse: "collapse", class: "collapse-button", title: "Collapse"}]
      ],
      handlers: {
        expand: () => {
          // const root = document.querySelector(".ql-container")!.parentElement!;
          // if (root.classList.contains("quill-fullscreen")) {
          //   //root.classList.remove("quill-fullscreen");
          // } else {
          //   //root.classList.add("quill-fullscreen");
          //   root.classList.add("fullscreen-container");
          // }
          this.setState({expand: true});
        },
        collapse: () => {
          // const root = document.querySelector(".ql-container")!.parentElement!;
          // if (root.classList.contains("fullscreen-container")) {
          //   //root.classList.remove("quill-fullscreen");
          //   root.classList.remove("fullscreen-container");
          // } else {
          //   //root.classList.add("quill-fullscreen");
          // }
          this.setState({expand: false})
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

  private addQuillTooltips() {
  const tooltipMap: Record<string, string> = {
    'ql-font': 'Font',
    'ql-size': 'Font Size',
    'ql-bold': 'Bold',
    'ql-italic': 'Italic',
    'ql-underline': 'Underline',
    'ql-strike': 'Strikethrough',
    'ql-color': 'Text Color',
    'ql-background': 'Background Color',
    'ql-header': 'Heading',
    'ql-list.ql-ordered': 'Numbered List',
    'ql-list.ql-bullet': 'Bullet List',
    'ql-align': 'Text Alignment',
    'ql-link': 'Insert Link',
    'ql-image': 'Insert Image',
    'ql-video': 'Insert Video',
    'ql-clean': 'Clear Formatting',
    'ql-expand': 'Expand Editor',
    'ql-collapse': 'Collapse Editor'
  };

  Object.keys(tooltipMap).forEach(selector => {
    const el = document.querySelector(`.${selector.replace('.', ' ')}`);
    if (el) {
      el.setAttribute('title', tooltipMap[selector]);
    }
  });
}


  handleChange = (content: string) => {
    if(this.state.currenttab === NoteTabs.Comments) {
      this.setState({ comment: content });
    }else {
      this.setState({ actionitems: content });
    }
  };
  onSubmit() {
    var obj = this;
    obj.setState({displayprogress: true, progressmessage: "Submitting..."})
    if(this.props.recordid && this.props.recordid !== "") {
      
      const record = {
        cr549_comments: this.state.comment,
        cr549_actionitems: this.state.actionitems,
        cr549_summary: this.state.topic,
        cr549_interactiontype : this.state.interactiontype,
        cr549_interactiondescription : this.state.interactiondescription,
        "cr549_ApplicationName@odata.bind": (this.state.application_id != undefined && this.state.application_id != null) ? `/cr549_applications(${this.state.application_id})` : null
      }
      this.props.context?.webAPI.updateRecord("cr549_inquirynotes", this.props.recordid!, record).then(function(resp){
          obj.props.showalert(CMSAlertType.Success, "Note updated successfully.");
          obj.props.submitCallBack && obj.props.submitCallBack({ recordid: obj.props.recordid!, comments: obj.state.comment, topic: obj.state.topic, topicowner: obj.state.topicowner, interactiontype: obj.state.interactiontype});
          obj.setState({
            displayprogress: false,
          })
      }, function(err: any){
          obj.setState({displayprogress: false})
          obj.props.context.navigation.openErrorDialog({
              message: err.message
          });
      });
    }
    else {
        const record = {
          cr549_comments: this.state.comment,
          cr549_actionitems: this.state.actionitems,
          cr549_summary: this.state.topic,
          cr549_interactiontype : this.state.interactiontype,
          cr549_interactiondescription : this.state.interactiondescription,
          "cr549_CCIFPPIFTicket@odata.bind": (this.props.context as any).page.entityTypeName == "cr549_interestform" ? `/cr549_interestforms(${(this.props.context as any).page.entityId})` : null,
          "cr549_InterestForm@odata.bind" : (this.props.context as any).page.entityTypeName == "cr549_interestform" ? `/cr549_interestforms(${(this.props.context as any).page.entityId})` : null,
          "cr549_PPInterestForm" : (this.props.context as any).page.entityTypeName == "cr549_ppinterestforms" ? `/cr549_ppinterestformses(${(this.props.context as any).page.entityId})` : null,
          "cr549_ApplicationName@odata.bind": (this.state.application_id != undefined && this.state.application_id != null) ? `/cr549_applications(${this.state.application_id})` : null
        }
        this.props.context?.webAPI.createRecord("cr549_inquirynotes",record).then(function(resp){
            obj.props.showalert(CMSAlertType.Success, "Note created successfully.");
            obj.props.submitCallBack && obj.props.submitCallBack({ recordid: resp.id, comments: obj.state.comment, topic: obj.state.topic, topicowner: obj.state.topicowner, interactiontype: obj.state.interactiontype});
            obj.setState({
              displayprogress: false,
            });
        },function(error){
            obj.setState({displayprogress: false});
            obj.props.context.navigation.openErrorDialog({
              message: error.message
            }).then(() => {
              obj.props.showalert(CMSAlertType.Error, "Error creating note: \n" + error?.message);
            },() => {});
        });
    }
  }
  componentDidMount(): void {
    setTimeout(() => {
      this.addQuillTooltips();
    }, 0);
  }

  componentDidUpdate(): void {
    setTimeout(() => {
      this.addQuillTooltips();
    }, 0);
  }
  render() {
    const quillEditor = (
      <ReactQuill
        theme="snow"
        value={this.state.currenttab === NoteTabs.Comments ? this.state.comment : this.state.actionitems}
        onChange={this.handleChange.bind(this)}
        modules={this.modules}
        formats={this.formats}
        placeholder="Start typing..."
        style={{
          borderRadius: 6,
          border: "1px #d1d1d1",
          overflow: "hidden",
          overflowY: "auto",
          minHeight: "200px",
        }}
        rows={8}
      />
    );

    return (
      <>
        <Stack
          tokens={{ childrenGap: 15 }}
          styles={{
            root: {
              border: "none",
              borderRadius: 6,
              padding: 10,
              marginBottom: 10,
              backgroundColor: "#ffffff",
            },
          }}
        >
        {(this.props.recordid == null || this.props.recordid == "") && <StackItem><Text variant="xLarge">Add Note</Text></StackItem>}
          <StackItem>
            <Stack horizontal tokens={{childrenGap: 24}} grow>
              {/* <StackItem grow>
                <TextField label="Name" value={this.state.name} styles={{fieldGroup : { borderRadius: 5}}} onChange={(evt, newvalue) => {this.setState({name: newvalue})}}/>
              </StackItem> */}
              <StackItem grow>
                <TextField label="Topic" value={this.state.topic} styles={{fieldGroup : { borderRadius: 5}}} onChange={(evt, newvalue) => {this.setState({topic: newvalue})}}/>
              </StackItem>
              <StackItem grow>
                <Label>Application</Label>
                <LookupControl 
                    context={this.props.context} entityType="cr549_application" recordId={this.state.application_id!}
                    onRecordSelect={(id, name) => {
                          this.setState({application_id: id, application_name: name});
                    }}
                />
              </StackItem>
              <StackItem grow>
                <Dropdown
                  label="Interaction Type"
                  options={Interactiontypes}
                  selectedKey={this.state.interactiontype}
                  onChange={(evt, option) =>
                    this.setState({ interactiontype: option?.key as number })
                  }
                  styles={{
                    root: {
                      width: "100%",      // fill StackItem
                      minWidth: 250,      // but never smaller than 250
                    },
                    dropdown: {
                      width: "100%",
                      minWidth: 250,
                      borderRadius: 10,
                    },
                    title: {
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 5,
                    },
                    callout: {
                      borderRadius: 5,
                      minWidth: 250,      // important for popup width
                    },
                  }}
                />
              </StackItem>
              
            </Stack>
            {this.state.interactiontype && this.state.interactiontype === 512150005 && (
            <Stack horizontal tokens={{childrenGap: 10}} styles={{root: {marginTop: 10}}}>
                <StackItem grow>
                  <TextField label="Other Interaction Type" value={this.state.interactiondescription} styles={{ fieldGroup: { borderRadius: 5, width: "100%" } }} onChange={(evt, newvalue) => { this.setState({ interactiondescription: newvalue }) }}></TextField>
                </StackItem>
            </Stack>)}
          </StackItem>
          <StackItem style={{padding: 10}}>
                <DefaultButton 
                  style={{border: 0, 
                  borderBottom: this.state.currenttab === NoteTabs.Comments ? "2px solid #0D2499" : "none"}} 
                  onClick={() => this.setState({currenttab: NoteTabs.Comments})}>
                    Comments
                </DefaultButton>
                <DefaultButton 
                  style={{border: 0, 
                  borderBottom: this.state.currenttab === NoteTabs.ActionItems ? "2px solid #0D2499" : "none"}} 
                  onClick={() => this.setState({currenttab: NoteTabs.ActionItems})}>
                    Action Items
                </DefaultButton>
          </StackItem>
          <StackItem styles={{ root: { flexGrow: 0}}}>
            {!this.state.expand && quillEditor}
          </StackItem>
          <StackItem align="end">
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                    {this.state.displayprogress && <StackItem>
                      <CMSSpinner />
                    </StackItem> 
                    }
                    <StackItem>
                        <DefaultButton
                            text="Submit"
                            onClick={this.onSubmit.bind(this)}
                            style={{ 
                              borderRadius: 4, 
                              border: 0,
                              color: (this.state.submittoconfluence && (!this.state.confluencepageid?.trim())) ? "#5A5A5A" : "white",
                              backgroundColor: this.state.submittoconfluence && (!this.state.confluencepageid?.trim()) ? "#F2F2F2" : "#0D2499",
                            }}
                            disabled={(this.state.submittoconfluence && (!this.state.confluencepageid?.trim()) ) || this.state.displayprogress}
                        />
                  </StackItem>
                  <StackItem>
                      <DefaultButton
                          text="Cancel"
                          onClick={() => {
                              this.handleChange("");
                              this.props.cancelCallBack && this.props.cancelCallBack();
                          }}
                          disabled={this.state.displayprogress}
                          style={{ borderRadius: 4,  backgroundColor: "rgb(243,243,243)", borderColor: "#262626" }}
                      />
                  </StackItem>
                </Stack>
          </StackItem> 
        </Stack>
        { this.state.expand &&
          ReactDOM.createPortal(
            <div className="fullscreen-container1">
               <div className="resize-shell">
                <div className="popup-content">
                  <Stack horizontal tokens={{ childrenGap: 20 }} style={{ marginBottom: 20 }}>
                    <><Text><b>Topic: </b>{this.state.topic}</Text></>
                    <><Text><b>Interaction Type: </b>{Interactiontypes.find(i => i.key === this.state.interactiontype)?.text}</Text></>
                    {this.state.interactiontype != null && this.state.interactiontype === 6 && <><Text><b>Interaction Description: </b>{this.state.interactiondescription}</Text></>}
                  </Stack>
                  {quillEditor}
                </div>
              </div>
            </div>,
            document.body)
        }
    </>);
  }
}

export default NoteForm;