import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { DetailsList, IColumn, SelectionMode, Link, Text } from "@fluentui/react";

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
        var obj = this;
        var columns = this.props.context.parameters.sampleDataSet.columns.map(x => {
            debugger;
            return x;
        }).filter(x => x.isHidden == false);
        
        var records = Object.keys(this.props.context.parameters.sampleDataSet.records).map(x => {
            debugger;
            var eachrecord = {} as any;
            var data = this.props.context.parameters.sampleDataSet.records[x];
            columns.forEach(y => {
                eachrecord[y.name] = data.getValue(y.name);
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
                    isResizable : true,
                    onRender : (item) => {
                        debugger;
                        if(x.dataType == "Lookup.Simple"){
                            return <Link onClick={() => {
                                var value = item[x.name];
                                if(value != null){
                                    obj.props.context.navigation.openForm({
                                        entityName : value.etn,
                                        entityId : value.id.guid
                                    })
                                }
                            }}>{item[x.name] != null ? item[x.name].name : null}</Link>
                        }
                        else {
                            return <Text>{item[x.name]}</Text>
                        }
                        
                    }
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