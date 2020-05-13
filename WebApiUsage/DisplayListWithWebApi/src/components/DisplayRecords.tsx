import * as React from 'react';
import { IInputs } from '../../generated/ManifestTypes';
import DisplayList from './DisplayList';

interface IDisplayRecordsProps {
    entityname : string
    context : ComponentFramework.Context<IInputs>
}
interface IDisplayRecordsState {
    records : IContact[]
}
export interface IContact{
    firstname : string,
    middlename : string,
    lastname : string,
    emailaddress1 :string
    fullname: string
}
export default class DisplayRecords extends React.Component<IDisplayRecordsProps,IDisplayRecordsState>  {
    
    public contacts = [] as IContact[]
    state : IDisplayRecordsState = {
            records : []
    }
    public componentDidMount() {
        var {entityname} = this.props;
        
        //this.props.context.webAPI.retrieveMultipleRecords(entityname)
            //.then(results => this.setState({records : results.entities as IContact[]}))
    }
    public render() : React.ReactElement<IDisplayRecordsProps> {
       // var {records} = this.state;
       const generateRecords = (): IContact[] => {
           var temp = [];
           for(var i=0; i< 500; i++){
               temp.push({firstname:"Jashuva"+i,middlename:"nothing"+i,lastname:"Devireddy"+i} as IContact);
           }
           return temp;
       }
        var records = generateRecords();
        //var records = this.state.records
        return (
        <div>
            <div>Hello Jashuva...!{records.length}</div>
            <DisplayList items={records}></DisplayList>
        </div>
        );
    }
}