import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

interface MyListProps {
    name : string
}
interface MyListState {
    wifename : string
    compactmode : boolean,
    modalselection : boolean
}
const controlStyles = {
    root: {
      margin: '0 30px 20px 0',
      maxWidth: '300px',
    },
};
const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
      padding: 0,
      fontSize: '16px',
    },
    fileIconCell: {
      textAlign: 'center',
      selectors: {
        '&:before': {
          content: '.',
          display: 'inline-block',
          verticalAlign: 'middle',
          height: '100%',
          width: '0px',
          visibility: 'hidden',
        },
      },
    },
    fileIconImg: {
      verticalAlign: 'middle',
      maxHeight: '16px',
      maxWidth: '16px',
    },
    controlWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    exampleToggle: {
      display: 'inline-block',
      marginBottom: '10px',
      marginRight: '30px',
    },
    selectionDetails: {
      marginBottom: '20px',
    },
  });
  

export class MyList extends React.Component<MyListProps,MyListState>{
    private _selection: Selection;
    private columns : IColumn[];
    static defaultProps : MyListProps = {
        name : "Jashuva Devireddy"
    }
    state : MyListState = {
        wifename : "",
        compactmode : false,
        modalselection : false
    }
    constructor(props : MyListProps) {
        super(props);
        this.columns = [
            { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
          ];
    }
    

    public render(){
        const name = this.props.name;
        const {compactmode,modalselection} = this.state;
        const items = [
            {key:1,name : "item1", value:"hello"},
            {key:2,name : "item2", value:"hello"},
            {key:3,name : "item3", value:"hello"},
            {key:4,name : "item4", value:"hello"},
            {key:5,name : "item5", value:"hello"},
            {key:6,name : "item6", value:"hello"},
            {key:7,name : "item7", value:"hello"}
        ];
        
        return (
            <Fabric>
                <div className = {classNames.controlWrapper}>
                    <Toggle
                        label="Enable compact mode"
                        checked={compactmode}
                        onChange={this._onChangeCompactMode}
                        onText="Compact"
                        offText="Normal"
                        styles={controlStyles}
                    />
                    <Toggle
                        label="Enable modal selection"
                        checked={modalselection}
                        onChange={this._onChangeModalSelection}
                        onText="Modal"
                        offText="Normal"
                        styles={controlStyles}
                    />
                    <TextField label="Filter by name:" onChange={this._onChangeText} styles={controlStyles} />
                    <Announced message={`Number of items after filter applied: ${5}.`} />
                </div>
                {modalselection ? (
                    <MarqueeSelection selection = {this._selection}>
                        <DetailsList
                            items={items}
                            compact={compactmode}
                            columns={this.columns}
                            selectionMode={SelectionMode.multiple}
                            //getKey={this._getKey}
                            setKey="multiple"
                            layoutMode={DetailsListLayoutMode.justified}
                            isHeaderVisible={true}
                            selection={this._selection}
                            selectionPreservedOnEmptyClick={true}
                            //onItemInvoked={this._onItemInvoked}
                            enterModalSelectionOnTouch={true}
                            ariaLabelForSelectionColumn="Toggle selection"
                            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                            checkButtonAriaLabel="Row checkbox"
                        />
                    </MarqueeSelection>
                    ): (
                        <DetailsList
                            items={items}
                            compact={compactmode}
                            columns={this.columns}
                            selectionMode={SelectionMode.multiple}
                            //getKey={this._getKey}
                            setKey="multiple"
                            layoutMode={DetailsListLayoutMode.justified}
                            isHeaderVisible={true}
                            selection={this._selection}
                            selectionPreservedOnEmptyClick={true}
                            //onItemInvoked={this._onItemInvoked}
                            enterModalSelectionOnTouch={false}
                            ariaLabelForSelectionColumn="Toggle selection"
                            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                            checkButtonAriaLabel="Row checkbox"
                        />
                )}
            </Fabric>
        )
    }
    _onChangeText = () => {

    }
    _onChangeCompactMode = () => {
        this.setState({
            compactmode : (this.state.compactmode ? false : true)
        })
    }
    _onChangeModalSelection = () => {
        this.setState({
            modalselection : (this.state.modalselection ? false : true)
        })
    }
}