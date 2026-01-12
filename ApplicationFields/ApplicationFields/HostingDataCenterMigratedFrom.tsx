import * as React from 'react';
import {TextField} from '@fluentui/react/lib/TextField';

interface HostingDataCenterMigratedFromProps {
    context: ComponentFramework.Context<any> 
}
interface HostingDataCenterMigratedFromState {
    value?: string;
}

class HostingDataCenterMigratedFrom extends React.Component<HostingDataCenterMigratedFromProps,HostingDataCenterMigratedFromState> {
    constructor(props: HostingDataCenterMigratedFromProps) {
        super(props);
        this.state = {
            value: ''
        };
    }
    componentDidMount() {
        var recordid = (this.props.context as any).page.entityId;
        this.props.context.webAPI.retrieveMultipleRecords("cr549_appdcxwalk", `?$select=_cr549_data_center_name_value&$filter=_cr549_app_name_value eq ${recordid}`).then(
            (result) => {
                if(result.entities.length > 0 && result.entities[0]["_cr549_data_center_name_value"]){
                     this.setState({ value: result.entities[0]["_cr549_data_center_name_value@OData.Community.Display.V1.FormattedValue"] });
                }
            },
            (error) => {
                console.error("Error retrieving record:", error);
            }
        );  
    }

    render(): React.ReactNode {
        return <>
            <TextField value={this.state.value}></TextField>
        </>
    }  
} 

export default HostingDataCenterMigratedFrom;