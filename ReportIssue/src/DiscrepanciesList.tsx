import * as React from "react";
import { DetailsList,IColumn, Stack, Text, DefaultButton, Link, CommandBar, ICommandBarItemProps,IconButton, IContextualMenuProps, SelectionMode, Icon } from "@fluentui/react";
import IssueDetailsDialog from "./IssueDetails";
import CMSDialog from "./CMSDialog";

interface DiscrepanciesListProps{

}
interface DiscrepanciesState {
    columns: IColumn[]
    items: any[]
    currentPage: number
    pageSize: number,
    openDetails: boolean,
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
        var enableaction = (parent as any).Xrm.Utility.getGlobalContext().userSettings.roles.get().filter((x : any) => x.name == "Hosting Coordinator" || x.name == "System Administrator").length > 0
        //var enableaction = true;
        var cols = [
            {
                key: "issueid",
                name: "Issue ID",
                fieldName: "issueid",
                minWidth: 100,
                onRender: (item: any) => {
                    var obj = this;
                    return <Link onClick={() => {obj.setState({openDetails: true})}} style={{color: "#0D2499", fontWeight: 600}}>{item["issueid"]}</Link>
                }
            },
            {
                key: "fieldname",
                name: "Field Name",
                fieldName: "fieldname",
                minWidth: 200,
                onRender: (item: any) => {
                    return <Text style={{fontWeight: 400}}>{item["fieldname"]}</Text>
                }
            },
            {
                key: "currentvalue",
                name: "Current Value",
                fieldName: "currentvalue",
                minWidth: 100,
                onRender: (item: any) => {
                    return <Text style={{fontWeight: 400}}>{item["currentvalue"]}</Text>
                }
            },
            {
                key: "newvalue",
                name: "New Value",
                fieldName: "newvalue",
                minWidth: 100,
                onRender: (item: any) => {
                    return <Text style={{color: "#107C10", fontWeight: 600}}>{item["newvalue"]}</Text>
                }
            },
            {
                key: "status",
                name: "Status",
                fieldName: "status",
                minWidth: 100,
                onRender: (item: any) => {
                    var textcolor = "#107C10";
                    var bgcolor = "0D47A1";

                    if(item["status"] == "In Progress") { textcolor = "#E5EFFF"; bgcolor= "#0D47A1";}
                    if(item["status"] == "New") { textcolor = "#E7F6EA"; bgcolor= "#107C10";}
                    if(item["status"] == "In Review") { textcolor = "#F0E7FA"; bgcolor= "#6B2FA0";}
                    if(item["status"] == "Resolved") { textcolor = "#DFF3E4"; bgcolor= "#0E7433";}
                    if(item["status"] == "Transferred to BaseCamp") { textcolor = "#F1E4F7"; bgcolor= "#7F2A9E";}
                    if(item["status"] == "Unable to Resolve") { textcolor = "#FDE7E5"; bgcolor= "#C42B1C";}
                    if(item["status"] == "Cancelled") { textcolor = "#EDEDED"; bgcolor= "#605E5C"; }
                    
                    return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{color: textcolor, backgroundColor: bgcolor, paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{item["status"]}</Text></Stack>;
                }
            },
            {
                key: "reportedon",
                name: "Reported On",
                fieldName: "reportedon",
                minWidth: 100,
                onRender: (item: any) => {
                    return <Text style={{fontWeight: 400}}>{item["reportedon"]}</Text>
                }
            },
            {
                key: "actions",
                name: "Actions",
                minWidth: 60,
                onRender: (item: any) => {
                    var validstatusforaction = true;
                    if(item["status"] == "Resolved" || item["status"] == "Cancelled" || item["status"] == "Transferred to BaseCamp") validstatusforaction = false;
                    var buttons = [
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
                                        iconName="people"
                                        styles={{
                                            root: {
                                                color: "#107C10"
                                            }
                                        }}
                                        style={{color: "#107C10"}}
                                    />
                                </span>
                            ),
                            onClick: this.onResolveClick.bind(this, item)
                        },
                        {
                            key: "delegate",
                            text: "Transfer to BaseCamp",
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
                    return(
                        
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
        this.setState({
            items: this.CreateFakeData()
        })
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
    onResolveClick(item: any) {
        var obj = this;
        this.setState({
            cmsdialog: true,
            dialogTitle: "Confirm Resolve",
            dialogSubtext: "Are you sure you want to mark this discrepancy as resolved? \n Once confirmed, the status will be updated to Resolved",
            dialogConfirmButtonLabel: "Resolve",
            dialogCancelButtonLabel: "Go Back",
            confirmButtonColor: "#0D2499",
            dialogConfirmCallback: () => {
                alert(`resolved ${item['issueid']}`);
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
                alert(`cancelled ${item['issueid']}`);
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
                alert(`resolved ${item['issueid']}`);
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
            <IssueDetailsDialog 
                isOpen={this.state.openDetails} 
                issue={{
                    issuetitle: "1115 PMDA - General - Details - Data Discrepancy", 
                    issuedescription: "Testing the issue report with view details feature on click of a row",
                    reportedon: new Date().toLocaleDateString(),
                    reportedby: {name : "Anuradha I", email: "anuradha.inampudi@cms.hhs.gov"},
                    assignedto: {name: "Pinal Jariwala", email: "pinal.jariwala@cms.hhs.gov"},
                    delegatedto: {name: "Swati Albal", email: "swati.albal@cms.hhs.gov"},
                    fields:[
                        {fieldname: "Application Name (Short)", currentvalue: "1115 PMDA", newvalue: "1115 WIOUER"},
                        {fieldname: "Application Name (Long)", currentvalue: "Test Application", newvalue: "New Application Name"}
                    ]}}
                onClose={() => {this.setState({openDetails: false})}}
            />
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
                    this.setState({ cmsdialog: false });
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
