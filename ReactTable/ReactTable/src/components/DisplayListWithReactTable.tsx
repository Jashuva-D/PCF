import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IInputs } from '../../generated/ManifestTypes';
import {IContact} from '../models/IContact';
import {Column} from 'react-table';
import RenderReactTable from './RenderReactTable';
import {IconButton, Checkbox,PrimaryButton,DefaultButton} from "office-ui-fabric-react";
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';



interface DisplayListProps {
    context : ComponentFramework.Context<IInputs>
}
interface DisplayListState {
    columns : Column[],
    rows : IContact[],
    selectedrows : string[]
    allselected : boolean,
    oneunselected : boolean,
    opendeleteconfirmation : boolean
    opendeletemultiple : boolean
}

class DisplayList extends React.Component<DisplayListProps,DisplayListState> {
    
    constructor(props : DisplayListProps){
        super(props);
        this.state = {
            oneunselected : false,
            allselected : false,
            selectedrows : [],
            columns : [],
            rows : [],
            opendeleteconfirmation : false,
            opendeletemultiple : false
        }
    }
    GetConstantColumns(estate : DisplayListState) { 
      return [
                  {
                    id : "checkboxcolumn",
                    width : 45,
                    Header : <Checkbox 
                                onChange = {(event ,selected) => {
                                                    if(selected != undefined){
                                                      var temp = [] as string[]
                                                      this.state.rows.forEach(x => temp.push(x.contactid));
                                                      this.setState({allselected : selected,selectedrows : selected ? temp : []})
                                                    }
                                                  }}
                                checked = {estate.allselected  && estate.rows.length > 0}
                            />,
                    Cell : props => <Checkbox 
                                    onChange = {(x,y) => {
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
                }
            ] as Column[]
    }
    componentDidMount(){
      let columnsL  = [
        {
        Header : "First Name",
        accessor : "firstname"
        },
        {
          Header : "Last Name",
          accessor : "lastname"
        },
        {
          Header : "Middle Name",
          accessor : "middlename"
        },
        {
          Header : "Full Name",
          accessor : "fullname"
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
      //   columns : columns,
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
      let columns = [...this.GetConstantColumns(this.state),...(this.state.columns).filter(x=>x.id != "checkboxcolumn" || x.id == null || x.id == undefined)]
      return (
          <div className="headerDiv">
            
            <div className="headerButtonDiv">
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
                    opendeletemultiple : true,
                    opendeleteconfirmation : false
                  })
                   var deletedcount = 0;
                    var totalcount = this.state.selectedrows.length;
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
                                this.setState({opendeletemultiple : false,allselected: false,selectedrows: [],columns:columns,rows:GetRecords()})
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
            <Dialog 
              hidden = {!this.state.opendeletemultiple}
              dialogContentProps = {{
                type: DialogType.normal,
                title: 'Deleting....',
                closeButtonAriaLabel: 'Close',
                }}
            />
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