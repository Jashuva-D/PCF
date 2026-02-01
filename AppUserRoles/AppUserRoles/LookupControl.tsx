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
        if(filterText == null || filterText.trim() == "")
            return this.state.allitems;
        else
            return this.state.allitems.filter(item => item.text?.toLowerCase().includes(filterText.toLowerCase()));
    }
    render() {
        return (    
            <NormalPeoplePicker
                onEmptyResolveSuggestions={() => this.state.allitems}
                onResolveSuggestions={this.onResolveSuggestions.bind(this)}
                defaultSelectedItems={this.state.allitems.filter(x => x.id == this.props.recordId)}
                itemLimit={1}
                onChange={(items) => {
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
