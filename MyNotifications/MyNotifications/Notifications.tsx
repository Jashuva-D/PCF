import * as React from "react";
import { IInputs } from "./generated/ManifestTypes"
import { NotificationModel } from "./Models";
import { Stack, StackItem, Icon, Text, initializeIcons} from "@fluentui/react";
import { NotificationType } from "./constants";
import Timer from "./Timer";


interface NotificationsProps {
    context: ComponentFramework.Context<IInputs>,

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
        const notifications = [
            {
                icontype: 100000000,
                title: "CRMDB going live on July 11 2025",
                body: `New CRMDB replacing the current AWS CAMP DB is now available. Please start using it aspa and reach out in slack channel if any issues.`,
                createdon: new Date().toDateString(),
                createdon_value: new Date(),
                priority: 200000000,
                ttlinseconds: 86400
            } as NotificationModel,
            {
                icontype: 100000002,
                title: "Communications Updates: Week of December 1, 2025",
                body: `This week, the Communications team is updating the Fireside Chat CCG Menu page in CCG and sending the Q4 Security Campaign via GovDelivery. Two Resource Mailbox items are complete: the Q4 Closing the Loop email and the 2026 Initiatives Fireside Chat article, which will appear in the January Pulse. In addition, the new CRM102 module is live at https://cbt.cloud.cms.gov/CRM102/.`,
                createdon_value: new Date(),
                priority: 200000002,
                ttlinseconds: 172800,
                createdon: new Date().toDateString()
            } as NotificationModel,
            {
                icontype: 100000003,
                title: "Announcing Availability of Claude 3.7 with Cross Region Inference comm to be sent by HCs",
                body: `By EOD Wednesday 4/2, HCs are being asked to send to a targeted audience the Claude 3.7 comm.`,
                createdon: new Date().toDateString(),
                createdon_value: new Date(),
                priority: 200000001,
                ttlinseconds: 86400
            } as NotificationModel
        ];

        this.setState({
            notifications: notifications
        })
        // var obj = this;
        // var currentuserid = this.props.context.userSettings.userId;
        // this.props.context.webAPI.retrieveMultipleRecords("appnotification",`?$filter=_ownerid_value eq '${currentuserid}'`).then(function(resp){
        //     var recs : NotificationModel[] = []
        //     resp.entities.forEach(x => {
        //         recs.push({
        //             icontype: x.icontype,
        //             title: x.title,
        //             body: x.body,
        //             createdon: x["createdon@OData.Community.Display.V1.FormattedValue"],
        //             createdon_value: x.createdon,
        //             priority: x.priority,
        //             ttlinseconds: x.ttlinseconds
        //         })
        //     })
        //     obj.setState({
        //         notifications: recs
        //     })
        // }) 
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
        
        return <Stack tokens={{ childrenGap: 10 }} styles={{ root: { paddingLeft: 20, paddingRight: 20, paddingBottom: 20, overflowY: "auto", height: "100%" } }} >
            {this.state.notifications.map((notification, index) => (
                <><Stack
                    horizontal
                    tokens={{ childrenGap: 25 }}
                    styles={{
                        root: {
                            //border: `1px solid ${GetNotificationColor(notification.icontype!)}`,
                            padding: 10,
                            borderRadius: 5,
                        }
                    }}
                >
                    <StackItem align="center">
                        <Icon
                            iconName={this.GetNotificationIcon(NotificationType.Info)}
                            styles={{ root: { color: this.GetNotificationColor(NotificationType.Info), fontSize: 30, fontWeight: "bold" } }}
                        />
                    </StackItem>
                    <Stack grow>
                        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                                <div style={{ alignContent: "center", paddingLeft: "10px", paddingRight: "10px", paddingTop: "2px", paddingBottom: "2px", height: "25px", borderRadius: 4, background: this.GetNotificationColor(NotificationType.Info), color: "white", fontSize: 14, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {notification.title ?? ""}
                                    {/* {notification.icontype === NotificationType.Info && "Information"} 
                                             {notification.icontype === NotificationType.Warning && "Warning"} 
                                            {notification.icontype === NotificationType.Failure && "Failure"} 
                                            {notification.icontype === NotificationType.Mention && "Mention"}
                                            {notification.icontype === NotificationType.Custom && "Custom"} 
                                            {notification.icontype === NotificationType.Success && "Success"}  */}
                                </div>
                                {/* <div  style={{ alignContent: "center", paddingLeft: "10px", paddingRight: "10px", paddingTop: "2px", paddingBottom: "2px",   height: "25px", borderRadius: 4, background: GetPriorityColor(notification.priority!), color: "white", fontSize: 14, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                {notification.priority === NotificationPriority.High && "High"} 
                                                {notification.priority === NotificationPriority.Medium && "Medium"} 
                                                {notification.priority === NotificationPriority.Normal && "Normal"} 
                                        </div> */}
                            </Stack>

                            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                                <Icon iconName="clock" styles={{ root: { color: "gray", fontSize: 16 } }} />
                                <Text>{notification.createdon}</Text>
                                <Timer expiredTime={new Date(notification.createdon_value.getTime() + (notification.ttlinseconds ? notification.ttlinseconds * 1000 : 0))} />
                            </Stack>
                        </Stack>
                        {/* <Label style={{color: "black"}}>{notification.title}</Label> */}
                        {/* <Text variant="mediumPlus" styles={{ root: { fontWeight: "bold" } }}>
                                    {notification.title}
                                </Text> */}
                        <Text>{notification.body}</Text>
                    </Stack>
                </Stack>
                    <div style={{ border: "1px solid #ccc" }}></div>
                </>
            ))}
        </Stack>
    }
}

export default Notifications;