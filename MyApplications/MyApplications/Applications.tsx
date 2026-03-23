import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DetailsList, IColumn, Label, SelectionMode, Stack } from '@fluentui/react';
import { IInputs } from './generated/ManifestTypes';
import { getUserEmail } from './Helper';

interface MyApplicationsProps {
    context: ComponentFramework.Context<IInputs>
}
interface MyApplicationsState {
    records: any[],
    columns: IColumn[]
}

class Applications extends React.Component<MyApplicationsProps, MyApplicationsState> {
    constructor(props: MyApplicationsProps) {
        super(props);
        this.state = {
            records: [],
            columns: [
                { key: 'cr549_id', name: 'Application Name (Short)', fieldName: 'cr549_id', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_cms_group', name: 'Business Owner Group', fieldName: 'cr549_cms_group', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_hosting_delivery_platform_name', name: 'Hosting Delivery Model', fieldName: 'cr549_hosting_delivery_platform_name', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_platform_name', name: 'Hosting Platform', fieldName: 'cr549_platform_name', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_proj_phase_name', name: 'Stage', fieldName: 'cr549_proj_phase_name', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_marketplace', name: 'Marketplace Application', fieldName: 'cr549_marketplace', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_technicaladvisor', name: 'Technical Advisor', fieldName: 'cr549_technicaladvisor', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_hostingcoordinator', name: 'Hosting Coordinator', fieldName: 'cr549_hostingcoordinator', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_financialanalyst', name: 'Financial Analyst', fieldName: 'cr549_financialanalyst', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_cms_office', name: 'Business Owner Office/Center', fieldName: 'cr549_cms_office@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true },
            ]
        }
    }
    componentDidMount() {
        var obj = this;
        getUserEmail(this.props.context.webAPI, this.props.context.userSettings.userId).then((email) => {
            var fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true">
                        <entity name="cr549_application">
                        <attribute name="cr549_applicationid"/>
                        <attribute name="cr549_id"/>
                        <attribute name="cr549_cms_group"/>
                        <attribute name="cr549_hosting_delivery_platform_name"/>
                        <attribute name="cr549_platform_name"/>
                        <attribute name="cr549_proj_phase_name"/>
                        <attribute name="cr549_marketplace"/>
                        <attribute name="cr549_technicaladvisor"/>
                        <attribute name="cr549_hostingcoordinator"/>
                        <attribute name="cr549_financialanalyst"/>
                        <attribute name="cr549_cms_office"/>
                        <attribute name="createdon"/>
                        <order attribute="cr549_id" descending="false"/>
                        <link-entity name="cr549_appuserrole" from="cr549_app" to="cr549_applicationid" link-type="inner" alias="ai">
                        <link-entity name="cr549_person" from="cr549_personid" to="cr549_person" link-type="inner" alias="aj">
                        <filter type="and">
                        <condition attribute="cr549_email_address" operator="eq" value="${email}"/>
                        </filter>
                        </link-entity>
                        </link-entity>
                        </entity>
                        </fetch>`;
            obj.props.context.webAPI.retrieveMultipleRecords("cr549_application", "?fetchXml=" + encodeURIComponent(fetchXml)).then((result) => {
                obj.setState({ records: result.entities });
            });
        });
    }

    render() {
        return <Stack tokens={{ childrenGap: 10 }}>
                <Label>My Applications</Label>
                <DetailsList
                    items={this.state.records}
                    columns={this.state.columns}
                    selectionMode={SelectionMode.none}
                />
            </Stack>
            
    }
}

export default Applications;