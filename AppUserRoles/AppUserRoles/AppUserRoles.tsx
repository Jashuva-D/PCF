import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { DetailsList, DetailsListLayoutMode, IColumn} from "@fluentui/react/lib/DetailsList";
import { Icon } from "@fluentui/react/lib/Icon";
import { initializeIcons,Selection, SelectionMode, PrimaryButton, TextField, Text,StackItem,Checkbox, DefaultButton, Stack, IconButton, PeoplePickerItem, NormalPeoplePicker, Dropdown, CommandBarButton, CommandBar, Link, MarqueeSelection } from "@fluentui/react";
import { error } from "console";
import LookupControl from "./LookupControl";
import { CMSAlertType } from "./Constants";
import CMSAlert from "./CMSAlert";
import { SearchIcon } from "./Icons";
import CMSDialog from "./CMSDialog";

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
            columns: this.getColumns("cr549_person"),
            items: [],
            editablerecord: null,
            showalert: false,
            selectedrecordids: [],
            searchtext: "",
            filterApplied: false,
            fitlteredrecords: []
        }
    }
    getColumns(sortedcolumn : string): IColumn[] {
        var currentsortedcolumn = this.state?.columns ? this.state.columns?.find(x => x.isSorted) : null;
        var cols : IColumn[] = [];
        this.props.context.parameters.sampleDataSet.columns.forEach((c) => {
                if(c.name == "cr549_id") return;
                var colname = c.name.replace("a_0bbe2879d1e8f0118544001dd8096c2b.","person_")
                cols.push({
                    key: c.name,
                    name: c.displayName,
                    fieldName: colname,
                    minWidth: 150,
                    maxWidth: 200,
                    isResizable: true,
                    isSorted: colname === sortedcolumn ? true : false,
                    isSortedDescending: currentsortedcolumn && currentsortedcolumn.fieldName === colname ? !currentsortedcolumn.isSortedDescending : true,
                    onColumnClick: this.onColumnClick.bind(this),
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
                                return <Text>{item[columnname] ?? ""}</Text>;
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
                    return <Stack horizontal tokens={{childrenGap: 15}}><Icon iconName="Save" title="Save" onClick={this.onSaveClick.bind(this)} style={{fontSize: 20, color: "#0D2499", cursor: "pointer"}}/> <Icon iconName="Cancel" title="Cancel" onClick={this.onCancelClick.bind(this)} style={{color: "red", fontSize: 20, cursor: "pointer"}}/></Stack>
                }
                else {
                    return <div><Icon iconName="Edit" title={this.state.editablerecord == null ? "Edit" : ""} onClick={this.state.editablerecord != null ? undefined : this.onEditClick.bind(this, item)} style={{fontSize: 15, color: this.state.editablerecord == null ? "#0D2499" : "#A0A0A0", cursor: this.state.editablerecord == null ? "pointer" : "not-allowed"}}/></div>
                }
            }
        } as IColumn;
        return [customcolumn, ...cols];
    }
    onColumnClick(evt: React.MouseEvent<HTMLElement>, column: IColumn) {
        const columns = this.getColumns(column.fieldName ?? "");
        const items = this.getSortedRecords();
        if(this.state.filterApplied){   
            this.setState({columns: columns, fitlteredrecords: items ?? []});
        }
        else {
            this.setState({columns: columns, items: items ?? []});
        }
    }
    getSortedRecords() {
        var sortedcolumn = this.state.columns.find(x => x.isSorted);
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
            "cr549_service_desk_agent": this.state.editablerecord["person_cr549_service_desk_agent_value"] == null ? null : this.state.editablerecord["person_cr549_service_desk_agent_value"] == "0" ? false : true 
        }

        await this.props.context.webAPI.updateRecord("cr549_appuserrole", appuserroleid, appuserrole).then(function(resp){
            obj.props.context.webAPI.updateRecord("cr549_person", personid, person).then(function(resp){
                obj.showAlertMessage(CMSAlertType.Success,"Record updated successfully");
                obj.setState({editablerecord: null});
                obj.props.context.parameters.sampleDataSet.refresh();
            },function(error){
                obj.showAlertMessage(CMSAlertType.Error, `Error in updating record: ${error.message}`);
            });
        },function(err){
            obj.showAlertMessage(CMSAlertType.Error, `Error in updating record: ${err.message}`);
        })

        
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
        this.setState({
            showDialog: true,
            dialogTitle: "Confirm Deletion",
            dialogSubtext: `Are you sure you want to delete the selected ${this._selection.getSelectedCount()} record(s)? This action cannot be undone.`,
            dialogConfirmButtonLabel: "Delete",
            dialogCancelButtonLabel: "Cancel",
            dialogConfirmCallback: () => {
                obj.setState({ showDialog: false });
                var selectedrecords = this._selection.getSelection().map(x => x.key as string);
                Promise.all(selectedrecords.map(x => {
                    return obj.props.context.webAPI.deleteRecord("cr549_appuserrole",x).then(function(resp){
                        return true
                    },function(err){
                        return obj.showAlertMessage(CMSAlertType.Error, `error occured while deleting the record, details: ${err?.message}`);
                    })
                })).then(() => {
                    obj.props.context.parameters.sampleDataSet.refresh();
                    obj.showAlertMessage(CMSAlertType.Success,"Record deleted successfully");
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
        
        var fieldnames = ["cr549_person","cr549_role","person_cr549_id","person_cr549_email_address_2","person_cr549_direct_phone","person_cr549_email_address"]
        
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
                                    prefix: { background: "#0D2499", borderRadius: "6px 0 0 6px" },
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
                            <PrimaryButton iconProps={{ iconName: "Add" }} text="Add New" onClick={this.onNewAppUserRole.bind(this)} 
                                style={{ borderRadius: 6, backgroundColor: "#0D2499", width: "100%", whiteSpace: "nowrap" }}
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
                            <PrimaryButton iconProps={{ iconName: "Refresh" }} text="Refresh" onClick={this.onRefresh.bind(this)} 
                                style={{ borderRadius: 6, backgroundColor: "#0D2499", width: "100%" }}
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
                                style={{ borderRadius: 6, backgroundColor: this.state.selectedrecordids.length == 0 ? "#F2F2F2" : "#0D2499", color: this.state.selectedrecordids.length == 0 ? "#5A5A5A" : "white", width: "100%" }}
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
                                disabled={this.state.selectedrecordids.length === 0}
                            />
                        </Stack>
                    </Stack>
                </StackItem>
                <StackItem style={{marginTop: 10}}>
                    <MarqueeSelection selection={this._selection}>
                        <DetailsList 
                            items={items ?? []} columns={[...this.state.columns]} 
                            selection={this._selection} selectionMode={SelectionMode.multiple}
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
                                            "background-color": "#0D2499",
                                            "border-radius": "50%",
                                        },
                                        ".ms-DetailsRow .is-checked .ms-Check-circle": {
                                            "background-color": "#0D2499",
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
        </div>
    }
}

export default AppUserRoles;