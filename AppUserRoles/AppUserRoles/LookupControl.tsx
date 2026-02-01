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
        this.props.context.webAPI.retrieveMultipleRecords(this.props.entityType, "?$select=cr549_role_name,cr549_id,cr549_roleid").then(
            (response) => {
                response.entities.forEach((ent) => {
                    recs.push({ id: ent["cr549_roleid"], text: ent["cr549_role_name"] } as IPersonaProps);
                });
                var selectedrecords = recs.filter(x => x.id == this.props.recordId); 
                obj.setState({ allitems: recs, selectedRecords: selectedrecords });
            },
            (error) => {
                console.error("Error fetching records: ", error);
            }
        );
        
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
