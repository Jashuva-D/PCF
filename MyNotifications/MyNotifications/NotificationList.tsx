import * as React from "react";
import { Stack, Text, Icon, Label, initializeIcons, StackItem } from "@fluentui/react";
import { NotificationPriority, NotificationType } from "./constants";
import { NotificationModel } from "./Models";


interface NotificationListProps {
    notifications: NotificationModel[];
}

function GetNotificationIcon(notificationType: number): string {
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


function GetNotificationColor(notificationType: number): string {
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
function GetPriorityColor(notificationPriority: number): string {
    switch (notificationPriority) {
        case 200000000:            return "#00ff9d";
        case 200000001:            return "#ff2f00";       
        case 200000002:            return "#ffda6a";
        default:            return "blue";
    }
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
    initializeIcons();
    return (<Stack tokens={{ childrenGap: 10 }} styles={{ root: { paddingLeft: 20, paddingRight: 20, paddingBottom: 20, overflowY: "auto", height: "100%" } }} >
            {notifications.map((notification, index) => (
                <><Stack
                    key={index}
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
                            iconName={GetNotificationIcon(NotificationType.Info)}
                            styles={{ root: { color: GetNotificationColor(NotificationType.Info), fontSize: 30, fontWeight: "bold" } }}
                        />
                    </StackItem>
                    <Stack grow>   
                        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                                <div  style={{ alignContent: "center", paddingLeft: "10px", paddingRight: "10px", paddingTop: "2px", paddingBottom: "2px",   height: "25px", borderRadius: 4, background: GetNotificationColor(NotificationType.Info), color: "white", fontSize: 14, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                                <Text>{notification.createdon?.toLocaleString()}</Text>
                            </Stack>
                        </Stack>
                        {/* <Label style={{color: "black"}}>{notification.title}</Label> */}
                        {/* <Text variant="mediumPlus" styles={{ root: { fontWeight: "bold" } }}>
                            {notification.title}
                        </Text> */}
                        <Text>{notification.body}</Text>
                    </Stack>
                </Stack>
                <div style={{border: "1px solid #ccc"}}></div>
                
                </>
            ))}
        </Stack>
    );
};

export default NotificationList;