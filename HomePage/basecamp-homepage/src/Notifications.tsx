import * as React from "react";
import { Stack, StackItem, Icon, Text, initializeIcons, Label, DefaultButton, Link} from "@fluentui/react";
import { NotificationType } from "./Constants";
import { CMSAlertIcon, CMSInfo, CMSNotifications } from "./Icons";


interface NotificationModel {
    body: string | null;
    priority : number | null;
    createdon: string | null;
    title: string | null;
    icontype : number | null;
    createdon_value : Date ;
    ttlinseconds: number | null;
    expirationdate?: string | null;
    expirationdate_value?: Date | null;
}
interface NotificationsProps {
}
interface NotificationsState {
    notifications: NotificationModel[];
    currentPage: number; // Added for pagination
}

class Notifications extends React.Component<NotificationsProps, NotificationsState> {
    constructor(props: NotificationsProps) {
        super(props);
        initializeIcons();
        this.state = {
            notifications: [],
            currentPage: 1 // Initialize current page
        };
    }
    componentDidMount(): void {
        var obj = this;
        var today = new Date();
        today.setHours(0,0,0,0);

        // Commented out the existing code to preserve it
        
        (parent as any).Xrm?.WebApi.retrieveMultipleRecords("cr549_notification", `?$filter=(statecode eq 0 and (Microsoft.Dynamics.CRM.OnOrAfter(PropertyName='cr549_expirationdate',PropertyValue='${today.toISOString()}') or cr549_expirationdate eq null))&$orderby=createdon desc`).then(
            function success(resp : any) {
                var recs : NotificationModel[] = []
                resp.entities.forEach((x : any) => {
                    recs.push({
                        icontype: x.cr549_type,
                        title: x.cr549_name,
                        body: x.cr549_description,
                        createdon: x["createdon@OData.Community.Display.V1.FormattedValue"],
                        createdon_value: x.createdon,
                        expirationdate: x["cr549_expirationdate@OData.Community.Display.V1.FormattedValue"],
                        expirationdate_value: x.cr549_expirationdate,
                        priority: x.cr549_priority,
                        ttlinseconds: null
                    })
                })
                obj.setState({
                    notifications: recs
                });
            },
            function(error: any) {
                console.log(error.message);
            }
        );
        

        // Sample data for testing
        // const sampleNotifications: NotificationModel[] = [
        //     { title: "Notification 1", body: "This is the body of notification 1.This is the body of notification 1This is the body of notification 1This is the body of notification 1This is the body of notification 1This is the body of notification 1This is the body of notification 1This is the body of notification 1", createdon: "2026-05-01", createdon_value: new Date("2026-05-01"), expirationdate: "2026-05-10", expirationdate_value: new Date("2026-05-10"), priority: 200000001, icontype: NotificationType.Info, ttlinseconds: null },
        //     { title: "Notification 2", body: "This is the body of notification 2.", createdon: "2026-05-02", createdon_value: new Date("2026-05-02"), expirationdate: "2026-05-11", expirationdate_value: new Date("2026-05-11"), priority: 200000002, icontype: NotificationType.Warning, ttlinseconds: null },
        //     { title: "Notification 3", body: "This is the body of notification 3.", createdon: "2026-05-03", createdon_value: new Date("2026-05-03"), expirationdate: "2026-05-12", expirationdate_value: new Date("2026-05-12"), priority: 200000000, icontype: NotificationType.Failure, ttlinseconds: null },
        //     { title: "Notification 4", body: "This is the body of notification 4.", createdon: "2026-05-04", createdon_value: new Date("2026-05-04"), expirationdate: "2026-05-13", expirationdate_value: new Date("2026-05-13"), priority: 200000001, icontype: NotificationType.Mention, ttlinseconds: null },
        //     { title: "Notification 5", body: "This is the body of notification 5.", createdon: "2026-05-05", createdon_value: new Date("2026-05-05"), expirationdate: "2026-05-14", expirationdate_value: new Date("2026-05-14"), priority: 200000002, icontype: NotificationType.Success, ttlinseconds: null },
        //     { title: "Notification 6", body: "This is the body of notification 6.", createdon: "2026-05-06", createdon_value: new Date("2026-05-06"), expirationdate: "2026-05-15", expirationdate_value: new Date("2026-05-15"), priority: 200000000, icontype: NotificationType.Custom, ttlinseconds: null },
        //     { title: "Notification 7", body: "This is the body of notification 7.", createdon: "2026-05-07", createdon_value: new Date("2026-05-07"), expirationdate: "2026-05-16", expirationdate_value: new Date("2026-05-16"), priority: 200000001, icontype: NotificationType.Info, ttlinseconds: null },
        //     { title: "Notification 8", body: "This is the body of notification 8.", createdon: "2026-05-08", createdon_value: new Date("2026-05-08"), expirationdate: "2026-05-17", expirationdate_value: new Date("2026-05-17"), priority: 200000002, icontype: NotificationType.Warning, ttlinseconds: null },
        //     { title: "Notification 9", body: "This is the body of notification 9.", createdon: "2026-05-09", createdon_value: new Date("2026-05-09"), expirationdate: "2026-05-18", expirationdate_value: new Date("2026-05-18"), priority: 200000000, icontype: NotificationType.Failure, ttlinseconds: null },
        //     { title: "Notification 10", body: "This is the body of notification 10.", createdon: "2026-05-10", createdon_value: new Date("2026-05-10"), expirationdate: "2026-05-19", expirationdate_value: new Date("2026-05-19"), priority: 200000001, icontype: NotificationType.Mention, ttlinseconds: null }
        // ];

        // this.setState({ notifications: sampleNotifications });
    }

