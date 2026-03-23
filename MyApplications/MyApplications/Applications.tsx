import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DefaultButton, DetailsList, IColumn, Label, SelectionMode, Stack, StackItem} from '@fluentui/react';
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
                { key: 'cr549_hosting_delivery_platform_name', name: 'Hosting Delivery Model', fieldName: 'cr549_hosting_delivery_platform_name@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_platform_name', name: 'Hosting Platform', fieldName: 'cr549_platform_name', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_proj_phase_name', name: 'Stage', fieldName: 'cr549_proj_phase_name', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_marketplace', name: 'Marketplace Application', fieldName: 'cr549_marketplace@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_technicaladvisor', name: 'Technical Advisor', fieldName: '_cr549_technicaladvisor_value@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_hostingcoordinator', name: 'Hosting Coordinator', fieldName: '_cr549_hostingcoordinator_value@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_financialanalyst', name: 'Financial Analyst', fieldName: '_cr549_financialanalyst_value@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'cr549_cms_office', name: 'Business Owner Office/Center', fieldName: 'cr549_cms_office@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true },
            ]
        }
    }
    componentDidMount() {
        this.LoadApplications();
    }
    LoadApplications(){
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
                <Stack horizontal horizontalAlign="space-between">
                    <Label>My Applications</Label>
                    <StackItem>
                        <DefaultButton text="Refresh" onClick={() => this.componentDidMount()} style={{ marginRight: 10 }} />
                        <DefaultButton text="New Application" onClick={() => {
                            //this.props.context.navigation.navigateTo({ pageType: "entityrecord", entityName: "cr549_application", formId: "00000000-0000-0000-0000-000000000000", createFromEntity: null, openInNewWindow: true
                        }} />

                    </StackItem>
                </Stack>
                <DetailsList
                    items={this.state.records}
                    columns={this.state.columns}
                    selectionMode={SelectionMode.none}
                />
            </Stack>
            
    }
}

export default Applications;