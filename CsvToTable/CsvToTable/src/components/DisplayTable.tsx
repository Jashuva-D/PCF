import * as React from 'react';
import {render} from 'react-dom';
import {Table, TableHead, TableBody, TableRow, TableCell, Checkbox, TableContainer, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

interface Props  {
    headers : string[],
    rows : Array<string[]>
}
interface State {
    page : number,
    rowsperpage : number
}
//style= {{ tableLayout:"fixed", width: 2000,overflow:"hidden",border:1}
//style= {{ tableLayout:"fixed", width: 2000,overflow:"hidden"}}

class SimpleTable extends React.Component<Props,State>{

    static defaultProps: Props = {
        headers : [],
        rows: []
    };
    state: State = {
        page : 0,
        rowsperpage : 5
    }
    render() {
        debugger;
        var headers = this.props.headers;
        var rows = this.props.rows;
        const useStyles = makeStyles({
            root: {
              width: '100%',
            },
            container: {
              maxHeight: 440,
            },
          });
        return (              
            <div>
                <Paper style={{width : "100%" }}>
                    <TableContainer component={Paper} style = {{ maxHeight: 600}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow >
                                {headers.map((header) => (
                                    <TableCell>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.slice(this.state.page * this.state.rowsperpage,(this.state.page * this.state.rowsperpage)+this.state.rowsperpage).map((row) => (
                            <TableRow>
                                {
                                    row.map((cell) => (
                                        <TableCell>
                                            {cell }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                        }
                        </TableBody>
                    </Table>
                    </TableContainer>
                    {rows.length > 0 ? (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={this.state.rowsperpage}
                            page={this.state.page}
                            onChangePage={this.handleChangePage()}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage()}      
                        />
                    ):
                    (<div></div>)
                    }
                    
                </Paper>
            </div>
        )
    }
   
    handleChangePage = () => (
        event: unknown, page : number
        ) => {
        this.setState({
            page : page
        })
      };
    
    handleChangeRowsPerPage = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        var selectevalue = (parseInt(event.target.value, 10));
        this.setState({
            page : 0,
            rowsperpage : selectevalue
        })
      };
}

export default SimpleTable;