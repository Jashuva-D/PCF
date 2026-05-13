import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { IPersonaProps, NormalPeoplePicker } from "@fluentui/react";

interface LookupControlProps {
    context: ComponentFramework.Context<IInputs>;
    hostingprojectnumber?: string;
    onRecordSelect: (hostingprojectnumber: string) => void;
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
        this.props.context.webAPI.retrieveMultipleRecords("cr549_projects", "?$select=cr549_projectsid,cr549_projectnumber,cr549_projectname").then(
            (response) => {
                response.entities.forEach((ent) => {
                    recs.push({ id: ent["cr549_projectsid"], text: ent["cr549_projectname"], secondaryText: ent["cr549_projectnumber"], showSecondaryText: true } as IPersonaProps);
                });
                //var selectedrecords = response.entities.filter(x => x["cr549_projectnumber"] == this.props.hostingprojectnumber);
                var selectedrecords = recs.filter(x => x.secondaryText == this.props.hostingprojectnumber);
                obj.setState({ allitems: recs, selectedRecords: selectedrecords });
            },
            (error) => {
                console.error("Error fetching records: ", error);
            }
        );
        
    }
    
    onResolveSuggestions = (filterText: string, currentPersonas?: IPersonaProps[]) => {
        if (filterText == null || filterText.trim() == "")
            return this.state.allitems;
        else
            return this.state.allitems.filter(item => item.text?.toLowerCase().includes(filterText.toLowerCase()));
    }
    render() {
        const allitems = [...this.state.allitems];
        const header = "Projects";
        //return <div> Hosting Project </div>
        return (    
            <NormalPeoplePicker
                label="Hosting Project"
                onEmptyResolveSuggestions={() => allitems}
                onResolveSuggestions={this.onResolveSuggestions.bind(this)}
                pickerSuggestionsProps={{
                    loadingText: "Loading...",
                    suggestionsHeaderText: header
                }}
                selectedItems={[...this.state.selectedRecords]}
                itemLimit={1}
                onChange={(items) => {
                    this.setState({selectedRecords: items ?? []})
                    if(items && items.length > 0) {
                        var item = items[0];
                        this.props.onRecordSelect(item.secondaryText as string);
                    }
                }}
                inputProps={{ style: { backgroundColor: 'white', width: 150 } }}
            />
        );
    }   

}
export default LookupControl;
