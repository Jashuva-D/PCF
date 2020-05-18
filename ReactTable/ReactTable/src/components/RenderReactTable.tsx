import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactTable,{Column} from 'react-table';

interface TableProps{
    columns : Column[]
    rows : Array<any>
}
interface TableState{
    filteredrows : Array<any>
    filtersapplied : boolean
}

class RenderReactTable extends React.Component<TableProps,TableState>{
    constructor(props : TableProps){
        super(props);
        this.state = {
            filteredrows : this.props.rows,
            filtersapplied : false
        }
    }
    public render(): JSX.Element {
        const columns = this.props.columns;
        const rows = this.state.filtersapplied ? this.state.filteredrows : this.props.rows;
        return (
            <ReactTable
                data = {rows}
                columns = {columns}
                showPageSizeOptions = {false}
            />
        )
    }
}

export default RenderReactTable;