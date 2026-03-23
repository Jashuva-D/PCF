import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DefaultButton, DetailsList, IColumn, Label, SelectionMode, Stack, StackItem, Link, initializeIcons, Text} from '@fluentui/react';
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
        initializeIcons();
        super(props);
        this.state = {
            records: [],
            columns: [
                { key: 'cr549_id', name: 'Application Name (Short)', fieldName: 'cr549_id', minWidth: 100, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        return <Link onClick={() => this.openRecord("cr549_application",item.key)}>{item.cr549_id}</Link>
                    }
                },
                { key: 'cr549_cms_group', name: 'Business Owner Group', fieldName: 'cr549_cms_group', minWidth: 100, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item.cr549_cms_group){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#EBE8CE", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item.cr549_cms_group}</Text></Stack>;
                        }
                        return null;
                    }
                },
                { key: 'cr549_hosting_delivery_platform_name', name: 'Hosting Delivery Model', fieldName: 'cr549_hosting_delivery_platform_name@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item.cr549_hosting_delivery_platform_name){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#EBE8CE", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item["cr549_hosting_delivery_platform_name@OData.Community.Display.V1.FormattedValue"]}</Text></Stack>;
                        }
                        return null;
                    }
                 },
                { key: 'cr549_platform_name', name: 'Hosting Platform', fieldName: 'cr549_platform_name@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item.cr549_platform_name){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#EBE8CE", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item["cr549_platform_name@OData.Community.Display.V1.FormattedValue"]}</Text></Stack>;
                        }
                        return null;
                    }
                 },
                { key: 'cr549_proj_phase_name', name: 'Stage', fieldName: 'cr549_proj_phase_name@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true,
                    onRender: (item: any) => {
                        if(item.cr549_proj_phase_name){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#EBE8CE", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item["cr549_proj_phase_name@OData.Community.Display.V1.FormattedValue"]}</Text></Stack>;
                        }
                        return null;
                    }
                 },
                { key: 'cr549_marketplace', name: 'Marketplace Application', fieldName: 'cr549_marketplace@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item.cr549_marketplace){
                            return <Stack verticalAlign="center" horizontalAlign="center" style={{height: "100%", paddingLeft: "8px"}}><Text style={{color: item.cr549_marketplace == 1 ? "#12890E" : "#E31C3D"}}>{item.cr549_marketplace == 1 ? "Yes" : "No"}</Text></Stack>
                        }
                        return null;
                    }
                 },
                { key: 'cr549_technicaladvisor', name: 'Technical Advisor', fieldName: '_cr549_technicaladvisor_value@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true,
                    onRender: (item: any) => {
                        if(item._cr549_technicaladvisor_value){
                            return <Link onClick={() => this.openRecord("cr549_person",item._cr549_technicaladvisor_value)}>{item['_cr549_technicaladvisor_value@OData.Community.Display.V1.FormattedValue']}</Link>
                        }
                        return null;
                    }

                },
                { key: 'cr549_hostingcoordinator', name: 'Hosting Coordinator', fieldName: '_cr549_hostingcoordinator_value@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item._cr549_hostingcoordinator_value){
                            return <Link onClick={() => this.openRecord("cr549_person",item._cr549_hostingcoordinator_value)}>{item['_cr549_hostingcoordinator_value@OData.Community.Display.V1.FormattedValue']}</Link>
                        }
                        return null;
                    }
                 },
                { key: 'cr549_financialanalyst', name: 'Financial Analyst', fieldName: '_cr549_financialanalyst_value@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true,
                    onRender: (item: any) => {
                        if(item._cr549_financialanalyst_value){
                            return <Link onClick={() => this.openRecord("cr549_person",item._cr549_financialanalyst_value)}>{item['_cr549_financialanalyst_value@OData.Community.Display.V1.FormattedValue']}</Link>
                        }
                        return null;
                    }

                 },
                { key: 'cr549_cms_office', name: 'Business Owner Office/Center', fieldName: 'cr549_cms_office@OData.Community.Display.V1.FormattedValue', minWidth: 100, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item.cr549_cms_office){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#E6C8DB", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item['cr549_cms_office@OData.Community.Display.V1.FormattedValue']}</Text></Stack>;
                        }
                        return null;
                    }
                 },
            ]
        }
    }
    componentDidMount() {
        this.LoadApplications.bind(this)();
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
                obj.setState({ records: result.entities.map((entity: any) => ({ ...entity, key: entity.cr549_applicationid })) });
            });
        });
    }
    openRecord(entityname: string, id: string){
        this.props.context.navigation.openForm({ entityName: entityname, entityId: id });   
    }

    render() {
        return <Stack tokens={{ childrenGap: 10 }}>
                <Stack horizontal horizontalAlign="space-between">
                    <Label style={{fontWeight: "bold", fontSize: 16}}>My Applications</Label>
                    <StackItem style={{paddingTop: 10}}>
                        <DefaultButton 
                            text="Refresh"
                            iconProps={{iconName: "refresh"}}
                            onClick={this.LoadApplications.bind(this)} 
                            style={{ marginRight: 10, backgroundColor: "#0D2499", color: "white", borderRadius: 6 }} />
                        <DefaultButton 
                            text="See All Applications" 
                            iconProps={{iconName: "view"}}
                            onClick={() => {
                                (this.props.context.navigation as any).navigateTo({
                                    pageType: "entitylist",
                                    entityName: "cr549_application"
                                });
                            }}
                            style = {{marginRight: 10, backgroundColor: "#0D2499", color: "white", borderRadius: 6 }}
                        />
                    </StackItem>
                </Stack>
                <DetailsList
                    items={this.state.records}
                    columns={this.state.columns}
                    selectionMode={SelectionMode.none}
                    className='myapplications'
                />
            </Stack>
            
    }
}

export default Applications;