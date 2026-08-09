import * as React from "react";
import { DetailsList,IColumn, Stack, Text, DefaultButton, Link } from "@fluentui/react";
import IssueDetailsDialog from "./IssueDetails";

interface DiscrepanciesListProps{

}
interface DiscrepanciesState {
    columns: IColumn[]
    items: any[]
    currentPage: number
    pageSize: number,
    openDetails: boolean
}

class DiscrepanciesList extends React.Component<DiscrepanciesListProps,DiscrepanciesState>{
    constructor(props: DiscrepanciesListProps){
        super(props);

        var cols = [
            {
                key: "issueid",
                name: "Issue ID",
                fieldName: "issueid",
                minWidth: 100,
                onRender: (item: any) => {
                    var obj = this;
                    return <Link onClick={() => {obj.setState({openDetails: true})}}>{item["issueid"]}</Link>
                }
            },
            {
                key: "fieldname",
                name: "Field Name",
                fieldName: "fieldname",
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
                key: "reportedon",
                name: "Reported On",
                fieldName: "reportedon",
                minWidth: 100
            }
        ] as IColumn[];

        this.state = {
            columns : cols,
            items: [],
            currentPage: 1,
            pageSize: 10,
            openDetails: false
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
                reportedon: new Date().toLocaleDateString(),
                reportedby: "Anuradha I"
            });
        }
        return fakedata; 
    }

    render(): React.ReactNode {
        const startIndex = (this.state.currentPage - 1) * this.state.pageSize;
        const endIndex = startIndex + this.state.pageSize;
        const paginatedRecords = this.state.items.slice(startIndex, endIndex);
        const totalPages = Math.ceil(this.state.items.length / this.state.pageSize);
        return <>
            <DetailsList className="discrepancies"
                columns={this.state.columns}
                items={paginatedRecords}
                onItemInvoked={()=> {this.setState({openDetails: true})}}
                styles={{
                    headerWrapper: {
                        paddingTop: 0
                    }
                }}
            />
            <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #ddd" }}>
                <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                    {/* <Text>&nbsp;</Text> */}
                    <Text>{`${this.state.items.length > 0 ? startIndex + 1 : 0} - ${Math.min(startIndex + this.state.pageSize, this.state.items.length)} of ${this.state.items.length} applications`}</Text>
                    <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <DefaultButton
                            text={"<"}
                            onClick={() => this.setState({ currentPage: this.state.currentPage - 1 })}
                            disabled={this.state.currentPage === 1 || totalPages === 0}
                            styles={{ root: { minWidth: 2, maxWidth: 3, borderRadius: 6, borderColor: "#ccc" } }}
                        />
                        <Text style={{paddingTop: 5}}>Page: {this.state.currentPage.toString()}</Text>
                        <DefaultButton
                            text={">"}
                            onClick={() => this.setState({ currentPage: this.state.currentPage + 1 })}
                            disabled={this.state.currentPage === totalPages || totalPages === 0}
                            styles={{ root: { minWidth: 2, maxWidth: 3, borderRadius: 6, borderColor: "#ccc" } }}
                        />
                    </Stack>
                    <Text>&nbsp;</Text>
                </Stack>
            </div>
            <IssueDetailsDialog 
                isOpen={this.state.openDetails} 
                issue={{
                    issuetitle: "1115 PMDA - General - Details - Data Discrepancy", 
                    issuedescription: "Testing the issue report with view details feature on click of a row",
                    reportedon: new Date().toLocaleDateString(),
                    reportedby: {name : "Anuradha I", email: "anuradha.inampudi@cms.hhs.gov"},
                    assignedto: {name: "Pinal Jariwala", email: "pinal.jariwala@cms.hhs.gov"},
                    delegatedto: {name: "Swati Albal", email: "swati.albal@cms.hhs.gov"},
                    fields:[
                        {fieldname: "Application Name (Short)", currentvalue: "1115 PMDA", newvalue: "1115 WIOUER"},
                        {fieldname: "Application Name (Long)", currentvalue: "Test Application", newvalue: "New Application Name"}
                    ]}}
                onClose={() => {this.setState({openDetails: false})}}
            />
        </>
    }
}

export default DiscrepanciesList;
