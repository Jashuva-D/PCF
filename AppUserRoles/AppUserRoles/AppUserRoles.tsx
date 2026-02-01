import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import {DetailsList, DetailsListLayoutMode, IColumn} from "@fluentui/react/lib/DetailsList";
import { Icon } from "@fluentui/react/lib/Icon";
import { initializeIcons, PrimaryButton, TextField, Text, DefaultButton, Stack, IconButton, PeoplePickerItem, NormalPeoplePicker, Dropdown } from "@fluentui/react";
import { error } from "console";
import LookupControl from "./LookupControl";

interface AppUserRolesProps {
    context: ComponentFramework.Context<IInputs>;
}
interface AppUserRolesState{
    columns: IColumn[];
    items: any[];
    editablerecord : any | null;
}

class AppUserRoles extends React.Component<AppUserRolesProps, AppUserRolesState> {
    constructor(props: AppUserRolesProps) {
        super(props); initializeIcons();
        
        let cols: IColumn[] = [];
        this.props.context.parameters.sampleDataSet.columns.forEach((c) => {
                if(c.name == "cr549_id") return;
                cols.push({
                    key: c.name,
                    name: c.displayName,
                    fieldName: c.name.replace("a_0bbe2879d1e8f0118544001dd8096c2b.","project_"),
                    minWidth: 150,
                    maxWidth: 200,
                    isResizable: true,
                    onRender: (item: any) => {
                        let columnname = c.name.replace("a_0bbe2879d1e8f0118544001dd8096c2b.","project_");
                        if(this.state.editablerecord && this.state.editablerecord.id == item.id){
                            if(columnname == "project_cr549_service_desk_agent"){
                                return <Dropdown
                                    options={[{key: "0", text: "Primary"}, {key: "1", text: "Secondary"}]}
                                    defaultSelectedKey={item[`${columnname}_value`]}
                                    onChange={(event, value) => this.onFieldChange(columnname, value)}
                                />;
                            }
                            else if(columnname == "cr549_role"){
                                return <LookupControl 
                                    context={this.props.context} entityType="cr549_role" recordId={item[`${columnname}_value`]?.id?.guid ?? null} 
                                    onRecordSelect={(id, name) => {
                                            this.onFieldChange(columnname, {id: {guid: id}, name: name, entityType: "cr549_role"});
                                    }}
                                />;
                            }
                            return <TextField key={columnname} defaultValue={item[columnname] ?? ""} onChange={(e, val) => this.onFieldChange(columnname, val)}/>;
                        }   
                        return <Text>{item[columnname] ?? ""}</Text>;
                    }
                } as IColumn);
        });
        let customcolumn = {
            key: "customcolumn",
            minWidth: 35,
            maxWidth: 50,
            isResizable: true,
            onRender: (item: any) => {
                if(this.state.editablerecord && this.state.editablerecord.id == item.id){
                    return <Stack horizontal tokens={{childrenGap: 20}}><Icon iconName="Save" title="Save" onClick={this.onSaveClick.bind(this)} style={{fontSize: 20, color: "#0D2499", cursor: "pointer"}}/> <Icon iconName="Cancel" title="Cancel" onClick={this.onCancelClick.bind(this)} style={{color: "red", fontSize: 20, cursor: "pointer"}}/></Stack>
                }
                else {
                    return <div><Icon iconName="Edit" title={this.state.editablerecord == null ? "Edit" : ""} onClick={this.state.editablerecord != null ? undefined : this.onEditClick.bind(this, item)} style={{fontSize: 15, color: this.state.editablerecord == null ? "#0D2499" : "#A0A0A0", cursor: this.state.editablerecord == null ? "pointer" : "not-allowed"}}/></div>
                }
            }
        } as IColumn;
        
        this.state = {
            columns: [customcolumn, ...cols],
            items: [],
            editablerecord: null
        }
    }
    onEditClick(item: any){
        this.setState({editablerecord: {...item}});
    }
    async onSaveClick(){
        var obj = this;
        var appuserroleid = this.state.editablerecord.id;
        var roleid = this.state.editablerecord["cr549_role_value"]?.id?.guid;
        var personid = this.state.editablerecord["cr549_person_value"]?.id.guid;

        var appuserrole = {
            "cr549_role@odata.bind" : roleid == undefined ? null : `/cr549_roles(${roleid})`,
            "cr549_person@odata.bind" : personid == undefined ? null : `/cr549_persons(${personid})`
        }
        var person = {
            "cr549_email_address_2": this.state.editablerecord["project_cr549_email_address_2"],
            "cr549_direct_phone": this.state.editablerecord["project_cr549_direct_phone"],
            "cr549_email_address": this.state.editablerecord["project_cr549_email_address"],
            "cr549_service_desk_agent": this.state.editablerecord["project_cr549_service_desk_agent_value"] == null ? null :
              this.state.editablerecord["project_cr549_service_desk_agent_value"] == "0" ? false : true 
        }

        await this.props.context.webAPI.updateRecord("cr549_appuserrole", appuserroleid, appuserrole).then(function(resp){
            console.log('updated app user role successfully')
        },function(err){
            console.log("failed to update app user role");
        })

        obj.props.context.webAPI.updateRecord("cr549_person", personid, person).then(function(resp){
            alert("Record updated successfully.");  
            obj.setState({editablerecord: null});
        },function(error){
            alert("Error in updating record: " + error.message);
        });
    }
    onCancelClick(){
        this.setState({editablerecord: null});
    }
    onFieldChange(fieldname: string, value: any){
        let editablerecord = this.state.editablerecord;
        if(editablerecord){
            if(fieldname == "project_cr549_service_desk_agent"){
                editablerecord[`${fieldname}_value`] = value?.key ?? null;
                editablerecord[fieldname] = value?.text ?? null;
            }
            else if(fieldname == "cr549_role"){
                editablerecord[fieldname] = value?.name,
                editablerecord[`${fieldname}_value`] = value == null ? null : value
            }
            else {
                editablerecord[fieldname] = value ?? "";
            }
            this.setState({editablerecord: editablerecord});
        }  
    }
    componentDidMount(): void {
        let items: any[] = [];
        this.props.context.parameters.sampleDataSet.sortedRecordIds.forEach((id) => {
            const record = this.props.context.parameters.sampleDataSet.records[id];
            let item: any = {};
            item.id = id;
            this.state.columns.forEach((c : IColumn) => {
                
                if(c.key != "customcolumn") {
                    item[c.fieldName ?? ""] = record.getFormattedValue(c.key);
                    item[`${c.fieldName}_value`] = record.getValue(c.key);
                }
            });
            items.push(item);
        });
        this.setState({items: items});
    }
    render(): React.ReactNode {
        //const cols = [{key: "col1",fieldName: "col1", name: "Column 1"} as IColumn]
        //const items = [1,2,3,4,5,6,7,8,9,10].map(function(i) { return {col1: "abcd"}});  
        return <div>
            <DetailsList items={[...this.state.items]} columns={[...this.state.columns]}></DetailsList>
        </div>
    }
}

export default AppUserRoles;