    GetNotificationIcon(notificationType: number): string {
        switch (notificationType) {
            case NotificationType.Info:
                return "Info";
            case NotificationType.Warning:
                return "Warning";
            case NotificationType.Failure:
                return "Cancel";
            case NotificationType.Mention:
                return "Info";
            case NotificationType.Custom:
                return "Info";
            case NotificationType.Success:
                return "Accept";
            default:
                return "Info";
        }
    }
    GetNotificationColor(notificationType: number): string {
        switch (notificationType) {
            case NotificationType.Info:
                return "#115ea3";
            case NotificationType.Warning:
                return "#ffda6a";
            case NotificationType.Failure:
                return "#ea868f";
            case NotificationType.Mention:
                return "#cc6ef5";
            case NotificationType.Success:
                return "#051b11";
            default:
                return "blue";
        }
    }
    GetPriorityColor(notificationPriority: number): string {
        switch (notificationPriority) {
            case 200000000: return "#00ff9d";
            case 200000001: return "#ff2f00";
            case 200000002: return "#ffda6a";
            default: return "blue";
        }
    }

    render(): React.ReactNode {
        const { notifications, currentPage } = this.state;
        const itemsPerPage = 4;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedNotifications = notifications.slice(startIndex, startIndex + itemsPerPage);
        const totalPages = Math.ceil(notifications.length / itemsPerPage);
        const startItem = startIndex + 1;
        const endItem = Math.min(startIndex + itemsPerPage, notifications.length);

        var roles = (parent as any).Xrm?.Utility.getGlobalContext().userSettings.roles.get();
        var hasCommunicationsTeamRole = roles?.some((x: any) => x.name == "Communications Team");

        return (
            <>
            <Stack horizontal horizontalAlign="space-between" style={{backgroundColor: "white", paddingTop: 10, borderRadius: 6}}>
                <Stack horizontal verticalAlign='center' tokens={{childrenGap: 10}} >
                    <CMSNotifications size={32} color={"#0D2499"}/>
                    <Stack tokens={{ childrenGap: 2 }} grow>
                        <Label style={{ fontWeight: "bold", fontSize: 16, color: "#0D2499" }}>My Notifications</Label>
                        <Text style={{color: "#6A7A99", fontWeight: "semibold"}}>Stay updated with important alerts and messages.</Text>
                    </Stack>
                </Stack>
                    {hasCommunicationsTeamRole &&
                        <StackItem align="center">
                            <Link
                                onClick={() => {
                                    (parent as any).Xrm.Navigation.navigateTo({
                                        pageType: "entitylist",
                                        entityName: "cr549_notification"
                                    });
                                }}
                                styles={{
                                    root: {
                                        display: "flex",
                                        alignItems: "center",   // ✅ vertical alignment fix
                                        gap: 4,                 // space between text & icon
                                        paddingRight: 10
                                    }
                                }}
                            >
                                <span>View All Notifications</span>
                                <Icon
                                    iconName="ChevronRightSmall"
                                    styles={{ root: { fontSize: 12 } }}
                                />
                            </Link>
                        </StackItem>}
            </Stack>
            <Stack tokens={{ childrenGap: 1 }} styles={{ root: { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, overflowY: "auto", backgroundColor: "#ffffff", borderRadius: 6, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" } }}>
                <div>
                    <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { boxShadow: "0 4px 8px rgba(0,0,0,0.15)", paddingLeft: 10,  paddingBottom: 10 } }}>
                    </Stack>
                    {paginatedNotifications.map((notification, index) => (
                        <Stack
                            key={index}
                            horizontal
                            tokens={{ childrenGap: 25 }}
                            styles={{
                                root: {
                                    padding: 5,
                                    borderRadius: 5,
                                    border: "1px",
                                    borderLeft: `5px solid ${(index + 1) % 4 === 0 ? "#F57C00" : (index + 1) % 3 === 0 ? "#A98CF5" : (index + 1) % 2 === 0 ? "#115EA3" : "#1FA463"}`,
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
                                }
                            }}
                        >
                            <StackItem align="center">
                                <CMSInfo size={40} color={(index + 1) % 4 === 0 ? "#F57C00" : (index + 1) % 3 === 0 ? "#A98CF5" : (index + 1) % 2 === 0 ? "#115EA3" : "#1FA463"} />
                            </StackItem>
                            <Stack grow style={{ border: 3 }} styles={{ root: { border: `1px solid ${this.GetNotificationColor(NotificationType.Info)}`, padding: 10, borderRadius: 5 } }}>
                                <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                                    <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                                        <Text style={{ color: (index + 1) % 4 === 0 ? "#F57C00" : (index + 1) % 3 === 0 ? "#A98CF5" : (index + 1) % 2 === 0 ? "#115EA3" : "#1FA463", fontSize: 14, fontWeight: "bold" }}>{notification.title ?? "No Title"}</Text>
                                    </Stack>
                                    
                                    {/* <Stack tokens={{ childrenGap: 10 }} verticalAlign="center">
                                        <Stack horizontal tokens={{childrenGap: 10}}>
                                            <Icon iconName="clock" styles={{ root: { color: "#ccc", fontSize: 16, paddingTop: 5 } }}/>
                                            <Label style={{ color: "#ccc" }}>Expires on</Label>
                                        </Stack>
                                        <Stack horizontalAlign="start">
                                            <Label>{`${notification.expirationdate ?? "N/A"} ${notification.expirationdate != null ? "11:59 PM" : ""}`}</Label>
                                        </Stack>
                                    </Stack> */}
                                </Stack>
                                <Text>{notification.body}</Text>
                            </Stack>
                            <Stack horizontal tokens={{ childrenGap: 10 }}>
                                <Icon iconName="clock" styles={{ root: { color: "#6A7A99", fontSize: 16, paddingTop: 5 } }} />
                                <Stack>
                                    <Label style={{ color: "#6A7A99" }}>Expires on</Label>
                                    <Label styles={{root: {whiteSpace: "nowrap"}}}>{`${notification.expirationdate ?? "N/A"} ${notification.expirationdate != null ? "11:59 PM" : ""}`}</Label>
                                </Stack>
                            </Stack>
                        </Stack>
                    ))}
                </div>
                <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #ddd" }}>
                    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                        <Text>&nbsp;</Text>
                        <Text>{`${startItem} - ${endItem} of ${notifications.length} notifications`}</Text>
                        <Stack horizontal tokens={{ childrenGap: 10 }}>
                            <DefaultButton
                                text={"<"}
                                onClick={() => this.handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                styles = {{root: {minWidth: 2, maxWidth: 3, borderRadius: 6, borderColor: "#ccc"}}}
                            />
                            <DefaultButton
                                text={">"}
                                onClick={() => this.handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                styles = {{root: {minWidth: 2, maxWidth: 3, borderRadius: 6, borderColor: "#ccc"}}}
                                //styles={{ root: { padding: "5px 10px", backgroundColor: "white", border: "1px solid #ccc", borderRadius: "4px" }, rootDisabled: { cursor: "not-allowed", backgroundColor: "#f0f0f0", borderColor: "#ddd" } }}
                            />
                        </Stack>
                    </Stack>
                </div>
            </Stack></>
        );
    }

    // Method to handle page change
    handlePageChange = (page: number): void => {
        this.setState({ currentPage: page });
    };
}

export default Notifications;