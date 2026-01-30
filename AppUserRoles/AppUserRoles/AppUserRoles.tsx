import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import {DetailsList, IColumn} from "@fluentui/react/lib/DetailsList";
import { Icon } from "@fluentui/react/lib/Icon";
import { initializeIcons, PrimaryButton } from "@fluentui/react";

interface AppUserRolesProps {
    context: ComponentFramework.Context<IInputs>;
}
interface AppUserRolesState{
    columns: IColumn[];
    items: any[];
    editablerecordid?: string | null;
}

class AppUserRoles extends React.Component<AppUserRolesProps, AppUserRolesState> {
    constructor(props: AppUserRolesProps) {
        initializeIcons();
        super(props);   
        let cols: IColumn[] = [];
        this.props.context.parameters.sampleDataSet.columns.forEach((c) => {
                cols.push({
                    key: c.name,
                    name: c.displayName,
                    fieldName: c.name.replace("a_0bbe2879d1e8f0118544001dd8096c2b","")
                } as IColumn);
        });
        let customcolumn = {
            key: "customcolumn",
            onRender: (item: any) => {
                if(this.state.editablerecordid && this.state.editablerecordid == item.id){
                    return <div><PrimaryButton text="Save" onClick={this.onSaveClick.bind(this)}/> <PrimaryButton text="Cancel" onClick={this.onCancelClick.bind(this)}/></div>
                }
                else {
                    return <div><Icon iconName="Edit" onClick={() => this.onEditClick(item)}/></div>
                }
            }
        } as IColumn;
        
        this.state = {
            columns: [customcolumn, ...cols],
            items: []
        }
    }
    onEditClick(item: any){
        this.setState({editablerecordid: item.id});
    }
    onSaveClick(){

    }
    onCancelClick(){
        this.setState({editablerecordid: null});
    }
    componentDidMount(): void {
        // var fetchxml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
        //         <entity name="cr549_appuserrole">
        //         <attribute name="cr549_person"/>
        //         <attribute name="cr549_appuserroleid"/>
        //         <attribute name="cr549_role"/>
        //         <order attribute="cr549_person" descending="false"/>
        //         <filter type="and">
        //         <condition attribute="cr549_app" operator="eq" uiname="1115 PMDA" uitype="cr549_application" value="{9A5926CF-7DDF-F011-8544-001DD806C085}"/>
        //         </filter>
        //         <link-entity name="cr549_person" from="cr549_personid" to="cr549_person" visible="false" link-type="outer" alias="a_0bbe2879d1e8f0118544001dd8096c2b">
        //         <attribute name="cr549_email_address_2"/>
        //         <attribute name="cr549_direct_phone"/>
        //         <attribute name="cr549_email_address"/>
        //         <attribute name="cr549_service_desk_agent"/>
        //         <attribute name="cr549_id"/>
        //         </link-entity>
        //         </entity>
        //         </fetch>"`;
        let items: any[] = [];
        this.props.context.parameters.sampleDataSet.sortedRecordIds.forEach((id) => {
            const record = this.props.context.parameters.sampleDataSet.records[id];
            let item: any = {};
            item.id = id;
            this.state.columns.forEach((c : IColumn) => {
                if(c.key != "customcolumn") {
                    item[c.fieldName ?? ""] = record.getFormattedValue(c.key);//record.getValue(c.key);
                }
            });
            items.push(item);
        });
        this.setState({items: items});
    }
    render(): React.ReactNode {
        return <div>
                <div>App User Roles Component1</div>
                 <DetailsList
                    items={[...this.state.items]}
                    columns={[...this.state.columns]}
                ></DetailsList> 
            </div>
    }
}

export default AppUserRoles;