import * as React from "react";
const ReactQuill: any = require("react-quill");
import "react-quill/dist/quill.snow.css";
import { Stack, StackItem,PrimaryButton, DefaultButton, Label, TextField, Dropdown, Toggle, Text, IToggleStyleProps } from "@fluentui/react";
import { IInputs } from "./generated/ManifestTypes";
import { CMSAlertType, Interactiontypes } from "./Constants";
import Quill from "quill";
import ProgressBarAlert from "./ProgressBarAlert";
import CMSSpinner from "./CMSSpinner";


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
    showalert : (type: CMSAlertType, message: string) => void,
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
  private expand = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE --><path fill="currentColor" d="M4.22 6.53a.75.75 0 0 0 1.06 0L8 3.81l2.72 2.72a.75.75 0 1 0 1.06-1.06L8.53 2.22a.75.75 0 0 0-1.06 0L4.22 5.47a.75.75 0 0 0 0 1.06m0 2.94a.75.75 0 0 1 1.06 0L8 12.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 0 1 0-1.06"/></svg>`;
  private collapse = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE --><path fill="currentColor" d="M11.78 3.53L8.53 6.78a.75.75 0 0 1-1.06 0L4.22 3.53a.75.75 0 0 1 1.06-1.06L8 5.19l2.72-2.72a.75.75 0 1 1 1.06 1.06M8.53 9.22a.75.75 0 0 0-1.06 0l-3.25 3.25a.75.75 0 1 0 1.06 1.06L8 10.81l2.72 2.72a.75.75 0 1 0 1.06-1.06z"/></svg>`;
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
                obj.props.showalert(CMSAlertType.Success, "Note updated successfully.");
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
            obj.setState({displayprogress : false});
            obj.props.showalert(CMSAlertType.Success, "Note created successfully.");
            obj.props.submitCallBack && obj.props.submitCallBack({ recordid: resp.id, comments: obj.state.comment, topic: obj.state.topic, topicowner: obj.state.topicowner, interactiontype: obj.state.interactiontype});
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

  render() {
    //"1px solid #d1d1d1" : "none"
    return (<>
        <Stack tokens = {{ childrenGap: 15 }} styles={{root: {border: "none", borderRadius: 6, padding: 10, marginBottom: 10, backgroundColor: "#ffffff"}}}>
          {(this.props.recordid == null || this.props.recordid == "") && <StackItem><Text variant="xLarge">Add Note</Text></StackItem>}
          <StackItem>
            <Stack horizontal tokens={{childrenGap: 10}}>
              <StackItem>
                <TextField label="Topic" value={this.state.topic} styles={{fieldGroup : { borderRadius: 5}}} onChange={(evt, newvalue) => {this.setState({topic: newvalue})}}/>
              </StackItem>
              <StackItem>
                <TextField label="Topic Owner" value={this.state.topicowner} styles={{fieldGroup : { borderRadius: 5}}} onChange={(evt, newvalue) => {this.setState({topicowner: newvalue})}}></TextField>
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
                    dropdown: {width: 200, borderRadius: 10},
                    callout: {borderRadius: 5},
                    title: {borderRadius: 5}
                  }}
                />
              </StackItem>
            </Stack>
            {this.state.submittoconfluence && <Stack horizontal tokens={{childrenGap: 10}} style={{marginTop : 10}} >
              <StackItem>
                <TextField label="Confluence Page ID" styles={{fieldGroup : { borderRadius: 5}}} value={this.state.confluencepageid} onChange={(evt, newvalue) => {this.setState({confluencepageid : newvalue})}}/>
              </StackItem>
              <StackItem>
                <TextField label="Confluence Space" styles={{fieldGroup : { borderRadius: 5}}} value={this.state.confluencespace} onChange={(evt, newvalue) => {this.setState({confluencespace : newvalue})}}></TextField>
              </StackItem>
              <StackItem>
                <TextField label="Confluence Page Title" styles={{fieldGroup : { borderRadius: 5}}} style = {{width : 200}} value={this.state.confluencepagetitle} onChange={(evt, newvalue) => {this.setState({confluencepagetitle : newvalue})}}/>
              </StackItem>
            </Stack>}
            <Stack horizontal tokens={{childrenGap : 10}} style={{marginTop : 10}}>
                <StackItem>
                    <Toggle inlineLabel label="Submit to Confluence"  defaultChecked={this.state.submittoconfluence} onChange={() => this.setState({submittoconfluence: !this.state.submittoconfluence})} 
                        styles={{
                          label: {order: 1}, 
                          root: {
                              selectors: {
                              "&:hover .ms-Toggle-thumb": {
                                backgroundColor: "#ffffff !important"
                              }
                            }
                          },
                          thumb: {
                            backgroundColor: this.state.submittoconfluence ? "#ffffff" : "#ffffff",
                            color: "red",
                            height: 20, width: 20, padding: 1,
                            selectors: {
                              ":hover": {
                                backgroundColor: "#ffffff"   // 🔒 keep same color
                              },

                              '[aria-checked="true"] &': {
                                backgroundColor: "#ffffff"
                              },

                              '[aria-checked="true"]:hover &': {
                                backgroundColor: "#ffffff"   // 🔒 even when ON + hover
                              }
                            }
                          }, 
                          container: {display: 'flex', flexDirection: 'row-reverse'},
                          pill: {
                            backgroundColor: this.state.submittoconfluence ? "#0D2499" : "rgb(211,211,211)", 
                            height: 24, padding: 0, width: 44, borderRadius: 12, 
                            selectors: {
                              ':hover': { backgroundColor: this.state.submittoconfluence ? "#0D2499" : "#e6e6e6" }
                            }
                          }
                          
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
                        border: "1px #d1d1d1",
                        overflow: "hidden", 
                        "min-height" : "200px"
                    }}
                    rows={8}
                />
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
                            style={{ borderRadius: 4, borderColor: "#0D2499", color: "#0D2499" }}
                            disabled={this.state.displayprogress}
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
        {/* {this.state.displayprogress && <ProgressBarAlert message={this.state.progressmessage}></ProgressBarAlert>} */}
    </>);
  }
}

export default NoteForm;