import * as React from 'react';
import type {IColumn} from "@fluentui/react";
import { DefaultButton, DetailsList, Label, SelectionMode, Stack, StackItem, Link, initializeIcons, Text, Icon} from '@fluentui/react';
import { getUserEmail } from './Helper';
import { CMSMyAppsIcon } from './Icons';

interface MyApplicationsProps {
    
}
interface MyApplicationsState {
    records: any[],
    columns: IColumn[],
    currentPage: number,
    pageSize: number
}

class Applications extends React.Component<MyApplicationsProps, MyApplicationsState> {
    constructor(props: MyApplicationsProps) {
        initializeIcons();
        super(props);
        this.state = {
            records: [],
            currentPage: 1,
            pageSize: 10,
            columns: [
                { key: 'cr549_id', name: 'Application Name (Short)', fieldName: 'cr549_id', currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        return <Link onClick={() => this.openRecord("cr549_application",item.key)} style={{fontSize: 14}}>{item.cr549_id}</Link>
                    }
                },
                { key: 'cr549_cms_group', name: 'Business Owner Group', fieldName: 'cr549_cms_group', currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item.cr549_cms_group){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#EBE8CE", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item.cr549_cms_group}</Text></Stack>;
                        }
                        return null;
                    }
                },
                { key: 'cr549_hosting_delivery_platform_name', name: 'Hosting Delivery Model', fieldName: 'cr549_hosting_delivery_platform_name@OData.Community.Display.V1.FormattedValue', currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item.cr549_hosting_delivery_platform_name){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#d8dcee", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item["cr549_hosting_delivery_platform_name@OData.Community.Display.V1.FormattedValue"]}</Text></Stack>;
                        }
                        return null;
                    }
                 },
                { key: 'cr549_platform_name', name: 'Hosting Platform', fieldName: 'cr549_platform_name@OData.Community.Display.V1.FormattedValue', currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item.cr549_platform_name){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#d9ecd8", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item["cr549_platform_name@OData.Community.Display.V1.FormattedValue"]}</Text></Stack>;
                        }
                        return null;
                    }
                 },
                { key: 'cr549_proj_phase_name', name: 'Stage', fieldName: 'cr549_proj_phase_name@OData.Community.Display.V1.FormattedValue', currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true,
                    onRender: (item: any) => {
                        if(item.cr549_proj_phase_name){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#f2f2f2", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item["cr549_proj_phase_name@OData.Community.Display.V1.FormattedValue"]}</Text></Stack>;
                        }
                        return null;
                    }
                 },
                { key: 'cr549_marketplace', name: 'Marketplace Application', fieldName: 'cr549_marketplace@OData.Community.Display.V1.FormattedValue', currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item.cr549_marketplace){
                            return <Stack verticalAlign="center" horizontalAlign="center" style={{height: "100%", paddingLeft: "8px"}}><Text style={{color: item.cr549_marketplace == 1 ? "#12890E" : "#E31C3D"}}>{item.cr549_marketplace == 1 ? "Yes" : "No"}</Text></Stack>
                        }
                        return null;
                    }
                 },
                { key: 'cr549_technicaladvisor', name: 'Technical Advisor', fieldName: '_cr549_technicaladvisor_value@OData.Community.Display.V1.FormattedValue',currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true,
                    onRender: (item: any) => {
                        if(item._cr549_technicaladvisor_value){
                            return <Link onClick={() => this.openRecord("cr549_person",item._cr549_technicaladvisor_value)} style={{fontSize: 14}}>{item['_cr549_technicaladvisor_value@OData.Community.Display.V1.FormattedValue']}</Link>
                        }
                        return null;
                    }

                },
                { key: 'cr549_hostingcoordinator', name: 'Hosting Coordinator', fieldName: '_cr549_hostingcoordinator_value@OData.Community.Display.V1.FormattedValue',currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true, 
                    onRender: (item: any) => {
                        if(item._cr549_hostingcoordinator_value){
                            return <Link onClick={() => this.openRecord("cr549_person",item._cr549_hostingcoordinator_value)} style={{fontSize: 14}}>{item['_cr549_hostingcoordinator_value@OData.Community.Display.V1.FormattedValue']}</Link>
                        }
                        return null;
                    }
                 },
                { key: 'cr549_financialanalyst', name: 'Financial Analyst', fieldName: '_cr549_financialanalyst_value@OData.Community.Display.V1.FormattedValue',currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true,
                    onRender: (item: any) => {
                        if(item._cr549_financialanalyst_value){
                            return <Link onClick={() => this.openRecord("cr549_person",item._cr549_financialanalyst_value)} style={{fontSize: 14}}>{item['_cr549_financialanalyst_value@OData.Community.Display.V1.FormattedValue']}</Link>
                        }
                        return null;
                    }

                 },
                { key: 'cr549_cms_office', name: 'Business Owner Office/Center', fieldName: 'cr549_cms_office@OData.Community.Display.V1.FormattedValue',currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true, 
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
        getUserEmail((parent as any).Xrm.WebApi,(parent as any).Xrm.Utility.getGlobalContext().userSettings.userId).then((email) => {
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
                        <link-entity name="cr549_role" from="cr549_roleid" to="cr549_role" link-type="inner" alias="aq">
                        <filter type="and">
                        <filter type="or">
                        <condition attribute="cr549_id" operator="eq" value="13"/>
                        <condition attribute="cr549_id" operator="eq" value="15"/>
                        <condition attribute="cr549_id" operator="eq" value="21"/>
                        </filter>
                        </filter>
                        </link-entity>

                        </link-entity>
                        </entity>
                        </fetch>`;
            (parent as any).Xrm.WebApi.retrieveMultipleRecords("cr549_application", "?fetchXml=" + encodeURIComponent(fetchXml)).then((result : any) => {
                obj.setState({ records: result.entities.map((entity: any) => ({ ...entity, key: entity.cr549_applicationid })) });
            });
        });
    }
    openRecord(entityname: string, id: string){
        (parent as any).Xrm.Navigation.openForm({ entityName: entityname, entityId: id });   
    }

    render() {
        const startIndex = (this.state.currentPage - 1) * this.state.pageSize;
        const endIndex = startIndex + this.state.pageSize;
        const paginatedRecords = this.state.records.slice(startIndex, endIndex);
        const totalPages = Math.ceil(this.state.records.length / this.state.pageSize);

        return <Stack tokens={{ childrenGap: 10 }}>
                <Stack horizontal horizontalAlign="space-between" style={{backgroundColor: "white"}}>
                    <Stack horizontal verticalAlign='center'>
                        <CMSMyAppsIcon size={32} />
                        <Stack tokens={{childrenGap: 2}} style={{paddingLeft: 10}}>
                            <Label style={{fontWeight: "bold", fontSize: 16, color: "#0D2499"}}>My Applications</Label>
                            <Text style={{color: "#6A7A99", fontWeight: "semibold"}}>View and manage your applications and their key details.</Text>
                        </Stack>
                    </Stack>
                    <StackItem align="center">
                        <Link
                            onClick={() => {
                                (parent as any).Xrm.Navigation.navigateTo({
                                    pageType: "entitylist",
                                    entityName: "cr549_application"
                                });
                            }}
                            styles={{
                                root: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                    paddingRight: 10
                                }
                            }}
                        >
                            <span>View All Applications</span>
                            <Icon
                                iconName="ChevronRightSmall"
                                styles={{ root: { fontSize: 12 } }}
                            />
                        </Link>
                    </StackItem>
                </Stack>
                <DetailsList
                        items={paginatedRecords}
                        columns={this.state.columns}
                        selectionMode={SelectionMode.none}
                        className='myapplications'
                        styles={{
                            root: {
                                boxShadow: "0 -4px 8px rgba(0,0,0,0.15)"  // 👈 TOP shadow
                            }
                        }}
                    />

                <Stack
                    horizontal
                    horizontalAlign="space-between"
                    verticalAlign="center"
                    style={{ paddingTop: 10 }}
                >
                    <Text>
                        Page {this.state.currentPage} of {totalPages || 1}
                    </Text>

                    {/* <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <DefaultButton
                            text="Previous"
                            disabled={this.state.currentPage === 1}
                            onClick={() =>
                                this.setState({
                                    currentPage: this.state.currentPage - 1
                                })
                            }
                        />

                        <DefaultButton
                            text="Next"
                            disabled={
                                this.state.currentPage === totalPages ||
                                totalPages === 0
                            }
                            onClick={() =>
                                this.setState({
                                    currentPage: this.state.currentPage + 1
                                })
                            }
                        />
                    </Stack> */}
                    <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #ddd" }}>
                        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                            <Text>&nbsp;</Text>
                            <Text>{`${startIndex} - ${endIndex} of ${this.state.records.length} applications`}</Text>
                            <Stack horizontal tokens={{ childrenGap: 10 }}>
                                <DefaultButton
                                    text={"<"}
                                    onClick={() => this.setState({ currentPage: this.state.currentPage - 1 })}
                                    disabled={this.state.currentPage === 1}
                                    styles={{ root: { minWidth: 2, maxWidth: 3, borderRadius: 6, borderColor: "#ccc" } }}
                                />
                                <DefaultButton
                                    text={">"}
                                    onClick={() => this.setState({ currentPage: this.state.currentPage + 1 })}
                                    disabled={this.state.currentPage === totalPages || totalPages === 0}
                                    styles={{ root: { minWidth: 2, maxWidth: 3, borderRadius: 6, borderColor: "#ccc" } }}
                                />
                            </Stack>
                        </Stack>
                    </div>
                </Stack>

            </Stack>
    }
}

export default Applications;