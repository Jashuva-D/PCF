import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import {DetailsList, IColumn} from "@fluentui/react/lib/DetailsList";

interface AppUserRolesProps {
    context: ComponentFramework.Context<IInputs>;
}
interface AppUserRolesState{
    columns: IColumn[];
    items: any[];
}

class AppUserRoles extends React.Component<AppUserRolesProps, AppUserRolesState> {
    constructor(props: AppUserRolesProps) {
        super(props);   
        let cols: IColumn[] = [];
        this.props.context.parameters.sampleDataSet.columns.forEach((c) => {
                cols.push({
                    key: c.name,
                    name: c.displayName,
                    fieldName: c.name,
                } as IColumn);
        });
        this.state = {
            columns: cols,
            items: []
        }
    }
    componentDidMount(): void {
        let items: any[] = [];
        this.props.context.parameters.sampleDataSet.sortedRecordIds.forEach((id) => {
            const record = this.props.context.parameters.sampleDataSet.records[id];
            let item: any = {};
            this.props.context.parameters.sampleDataSet.columns.forEach((c) => {
                item[c.name] = record.getValue(c.name);
            });
            items.push(item);
        });
        this.setState({items: items});
    }
    render(): React.ReactNode {
        return <div>
                <div>App User Roles Component</div>
                {/* <DetailsList
                    items={[...this.state.items]}
                    columns={[...this.state.columns]}
                ></DetailsList> */}
            </div>
    }
}

export default AppUserRoles;