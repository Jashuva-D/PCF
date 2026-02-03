import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { DetailsList, DetailsListLayoutMode, IColumn} from "@fluentui/react/lib/DetailsList";
import { Icon } from "@fluentui/react/lib/Icon";
import { initializeIcons,Selection, SelectionMode, PrimaryButton, TextField, Text, DefaultButton, Stack, IconButton, PeoplePickerItem, NormalPeoplePicker, Dropdown, CommandBarButton, CommandBar, Link, MarqueeSelection } from "@fluentui/react";
import { error } from "console";
import LookupControl from "./LookupControl";
import { CMSAlertType } from "./Constants";
import CMSAlert from "./CMSAlert";

interface AppUserRolesProps {
    context: ComponentFramework.Context<IInputs>;
}
interface AppUserRolesState{
    columns: IColumn[];
    items: any[];
    editablerecord : any | null;
    showalert : boolean;
    alert? : {
        messagetype : CMSAlertType,
        message : string
    }
    selectedrecordids : string[]
}

class AppUserRoles extends React.Component<AppUserRolesProps, AppUserRolesState> {
    private _selection : Selection
    constructor(props: AppUserRolesProps) {
        super(props); initializeIcons();
        
        let cols: IColumn[] = [];
        this.props.context.parameters.sampleDataSet.columns.forEach((c) => {
                if(c.name == "cr549_id") return;
                cols.push({
                    key: c.name,
                    name: c.displayName,
                    fieldName: c.name.replace("a_0bbe2879d1e8f0118544001dd8096c2b.","person_"),
                    minWidth: 150,
                    maxWidth: 200,
                    isResizable: true,
                    onRender: (item: any) => {
                        let columnname = c.name.replace("a_0bbe2879d1e8f0118544001dd8096c2b.","person_");

                        if(this.state.editablerecord && this.state.editablerecord.id == item.id){
                            if(columnname == "person_cr549_service_desk_agent"){
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
                            else if(columnname == "cr549_person" || columnname == "person_cr549_id"){
                                <Text>{item[columnname] ?? ""}</Text>;
                            }
                            else {
                                return <TextField key={columnname} defaultValue={item[columnname] ?? ""} onChange={(e, val) => this.onFieldChange(columnname, val)}/>;
                            }
                        }
                        else {
                            if(columnname == "cr549_person"){
                                return <Link onClick={() => {
                                    this.props.context.navigation.openForm({
                                        entityName: "cr549_person",
                                        entityId: item["cr549_person_value"]?.id?.guid
                                    })
                                }}>{item[columnname] ?? ""}</Link>;
                            }
                            else if(columnname == "cr549_role"){
                                return <Link onClick={() => {
                                    this.props.context.navigation.openForm({
                                        entityName: "cr549_role",
                                        entityId: item["cr549_role_value"]?.id?.guid
                                    })
                                }}>{item[columnname] ?? ""}</Link>;
                            }
                            else if(columnname == "person_cr549_email_address" || columnname == "person_cr549_email_address_2"){
                                return <Link href={`mailto:${item[columnname+'_value']}`}>{item[columnname]}</Link>
                            }
                            else {
                                return <Text>{item[columnname] ?? ""}</Text>;
                            }
                        }
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
        var obj = this;
        this._selection = new Selection({
            onSelectionChanged : obj.onSelectionChanged.bind(obj),
            onItemsChanged : () => {
                console.log("on item changed");
            },
            getKey: (item) => {
                return item.key as string;
            }
        });
        this.state = {
            columns: [customcolumn, ...cols],
            items: [],
            editablerecord: null,
            showalert: false,
            selectedrecordids: []
        }
    }
    onEditClick(item: any){
        this.setState({editablerecord: {...item}});
    }
    onSelectionChanged(){
        var items = this._selection.getSelection();
        //this.props.context.parameters.sampleDataSet.setSelectedRecordIds(items.map(x => x.key as string));
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
            "cr549_email_address_2": this.state.editablerecord["person_cr549_email_address_2"],
            "cr549_direct_phone": this.state.editablerecord["person_cr549_direct_phone"],
            "cr549_email_address": this.state.editablerecord["person_cr549_email_address"],
            "cr549_service_desk_agent": this.state.editablerecord["person_cr549_service_desk_agent_value"] == null ? null :
              this.state.editablerecord["person_cr549_service_desk_agent_value"] == "0" ? false : true 
        }

        await this.props.context.webAPI.updateRecord("cr549_appuserrole", appuserroleid, appuserrole).then(function(resp){
            console.log('updated app user role successfully')
        },function(err){
            console.log("failed to update app user role");
        })

        obj.props.context.webAPI.updateRecord("cr549_person", personid, person).then(function(resp){
            obj.showAlertMessage(CMSAlertType.Success,"Record updated successfully")  
            obj.setState({editablerecord: null});
        },function(error){
            obj.showAlertMessage(CMSAlertType.Error, `Error in updating record: ${error.message}`);
        });
    }
    onCancelClick(){
        this.setState({editablerecord: null});
    }
    onFieldChange(fieldname: string, value: any){
        let editablerecord = this.state.editablerecord;
        if(editablerecord){
            if(fieldname == "person_cr549_service_desk_agent"){
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
            item.key = id;
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
    onNewAppUserRole(){
        var obj = this;
        this.props.context.navigation.openForm({
            entityName: "cr549_appuserrole",
            useQuickCreateForm: true,
            createFromEntity: {
                id: (obj.props.context as any).page.entityId,
                entityType: "cr549_application"
            }
        });
    }
    onRefresh(){
        this.props.context.parameters.sampleDataSet.refresh();
    }
    onDelete() {
        var obj = this;
        var selectedrecords = this.props.context.parameters.sampleDataSet.getSelectedRecordIds();
        selectedrecords.forEach(x => {
            obj.props.context.webAPI.deleteRecord("cr549_appuserrole",x).then(function(resp){
                obj.showAlertMessage(CMSAlertType.Success,"Record deleted successfully");
            },function(err){
                obj.showAlertMessage(CMSAlertType.Error, `error occured while deleting the record, details: ${err?.message}`);
            })
        });
    }
    showAlertMessage(messagetype: CMSAlertType, message: string){
        var obj = this;
        this.setState({ 
            showalert: true, 
            alert : {
                messagetype : messagetype,
                message : message
            }
        });
        setTimeout(() => {
            obj.setState({showalert : false})
        }, 10000);
    }
    render(): React.ReactNode {
        return <div>
            { this.state.showalert && <CMSAlert type={this.state.alert!.messagetype} message={this.state.alert?.message} />}
            <Stack horizontal horizontalAlign="end">
                <CommandBar
                    items={[
                        { key: "newrecord", text: "New App User Role", iconProps:{iconName: "Add"}, buttonStyles: {icon: { fontSize: 15 }}, onClick: this.onNewAppUserRole.bind(this), fontsize: 10},
                        { key: "refresh", text: "Refresh", iconProps: {iconName: "Refresh"}, buttonStyles: {icon: {fontSize: 15}}, onClick: this.onRefresh.bind(this), fontsize: 10 },
                        { key: "delete", text: "Delete", iconProps: {iconName: "Delete"}, buttonStyles: {icon: {fontSize: 15}}, onClick: this.onDelete.bind(this)}
                    ]}
                />
            </Stack>
            <MarqueeSelection selection={this._selection}>
                <DetailsList items={this.state.items} columns={this.state.columns} selection={this._selection} selectionMode={SelectionMode.multiple} />
            </MarqueeSelection>
        </div>
    }
}

export default AppUserRoles;