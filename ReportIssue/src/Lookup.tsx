import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { IPersonaProps, NormalPeoplePicker, IPeoplePickerProps } from "@fluentui/react";

interface LookupProps {
    entityType: string;
    allowMultiSelect?: boolean;
    onRecordSelect: (items : any[]) => void;
}
interface LookupState {
    selectedRecords: IPersonaProps[]
    allitems: IPersonaProps[]
}   

class Lookup extends React.Component<LookupProps, LookupState> {
    constructor(props: LookupProps) {
        super(props);
        this.state = {
            selectedRecords: [],
            allitems: []
        };
    }
    componentDidMount() {
        var obj = this;
        var recs : IPersonaProps[] = [];
        
        if(this.props.entityType == "cr549_person"){
            (parent as any).Xrm.WebApi.retrieveMultipleRecords("cr549_person",`?$select=cr549_name,cr549_id,cr549_personid$$top=10&$orderby=cr549_name asc`).then(function(resp: any){
                    resp.entities.forEach((ent : any) => {
                        recs.push({ id: ent["cr549_personid"], text: ent["cr549_name"], secondaryText: ent["cr549_id"], showSecondaryText: true } as IPersonaProps);
                    });
                    obj.setState({ allitems: recs });
                },function(err : any){
                    console.log("Error occured while fetching the query");
                })
        }
    }
    async loadRecords(entityType: string, query: string | null): Promise<any[]>{
        var recs : any[] = [];
        while(query){
            await (parent as any).Xrm.WebApi.retrieveMultipleRecords(entityType,query!).then(function(resp : any){
                resp.entities.forEach((ent : any) => {
                    recs.push({ id: ent["cr549_personid"], text: ent["cr549_name"], secondaryText: ent["cr549_id"], showSecondaryText: true } as IPersonaProps);
                });
                query = resp.nextLink?.substring(resp.nextLink?.indexOf('?'));
            },function(err: any){
                query = null;
            });
        }
        
        return recs;
    }
    onResolveSuggestions = (filterText: string, currentPersonas?: IPersonaProps[]) => {

        if (filterText == null || filterText.trim() == "") {
            return this.state.allitems;
        }
        if (filterText?.length < 3) {
            return this.state.allitems.filter(item => item.text?.toLowerCase().includes(filterText.toLowerCase()));
        }
        else {
            return (parent as any).Xrm.WebApi.retrieveMultipleRecords("cr549_person", `?$select=cr549_name,cr549_id,cr549_personid,cr549_email_address&$filter=contains(cr549_name,'${filterText}') or contains(cr549_id,'${filterText}')&$orderby=cr549_name asc`).then(function (resp:any) {
                return resp.entities.map((ent: any) => {
                    return { id: ent["cr549_personid"], text: ent["cr549_name"], secondaryText: ent["cr549_id"], showSecondaryText: true, thirdText: ent["cr549_email_address"] } as IPersonaProps;
                });
            })
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
                    placeholder: "Type at least 3 characters to search..." 
                }}
            />
        );
    }   

}
export default Lookup;
