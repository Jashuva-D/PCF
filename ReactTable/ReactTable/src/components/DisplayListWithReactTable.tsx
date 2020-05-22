import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IInputs } from '../../generated/ManifestTypes';
import {IContact} from '../models/IContact';
import {Column} from 'react-table';
import RenderReactTable from './RenderReactTable';
import {IconButton, Checkbox,PrimaryButton,DefaultButton, TextField, IconNames, Panel} from "office-ui-fabric-react";
import { TooltipHost, ITooltipHostStyles } from 'office-ui-fabric-react/lib/Tooltip';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import Loader from 'react-loader-spinner';



interface DisplayListProps {
    context : ComponentFramework.Context<IInputs>
}
interface DisplayListState {
    multipleeditrecord : any
    openmultipleedit : boolean
    loadingtext : string
    editablerecord : IContact | null,
    columns : Column[],
    rows : IContact[],
    selectedrows : string[]
    allselected : boolean,
    oneunselected : boolean,
    opendeleteconfirmation : boolean
    openloading : boolean
}

class DisplayList extends React.Component<DisplayListProps,DisplayListState> {
    
    constructor(props : DisplayListProps){
        super(props);
        this.state = {
            multipleeditrecord : {} as any,
            openmultipleedit : false,
            editablerecord : null,
            oneunselected : false,
            allselected : false,
            selectedrows : [],
            columns : [],
            rows : [],
            opendeleteconfirmation : false,
            openloading : false,
            loadingtext : ""
        }
    }
    public GetConstantColumns = (estate : DisplayListState) => { 
      return [
                  {
                    id : "checkboxcolumn",
                    width : 45,
                    Header : <Checkbox 
                                onChange = {(event ,selected) => {
                                                    if(selected != undefined){
                                                      var temp = [] as string[]
                                                      this.state.rows.forEach(x => temp.push(x.contactid));
                                                      this.setState({allselected : selected,selectedrows : selected ? temp : [],editablerecord : null})
                                                    }
                                                  }}
                                checked = {this.state.allselected  && estate.rows.length > 0}
                            />,
                    Cell : props => <Checkbox 
                                    onChange = {(x,y) => {
                                                  this.setState({editablerecord : null})
                                                  if(y){
                                                      var selected = this.state.selectedrows.find(x => x == (props.original as IContact).contactid);
                                                      if(selected == undefined || selected == null){
                                                        this.setState({selectedrows : [...this.state.selectedrows,(props.original as IContact).contactid]})
                                                      }
                                                  }
                                                  else{
                                                    this.setState({allselected : false,selectedrows : this.state.selectedrows.filter(x => x != (props.original as IContact).contactid)})
                                                  }
                                                }
                                            }
                                    checked = {this.state.selectedrows.find(x => x == (props.original as IContact).contactid) != undefined ? true : this.state.allselected }
                                />
                },
                {
                  id : "editbutton",
                  width : 90,
                  Cell : (props : any) => { 
                    return (this.state.editablerecord == null || this.state.editablerecord.contactid != props.original.contactid) ? (
                      <TooltipHost
                        content="edit"
                        id={"tooltipid"}
                      >
                    <IconButton 
                      iconProps = {{iconName : "edit"}} 
                      onClick = {
                        ()=>{
                          this.setState({editablerecord :{...props.original} as IContact });
                        }
                      }
                    />
                    </TooltipHost>) : 
                    (
                      <div>
                        <TooltipHost
                            content="save"
                            id={"tooltipid"}
                        >
                        <IconButton 
                            iconProps = {{iconName : "save"}} 
                            onClick = {
                              () => {
                                let rowsL = this.state.rows;
                                for(var i =0;i<rowsL.length;i++){
                                    if(rowsL[i].contactid == this.state.editablerecord?.contactid){
                                      rowsL[i] = this.state.editablerecord;
                                    }
                                }
                                this.setState({
                                openloading : true,
                                loadingtext : "Saving Data"
                                })
                                this.props.context.webAPI.updateRecord("contact",this.state.editablerecord!.contactid,this.state.editablerecord!).then(
                                  () => {
                                    this.setState({openloading : false,editablerecord : null,rows : rowsL})
                                  }
                                )
                              }
                            } 
                        />
                        </TooltipHost>
                        <span>
                        <TooltipHost 
                          content = "cacel"
                        >
                        <IconButton 
                            iconProps = {{iconName : "cancel"}} 
                            onClick = {
                              () => {
                                this.setState({editablerecord : null,rows : this.state.rows})
                              }
                            } 
                        />
                        </TooltipHost>
                        </span>
                      </div>  
                    )
                  }
                }
            ] as Column[]
    }
    componentDidMount(){
      let columnsL  = [
        {
        Header : "First Name",
        accessor : "firstname",
        Cell : (props : any) => {
            return this.state.editablerecord?.contactid == props.original.contactid ? 
              <TextField 
                defaultValue = {props.original.firstname} 
                underlined = {true} 
                onChange = {
                  (ev,value) => { 
                          let updatablerecord = this.state.editablerecord;
                          updatablerecord!.firstname = value!;
                          this.setState({editablerecord : this.state.editablerecord})}
                        }
              />
              : <div>{props.original.firstname}</div> 
          }
        },
        {
          Header : "Last Name",
          accessor : "lastname",
          Cell : (props : any) => {
            return this.state.editablerecord?.contactid == props.original.contactid ? 
              <TextField 
                defaultValue = {props.original.lastname} 
                underlined = {true} 
                onChange = {
                  (ev,value) => { 
                          let updatablerecord = this.state.editablerecord;
                          updatablerecord!.lastname = value!;
                          this.setState({editablerecord : this.state.editablerecord})}
                        }
              />
              : <div>{props.original.lastname}</div> 
          }
        },
        {
          Header : "Middle Name",
          accessor : "middlename",
          Cell : (props : any) => {
            return this.state.editablerecord?.contactid == props.original.contactid ? 
              <TextField 
                defaultValue = {props.original.middlename} 
                underlined = {true} 
                onChange = {
                  (ev,value) => { 
                          let updatablerecord = this.state.editablerecord;
                          updatablerecord!.middlename = value!;
                          this.setState({editablerecord : this.state.editablerecord})}
                        }
              />
              : <div>{props.original.middlename}</div> 
          }
        },
        {
          Header : "Full Name",
          accessor : "fullname",
          Cell : (props : any) => {
            return this.state.editablerecord?.contactid == props.original.contactid ? 
              <TextField 
                defaultValue = {props.original.fullname} 
                underlined = {true} 
                onChange = {
                  (ev,value) => { 
                          let updatablerecord = this.state.editablerecord;
                          updatablerecord!.fullname = value!;
                          this.setState({editablerecord : this.state.editablerecord})}
                        }
              />
              : <div>{props.original.fullname}</div> 
          }
        }
      ] as Column[]
     
      var GetRecords = () : IContact[] => {
        var contacts = [] as IContact[]
        for(var i=0; i<10; i++){
          contacts.push({
            contactid : i.toString(),
            firstname : "Jashuva",
            lastname : "Devireddy",
            middlename : "nothing",
            fullname : `Jashuva Devireddy ${i}`,
          } as IContact
          )
        }
        return contacts;
      }
      // this.setState({
      //   columns : columnsL,
      //   rows : GetRecords()
        
      // });
      this.props.context.webAPI.retrieveMultipleRecords("contact").then(
        (response) => {
          let GetRecords = () : IContact[] =>{
            var contacts  = [] as IContact[];
            response.entities.map(x => contacts.push({firstname: x.firstname,fullname: x.fullname,middlename:x.middlename,lastname:x.lastname,contactid:x.contactid} as IContact) );
            return contacts;
          }    
          this.setState({columns:columnsL,rows:GetRecords()})
        }
      )
    }
    
