import * as React from "react";
import { DetailsList,IColumn, Stack, Text, DefaultButton } from "@fluentui/react";

interface DiscrepanciesListProps{

}
interface DiscrepanciesState {
    columns: IColumn[]
    items: any[]
    currentPage: number
    pageSize: number
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
            items: [],
            currentPage: 1,
            pageSize: 5
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
            <DetailsList
                columns={this.state.columns}
                items={paginatedRecords}
            />
            <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #ddd" }}>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <Text>&nbsp;</Text>
                <Text>{`${this.state.items.length > 0 ? startIndex + 1 : 0} - ${Math.min(startIndex + this.state.pageSize, this.state.items.length)} of ${this.state.items.length} applications`}</Text>
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <DefaultButton
                        text={"<"}
                        onClick={() => this.setState({ currentPage: this.state.currentPage - 1 })}
                        disabled={this.state.currentPage === 1 || totalPages === 0}
                        styles={{ root: { minWidth: 2, maxWidth: 3, borderRadius: 6, borderColor: "#ccc" } }}
                    />
                    <DefaultButton
                        text={">"}
                        onClick={() => this.setState({ currentPage: this.state.currentPage + 1 })}
                        disabled={this.state.currentPage === totalPages || totalPages === 0}
                        styles={{ root: { minWidth: 2, maxWidth: 3, borderRadius: 6, borderColor: "#ccc" } }}
                    />
                </Stack>
            </Stack>
        </div>
        </>
    }
}

export default DiscrepanciesList;
