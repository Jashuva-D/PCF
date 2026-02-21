import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { IInputs } from "./generated/ManifestTypes";
import { IPersonaProps, NormalPeoplePicker } from "@fluentui/react";

interface LookupControlProps {
    context: ComponentFramework.Context<IInputs>;
    recordId: string | null;
    entityType: string;
    onRecordSelect: (id: string, name: string) => void;
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
                        recs.push({ id: ent["cr549_roleid"], text: ent["cr549_role_name"], secondaryText: ent["cr549_id"], showSecondaryText: true } as IPersonaProps);
                    });
                    var selectedrecords = recs.filter(x => x.id == this.props.recordId); 
                    obj.setState({ allitems: recs, selectedRecords: selectedrecords });
                },
                (error) => {
                    console.error("Error fetching records: ", error);
                }
            );
        }
        if(this.props.entityType == "cr549_person"){
            var query = "?$select=cr549_name,cr549_id,cr549_personid";
            this.loadRecords("cr549_person", query).then(function(resp){
                var selectedrecords = resp.filter(x => x.id == obj.props.recordId); 
                obj.setState({ allitems: recs, selectedRecords: selectedrecords });
            })
            // while(query && query != ""){
            //     this.props.context.webAPI.retrieveMultipleRecords(this.props.entityType, query).then(
            //         (response) => {
            //             response.entities.forEach((ent) => {
            //                 recs.push({ id: ent["cr549_personid"], text: ent["cr549_name"], secondaryText: ent["cr549_id"], showSecondaryText: true } as IPersonaProps);
            //             });
            //             query = response.nextLink;
            //         },
            //         (error) => {
            //             console.error("Error fetching records: ", error);
            //         }
            //     );
            // }
            
        }
    }
    async loadRecords(entityType: string, query: string | null): Promise<any[]>{
        var recs : any[] = [];
        while(query){
            await this.props.context.webAPI.retrieveMultipleRecords(entityType,query!).then(function(resp){
                resp.entities.forEach((ent) => {
                    recs.push({ id: ent["cr549_personid"], text: ent["cr549_name"], secondaryText: ent["cr549_id"], showSecondaryText: true } as IPersonaProps);
                });
                query = resp.nextLink;
            },function(err){
                query = null;
            });
        }
        
        return recs;
    }
    onResolveSuggestions = (filterText: string, currentPersonas?: IPersonaProps[]) => {
        if(filterText == null || filterText.trim() == "")
            return this.state.allitems;
        else
            return this.state.allitems.filter(item => item.text?.toLowerCase().includes(filterText.toLowerCase()));
    }
    render() {
        const allitems = [...this.state.allitems];
        return (    
            <NormalPeoplePicker
                onEmptyResolveSuggestions={() => allitems}
                onResolveSuggestions={this.onResolveSuggestions.bind(this)}
                selectedItems={[...this.state.selectedRecords]}
                itemLimit={1}
                onChange={(items) => {
                    this.setState({selectedRecords: items ?? []})
                    if(items && items.length > 0) {
                        var item = items[0];
                        this.props.onRecordSelect(item.id as string, item.text as string);
                    }
                }}
                inputProps={{ style: { backgroundColor: 'white', width: 150 } }}
            />
        );
    }   

}
export default LookupControl;
