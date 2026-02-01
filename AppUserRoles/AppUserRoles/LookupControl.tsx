import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { IInputs } from "./generated/ManifestTypes";

interface LookupControlProps {
    context: ComponentFramework.Context<IInputs>;
    recordId: string | null;
    entityType: string;
    onRecordSelect: (id: string, name: string) => void;
}
interface LookupControlState {
    selectedRecord: { id: string; name: string } | null;
}   

class LookupControl extends React.Component<LookupControlProps, LookupControlState> {
    constructor(props: LookupControlProps) {
        super(props);
        this.state = {
            selectedRecord: null
        };
    }
    handleLookupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedName = event.target.options[event.target.selectedIndex].text;
        this.setState({ selectedRecord: { id: selectedId, name: selectedName } });
        this.props.onRecordSelect(selectedId, selectedName);
    };  
    render() {
        return (    

            <select onChange={this.handleLookupChange} value={this.state.selectedRecord ? this.state.selectedRecord.id : ""}>
                <option value="">-- Select a record --</option>
                {/* In a real scenario, options would be populated dynamically from the context or a data source */}    
                <option value="record1">Record 1</option>
                <option value="record2">Record 2</option>
            </select>
        );
    }   

}
export default LookupControl;
