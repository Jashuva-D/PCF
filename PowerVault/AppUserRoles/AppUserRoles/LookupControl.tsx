import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { IInputs } from "./generated/ManifestTypes";
import { IPersonaProps, NormalPeoplePicker, IPeoplePickerProps } from "@fluentui/react";

interface LookupControlProps {
    context: ComponentFramework.Context<IInputs>;
    recordId: string | null;
    entityType: string;
    allowMultiSelect?: boolean;
    onRecordSelect: (items : any[]) => void;
}
interface LookupControlState {
    selectedRecords: IPersonaProps[]
    allitems: IPersonaProps[]
}   

class LookupControl extends React.Component<LookupControlProps, LookupControlState> {
    constructor(props: LookupControlProps) {
        super(props);
        this.state = {
            selectedRecords: [],
            allitems: []
        };
    }
    componentDidMount() {
        var obj = this;
        var recs : IPersonaProps[] = [];
        if(this.props.entityType == "pv_role"){
            this.props.context.webAPI.retrieveMultipleRecords(this.props.entityType, "?$select=pv_role_name,pv_id,pv_roleid&$orderby=pv_role_name asc").then(
                (response) => {
                    response.entities.forEach((ent) => {
                        recs.push({ id: ent["pv_roleid"], text: ent["pv_role_name"], secondaryText: ent["pv_id"], showSecondaryText: false } as IPersonaProps);
                    });
                    var selectedrecords = (obj.props.recordId != null && obj.props.recordId != "") ? recs.filter(x => x.id == this.props.recordId) : [];
                    obj.setState({ allitems: recs, selectedRecords: selectedrecords });
                },
                (error) => {
                    console.error("Error fetching records: ", error);
                }
            );
        }
        if(this.props.entityType == "pv_person"){
            if(this.props.recordId != null && this.props.recordId != ""){
                var query = "?$select=pv_name,pv_id,pv_personid";
                this.props.context.webAPI.retrieveRecord("pv_person",this.props.recordId!,query).then(function(resp){
                    recs.push({ id: resp["pv_personid"], text: resp["pv_name"], secondaryText: resp["pv_id"], showSecondaryText: true } as IPersonaProps);
                    var selectedrecords = recs.filter(x => x.id == obj.props.recordId);
                    obj.setState({ allitems: recs, selectedRecords: selectedrecords });
                },function(err){
                    console.log("Error occured while fetching the query");
                })
            }
            else {
                this.props.context.webAPI.retrieveMultipleRecords("pv_person",`?$select=pv_name,pv_id,pv_personid$$top=10&$orderby=pv_name asc`).then(function(resp){
                    resp.entities.forEach((ent) => {
                        recs.push({ id: ent["pv_personid"], text: ent["pv_name"], secondaryText: ent["pv_id"], showSecondaryText: true } as IPersonaProps);
                    });
                    obj.setState({ allitems: recs });
                },function(err){
                    console.log("Error occured while fetching the query");
                })
            }
        }
    }
    async loadRecords(entityType: string, query: string | null): Promise<any[]>{
        var recs : any[] = [];
        while(query){
            await this.props.context.webAPI.retrieveMultipleRecords(entityType,query!).then(function(resp){
                resp.entities.forEach((ent) => {
                    recs.push({ id: ent["pv_personid"], text: ent["pv_name"], secondaryText: ent["pv_id"], showSecondaryText: true } as IPersonaProps);
                });
                query = resp.nextLink?.substring(resp.nextLink?.indexOf('?'));
            },function(err){
                query = null;
            });
        }
        
        return recs;
    }
    onResolveSuggestions = (filterText: string, currentPersonas?: IPersonaProps[]) => {
        
        if(this.props.entityType == "pv_role"){
            var items = [] as any[];
            if(filterText == null || filterText.trim() == ""){
                items = this.state.allitems;
            }
            else {
                items = this.state.allitems.filter(item => item.text?.toLowerCase().includes(filterText.toLowerCase()));
            }
            this.state.selectedRecords.forEach(function(selected){
                items = items.filter(x => x.id != selected.id);
            });
            return items;
        }
        else {
            if(filterText == null || filterText.trim() == ""){
                return this.state.allitems;
            }
            if(filterText?.length < 3){
                return this.state.allitems.filter(item => item.text?.toLowerCase().includes(filterText.toLowerCase()));
            }
            else {
                return this.props.context.webAPI.retrieveMultipleRecords("pv_person",`?$select=pv_name,pv_id,pv_personid&$filter=contains(pv_name,'${filterText}') or contains(pv_id,'${filterText}') or contains(pv_email_address,'${filterText}')&$orderby=pv_name asc`).then(function(resp){
                    return resp.entities.map((ent) => {
                        return { id: ent["pv_personid"], text: ent["pv_name"], secondaryText: ent["pv_id"], showSecondaryText: true } as IPersonaProps;
                    });
                })
            }
        }
    }
    onEmptyResolveSuggestions = () : IPersonaProps[] => {
        var items = this.state.allitems;
        this.state.selectedRecords.forEach(function(selected){
            items = items.filter(x => x.id != selected.id);
        });
        
        return items;
    }
    render() {
        const allitems = [...this.state.allitems];
        const header = this.props.entityType == "pv_person" ? "People" : "Roles";
        return (    
            <NormalPeoplePicker
                onEmptyResolveSuggestions={this.onEmptyResolveSuggestions.bind(this)}
                onResolveSuggestions={this.onResolveSuggestions.bind(this)}
                pickerSuggestionsProps={{
                    loadingText: "Loading...",
                    suggestionsHeaderText: header,
                    noResultsFoundText: "search for more than 3 characters to find more results",
                }}
                selectedItems={[...this.state.selectedRecords]}
                itemLimit={this.props.allowMultiSelect ? undefined : 1}
                onChange={(items) => {
                    this.setState({selectedRecords: items ?? []})
                    this.props.onRecordSelect(items ?? []);
                }}
                inputProps={{ 
                    style: { backgroundColor: 'white', width: '100%' },
                    placeholder: this.props.entityType == "pv_person" ? "Search for a person..." : "Search for a role..."
                }}
            />
        );
    }   

}
export default LookupControl;
