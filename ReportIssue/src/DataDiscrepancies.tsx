import * as React from 'react';
import ReportIssue from './ReportIssue';
import DiscrepanciesList from './DiscrepanciesList';
import {PrimaryButton, Stack, StackItem} from "@fluentui/react";

interface DataDiscrepnaciesProps {
    appname?: string | null,
    recordid?: string | null,
    tabname?: string | null,
    sectionname?: string | null,
    appuserroleid?: string | null
}
interface DataDiscrepanciesState {
    openreportissue: boolean
    displaylist: boolean
}

class DataDescripancies extends React.Component<DataDiscrepnaciesProps, DataDiscrepanciesState>{
    constructor(props: DataDiscrepnaciesProps){
        super(props);
        console.log("constructor");
        this.state = {
            openreportissue: false,
            displaylist: true
        }
    }

    render(): React.ReactNode {
        return <>
        <Stack horizontalAlign='end' verticalAlign='end'>
            <PrimaryButton
                text="Submit Issue"
                iconProps={{ iconName: "Send" }}
                className="submit-button"
                style={{ borderRadius: 6, backgroundColor: "#0D2499", color: "white"}}
                onClick={() => { this.setState({openreportissue: true, displaylist: false})}}
            />
        </Stack>
            { this.state.displaylist && <DiscrepanciesList></DiscrepanciesList> }
            { this.state.openreportissue && 
            <ReportIssue 
                appname={this.props.appname ?? ""} 
                recordid={this.props.recordid ?? ""} 
                tabname={this.props.tabname ?? ""} 
                sectionname={this.props.sectionname ?? ""} 
                appuserroleid={this.props.appuserroleid ?? ""} 
            />}
        </>
    }
}

export default DataDescripancies;

//test