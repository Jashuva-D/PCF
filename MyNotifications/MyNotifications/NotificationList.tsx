import * as React from "react";
import { Stack, Text, Icon, Label, initializeIcons, StackItem } from "@fluentui/react";
import { NotificationType } from "./constants";
import { Notification } from "./Models";


interface NotificationListProps {
    notifications: Notification[];
}

function GetNotificationIcon(notificationType: number): string {
    switch (notificationType) {
        case NotificationType.Info:
            return "Info";
        case NotificationType.Warning:
            return "Warning";
        case NotificationType.Failure:
            return "Error";
        case NotificationType.Mention:
            return "Info";
        case NotificationType.Custom:
            return "Info";
        case NotificationType.Success:
            return "CheckMark";
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

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
    initializeIcons();
    return (<div><Stack tokens={{ childrenGap: 10 }} styles={{ root: { padding: 20 } }} grow >
            {notifications.map((notification, index) => (
                <Stack
                    key={index}
                    horizontal
                    tokens={{ childrenGap: 10 }}
                    styles={{ root: { border: `1px solid ${GetNotificationColor(notification.icontype!)}`, padding: 10, borderRadius: 5 } }}
                >
                    <StackItem align = "center"><Icon iconName={GetNotificationIcon(notification.icontype!)} styles={{ root: { color: GetNotificationColor(notification.icontype!), fontSize: 20 } }} /> </StackItem>
                    <Stack>
                        <Stack horizontal horizontalAlign="space-between" >
                            <StackItem>
                                <Text variant="mediumPlus" styles={{ root: { fontWeight: "bold" } }}>
                                {notification.title}
                                </Text>
                            </StackItem>
                            <StackItem>
                                <Stack horizontal tokens={{ childrenGap: 10 }}>
                                    <Icon iconName="clock" styles={{ root: { color: "gray", fontSize: 16 } }} />
                                    <Text>{notification.createdon?.toLocaleString()}</Text>
                                </Stack>
                            </StackItem>
                        </Stack>
                        <Text>{notification.body}</Text>
                    </Stack>
                </Stack>
            ))}
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
            <StackItem>
                <Text variant="mediumPlus" styles={{ root: { fontWeight: "bold" } }}>
                    {"Test"}
                </Text>
            </StackItem>
            <StackItem>
                <Icon iconName="clock" styles={{ root: { color: "gray", fontSize: 16 } }} />
                <Text variant="small" styles={{ root: { color: "gray" } }}>
                    {new Date().toLocaleString()}
                </Text>
            </StackItem></Stack> </div>);
    
};

export default NotificationList;