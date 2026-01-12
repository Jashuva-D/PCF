import * as React from 'react';
import { IInputs } from './generated/ManifestTypes';
import HostingDataCenterMigratedFrom from './HostingDataCenterMigratedFrom';

interface ApplicationFieldsProps {
    context: ComponentFramework.Context<IInputs> 
}
interface ApplicationFieldsState {

}
class ApplicationFields extends React.Component<ApplicationFieldsProps,ApplicationFieldsState> {
    constructor(props: ApplicationFieldsProps) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        // var recordid = (this.props.context as any).page.entityId;
        // this.props.context.webAPI.retrieveMultipleRecords("account", "?$select=name").then(
        //     (result) => {
        //         console.log("Retrieved records:", result);
        //     },
        //     (error) => {
        //         console.error("Error retrieving records:", error);
        //     }
        // );
    }
    render() {
        return <HostingDataCenterMigratedFrom context={this.props.context} />;
    }
}

export default ApplicationFields;