import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IInputs } from '../../generated/ManifestTypes';
import {IContact} from '../models/IContact';
import {Column} from 'react-table';
import RenderReactTable from './RenderReactTable';
import {IconButton, Checkbox} from "office-ui-fabric-react";



interface DisplayListProps {
    context : ComponentFramework.Context<IInputs>
}
interface DisplayListState {
    columns : Column[],
    rows : IContact[],
    selectedrows : string[]
    allselected : boolean,
    oneunselected : boolean
}

class DisplayList extends React.Component<DisplayListProps,DisplayListState>{
    constructor(props : DisplayListProps){
        super(props);
        debugger;
        this.state = {
            oneunselected : false,
            allselected : false,
            selectedrows : [],
            columns : [],
            rows : []
        }
    }
    componentDidMount(){
      var columns  = [
        {
          Header : <Checkbox 
                      onChange = {(event ,selected) => {
                                           if(selected != undefined){
                                             var temp = [] as string[]
                                             this.state.rows.forEach(x => temp.push(x.contactid));
                                             this.setState({allselected : selected,selectedrows : selected ? temp : []})
                                           }
                                        }}
                      //checked = {this.state.allselected}
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
                                          alert(false);
                                          this.setState({allselected : false,selectedrows : this.state.selectedrows.filter(x => x != (props.original as IContact).contactid)})
                                        }
                                      }
                                  }
                          checked = {this.state.selectedrows.find(x => x == (props.original as IContact).contactid) != undefined ? true : this.state.allselected }
                    />
        },
        {
          Header : "Delete",
          accessor : "contactid",
          id : "",
          Cell : props => <IconButton 
                            iconProps ={{iconName : "delete"}}
                              onClick = {() => {
                              var selectedrecord = props.original as IContact
                              var remainingrecords = this.state.rows.filter(x => x.contactid != selectedrecord.contactid )
                              this.setState({rows : remainingrecords})

                            }}
                          />
          //Cell : props => <div>Hello</div>
        },
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
        for(var i=0; i<100; i++){
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
      this.setState({
        columns : columns,
        rows : GetRecords()
        
      });
      // this.props.context.webAPI.retrieveMultipleRecords("contact").then(
      //   (response) => {
      //     var GetRecords = () : IContact[] =>{
      //       var contacts  = [] as IContact[];
      //       response.entities.map(x => contacts.push({firstname: x.firstname,fullname: x.fullname,middlename:x.middlename,lastname:x.lastname,contactid:x.contactid} as IContact) );
      //       return contacts;
      //     }    
      //     this.setState({columns:columns,rows:GetRecords()})
      //   }
      // )
    }
    public render() : JSX.Element{
      debugger;
      const records = this.state.rows;
      const columns = this.state.columns;
      
      return (
        
          <RenderReactTable 
            columns = {...columns} 
            rows = {...records}
          />
      
        
      );
    }
}

export default DisplayList;