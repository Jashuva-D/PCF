import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { DetailsList, IColumn, SelectionMode } from "@fluentui/react";

interface AssignedPeopleProps {
    context : ComponentFramework.Context<IInputs>
}
interface AssignedPeopleState {
    columns : IColumn[],
    items : any[]
}

class AssignedPeople extends React.Component<AssignedPeopleProps,AssignedPeopleState> {
    constructor(props : AssignedPeopleProps){
        super(props);
        this.state = {
            items : [],
            columns : []
        }
    }
    componentDidMount(): void {
        var columns = this.props.context.parameters.sampleDataSet.columns.map(x => {
            debugger;
            return x;
        }).filter(x => x.isHidden == false);
        
        var records = Object.keys(this.props.context.parameters.sampleDataSet.records).map(x => {
            debugger;
            var eachrecord = {} as any;
            var data = this.props.context.parameters.sampleDataSet.records[x];
            columns.forEach(y => {
                eachrecord[y.name] = data.getFormattedValue(y.name);
            });
            return eachrecord;
        });
        this.setState({
            columns : columns.map(x => {
                return {
                    name : x.displayName,
                    fieldName : x.name,
                    minWidth : 150,
                    maxWidth : 300,
                    isResizable : true
                } as IColumn
            }),
            items : records
        });
    }
    render(): React.ReactNode {
        return <div>
            <DetailsList
                items={this.state.items}
                columns = {this.state.columns}
                selectionMode={SelectionMode.none}
            />
        </div>
    }
}

export default AssignedPeople;