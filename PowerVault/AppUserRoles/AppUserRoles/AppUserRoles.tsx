import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { DetailsList, DetailsListLayoutMode, IColumn} from "@fluentui/react/lib/DetailsList";
import { Icon } from "@fluentui/react/lib/Icon";
import { initializeIcons,Selection, SelectionMode, PrimaryButton, TextField, Text,StackItem,Checkbox, Stack, IconButton, Dropdown, Link, MarqueeSelection, createTheme, Panel } from "@fluentui/react";
import LookupControl from "./LookupControl";
import { CMSAlertType } from "./Constants";
import CMSAlert from "./CMSAlert";
import { SearchIcon } from "./Icons";
import CMSDialog from "./CMSDialog";
import AppUserRoleQuickCreate from "./AppUserRoleQuickCreate";

interface AppUserRolesProps {
    context: ComponentFramework.Context<IInputs>;
    showalert: (message: string, type: CMSAlertType) => void;
}
interface AppUserRolesState{
    columns: IColumn[];
    items: any[];
    editablerecord : any | null;
    searchtext: string | null;
    filterApplied: boolean;
    fitlteredrecords: any[];
    showalert : boolean;
    alert? : {
        messagetype : CMSAlertType,
        message : string
    }
    selectedrecordids : string[],
    showDialog?: boolean;
    dialogTitle?: string;
    dialogSubtext?: string;
    dialogConfirmButtonLabel?: string;
    dialogCancelButtonLabel?: string;
    openQuickCreatePanel : boolean;
    dialogConfirmCallback?: () => void;
    dialogCancelCallback?: () => void;
    dialogDismissCallback?: () => void;
}

