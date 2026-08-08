import * as React from "react";
import { DetailsList,IColumn } from "@fluentui/react";

interface DiscrepanciesListProps{

}
interface DiscrepanciesState {
    columns: IColumn[]
    items: any[]
}

class DiscrepanciesList extends React.Component<DiscrepanciesListProps,DiscrepanciesState>{
    constructor(props: DiscrepanciesListProps){
        super(props);

        var cols = [
            {
                key: "issueid",
                name: "Issue Title",
                fieldName: "issueid",
                minWidth: 100
            },
            {
                key: "fieldname",
                name: "Issue Title",
                fieldName: "fieldname",
                minWidth: 100
            },
            {
                key: "issuetitle",
                name: "Issue Title",
                fieldName: "issuetitle",
                minWidth: 100
            },
            {
                key: "currentvalue",
                name: "Current Value",
                fieldName: "currentvalue",
                minWidth: 100
            },
            {
                key: "newvalue",
                name: "New Value",
                fieldName: "newvalue",
                minWidth: 100
            },
            {
                key: "status",
                name: "Status",
                fieldName: "status",
                minWidth: 100
            },
            {
                key: "reportedby",
                name: "Reported By",
                fieldName: "reportedby",
                minWidth: 100
            },
            {
                key: "reportedon",
                name: "Reported On",
                fieldName: "reportedon",
                minWidth: 100
            }
        ] as IColumn[];

        this.state = {
            columns : cols,
            items: []
        }
    }
    componentDidMount(): void {
        this.setState({
            items: this.CreateFakeData()
        })
    }
    CreateFakeData(): any[]{
        var fakedata = [];
        for(var i=0; i<10; i++){
            fakedata.push({
                issueid: `IS-100${i.toString()}`,
                fieldname: "Application Name (Short)",
                issuetitle: "1115 PMDA - General - Details",
                currentvalue: "1115 PMDA",
                newvalue: "0000 PMDA",
                status: "New",
                reportedon: new Date(),
                reportedby: "Anuradha I"
            });
        }
        return fakedata; 
    }

    render(): React.ReactNode {
        return <>
            <DetailsList
                columns={this.state.columns}
                items={this.state.items}
            />
        </>
    }
}

export default DiscrepanciesList;
