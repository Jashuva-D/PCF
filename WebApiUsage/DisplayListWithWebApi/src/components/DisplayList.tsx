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
import {IContact} from './DisplayRecords';
import { IsFocusVisibleClassName } from 'office-ui-fabric-react/lib/Utilities';

interface MyListProps {
    items: IContact[]
}
interface MyListState {
    records : any[]
    compactmode : boolean,
    modalselection : boolean,
    selectiondetails : string
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
      textAlign : 'left'
    },
  });

export default class MyList extends React.Component<MyListProps,MyListState>{
    private _selection: Selection ;
    private columns : IColumn[];
    static defaultProps : MyListProps = {
        items : []
    }
   
    state : MyListState = {
        records : [],
        compactmode : false,
        modalselection : false,
        selectiondetails : ""
    }
    
    constructor(props : MyListProps) {
        super(props);
        this.columns = [
            { key: 'column1', name: 'First Name', fieldName: 'firstname', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Last Name', fieldName: 'lastname', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column3', name: 'Middle Name', fieldName: 'middlename',minWidth: 100, maxWidth:200,isResizable:true},
            { key: 'column4', name: 'Full Name', fieldName: 'fullname', minWidth: 100, maxWidth:200, isResizable: true},
            { key: 'column5', name: 'Email Address', fieldName:'emailaddress', minWidth : 100, maxWidth : 200, isResizable : true}
          ];
        this._selection = new Selection({
          onSelectionChanged :  () => {
            
            const count = this._selection.count;
            this.setState({
              selectiondetails : (count == 0) ? "No items selected" : `${count} items selected`
            })
          }
        })
    }
    public componentDidMount(){
      this.setState({
        records : this.props.items
      })
    }
    public render(){
        const {compactmode,modalselection} = this.state;
        const items = this.state.records.length > 0 ? this.state.records : this.props.items;
        const selectionDetails = this.state.selectiondetails;
        
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
                <div className={classNames.selectionDetails}> &nbsp;&nbsp;&nbsp; {selectionDetails}</div>
                <Announced message = {selectionDetails}   />
                { modalselection == true ? (
                    <MarqueeSelection selection = {this._selection}>
                        <DetailsList
                            items={items}
                            compact={compactmode}
                            columns={this.columns}
                            selectionMode={SelectionMode.multiple}
                            getKey={this._getKey}
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
                            selectionMode={SelectionMode.none}
                            getKey={this._getKey}
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
                  )
                } 
            </Fabric>
        )
    }
    _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text?: string | undefined): void => {
      if(text == undefined || text == ""){
        this.setState({records : this.props.items})
      }else{
        this.setState({
          records:this.props.items.filter( i => i.firstname?.toLowerCase().indexOf(text?.toLowerCase()) > -1) 
        });
      }
    };
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
    _getKey = (item : IContact) : string =>{
      return item.firstname;
    }
}