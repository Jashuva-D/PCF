import * as React from "react";
import { DetailsList,IColumn, Stack, Text, DefaultButton, Link, SelectionMode, Icon, TooltipHost, Dropdown, IconButton } from "@fluentui/react";
import IssueDetailsDialog from "./IssueDetails";
import CMSDialog from "./CMSDialog";
import { TabOptions } from "./data";

interface DiscrepanciesListProps{
    applicationid: string
    tabname: string,
    sectionname: string
}
interface DiscrepanciesState {
    columns: IColumn[]
    items: any[]
    currentPage: number
    pageSize: number,
    openDetails: boolean,
    issuerecordidToOpen?: string,
    cmsdialog: boolean,
    dialogTitle?: string;
    dialogSubtext?: string;
    dialogConfirmButtonLabel?: string;
    dialogCancelButtonLabel?: string;
    confirmButtonColor?: string;
    dialogSubTextElement? : React.ReactElement;
    dialogConfirmCallback?: () => void;
    dialogCancelCallback?: () => void;
    dialogDismissCallback?: () => void;
}

class DiscrepanciesList extends React.Component<DiscrepanciesListProps,DiscrepanciesState>{
    constructor(props: DiscrepanciesListProps){
        super(props);
        //var enableaction = (parent as any).Xrm.Utility.getGlobalContext().userSettings.roles.get().filter((x : any) => x.name == "Hosting Coordinator" || x.name == "System Administrator").length > 0
        var enableaction = true;
        var cols = [
            {
                key: "fieldid",
                name: "Field ID",
                fieldName: "fieldid",
                minWidth: 60,
                maxWidth: 60,
                onRender: (item: any) => {
                    var obj = this;
                    return <Text style={{fontWeight: 400}}>{item["fieldid"]}</Text>
                }
            },
            {
                key: "issueid",
                name: "Issue ID",
                fieldName: "issueid",
                minWidth: 50,
                maxWidth: 50,
                onRender: (item: any) => {
                    var obj = this;
                    return <Link onClick={() => {obj.setState({openDetails: true,issuerecordidToOpen: item.issuerecordid})}} style={{color: "#0D2499", fontWeight: 600}}>{item["issueid"]}</Link>
                }
            },
            {
                key: "fieldname",
                name: "Field Name",
                fieldName: "fieldname",
                isResizable: true,
                minWidth: 160,
                onRender: (item: any) => {
                    return <Text style={{fontWeight: 400}}>{item["fieldname"]}</Text>
                }
            },
            {
                key: "currentvalue",
                name: "Current Value",
                fieldName: "currentvalue",
                minWidth: 100,
                isResizable: true,
                onRender: (item: any) => {
                    return <Text style={{fontWeight: 400}}>{item["currentvalue"]}</Text>
                }
            },
            {
                key: "newvalue",
                name: "New Value",
                fieldName: "newvalue",
                minWidth: 100,
                isResizable: true,
                onRender: (item: any) => {
                    return <Text style={{color: "#107C10", fontWeight: 600}}>{item["newvalue"]}</Text>
                }
            },
            {
                key: "status",
                name: "Status",
                fieldName: "status",
                minWidth: 80,
                onRender: (item: any) => {
                    var textcolor = "#107C10";
                    var bgcolor = "0D47A1";

                    if(item["status"] == "In Progress") { bgcolor = "#E5EFFF"; textcolor= "#0D47A1";}
                    if(item["status"] == "New") { bgcolor = "#E7F6EA"; textcolor= "#107C10";}
                    if(item["status"] == "In Review") { bgcolor = "#F0E7FA"; textcolor= "#6B2FA0";}
                    if(item["status"] == "Resolved") { bgcolor = "#DFF3E4"; textcolor= "#0E7433";}
                    if(item["status"] == "Transferred to BaseCamp") { bgcolor = "#F1E4F7"; textcolor= "#7F2A9E";}
                    if(item["status"] == "Unable to Resolve") { bgcolor = "#FDE7E5"; textcolor= "#C42B1C";}
                    if(item["status"] == "Cancelled") { bgcolor = "#EDEDED"; textcolor= "#605E5C"; }
                    
                    return <Stack verticalAlign="center" horizontalAlign="start" style={{ height: "100%", paddingLeft: "8px" }}><TooltipHost content={item["status"]}><Text style={{ color: textcolor, backgroundColor: bgcolor, paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px" }}>{item["status"]}</Text></TooltipHost></Stack>;
                }
            },
            {
                key: "reportedon",
                name: "Reported On",
                fieldName: "reportedon",
                minWidth: 80,
                onRender: (item: any) => {
                    return <Text style={{fontWeight: 400}}>{item["reportedon"]}</Text>
                }
            },
            {
                key: "actions",
                name: "Actions",
                minWidth: 50,
                isResizable: true,
                onRender: (item: any) => {
                    var validstatusforaction = true;
                    if(item["status"] == "Resolved" || item["status"] == "Cancelled" || item["status"] == "Transferred to BaseCamp") validstatusforaction = false;
                    var buttons = [
                        {
                            key: "bcinprogress",
                            text: "In Progress",
                            iconProps: { iconName: "sync"},
                            onRenderIcon: () => (
                                <span
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        border: "1px solid #7F2A9E",
                                        borderRadius: "50%",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#7F2A9E",
                                        backgroundColor: "#F1E4F7",
                                        padding: 2
                                    }}
                                >
                                    <Icon
                                        iconName="sync"
                                        styles={{
                                            root: {
                                                color: "#7F2A9E"
                                            }
                                        }}
                                        style={{color: "#7F2A9E"}}
                                    />
                                </span>
                            ),
                            onClick: this.onInProgressClick.bind(this, item)
                        },
                        {
                            key: "resolve",
                            text: "Resolve",
                            iconProps: { iconName: "checkMark"},
                            onRenderIcon: () => (
                                <span
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        border: "1px solid #107C10",
                                        borderRadius: "50%",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#107C10",
                                        backgroundColor: "#E8F5E8",
                                        padding: 2
                                    }}
                                >
                                    <Icon
                                        iconName="checkMark"
                                        styles={{
                                            root: {
                                                color: "#107C10"
                                            }
                                        }}
                                        style={{color: "#107C10"}}
                                    />
                                </span>
                            ),
                            onClick: this.onResolvedClick.bind(this, item)
                        },
                        {
                            key: "delegate",
                            text: "Transfer to BaseCamp Team",
                            iconProps: {
                                iconName: "people",
                            },
                            onRenderIcon: () => (
                                <span
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        border: "1px solid #0D2499",
                                        borderRadius: "50%",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#0D2499",
                                        backgroundColor: "#E8ECFF",
                                        padding: 2
                                    }}
                                >
                                    <Icon
                                        iconName="people"
                                        styles={{
                                            root: {
                                                color: "#0D2499"
                                            }
                                        }}
                                        style={{color: "#0D2499"}}
                                    />
                                </span>
                            ),
                            onClick: this.onDelegateClick.bind(this,item)
                        },
                        {
                            key: "cancel",
                            text: "Cancel",
                            iconProps: {iconName: "cancel"},
                            onRenderIcon: () => (
                                <span
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        border: "1px solid #D13438",
                                        borderRadius: "50%",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#D13438",
                                        backgroundColor: "#FDE8E9",
                                        padding: 2
                                    }}
                                >
                                    <Icon
                                        iconName="people"
                                        styles={{
                                            root: {
                                                color: "#D13438"
                                            }
                                        }}
                                        style={{color: "#D13438"}}
                                    />
                                </span>
                            ),
                            onClick: this.onCacelClick.bind(this,item),
                        }
                    ] as any
                    //const options = buttons.map((button : any) => ({ key: button.key, text: button.text }));
                    const options = [
    { key: "hcinprogress", text: "HC - In Progress", data: { iconName: "Sync", color: "#7F2A9E", bgColor: "#F1E4F7" } },
    { key: "bcinprogress", text: "BaseCamp - In Progress", data: { iconName: "Sync", color: "#7F2A9E", bgColor: "#F1E4F7" } },
    { key: "resolve", text: "Resolved by HC", data: { iconName: "CheckMark", color: "#107C10", bgColor: "#E8F5E8" } },
    { key: "resolvebase", text: "Resolved by BaseCamp", data: { iconName: "CheckMark", color: "#107C10", bgColor: "#E8F5E8" } },
    { key: "delegate", text: "Transfer to BaseCamp", data: { iconName: "People", color: "#0D2499", bgColor: "#E8ECFF" } },
    { key: "cancel", text: "Cancel", data: { iconName: "Cancel", color: "#D13438", bgColor: "#FDE8E9" } }
];
                    return(
//                         <Dropdown
//     placeholder="Select"
//     options={options}
//     onRenderOption={(option) => (
//         <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
//             <span
//                 style={{
//                     width: 18,
//                     height: 18,
//                     border: `1px solid ${option?.data?.color}`,
//                     borderRadius: "50%",
//                     display: "inline-flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: option?.data?.color,
//                     backgroundColor: option?.data?.bgColor,
//                     padding: 2
//                 }}
//             >
//                 <Icon iconName={option?.data?.iconName} />
//             </span>
//             <span>{option?.text}</span>
//         </Stack>
//     )}
//     styles={{
//         root: { width: 100,borderRadius: 6 },
//         dropdown: { minHeight: 24, height: 24, borderRadius: 6 },
//         title: { minHeight: 24, height: 24, padding: "0 8px", fontSize: 13, lineHeight: "22px", borderRadius: 6 }
//     }}
//     calloutProps={{
//         directionalHint: 12,
//         styles: {
//             calloutMain: {
//                 minWidth: 200,
//                 borderRadius: 6
//             }
//         }
//     }}
// />
                        //     options={options}
                        //     onRenderOption={(option) => <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}><span style={{ width: 18, height: 18, border: `1px solid ${option?.data?.color}`, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", color: option?.data?.color, backgroundColor: option?.data?.bgColor, padding: 2 }}><Icon iconName={option?.data?.iconName} /></span><span>{option?.text}</span></Stack>}
                        //     styles={{ root: { width: 180 }, dropdown: { minHeight: 20, borderRadius:6 }, title: { minHeight: 20, padding: "0 8px", fontSize: 13 } }}
                        //     style={{borderRadius: 6}}
                        // />)
                    //)
                            // <DefaultButton
                            //     text="Select"
                            //     menuProps={{
                            //         items: buttons
                            //     }}
                            //     styles={{
                            //         root: {
                            //             minWidth: 90,
                            //             height: 10,
                            //             padding: "0 5px",
                            //             border: "1px solid #D1D1D1",
                            //             borderRadius: 4,
                            //             backgroundColor: "white",
                            //             color: "#323130",
                            //         },
                            //         rootHovered: {
                            //             backgroundColor: "#F3F3F3",
                            //             borderColor: "#A19F9D",
                            //         },
                            //         rootPressed: {
                            //             backgroundColor: "#EDEBE9",
                            //         },
                            //         label: {
                            //             fontSize: 12,
                            //             fontWeight: 400,
                            //         },
                            //         menuIcon: {
                            //             fontSize: 12,
                            //             color: "#323130",
                            //         },
                            //     }}
                            // />)
                        
                          
                        <IconButton
                            // iconProps={{
                            //     iconName: "MoreVertical"
                            // }}
                            disabled={!(enableaction && validstatusforaction)}
                            title="Actions"
                            ariaLabel="Actions"
                            styles={{
                                root: {
                                    width: 32,
                                    height: 20,
                                    backgroundColor: "transparent"
                                },
                                rootHovered: {
                                    backgroundColor: "#F3F3F3"
                                },
                                icon: {
                                    fontSize: 24
                                },
                                menuIcon: {
                                    fontSize: 16,
                                    text: "Select",
                                    color: "#0D2499",
                                    fontWeight: 600
                                },
                                
                                
                            }}
                            menuProps={{items: buttons}}
                            
                        />)
                        //<DefaultButton text="Select" menuProps={{ items: buttons }} styles={{ root: { minHeight: 20, height: 20, padding: "0 8px", borderRadius: 6 }, label: { fontSize: 13 } }} />)
                    
                        //<Dropdown placeholder="Select" options={options} onChange={this.onResolvedByBaseCampClick.bind(this)} styles={{ root: { width: 100 }, dropdown: { minHeight: 28, height: 28, borderRadius: 6 }, title: { minHeight: 28, height: 28, padding: "0 8px", fontSize: 13 } }} />)
                        {/* <CommandBar 
                            items={[]}
                            overflowItems={buttons}
                            overflowButtonProps={{
                                    iconProps: {
                                        iconName: "MoreVertical",
                                        style: { fontSize: 10 }
                                    }
                                }
                            }
                            styles={{
                                root: {
                                    selectors: {
                                        ":hover": {
                                            backgroundColor: "#F3F3F3"
                                        }
                                    },
                                },
                                primarySet: {
                                    backgroundColor: "transparent"
                                },
                                secondarySet: {
                                    backgroundColor: "transparent"
                                }
                            }}
                            style={{
                                padding: 0,
                                margin: 0
                            }}
                            
                        />  */}
                       
                        
                }
            }
        ] as IColumn[];

        this.state = {
            columns : cols,
            items: [],
            currentPage: 1,
            pageSize: 10,
            openDetails: false,
            cmsdialog: false,
        }
    }
    componentDidMount(): void {
        var obj = this;
        this.setState({
            items: this.CreateFakeData()
        });
        
        (parent as any).Xrm.WebApi.retrieveMultipleRecords("crm2_datadiscrepancyfield", `?$select=crm2_name,createdon,crm2_currentvalue,_crm2_datadiscrepancy_value,crm2_fieldname,crm2_newvalue,crm2_status&$expand=crm2_DataDiscrepancy($select=crm2_datadiscrepancyid,crm2_name,crm2_tab,crm2_section,crm2_issuetitle,crm2_issuedescription)&$filter=crm2_DataDiscrepancy/_crm2_application_value eq ${this.props.applicationid}`).then(
            function success(results : any) {
                var discrepancies = [];
                var currenttab = TabOptions.find(x => x.key == obj.props.tabname)?.text;
                var currentsection = TabOptions.find(x => x.key == obj.props.tabname)?.sections.find(x => x.key == obj.props.sectionname)?.text;
                var records = results.entities.filter((x : any)=> x["crm2_DataDiscrepancy"]["crm2_tab"] == currenttab && x["crm2_DataDiscrepancy"]["crm2_section"] == currentsection);
                for (var i = 0; i < records.length; i++) {
                    var eachrecord = records[i];
                    var eachdisc = {
                        fieldid: eachrecord.crm2_name,
                        issueid: eachrecord["crm2_DataDiscrepancy"]["crm2_name"],
                        fieldname: eachrecord.crm2_fieldname,
                        issuetitle: eachrecord["crm2_DataDiscrepancy"]["crm2_issuetitle"],
                        currentvalue: eachrecord.crm2_currentvalue ?? "",
                        newvalue: eachrecord.crm2_newvalue ?? "",
                        status: eachrecord["crm2_status@OData.Community.Display.V1.FormattedValue"] ?? "",
                        reportedon: eachrecord["createdon@OData.Community.Display.V1.FormattedValue"],
                        reportedby: "Anuradha I",
                        issuerecordid: eachrecord["_crm2_datadiscrepancy_value"]
                    }
                    discrepancies.push(eachdisc);
                }
                obj.setState({items: discrepancies});
            },
            function(error: any) {
                console.log(error.message);
            }
        );
    }
    CreateFakeData(): any[]{
        var fakedata = [];
        for(var i=0; i<10; i++){
            fakedata.push({
                issueid: `IS-100${i.toString()}`,
                fieldname: "Application Name (Short)",
                issuetitle: "1115 PMDA - General - Details",
                currentvalue: "1115 PMDA",
                newvalue: "0000 PMDA",
                status: i % 5 === 0 ? "Cancelled" : i % 4 === 0 ? "Transferred to BaseCamp" : i % 3 === 0 ? "Resolved" : i % 2 === 0 ? "In Progress" : "New",
                reportedon: new Date().toLocaleDateString(),
                reportedby: "Anuradha I"
            });
        }
        return fakedata; 
    }
    
    onResolvedClick(item: any) {
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Resolve",
            dialogSubtext: "Are you sure you want to mark this discrepancy as resolved? \n Once confirmed, the status will be updated to Resolved by BaseCamp",
            dialogConfirmButtonLabel: "Resolve",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogConfirmCallback: () => {
                (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["crm2_datadiscrepancyfieldid"],{ crm2_status: 289940002 }).then(function(resp: any){
                    obj.setState({cmsdialog: false})
                },function(err: any){
                    alert("error occured"+err?.message)
                })
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    onCacelClick(item: any) {
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Cancellation",
            dialogSubtext: "Are you sure you want to cancel this discrepancy? \n Once confirmed, the status will be updated to Cancelled",
            //dialogSubTextElement: <Text>Are you sure you want to cancel this discrepancy? <br></br> Once confirmed, the status will be updated to <Text style={{color: "#D13438", fontWeight: 600}}>Cancelled</Text></Text>,
            dialogConfirmButtonLabel: "Cancel Discrepancy",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#D13438",
            dialogConfirmCallback: () => {
               (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["crm2_datadiscrepancyfieldid"],{ crm2_status: 289940004 }).then(function(resp: any){
                    obj.setState({cmsdialog: false})
                },function(err: any){
                    alert("error occured"+err?.message)
                })
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    onDelegateClick(item: any) {
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Transfer to BaseCamp",
            dialogSubtext: "Are you sure you want to transfer this to BaseCamp team? \n Once confirmed, the BaseCamp team will be notified to review and resolve the issue",
            dialogConfirmButtonLabel: "Transfer",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogConfirmCallback: () => {
                (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["crm2_datadiscrepancyfieldid"],{ crm2_status: 289940003 }).then(function(resp: any){
                    obj.setState({cmsdialog: false})
                },function(err: any){
                    alert("error occured"+err?.message)
                })
            },
            dialogCancelCallback: () => {
                
            }
        })
    }
    
    onInProgressClick(item: any){
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm BaseCamp - In Progress",
            dialogSubtext: "Are you sure you want to change the status to BaseCamp-In Progress. \n Once confirmed, the status will be changed to BaseCamp-In Progress",
            dialogConfirmButtonLabel: "Confirm",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogConfirmCallback: () => {
                (parent as any).Xrm.WebApi.updateRecord("crm2_datadiscrepancyfield",item["crm2_datadiscrepancyfieldid"],{ crm2_status: 289940001 }).then(function(resp: any){
                    obj.setState({cmsdialog: false})
                },function(err: any){
                    alert("error occured"+err?.message)
                })
            },
            dialogCancelCallback: () => {
                
            }
        })
    }

    render(): React.ReactNode {
        const startIndex = (this.state.currentPage - 1) * this.state.pageSize;
        const endIndex = startIndex + this.state.pageSize;
        const paginatedRecords = this.state.items.slice(startIndex, endIndex);
        const totalPages = Math.ceil(this.state.items.length / this.state.pageSize);
        return <>
            <DetailsList className="discrepancies"
                columns={this.state.columns}
                items={paginatedRecords}
                selectionMode={SelectionMode.none}
                onItemInvoked={()=> {this.setState({openDetails: true})}}
                styles={{
                    headerWrapper: {
                        paddingTop: 0
                    }
                }}
            />
            <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #ddd" }}>
                <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                    {/* <Text>&nbsp;</Text> */}
                    <Text>{`${this.state.items.length > 0 ? startIndex + 1 : 0} - ${Math.min(startIndex + this.state.pageSize, this.state.items.length)} of ${this.state.items.length} discrepancies`}</Text>
                    <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <DefaultButton
                            text={"<"}
                            onClick={() => this.setState({ currentPage: this.state.currentPage - 1 })}
                            disabled={this.state.currentPage === 1 || totalPages === 0}
                            styles={{ root: { minWidth: 2, maxWidth: 3, borderRadius: 6, borderColor: "#ccc" } }}
                        />
                        <Text style={{paddingTop: 5}}>Page: {this.state.currentPage.toString()}</Text>
                        <DefaultButton
                            text={">"}
                            onClick={() => this.setState({ currentPage: this.state.currentPage + 1 })}
                            disabled={this.state.currentPage === totalPages || totalPages === 0}
                            styles={{ root: { minWidth: 2, maxWidth: 3, borderRadius: 6, borderColor: "#ccc" } }}
                        />
                    </Stack>
                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} styles={{ root: { border: "1px dotted #F4C7A1", borderRadius: 4, padding: "4px 8px", backgroundColor: "#FFFDFD" } }}>
                        <Text styles={{ root: { fontSize: 14, fontWeight: 800, color: "#323130" } }}>Actions:</Text>
                        <Text styles={{ root: { fontSize: 11, color: "#107C10", fontWeight: 600 } }}>Resolve</Text>
                        <Text styles={{ root: { color: "#A19F9D", fontSize: 11, fontWeight: 600 } }}>|</Text>
                        <Text styles={{ root: { fontSize: 11, color: "#0D2499", fontWeight: 600 } }}>Transfer to BaseCamp</Text>
                        <Text styles={{ root: { color: "#A19F9D", fontSize: 11, fontWeight: 600 } }}>|</Text>
                        <Text styles={{ root: { fontSize: 11, color: "#D13438", fontWeight: 600 } }}>Cancel</Text>
                    </Stack>
                </Stack>
            </div>
            {this.state.openDetails && 
            <IssueDetailsDialog 
                isOpen={this.state.openDetails}
                issuerecordid={this.state.issuerecordidToOpen!}
                // issue={{
                //     issuetitle: "1115 PMDA - General - Details - Data Discrepancy", 
                //     issuedescription: "Testing the issue report with view details feature on click of a row",
                //     reportedon: new Date().toLocaleDateString(),
                //     reportedby: {name : "Anuradha I", email: "anuradha.inampudi@cms.hhs.gov"},
                //     assignedto: {name: "Pinal Jariwala", email: "pinal.jariwala@cms.hhs.gov"},
                //     delegatedto: {name: "Swati Albal", email: "swati.albal@cms.hhs.gov"},
                //     fields:[
                //         {fieldname: "Application Name (Short)", currentvalue: "1115 PMDA", newvalue: "1115 WIOUER"},
                //         {fieldname: "Application Name (Long)", currentvalue: "Test Application", newvalue: "New Application Name"}
                //     ]}}
                onClose={() => {this.setState({openDetails: false})}}
            />}
            <CMSDialog
                isOpen={this.state.cmsdialog!}
                title={this.state.dialogTitle}
                subText={this.state.dialogSubtext}
                confirmButtonText={this.state.dialogConfirmButtonLabel}
                cancelButtonText={this.state.dialogCancelButtonLabel}
                confirmbuttoncolor={this.state.confirmButtonColor ?? ""}
                subTextElement={null}
                onDismiss={() => {
                    this.setState({ cmsdialog: false });
                }}
                onConfirm={() => {
                    //this.setState({ cmsdialog: false });
                    this.state.dialogConfirmCallback && this.state.dialogConfirmCallback();
                }}
                onCancel={() => {
                    this.setState({ cmsdialog: false });
                }}
            />
        </>
    }
}

export default DiscrepanciesList;
