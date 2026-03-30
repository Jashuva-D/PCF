import * as React from "react";
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
        
        if(this.props.recordId && this.props.entityType == "cr549_application"){
            var query = "?$select=cr549_id,cr549_applicationid";
            this.props.context.webAPI.retrieveRecord("cr549_application",this.props.recordId!,query).then(function(resp){
                recs.push({ id: resp["cr549_applicationid"], text: resp["cr549_id"], showSecondaryText: false } as IPersonaProps);
                var selectedrecords = recs.filter(x => x.id == obj.props.recordId);
                obj.setState({ allitems: recs, selectedRecords: selectedrecords });
            },function(err){
                console.log("Error occured while fetching the query");
            })
        }
    }
    onResolveSuggestions = (filterText: string, currentPersonas?: IPersonaProps[]) => {
        
        if(filterText?.length < 3)
            return [];
        else {
            return this.props.context.webAPI.retrieveMultipleRecords("cr549_application",`?$select=cr549_id&$filter=contains(cr549_id,'${filterText}')&$orderby=cr549_id asc`).then(function(resp){
                return resp.entities.map((ent) => {
                    return { id: ent["cr549_applicationid"], text: ent["cr549_id"], showSecondaryText: false } as IPersonaProps;
                });
            })
        }

    }
    render() {
        const allitems = [...this.state.allitems];
        return (    
            <NormalPeoplePicker
                onEmptyResolveSuggestions={() => allitems}
                onResolveSuggestions={this.onResolveSuggestions.bind(this)}
                pickerSuggestionsProps={{
                    loadingText: "Loading...",
                    suggestionsHeaderText: "Applications"
                }}
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
