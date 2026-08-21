import * as React from 'react';
import type {IColumn} from "@fluentui/react";
import { DefaultButton, DetailsList, Label, SelectionMode, Stack, StackItem, Link, initializeIcons, Text, Icon, TooltipHost, DirectionalHint} from '@fluentui/react';
import { getUserEmail } from './Helper';
import { CMSMyAppsIcon } from './Icons';

interface MyApplicationsProps {
    
}
interface MyApplicationsState {
    records: any[],
    columns: IColumn[],
    currentPage: number,
    pageSize: number,
    sortColumn: string,
    isSortedDescending: boolean
}

class Applications extends React.Component<MyApplicationsProps, MyApplicationsState> {
    constructor(props: MyApplicationsProps) {
        initializeIcons();
        super(props);
        this.state = {
            records: [],
            currentPage: 1,
            pageSize: 6,
            sortColumn: "",
            isSortedDescending: false,
            columns: [
                { key: 'pv_id', name: 'Application', fieldName: 'pv_id', currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true, 
                    onColumnClick: this.onColumnClick.bind(this),
                    onRender: (item: any) => {
                        return <Stack verticalAlign='center' horizontalAlign='start'><Link onClick={() => this.openRecord("pv_apps",item.key)} style={{fontSize: 14, fontWeight: 600, color: "#01395E"}}>{item.pv_id}</Link></Stack>;
                    }
                },
                { key: 'pv_businessownerofficecenter', name: 'Owner Group', fieldName: 'pv_businessownerofficecenter@OData.Community.Display.V1.FormattedValue', currentWidth: 120, minWidth: 120, maxWidth: 120, isResizable: true, 
                    onColumnClick: this.onColumnClick.bind(this),
                    onRender: (item: any) => {
                        if(item.pv_businessownerofficecenter){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#EBE8CE", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item["pv_businessownerofficecenter@OData.Community.Display.V1.FormattedValue"]}</Text></Stack>;
                        }
                        return null;
                    }
                },
                { key: 'pv_hostingdeliverymodel', name: 'Hosting Delivery Model', fieldName: 'pv_hostingdeliverymodel@OData.Community.Display.V1.FormattedValue', currentWidth: 150, minWidth: 150, maxWidth: 150, isResizable: true, 
                    onColumnClick: this.onColumnClick.bind(this),
                    onRender: (item: any) => {
                        if(item.pv_hostingdeliverymodel){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#d8dcee", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item["pv_hostingdeliverymodel@OData.Community.Display.V1.FormattedValue"]}</Text></Stack>;
                        }
                        return null;
                    }
                },
                { key: 'pv_hostingplatform', name: 'Stage', fieldName: 'pv_hostingplatform@OData.Community.Display.V1.FormattedValue', currentWidth: 100, minWidth: 100, maxWidth: 100, isResizable: true, 
                    onColumnClick: this.onColumnClick.bind(this),
                    onRender: (item: any) => {
                        if(item.pv_hostingplatform){
                            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#d8dcee", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{"TBD"}</Text></Stack>;
                        }
                        return null;
                    }
                },
                { key: 'pv_technicaladvisor', name: 'Technical Advisor', fieldName: '_pv_technicaladvisor_value@OData.Community.Display.V1.FormattedValue',currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true,
                    onColumnClick: this.onColumnClick.bind(this),
                    onRender: (item: any) => {
                        if(item._pv_technicaladvisor_value){
                            return <Stack verticalAlign="center" style={{paddingLeft: "8px"}}><Link onClick={() => this.openRecord("pv_person",item._pv_technicaladvisor_value)} style={{fontSize: 14}}>{item['_pv_technicaladvisor_value@OData.Community.Display.V1.FormattedValue']}</Link></Stack>
                        }
                        return null;
                    }
                },
                { key: 'pv_pointofcontact', name: 'Project Operations Coordinator', fieldName: '_pv_pointofcontact_value@OData.Community.Display.V1.FormattedValue',currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true,
                    onColumnClick: this.onColumnClick.bind(this),
                    onRender: (item: any) => {
                        if(item._pv_pointofcontact_value){
                            return <Stack verticalAlign="center" style={{paddingLeft: "8px"}}><Link onClick={() => this.openRecord("pv_person",item._pv_pointofcontact_value)} style={{fontSize: 14}}>{item['_pv_pointofcontact_value@OData.Community.Display.V1.FormattedValue']}</Link></Stack>
                        }
                        return null;
                    }
                },
                { key: 'pv_financialanalyst', name: 'Financial Analyst', fieldName: '_pv_financialanalyst_value@OData.Community.Display.V1.FormattedValue',currentWidth: 150, minWidth: 150, maxWidth: 200, isResizable: true,
                    onColumnClick: this.onColumnClick.bind(this),
                    onRender: (item: any) => {
                        if(item._pv_financialanalyst_value){
                            return <Stack verticalAlign="center" style={{paddingLeft: "8px"}}><Link onClick={() => this.openRecord("pv_person",item._pv_financialanalyst_value)} style={{fontSize: 14}}>{item['_pv_financialanalyst_value@OData.Community.Display.V1.FormattedValue']}</Link></Stack>
                        }
                        return null;
                    }
                },
                { key: 'modifiedon', name: 'Last Updated', fieldName: 'modifiedon@OData.Community.Display.V1.FormattedValue', currentWidth: 100, minWidth: 100, maxWidth: 100, isResizable: true, 
                    onColumnClick: this.onColumnClick.bind(this),
                    onRender: (item: any) => {
                        if(item.modifiedon){
                            return <Text>{item["modifiedon@OData.Community.Display.V1.FormattedValue"]}</Text>;
                        }
                        return null;
                    }
                 }
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
                        <entity name="pv_apps">
                        <attribute name="pv_appsid"/>
                        <attribute name="pv_id"/>
                        <attribute name="pv_businessownerofficecenter"/>
                        <attribute name="pv_hostingplatform"/>
                        <attribute name="pv_technicaladvisor"/>
                        <attribute name="pv_pointofcontact" />
                        <attribute name="pv_financialanalyst" />
                        <attribute name="pv_hostingdeliverymodel" />
                        <attribute name="modifiedon"/>
                        <order attribute="pv_id" descending="false"/>
                        <link-entity name="pv_appuserrole" from="pv_app" to="pv_appsid" link-type="inner" alias="ai">
                        <link-entity name="pv_person" from="pv_personid" to="pv_person" link-type="inner" alias="aj">
                        <filter type="and">
                        <condition attribute="pv_email_address" operator="eq" value="${email}"/>
                        </filter>
                        </link-entity>
                        <link-entity name="pv_role" from="pv_roleid" to="pv_role" link-type="inner" alias="aq">
                        <filter type="and">
                        <filter type="or">
                        <condition attribute="pv_id" operator="eq" value="13"/>
                        <condition attribute="pv_id" operator="eq" value="15"/>
                        <condition attribute="pv_id" operator="eq" value="21"/>
                        </filter>
                        </filter>
                        </link-entity>
                        </link-entity>
                        </entity>
                        </fetch>`;
            (parent as any).Xrm.WebApi.retrieveMultipleRecords("pv_apps", "?fetchXml=" + encodeURIComponent(fetchXml)).then((result : any) => {
                obj.setState({ records: result.entities.map((entity: any) => ({ ...entity, key: entity.pv_appsid })) });
            });
        });
    }

    openRecord(entityname: string, id: string){
        (parent as any).Xrm.Navigation.openForm({ entityName: entityname, entityId: id });   
    }

    onColumnClick(ev?: React.MouseEvent<HTMLElement>, column?: IColumn) {

        if (!column) {
            return;
        }

        const isSortedDescending = this.state.sortColumn === column.fieldName ? !this.state.isSortedDescending : false;

        const sortedRecords = [...this.state.records].sort((a, b) => {

            const aValue = a[column.fieldName || ""] ?? "";
            const bValue = b[column.fieldName || ""] ?? "";

            if (aValue < bValue) return isSortedDescending ? 1 : -1;
            if (aValue > bValue) return isSortedDescending ? -1 : 1;

            return 0;
        });

        const updatedColumns = this.state.columns.map((col) => ({
            ...col,
            isSorted: col.key === column.key,
            isSortedDescending:
                col.key === column.key
                    ? isSortedDescending
                    : false
        }));

        this.setState({
            records: sortedRecords,
            columns: updatedColumns,
            sortColumn: column.fieldName || "",
            isSortedDescending: isSortedDescending,
            currentPage: 1
        });
    }

    onRenderDetailsHeader(props: any, defaultRender: any) {

        if (!props || !defaultRender) {
            return null;
        }

        return defaultRender({
            ...props,
            onRenderColumnHeaderTooltip: (tooltipProps: any) => (
                <TooltipHost
                    content={tooltipProps.column?.name}
                    directionalHint={DirectionalHint.topCenter}
                >
                    {tooltipProps.children}
                </TooltipHost>
            )
        });
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
                            <Label style={{fontWeight: "bold", fontSize: 16, color: "#01395E"}}>My Applications</Label>
                            <Text style={{color: "#6A7A99", fontWeight: "semibold"}}>Ownership, platform, delivery stage, and governance posture.</Text>
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
                        onRenderDetailsHeader={this.onRenderDetailsHeader.bind(this)}
                        styles={{
                            root: {
                                boxShadow: "0 -4px 8px rgba(0,0,0,0.15)"  
                            }
                        }}
                    />

                <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #ddd" }}>
                    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                        <Text>&nbsp;</Text>
                        <Text>{`${this.state.records.length > 0 ? startIndex + 1 : 0} - ${Math.min(startIndex + this.state.pageSize, this.state.records.length)} of ${this.state.records.length} applications`}</Text>
                        <Stack horizontal tokens={{ childrenGap: 10 }}>
                            <DefaultButton
                                text={"<"}
                                onClick={() => this.setState({ currentPage: this.state.currentPage - 1 })}
                                disabled={this.state.currentPage === 1 || totalPages === 0}
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
    }
}

export default Applications;