import * as React from "react";
import { Stack, Text, Icon, Label, initializeIcons, StackItem } from "@fluentui/react";
import { NotificationType } from "./constants";
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
    return (<Stack tokens={{ childrenGap: 10 }} styles={{ root: { padding: 20, overflowY: "auto", height: "100%" } }} >
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
                            iconName={GetNotificationIcon(notification.icontype!)}
                            styles={{ root: { color: GetNotificationColor(notification.icontype!), fontSize: 20 } }}
                        />
                    </StackItem>
                    <Stack grow>   
                        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                            <div  style={{ alignContent: "center", paddingLeft: "10px", paddingRight: "10px", paddingTop: "2px", paddingBottom: "2px",   height: "25px", borderRadius: 4, background: GetNotificationColor(notification.icontype!), color: "white", fontSize: 14, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {notification.icontype === NotificationType.Info && "Information"} 
                                    {notification.icontype === NotificationType.Warning && "Warning"} 
                                    {notification.icontype === NotificationType.Failure && "Failure"} 
                                    {notification.icontype === NotificationType.Mention && "Mention"} 
                                    {notification.icontype === NotificationType.Custom && "Custom"} 
                                    {notification.icontype === NotificationType.Success && "Success"} 
                            </div>
                            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                                <Icon iconName="clock" styles={{ root: { color: "gray", fontSize: 16 } }} />
                                <Text>{notification.createdon?.toLocaleString()}</Text>
                            </Stack>
                        </Stack>
                        <Text variant="mediumPlus" styles={{ root: { fontWeight: "bold" } }}>
                            {notification.title}
                        </Text>
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