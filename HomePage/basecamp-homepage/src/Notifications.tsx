import * as React from "react";
import { Stack, StackItem, Icon, Text, initializeIcons, Label} from "@fluentui/react";
import { NotificationType } from "./Constants";
import { CMSInfo } from "./Icons";


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
    notifications: NotificationModel[]
}

class Notifications extends React.Component<NotificationsProps, NotificationsState> {
    constructor(props: NotificationsProps) {
        super(props);
        initializeIcons();
        this.state = {
            notifications: []
        }
    }
    componentDidMount(): void {
        var obj = this;
        var today = new Date();
        today.setHours(0,0,0,0);

        
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
        // this.setState({
        //     notifications: [
        //         {
        //             title: "Notification 1",
        //             body: "This is the body of notification 1.",
        //             createdon: "2024-01-01",        
        //             createdon_value: new Date("2024-01-01"),
        //             expirationdate: "2024-12-31",
        //             expirationdate_value: new Date("2024-12-31"),   
        //             priority: 200000001,
        //             icontype: NotificationType.Info
        //         } as NotificationModel
        //     ]
        // });
                
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
        
        return <><Label style={{fontWeight: "bold", fontSize: 16, paddingTop: 5, paddingBottom: 10}}>My Notifications</Label>
        <Stack tokens={{ childrenGap: 1 }} styles={{ root: { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, overflowY: "auto", maxHeight: "400px", backgroundColor: "#ffffff", borderRadius: 6 } }} >
            {this.state.notifications.map((notification) => (
                <><Stack
                    horizontal
                    tokens={{ childrenGap: 25 }}
                    styles={{
                        root: {
                            //border: `1px solid ${GetNotificationColor(notification.icontype!)}`,
                            padding: 10,
                            borderRadius: 5,
                            border: "1px",
                            borderLeft: `5px solid ${this.GetNotificationColor(notification.icontype!)}`,
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.15)"
                        }
                    }}
                >
                    <StackItem align="center">
                        <CMSInfo size={40} color="#115EA3" />
                    </StackItem>
                    <Stack grow style={{border: 3}} styles={{ root: { border: `1px solid ${this.GetNotificationColor(NotificationType.Info)}`, padding: 10, borderRadius: 5 } }}>
                        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                                <Text style={{ color: this.GetNotificationColor(NotificationType.Info) , fontSize: 18, fontWeight: "bold" }}>{notification.title ?? "No Title"}</Text>
                            </Stack>
                            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                                <Icon iconName="clock" styles={{ root: { color: "gray", fontSize: 16 } }} />
                                <Text>{`Expiry Date: ${notification.expirationdate ?? "N/A"} ${notification.expirationdate != null ? "11:59 PM" : ""}`}</Text>
                                {/* <Timer expiredTime={new Date(new Date(notification.createdon_value).getTime() + (notification.ttlinseconds ? notification.ttlinseconds * 1000 : 0))} /> */}
                            </Stack>
                        </Stack>
                        <Text>{notification.body}</Text>
                    </Stack>
                </Stack>
                     {/* <div style={{ border: "1px solid #ccc" }}></div>  */}
                </>
            ))}
        </Stack>
        </>
    }
}

export default Notifications;