    public render() : JSX.Element{
      debugger;
      const dialogContentProps = {
        type: DialogType.normal,
        title: 'Delete Confirmation',
        closeButtonAriaLabel: 'Close',
        subText: 'Are you sure, you want to delete ?',
      };
      
      let records = [...this.state.rows];
      let constantcolumns = this.GetConstantColumns(this.state);
      if(this.state.selectedrows.length !=0)
        constantcolumns = constantcolumns.filter(x => x.id != "editbutton");
      let columns = [...constantcolumns,...(this.state.columns).filter(x=>(x.id != "checkboxcolumn" && x.id != "savebutton" && x.id != "editbutton") || x.id == null || x.id == undefined)]
      return (
          
          <div className="headerDiv">
            <div>
            {this.state.openmultipleedit && 
              <Panel
                isOpen = {this.state.openmultipleedit}
                onDismiss = {() => {this.setState({openmultipleedit : false})}}
                headerText  = "Hello"
                closeButtonAriaLabel = "close"
                isFooterAtBottom = {true}
                onRenderFooter = {
                  () => 
                  <div style={{marginLeft : 15}}>
                    <PrimaryButton text="save" 
                      styles={{root : {marginRight : 8}}}
                      onClick = {
                        ()=> {
                        //alert(this.state.multipleeditrecord.firstname)
                        let keys = Object.keys(this.state.multipleeditrecord);
                        let rowsl = [...this.state.rows]
                        let count = 0;
                        this.state.selectedrows.forEach(x => {
                          
                          let selectedrow = rowsl.find(y=>y.contactid == x) as any
                          keys.forEach(k => selectedrow[k] = this.state.multipleeditrecord[k])
                          var index = rowsl.findIndex(a=>a.contactid == x)
                          rowsl[index] = selectedrow as IContact
                          this.setState({openloading : true,loadingtext : "Saving"})
                          this.props.context.webAPI.updateRecord("contact",rowsl[index].contactid,rowsl[index]).then(
                            (resp) => {
                              count++
                              if(count == this.state.selectedrows.length){
                                this.setState({rows : rowsl,openmultipleedit : false,openloading : false,loadingtext : ""})
                              }
                            }
                            )
                        })
                        this.setState({openmultipleedit : false,rows : rowsl})
                      }}
                    />
                    <DefaultButton text="cancel" 
                      onClick = {() => {this.setState({openmultipleedit : false})}}
                    />
                  </div>}
              >
              {this.state.columns.map(
               (x) => 
               <div>
                 <TextField label={x.Header?.toString()} 
                  onChange = {(ev,value) => {this.setState({multipleeditrecord : {...this.state.multipleeditrecord, [(x.accessor) as string] : value}})}}
                 />
                </div>
              )}
              </Panel>
            }
            </div>
            <div className="headerButtonDiv">
                <PrimaryButton
                  className="headerButton"
                  text="Edit"
                  disabled = {this.state.selectedrows.length == 0}
                  onClick={() => {
                    this.setState({openmultipleedit : true})
                    
                  }}
                />
                <PrimaryButton
                  className="headerButton"
                  text="Delete"
                  disabled = {this.state.selectedrows.length == 0}
                  onClick={() => {
                    this.setState({opendeleteconfirmation : true})
                    
                  }}
                />
            </div>
            <br></br><br></br>
            <div>
              <RenderReactTable 
                columns = {[...columns]} 
                rows = {[...records]}
              />
            </div>
            <div>
            <Dialog
              hidden={!this.state.opendeleteconfirmation}
              onDismiss={() => {}}
              dialogContentProps={dialogContentProps}
            >
              <DialogFooter>
                <PrimaryButton onClick={()=> {
                  this.setState({
                    openloading : true,
                    loadingtext : "Deleting",
                    opendeleteconfirmation : false
                  })
                    var deletedcount = 0;
                    var totalcount = this.state.selectedrows.length;
                  // var remaining = [] as IContact[]
                  //  this.state.rows.forEach((x) => {
                  //       let selectedrecord = this.state.selectedrows.find(y => y == x.contactid)
                  //       if(selectedrecord == undefined || selectedrecord == null)
                  //           remaining.push(x);
                  //     }
                  //  )
                  //  this.setState({
                  //    rows : [...remaining],
                  //    opendeletemultiple : false,
                  //    selectedrows : []
                  //  })
                    this.state.selectedrows.forEach(x => {
                      this.props.context.webAPI.deleteRecord("contact",x).then(
                        (resp) => {
                          deletedcount++;
                          if(deletedcount == totalcount){
                            this.props.context.webAPI.retrieveMultipleRecords("contact").then(
                              (response) => {
                                let GetRecords = () : IContact[] =>{
                                  var contacts  = [] as IContact[];
                                  response.entities.map(x => contacts.push({firstname: x.firstname,fullname: x.fullname,middlename:x.middlename,lastname:x.lastname,contactid:x.contactid} as IContact) );
                                  return contacts;
                                }    
                                this.setState({openloading : false,allselected: false,selectedrows: [],columns:columns,rows:GetRecords()})
                              }
                            )
                          }
                        }
                      )
                    })
                    }} text="Yes" />
                <DefaultButton onClick={()=> {this.setState({opendeleteconfirmation:false})}} text="No" />
              </DialogFooter>
            </Dialog>
            {
            this.state.openloading && 
            <Dialog 
              hidden = {!this.state.openloading}
              dialogContentProps = {{
                type: DialogType.normal,
                title: this.state.loadingtext,
                closeButtonAriaLabel: 'Close',
                }}
            > 
            <div>
              <div className={"loadingData"}>
                <Loader
                  type="Oval"
                  key="Loading"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              </div>
          </div>
            </Dialog>
            }
            </div>
          </div>
      
        
      );
    }
    
}

