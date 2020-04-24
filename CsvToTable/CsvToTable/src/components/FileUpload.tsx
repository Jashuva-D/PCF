import * as React from 'react';
import SimpleTable from './DisplayTable';
import Button from '@material-ui/core/Button';


interface Props {
    inputvalue : string
}
interface State {
    isvalidfile : boolean
    filename : string
    tableheaders : string[],
    tablerows : Array<any>
}

class FileUpload extends React.Component<Props,State> {
    static defaultProps : Props = {
        inputvalue : "hellooo"
    };
    state : State = {
        isvalidfile : true,
        filename : "No file chosen",
        tableheaders : [],
        tablerows : []
    }
    render() {
        let table;
        if(this.state.isvalidfile){
            table = <SimpleTable headers = {this.state.tableheaders} rows= {this.state.tablerows}/>
        }else{
            table = <div> Invalid file has been selected</div>
        }
        return (
            <div>
               <input 
                    id="contained-button-file"
                    type= "file"
                    onChange={this.handleInputChange()}
                    style = {{display: 'none'}}
                />
                <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                Upload
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                   {this.state.filename}
                </label>
                {table}    
            </div>
        )
    }
    handleInputChange = () => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
       var files = e.target.files;
       if(files != null && files.length > 0){
            var file = files[0];
            var filename = file.name
            var iscsv = filename.endsWith(".csv");
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e1) =>{
                if(e1.target != null){
                    var data: string|any = e1.target.result;
                    var textrows = data.split("\n");
                    var headers = [];
                    var rows : Array<any> = [];
                    var i= 0;
                    for(i=0;i<textrows.length;i++){
                        if(i==0){
                            headers = textrows[i].split(",");
                        }
                        else{
                            var eachrowtext = textrows[i];
                            if(eachrowtext.trim() != ""){
                                var rowcolumn = eachrowtext.split(",");
                                rows.push(rowcolumn);
                            }
                        }
                    }
                    this.setState({
                        isvalidfile : iscsv,
                        filename : filename,
                        tableheaders : headers,
                        tablerows : rows
                    })
                }
               
            }
       }
    }
}
export default FileUpload;