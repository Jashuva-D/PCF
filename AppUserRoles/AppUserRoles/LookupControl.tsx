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
        if(this.props.entityType == "cr549_role"){
            this.props.context.webAPI.retrieveMultipleRecords(this.props.entityType, "?$select=cr549_role_name,cr549_id,cr549_roleid").then(
                (response) => {
                    response.entities.forEach((ent) => {
                        recs.push({ id: ent["cr549_roleid"], text: ent["cr549_role_name"], secondaryText: ent["cr549_id"], showSecondaryText: false } as IPersonaProps);
                    });
                    var selectedrecords = (obj.props.recordId != null && obj.props.recordId != "") ? recs.filter(x => x.id == this.props.recordId) : [];
                    obj.setState({ allitems: recs, selectedRecords: selectedrecords });
                },
                (error) => {
                    console.error("Error fetching records: ", error);
                }
            );
        }
        if(this.props.entityType == "cr549_person"){
            if(this.props.recordId != null && this.props.recordId != ""){
                var query = "?$select=cr549_name,cr549_id,cr549_personid";
                this.props.context.webAPI.retrieveRecord("cr549_person",this.props.recordId!,query).then(function(resp){
                    recs.push({ id: resp["cr549_personid"], text: resp["cr549_name"], secondaryText: resp["cr549_id"], showSecondaryText: true } as IPersonaProps);
                    var selectedrecords = recs.filter(x => x.id == obj.props.recordId);
                    obj.setState({ allitems: recs, selectedRecords: selectedrecords });
                },function(err){
                    console.log("Error occured while fetching the query");
                })
            }
            else {
                this.props.context.webAPI.retrieveMultipleRecords("cr549_person",`?$select=cr549_name,cr549_id,cr549_personid$$top=10&$orderby=cr549_name asc`).then(function(resp){
                    resp.entities.forEach((ent) => {
                        recs.push({ id: ent["cr549_personid"], text: ent["cr549_name"], secondaryText: ent["cr549_id"], showSecondaryText: true } as IPersonaProps);
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
                    recs.push({ id: ent["cr549_personid"], text: ent["cr549_name"], secondaryText: ent["cr549_id"], showSecondaryText: true } as IPersonaProps);
                });
                query = resp.nextLink?.substring(resp.nextLink?.indexOf('?'));
            },function(err){
                query = null;
            });
        }
        
        return recs;
    }
    onResolveSuggestions = (filterText: string, currentPersonas?: IPersonaProps[]) => {
        
        if(this.props.entityType == "cr549_role"){
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
                return this.props.context.webAPI.retrieveMultipleRecords("cr549_person",`?$select=cr549_name,cr549_id,cr549_personid&$filter=contains(cr549_name,'${filterText}') or contains(cr549_id,'${filterText}')&$orderby=cr549_name asc`).then(function(resp){
                    return resp.entities.map((ent) => {
                        return { id: ent["cr549_personid"], text: ent["cr549_name"], secondaryText: ent["cr549_id"], showSecondaryText: true } as IPersonaProps;
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
        const header = this.props.entityType == "cr549_person" ? "People" : "Roles";
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
                    placeholder: this.props.entityType == "cr549_person" ? "Search for a person..." : "Search for a role..."
                }}
            />
        );
    }   

}
export default LookupControl;