class AppUserRoles extends React.Component<AppUserRolesProps, AppUserRolesState> {
    private _selection : Selection
    constructor(props: AppUserRolesProps) {
        super(props); initializeIcons();
        
        let cols: IColumn[] = [];
        
        var obj = this;
        this._selection = new Selection({
            onSelectionChanged : obj.onSelectionChanged.bind(this),
            onItemsChanged : () => {
                console.log("on item changed");
            },
            getKey: (item) => {
                return item.key as string;
            }
        });
        this.state = {
            columns: this.getColumns("pv_role"),
            items: [],
            editablerecord: null,
            showalert: false,
            selectedrecordids: [],
            searchtext: "",
            filterApplied: false,
            fitlteredrecords: [],
            openQuickCreatePanel: false
        }
    }
    getColumns(sortedcolumn : string): IColumn[] {
        var currentsortedcolumn = this.state?.columns ? this.state.columns?.find(x => x.isSorted) : null;
        var cols : IColumn[] = [];
        this.props.context.parameters.sampleDataSet.columns.forEach((c) => {
                if(c.name == "pv_id") return;
                var colname = c.name.replace("a_b319352c3f9bf1118076001dd803d0e9.","person_")
                cols.push({
                    key: c.name,
                    name: c.displayName,
                    fieldName: colname,
                    ariaLabel: c.displayName,
                    minWidth: 150,
                    maxWidth: 200,
                    isResizable: true,
                    isSorted: colname === sortedcolumn ? true : false,
                    isSortedDescending: currentsortedcolumn && currentsortedcolumn.fieldName === colname ? !currentsortedcolumn.isSortedDescending : true,
                    onColumnClick: this.onColumnClick.bind(this),
                    onRenderHeader: (props, defaultRender) => (
                        <div id={`header-${props?.column.key}`}>
                            {defaultRender!(props)}
                        </div>
                    ),
                    onRender: (item: any) => {
                        let columnname = c.name.replace("a_b319352c3f9bf1118076001dd803d0e9.","person_");

                        if(this.state.editablerecord && this.state.editablerecord.id == item.id){
                            if(columnname == "pv_role"){
                                return <LookupControl 
                                    context={this.props.context} entityType="pv_role" recordId={item[`${columnname}_value`]?.id?.guid ?? null} 
                                    onRecordSelect={(items) => {
                                        if(items && items.length > 0) {
                                            let id = items[0]?.id as string;
                                            let name = items[0]?.text as string;
                                            this.onFieldChange(columnname, {id: {guid: id}, name: name, entityType: "pv_role"});
                                        }
                                    }}
                                />;
                            }
                            else if(columnname == "pv_person"){
                                //return <Text>{this.state.editablerecord[columnname] ?? ""}</Text>;
                                return <LookupControl 
                                    context={this.props.context} entityType="pv_person" recordId={item[`${columnname}_value`]?.id?.guid ?? null}
                                    onRecordSelect={(items) => {
                                        if(items && items.length > 0) {
                                            let id = items[0]?.id as string;
                                            let name = items[0]?.text as string;
                                            this.onFieldChange(columnname,{id: {guid: id}, name: name, entityType: "pv_person"})
                                        }
                                    }}
                                />
                            }
                            else {
                                return <Text aria-label={c.displayName} aria-labelledby={`header-${c.name}`}>
                                    {this.state.editablerecord[columnname] ?? ""}
                                </Text>;
                            }
                        }
                        else {
                            if(columnname == "pv_person"){
                                return <Link onClick={() => {
                                    this.props.context.navigation.openForm({
                                        entityName: "pv_person",
                                        entityId: item["pv_person_value"]?.id?.guid
                                    })
                                }}>{item[columnname] ?? ""}</Link>;
                            }
                            else if(columnname == "pv_role"){
                                return <Link onClick={() => {
                                    this.props.context.navigation.openForm({
                                        entityName: "pv_role",
                                        entityId: item["pv_role_value"]?.id?.guid
                                    })
                                }}>{item[columnname] ?? ""}</Link>;
                            }
                            else if(columnname == "person_pv_email_address" || columnname == "person_pv_email_address_2"){
                                return <Link href={`mailto:${item[columnname+'_value']}`} aria-label={c.displayName} aria-labelledby={`header-${c.name}`}>{item[columnname]}</Link>
                            }
                            else {
                                return <Text aria-label={c.displayName} aria-labelledby={`header-${c.name}`}>{item[columnname] ?? ""}</Text>;
                            }
                        }
                    }
                } as IColumn);
        });
        var haseditrole = (window as any).Xrm.Utility.getGlobalContext().userSettings.roles.get().some((r: any) => r.name == "Manager" || r.name == "Hosting Coordinator" || r.name == "Financial Operations (Funding)" || r.name == "System Administrator");
        let customcolumn = {
            key: "customcolumn",
            minWidth: 50,
            maxWidth: 50,
            isResizable: true,
            onRender: (item: any) => {
                if(this.state.editablerecord && this.state.editablerecord.id == item.id){
                    return <Stack horizontal tokens={{childrenGap: 3}}><IconButton iconProps={{ iconName: "Save", style: { fontSize: 20 } }} title="Save" onClick={this.onSaveClick.bind(this)} style={{fontSize: 20, color: "#01395E", cursor: "pointer"}}/> <IconButton iconProps={{ iconName: "Cancel", style: { fontSize: 20 } }} title="Cancel" onClick={this.onCancelClick.bind(this)} style={{color: "red", fontSize: 20, cursor: "pointer"}}/></Stack>
                }
                else {
                    return <IconButton iconProps={{ iconName: "Edit", style: { fontSize: 15, padding:0 } }} 
                        title={this.state.editablerecord == null ? "Edit" : ""} 
                        onClick={(this.state.editablerecord != null || !haseditrole) ? undefined : this.onEditClick.bind(this, item)} 
                        style={{ 
                            padding:0, 
                            color: (this.state.editablerecord == null && haseditrole) ? "#01395E" : "#A0A0A0", 
                            cursor: this.state.editablerecord == null ? "pointer" : "not-allowed",
                        }}
                        styles={{
                            root: {
                                height: 20,
                                width: 20,
                                padding: 0
                            }
                        }}
                        
                        
                    />
                //return <Icon iconName= "Edit" title={this.state.editablerecord == null ? "Edit" : ""} onClick={(this.state.editablerecord != null || !haseditrole) ? undefined : this.onEditClick.bind(this, item)} style={{ padding:0, color: (this.state.editablerecord == null && haseditrole) ? "#01395E" : "#A0A0A0", cursor: this.state.editablerecord == null ? "pointer" : "not-allowed"}}/>
                }
            }
        } as IColumn;
        let selectioncolumn = {
            key: "selectioncolumn",
            minWidth: 35,
            maxWidth: 50,
            isResizable: true,
            onRender: (item : any) => {
                return <Checkbox 
                    checked = {this.state.selectedrecordids.includes(item.key)} 
                    onChange={(evt, checked) => { 
                        if(checked) { this.setState({selectedrecordids: [...this.state.selectedrecordids, item.key]})} 
                        else { this.setState({selectedrecordids: this.state.selectedrecordids.filter(x => x != item.key)})} 
                    }}
                    theme={ createTheme({
                        palette: {
                            themePrimary: "#01395E",
                            themeDark: "#091a70",
                            themeDarker: "#06124d"
                        },
                    })}
                />
            }
        } as IColumn
        return [selectioncolumn, customcolumn, ...cols];
    }
    onColumnClick(evt: React.MouseEvent<HTMLElement>, column: IColumn) {
        const columns = this.getColumns(column.fieldName ?? "");
        const items = this.getSortedRecords(columns);
        if(this.state.filterApplied){   
            this.setState({columns: columns, fitlteredrecords: items ?? []});
        }
        else {
            this.setState({columns: columns, items: items ?? []});
        }
    }
    getSortedRecords(columns: IColumn[]) {
        var sortedcolumn = columns.find(x => x.isSorted);
        if (sortedcolumn) {
            var items = this.state.filterApplied ? [...this.state.fitlteredrecords] : [...this.state.items];

            // Preserve the selection state
            const selectedKeys = new Set(this.state.selectedrecordids);

            items.sort((a, b) => {
                if (sortedcolumn!.isSortedDescending) {
                    return a[sortedcolumn!.fieldName ?? ""] < b[sortedcolumn!.fieldName ?? ""] ? 1 : -1;
                } else {
                    return a[sortedcolumn!.fieldName ?? ""] > b[sortedcolumn!.fieldName ?? ""] ? 1 : -1;
                }
            });

            // Update the selection with the sorted items
            this._selection.setItems(items, false);
            const selectedItems = items.filter(item => selectedKeys.has(item.key));
            selectedItems.forEach(item => this._selection.setKeySelected(item.key, true, false));

            return items;
        }
        
    }
    onEditClick(item: any){
        this.setState({editablerecord: {...item}});
    }
    onSelectionChanged(){
        var items = this._selection.getSelection();
        this.setState({selectedrecordids: items.map(x => x.key as string)});
        //this.props.context.parameters.sampleDataSet.setSelectedRecordIds(items.map(x => x.key as string));
        //this.props.context.parameters.sampleDataSet.setSelectedRecordIds(items.map(x => x.key as string));
    }
    async onSaveClick(){
        var obj = this;
        try{
            var appuserroleid = this.state.editablerecord.id;
            var roleid = this.state.editablerecord["pv_role_value"]?.id?.guid;
            var personid = this.state.editablerecord["pv_person_value"]?.id.guid;

            var appuserrole = {
                "pv_Role@odata.bind" : roleid == undefined ? null : `/pv_roles(${roleid})`,
                "pv_Person@odata.bind" : personid == undefined ? null : `/pv_persons(${personid})`
            }
            var appuserroleupdate = await this.props.context.webAPI.updateRecord("pv_appuserrole", appuserroleid, appuserrole).then(function(resp){
                obj.showAlertMessage(CMSAlertType.Success, "Record updated successfully");
                obj.setState({ editablerecord: null });
                obj.props.context.parameters.sampleDataSet.refresh();
            },function(err){
                obj.showAlertMessage(CMSAlertType.Error, `Error in updating record: ${err.message}`);
                return false;
            });
            // if(!appuserroleupdate) return;

            // var person = {
            //     "pv_direct_phone": this.state.editablerecord["person_pv_direct_phone"],
            //     "pv_email_address": this.state.editablerecord["person_pv_email_address"],
            //     "pv_email_address_2": this.state.editablerecord["person_pv_email_address_2"],
            //     //"pv_service_desk_agent": this.state.editablerecord["person_pv_service_desk_agent_value"] == null ? null : this.state.editablerecord["person_pv_service_desk_agent_value"] == "0" ? false : true
            // }
            // var personupdate =await obj.props.context.webAPI.updateRecord("pv_person", personid, person).then(function (resp) {
            //     return true;
            // }, function (error) {
            //     obj.showAlertMessage(CMSAlertType.Error, `Error in updating record: ${error.message}`);
            //     return false;
            // });

            // if(appuserroleupdate && personupdate){
            //     var currentapprecord = await this.props.context.webAPI.retrieveRecord("pv_apps", (obj.props.context as any).page.entityId, "?$select=pv_id").then(function(resp){ return resp; }, function(err){ throw new Error(`error occured while fetching the record, details: ${err?.message}`) });
            //     var currentuserrecord = await this.props.context.webAPI.retrieveRecord("systemuser",this.props.context.userSettings.userId,"?$select=internalemailaddress").then(function(resp){return resp;},function(err){throw new Error("Unable to fetch current user record");});
            //     var currentpersonrecord = await this.props.context.webAPI.retrieveMultipleRecords("pv_person", `?$filter=pv_email_address eq '${currentuserrecord["internalemailaddress"]}'&$select=pv_id`).then(function(resp){ return resp.entities.length > 0 ? resp.entities[0] : null; },function(err){ throw new Error("Unable to fetch current person record"); });
            //     var rolerecord = await this.props.context.webAPI.retrieveRecord("pv_role", roleid,"?$select=pv_id").then(function(resp){return resp;}, function(err){ throw new Error("Unable to fetch role record"); });

            //     await obj.props.context.webAPI.updateRecord("pv_apps", (obj.props.context as any).page.entityId, { 
            //         "pv_date_modified": new Date(),
            //         "pv_modified_by": currentpersonrecord ? currentpersonrecord["pv_id"] : null,
            //         "pv_modified_method": "Manual"
            //     }).then(function(resp){ return true;},function(err){
            //         throw new Error('Error occured while updating the application record, details: ' + err.message);
            //     });
            //     obj.props.context.webAPI.createRecord("pv_personupdatexwalk", {
            //         "pv_name": `${currentapprecord ? currentapprecord["pv_id"] ?? '' : ''}_${currentpersonrecord ? currentpersonrecord["pv_id"] ?? '' : ''}`,
            //         "pv_pers_change_type": "updated",
            //         "pv_pers_update_method": "manual",
            //         "pv_pers_updated_by": currentpersonrecord ? currentpersonrecord["pv_id"] : null,
            //         "pv_pers_updated_date": new Date(),
            //         "pv_pers_id_crmdb@odata.bind": `/pv_persons(${personid})`,
            //         "pv_role_id": rolerecord["pv_id"],
            //         "pv_short_app_name@odata.bind": `/pv_appses(${(obj.props.context as any).page.entityId})`
            //     }).then(function(resp){
            //         obj.showAlertMessage(CMSAlertType.Success, "Record updated successfully");
            //         obj.setState({ editablerecord: null });
            //         obj.props.context.parameters.sampleDataSet.refresh();
            //     },function(err){
            //         obj.showAlertMessage(CMSAlertType.Error, `Error in updating record: ${err.message}`);
            //     });
            // }
        }catch(error : any){
            obj.showAlertMessage(CMSAlertType.Error, `Error in updating record: ${error.message}`);
        }
        
    }
    onCancelClick(){
        this.setState({editablerecord: null});
    }
    async onFieldChange(fieldname: string, value: any){
        let editablerecord = this.state.editablerecord;
        if(editablerecord){
            if(fieldname == "person_pv_service_desk_agent"){
                editablerecord[`${fieldname}_value`] = value?.key ?? null;
                editablerecord[fieldname] = value?.text ?? null;
            }
            else if(fieldname == "pv_role"){
                editablerecord[fieldname] = value?.name,
                editablerecord[`${fieldname}_value`] = value == null ? null : value
            }
            else if(fieldname == "pv_person"){
                editablerecord[fieldname] == value?.name,
                editablerecord[`${fieldname}_value`] = value == null ? null : value

                if(value != null){
                    await this.props.context.webAPI.retrieveRecord("pv_person",value.id.guid,"?$select=pv_id,pv_direct_phone,pv_email_address,pv_email_address_2,pv_service_desk_agent").then(function(resp){
                        editablerecord["person_pv_id"] = resp["pv_id"];
                        editablerecord["person_pv_direct_phone"] = resp["pv_direct_phone"];
                        editablerecord["person_pv_email_address"] = resp["pv_email_address"];
                        editablerecord["person_pv_email_address_2"] = resp["pv_email_address"];
                        editablerecord["person_pv_service_desk_agent"] = resp["pv_service_desk_agent"] == null ? null : resp["pv_service_desk_agent"] == true ? "Secondary" : "Primary";
                        editablerecord["person_pv_service_desk_agent_value"] = resp["pv_service_desk_agent"] == null ? null : resp["pv_service_desk_agent"] == true ? "1" : "0";
                    });
                }
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

        var roles =(window as any).Xrm.Utility.getGlobalContext().userSettings.roles.get();
        
    }
    async onNewAppUserRole(){
        var obj = this;
        try {
            var newappuserrole = await this.props.context.navigation.openForm({
                entityName: "pv_appuserrole",
                useQuickCreateForm: true,
                createFromEntity: {
                    id: (obj.props.context as any).page.entityId,
                    entityType: "pv_apps"
                }
            }).then(function (resp) {
                return (resp.savedEntityReference && resp.savedEntityReference.length > 0) ? resp.savedEntityReference[0].id : null;
            }, function (err) {
                throw new Error(`error occured while creating the record, details: ${err?.message}`) ;
            });

            if (newappuserrole != null) {
                var currentapprecord = await this.props.context.webAPI.retrieveRecord("pv_apps", (obj.props.context as any).page.entityId, "?$select=pv_id").then(function(resp){ return resp; }, function(err){ throw new Error(`error occured while fetching the record, details: ${err?.message}`) });
                var appuserrolerecord = await this.props.context.webAPI.retrieveRecord("pv_appuserrole", newappuserrole!, "?$select=pv_id,_pv_role_value,_pv_person_value").then(function (resp) { return resp; }, function (err) { throw new Error(`error occured while fetching the record, details: ${err?.message}`) });
                var currentuserrecord = await this.props.context.webAPI.retrieveRecord("systemuser", this.props.context.userSettings.userId, "?$select=internalemailaddress").then(function (resp) { return resp; }, function (err) { throw new Error(`error occured while fetching the record, details: ${err?.message}`) });
                var currentpersonrecord = await this.props.context.webAPI.retrieveMultipleRecords("pv_person", `?$filter=pv_email_address eq '${currentuserrecord["internalemailaddress"]}'&$select=pv_id`).then(function (resp) { return resp.entities.length > 0 ? resp.entities[0] : null; }, function (err) { throw new Error(`error occured while fetching the record, details: ${err?.message}`); });
                var rolerecord = await this.props.context.webAPI.retrieveRecord("pv_role", appuserrolerecord["_pv_role_value"], "?$select=pv_id").then(function (resp) { return resp; }, function (err) { return null; });

                await obj.props.context.webAPI.updateRecord("pv_apps", (obj.props.context as any).page.entityId, { 
                    "pv_date_modified": new Date(),
                    "pv_modified_by": currentpersonrecord == null ? null : currentpersonrecord["pv_id"],
                    "pv_modified_method": "Manual"
                }).then(function(resp){ return true;},function(err){
                    throw new Error('Error occured while updating the application record, details: ' + err.message);
                });

                await obj.props.context.webAPI.createRecord("pv_personupdatexwalk", {
                    "pv_name": `${currentapprecord ? currentapprecord["pv_id"] ?? '' : ''}_${currentpersonrecord ? currentpersonrecord["pv_id"] ?? '' : ''}`,
                    "pv_pers_change_type": "added",
                    "pv_pers_update_method": "manual",
                    "pv_pers_updated_by": currentpersonrecord == null ? null : currentpersonrecord["pv_id"],
                    "pv_pers_updated_date": new Date(),
                    "pv_pers_id_crmdb@odata.bind": `/pv_persons(${appuserrolerecord["_pv_person_value"]})`,
                    "pv_role_id": rolerecord == null ? null : rolerecord["pv_id"],
                    "pv_short_app_name@odata.bind": `/pv_appses(${(obj.props.context as any).page.entityId})`
                }).then(function (resp) {
                    obj.showAlertMessage(CMSAlertType.Success, "Record created successfully");
                    obj.setState({ editablerecord: null });
                    obj.props.context.parameters.sampleDataSet.refresh();
                }, function (err) {
                    throw new Error(`Error occured while creating the person update xwalk record : ${err.message}`);
                });
            }
        } catch (err) {
            obj.showAlertMessage(CMSAlertType.Error, `error occured while creating the record, details: ${err instanceof Error ? err.message : String(err)}`);
        }
    }
    onRefresh(){
        this.props.context.parameters.sampleDataSet.refresh();
    }
    onDelete() {
        var obj = this;
        this.setState({
            showDialog: true,
            dialogTitle: "Confirm Deletion",
            dialogSubtext: `Are you sure you want to delete the selected ${this.state.selectedrecordids.length} record(s)? This action cannot be undone.`,
            dialogConfirmButtonLabel: "Delete",
            dialogCancelButtonLabel: "Cancel",
            dialogConfirmCallback: async () => {
                obj.setState({ showDialog: false });
                //var selectedrecords = this._selection.getSelection().map(x => x.key as string);
                var selectedrecords = obj.state.selectedrecordids;
                var currenapprecord = await obj.props.context.webAPI.retrieveRecord("pv_apps", (obj.props.context as any).page.entityId, "?$select=pv_id").then(function(resp){ return resp; }, function(err){ throw new Error(`error occured while fetching the record, details: ${err?.message}`) });
                var currentuserrecord = await this.props.context.webAPI.retrieveRecord("systemuser", this.props.context.userSettings.userId, "?$select=internalemailaddress").then(function (resp) { return resp; }, function (err) { throw new Error(`error occured while fetching the record, details: ${err?.message}`) });
                var currentpersonrecord = await this.props.context.webAPI.retrieveMultipleRecords("pv_person", `?$filter=pv_email_address eq '${currentuserrecord["internalemailaddress"]}'&$select=pv_id`).then(function (resp) { return resp.entities.length > 0 ? resp.entities[0] : null; }, function (err) { throw new Error(`error occured while fetching the record, details: ${err?.message}`); });
                Promise.all(selectedrecords.map(async x => {
                    try {
                        var appuserrolerecord = await this.props.context.webAPI.retrieveRecord("pv_appuserrole", x, "?$select=pv_id,_pv_role_value,_pv_person_value").then(function (resp) { return resp; }, function (err) { throw new Error(`error occured while fetching the record, details: ${err?.message}`) });
                        var rolerecord = null;
                        if(appuserrolerecord["_pv_role_value"])
                            rolerecord = await this.props.context.webAPI.retrieveRecord("pv_role", appuserrolerecord["_pv_role_value"], "?$select=pv_id").then(function (resp) { return resp; }, function (err) { return null; });
                        var deleteResult = await obj.props.context.webAPI.deleteRecord("pv_appuserrole", x).then(function (resp) {
                            return true
                        }, function (err) {
                            return obj.showAlertMessage(CMSAlertType.Error, `error occured while deleting the record, details: ${err?.message}`);
                        })
                        if(!deleteResult) return;
                        else return obj.props.context.webAPI.createRecord("pv_personupdatexwalk", {
                            "pv_name": `${currenapprecord ? currenapprecord["pv_id"] ?? '' : ''}_${currentpersonrecord ? currentpersonrecord["pv_id"] ?? '' : ''}`,
                            "pv_pers_change_type": "removed",
                            "pv_pers_update_method": "manual",
                            "pv_pers_updated_by": currentpersonrecord == null ? null : currentpersonrecord["pv_id"],
                            "pv_pers_updated_date": new Date(),
                            "pv_pers_id_crmdb@odata.bind": `/pv_persons(${appuserrolerecord["_pv_person_value"]})`,
                            "pv_role_id": rolerecord == null ? null : rolerecord["pv_id"],
                            "pv_short_app_name@odata.bind": `/pv_appses(${(obj.props.context as any).page.entityId})`
                        }).then(function (resp) {
                            return true;
                        }, function (err) {
                            throw new Error(`Error in updating record: ${err.message}`);
                        });
                    } catch (err) {
                        obj.showAlertMessage(CMSAlertType.Error, `error occured while deleting the record with id ${x}, details: ${err instanceof Error ? err.message : String(err)}`);
                        return false;
                    }
                })).then(async () => {
                    await obj.props.context.webAPI.updateRecord("pv_apps", (obj.props.context as any).page.entityId, { 
                        "pv_date_modified": new Date(),
                        "pv_modified_by": currentpersonrecord == null ? null : currentpersonrecord["pv_id"],
                        "pv_modified_method": "Manual"
                    }).then(function(resp){ return true;},function(err){
                        throw new Error('Error occured while updating the application record, details: ' + err.message);
                    });

                    obj.props.context.parameters.sampleDataSet.refresh();
                    obj.showAlertMessage(CMSAlertType.Success,"Record(s) deletion completed successfully");
                });
            },
            dialogCancelCallback: () => {
                obj.setState({ showDialog: false });
            },
            dialogDismissCallback: () => {
                obj.setState({ showDialog: false });
            }
        })
        
    }
    onReportDataDiscrepancy(){
        var obj = this;
        var data = {
            appname: obj.props.context.parameters.applicationname.raw ?? "",
            recordid: (obj.props.context as any).page.entityId,
            appuserroleid: obj.state.selectedrecordids[0],
            tabname: "assignedpeople",
            sectionname: "assignedpeople"
        }
        var pageInput = {
            pageType: "webresource",
            webresourceName: "crm2_/reportissue/index.html",
            data: JSON.stringify(data)
        };
        var navigationOptions = {
            target: 2,          
            width: {
                value: 800,
                unit: "px"
            },
            height: {
                value: 900,
                unit: "px"
            },
            position: 1         
        };
        (this.props.context.navigation as any).navigateTo(pageInput,navigationOptions).then(function(resp: any){},function(err: any){});
    }
    showAlertMessage(messagetype: CMSAlertType, message: string){
        // var obj = this;
        // this.setState({ 
        //     showalert: true, 
        //     alert : {
        //         messagetype : messagetype,
        //         message : message
        //     }
        // });
        // setTimeout(() => {
        //     obj.setState({showalert : false})
        // }, 10000);
        this.props.showalert(message, messagetype);
    }
    
    onSearchClick(){
        var obj = this;
        let items: any[] = [];
        
        var fieldnames = ["pv_person","pv_role","person_pv_id","person_pv_email_address_2","person_pv_direct_phone","person_pv_email_address"]
        
        this.state.items.forEach((item) => {
            for(var i=0;i<fieldnames.length;i++){
                if(item[fieldnames[i]] && item[fieldnames[i]].toLowerCase().includes(this.state.searchtext?.toLowerCase() || "")) {
                    items.push(item);
                    break;
                }
            }
        });
        this.setState({fitlteredrecords: items, filterApplied: true});
    }
    onSearchClear(){
        this.setState({searchtext: "", filterApplied: false});
    }
    onCheckboxChange(props: any, checked?: boolean){
        alert("props.item.key");
        if(checked) {
            this._selection.setKeySelected(props.item.key, true, false);
        }
        else {
            //this._selection.setKeySelected(props.item.key, false, false);
            //this.setState({selectedrecordids: this.state.selectedrecordids.filter(x => x != props.item.key)});
        }
    }
    onRenderCheckbox(props: any){
        alert(JSON.stringify(props));
        return <Checkbox checked={props?.checked} onChange={(ev, checked) => this.onCheckboxChange(props, checked)} />
    }
    render(): React.ReactNode {
        var items = this.state.filterApplied ? this.state.fitlteredrecords : this.state.items;
        var haseditrole = (window as any).Xrm.Utility.getGlobalContext().userSettings.roles.get().some((r: any) => r.name == "Manager" || r.name == "Hosting Coordinator" || r.name == "Financial Operations (Funding)" || r.name == "System Administrator");

        return <div>
            { this.state.showalert && <CMSAlert type={this.state.alert!.messagetype} message={this.state.alert?.message} />}
            <Stack>
                <StackItem>
                    <Stack horizontal horizontalAlign="end" style={{marginTop: 10, marginRight: 10}}>
                        <StackItem grow style={{marginRight: 10, marginLeft: 10}}>
                            <TextField
                                style={{ borderRadius: "10" }}
                                value={this.state.searchtext || ""}
                                placeholder="Search Records..."
                                onChange={(e, newValue) => {
                                    if (newValue == null || newValue == "") {
                                        this.setState({ searchtext: "", filterApplied: false })
                                    }
                                    else {
                                        this.setState({ searchtext: newValue || "" });
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        this.onSearchClick.bind(this)();
                                    }
                                }}
                                styles={{
                                    fieldGroup: { background: "transparent", borderRadius: 6, border: "1px solid #d1d1d1", height: 36 },
                                    field: { borderRadius: 6, height: 36, fontSize: 15, padding: 8 },
                                    prefix: { background: "#01395E", borderRadius: "6px 0 0 6px" },
                                    suffix: { background: "transparent" },
                                }}
                                onRenderPrefix={() => (
                                    <span style={{ borderRadius: 20 }}><SearchIcon size={24} color="white" /> </span>
                                )}
                                onRenderSuffix={() =>
                                    this.state.searchtext != "" ? (
                                        <Icon
                                            iconName="Clear"
                                            style={{ marginRight: 8, cursor: "pointer" }}
                                            onClick={this.onSearchClear.bind(this)}
                                        />
                                    ) : null
                                }
                            />
                        </StackItem>
                        <Stack horizontal tokens={{childrenGap: 10}} >
                            {/* <PrimaryButton iconProps={{ iconName: "Add" }} text="Add New" onClick={this.onNewAppUserRole.bind(this)} 
                                style={{ borderRadius: 6, backgroundColor: haseditrole ?  "#01395E" : "#F2F2F2" , color: haseditrole ? "white" : "#5A5A5A", width: "100%" }}
                                styles={ { 
                                    root: {
                                        height: 36,
                                        padding: "0 20px",
                                    },
                                    label: {
                                        fontSize: 15,
                                        lineHeight: 36,
                                    },
                                }}
                                disabled={!haseditrole}
                            /> */}
                            <PrimaryButton iconProps={{ iconName: "Add" }} text="Add New" onClick={() => this.setState({ openQuickCreatePanel: true })} 
                                style={{ borderRadius: 6, backgroundColor: haseditrole ?  "#01395E" : "#F2F2F2" , color: haseditrole ? "white" : "#5A5A5A", width: "100%" }}
                                styles={ { 
                                    root: {
                                        height: 36,
                                        padding: "0 20px",
                                    },
                                    label: {
                                        fontSize: 15,
                                        lineHeight: 36,
                                    },
                                }}
                                disabled={!haseditrole}
                            />
                            <PrimaryButton iconProps={{ iconName: "Refresh" }} text="Refresh" onClick={this.onRefresh.bind(this)} 
                                style={{ borderRadius: 6, backgroundColor: "#01395E", width: "100%" }}
                                styles={ { 
                                    root: {
                                        height: 36,
                                        padding: "0 20px",
                                    },
                                    label: {
                                        fontSize: 15,
                                        lineHeight: 36,
                                    },
                                }}
                            />
                            <PrimaryButton iconProps={{ iconName: "Delete" }} text="Delete" onClick={this.onDelete.bind(this)} 
                                style={{ borderRadius: 6, backgroundColor: (this.state.selectedrecordids.length == 0 || !haseditrole) ? "#F2F2F2" : "#01395E", color: (this.state.selectedrecordids.length == 0 || !haseditrole) ? "#5A5A5A" : "white", width: "100%" }}
                                styles={ { 
                                    root: {
                                        height: 36,
                                        padding: "0 20px",
                                    },
                                    label: {
                                        fontSize: 15,
                                        lineHeight: 36,
                                    },
                                }}
                                disabled={this.state.selectedrecordids.length === 0 || !haseditrole}
                            />
                            {/* <PrimaryButton iconProps={{ iconName: "bug" }} text="Report Issue" onClick={this.onReportDataDiscrepancy.bind(this)} 
                                style={{ borderRadius: 6, backgroundColor: (this.state.selectedrecordids.length == 1 ) ? "#01395E" : "#F2F2F2", color: (this.state.selectedrecordids.length == 1) ? "white" : "#5A5A5A", width: "100%" }}
                                styles={ { 
                                    root: {
                                        height: 36,
                                        padding: "0 20px",
                                    },
                                    label: {
                                        fontSize: 15,
                                        lineHeight: 36,
                                    },
                                }}
                                disabled={this.state.selectedrecordids.length !== 1}
                            /> */}
                        </Stack>
                    </Stack>
                </StackItem>
                <StackItem style={{marginTop: 10}}>
                    <MarqueeSelection selection={this._selection}>
                        <DetailsList 
                            items={items ?? []} columns={[...this.state.columns]} 
                            selection={this._selection} selectionMode={SelectionMode.none}
                            checkboxVisibility={1}
                            getKey={(item) => item.key}
                            enterModalSelectionOnTouch={true}
                            selectionPreservedOnEmptyClick={true}
                            styles={{
                                root: {
                                    overflowY: "auto", // Enable vertical scrolling
                                    overflowX: "hidden", // Hide horizontal scrollbar
                                    maxHeight: "calc(100vh - 400px)", // Adjust height dynamically based on available space
                                    selectors: {
                                        ".ms-DetailsHeader .is-checked .ms-Check-circle": {
                                            "background-color": "yellow",
                                            "border-radius": "50%",
                                        },
                                        ".ms-DetailsRow .is-checked .ms-Check-circle": {
                                            "background-color": "yellow",
                                            "border-radius": "50%",
                                        }
                                    }
                                }
                            }}
                            className="appuserroles"
                        />
                    </MarqueeSelection>
                </StackItem>
            </Stack>
            <CMSDialog
                isOpen={this.state.showDialog!}
                title={this.state.dialogTitle}
                subText={this.state.dialogSubtext}
                confirmButtonText={this.state.dialogConfirmButtonLabel}
                cancelButtonText={this.state.dialogCancelButtonLabel}
                onDismiss={() => {
                    this.setState({ showDialog: false });
                    this.state.dialogDismissCallback && this.state.dialogDismissCallback();
                }}
                onConfirm={() => {
                    this.setState({ showDialog: false });
                    this.state.dialogConfirmCallback && this.state.dialogConfirmCallback();
                }}
                onCancel={() => {
                    this.setState({ showDialog: false });
                    this.state.dialogCancelCallback && this.state.dialogCancelCallback();
                }}
            />
            { this.state.openQuickCreatePanel &&
                <AppUserRoleQuickCreate 
                    context={this.props.context}
                    onClose={() => this.setState({ openQuickCreatePanel: false })}
                    onComplete={() => {
                        this.setState({ openQuickCreatePanel: false });
                        this.props.context.parameters.sampleDataSet.refresh();
                    }}
                    appid={(this.props.context as any).page.entityId}
                />
            }
        </div>
    }
}

export default AppUserRoles;