export default DisplayList;


// var remainingrows = [] as IContact[];
                    // this.state.rows.forEach(x => {
                    //   debugger;
                    //     var selectedrecord = this.state.selectedrows.find(y => y == x.contactid);
                    //     if(selectedrecord == undefined || selectedrecord == null){
                    //       remainingrows.push(x);
                    //     }
                    // })
                    // this.setState({
                    //   rows : [...remainingrows]
                    // })
                    // var deletedcount = 0;
                    // var totalcount = this.state.selectedrows.length;
                    // this.state.selectedrows.forEach(x => {
                    //   this.props.context.webAPI.deleteRecord("contact",x).then(
                    //     (resp) => {
                    //       deletedcount++;
                    //       if(deletedcount == totalcount){
                    //         this.props.context.webAPI.retrieveMultipleRecords("contact").then(
                    //           (response) => {
                    //             var GetRecords = () : IContact[] =>{
                    //               var contacts  = [] as IContact[];
                    //               response.entities.map(x => contacts.push({firstname: x.firstname,fullname: x.fullname,middlename:x.middlename,lastname:x.lastname,contactid:x.contactid} as IContact) );
                    //               return contacts;
                    //             }    
                    //             this.setState({allselected: false,selectedrows: [],columns:columns,rows:GetRecords()})
                    //           }
                    //         )
                    //       }
                    //     }
                    //   )
                    // })