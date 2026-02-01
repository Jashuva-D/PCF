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
    selectedRecord: { id: string; name: string } | null,
    allitems: IPersonaProps[]
}   

class LookupControl extends React.Component<LookupControlProps, LookupControlState> {
    constructor(props: LookupControlProps) {
        super(props);
        this.state = {
            selectedRecord: null,
            allitems: []
        };
    }
    handleLookupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedName = event.target.options[event.target.selectedIndex].text;
        this.setState({ selectedRecord: { id: selectedId, name: selectedName } });
        this.props.onRecordSelect(selectedId, selectedName);
    };
    componentDidMount() {
        var recs : IPersonaProps[] = [];
        this.props.context.webAPI.retrieveMultipleRecords(this.props.entityType, "?$select=cr549_role_name,cr549_id,cr549_roleid").then(
            (response) => {
                response.entities.forEach((ent) => {
                    recs.push({ id: ent["cr549_roleid"], text: ent["cr549_role_name"] } as IPersonaProps);
                });
            },
            (error) => {
                console.error("Error fetching records: ", error);
            }
        );  
        this.setState({ allitems: recs });
    }
    onResolveSuggestions = (filterText: string, currentPersonas?: IPersonaProps[]) => {
        return this.state.allitems.filter(item => item.text?.toLowerCase().includes(filterText.toLowerCase()));
    }
    render() {
        return (    
            <NormalPeoplePicker
                onResolveSuggestions={this.onResolveSuggestions.bind(this)}
                //onItemSelected={(item) => this.props.onRecordSelect(item?.id ?? "", item?.text ?? "")}
            />

            // <select onChange={this.handleLookupChange} value={this.state.selectedRecord ? this.state.selectedRecord.id : ""}>
            //     <option value="">-- Select a record --</option>
            //     {/* In a real scenario, options would be populated dynamically from the context or a data source */}    
            //     <option value="record1">Record 1</option>
            //     <option value="record2">Record 2</option>
            // </select>
        );
    }   

}
export default LookupControl;
