import * as React from "react";
import { Stack, Text, Icon, Label, initializeIcons } from "@fluentui/react";

interface Notification {
    type: string;
    message: string;
    user: string;
    time: string;
    color: string;
}

interface NotificationListProps {
    notifications: Notification[];
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
    initializeIcons();
    return (
        <Stack tokens={{ childrenGap: 10 }} styles={{ root: { padding: 20 } }}>
            {notifications.map((notification, index) => (
                <Stack
                    key={index}
                    horizontal
                    tokens={{ childrenGap: 10 }}
                    styles={{ root: { border: `1px solid ${notification.color}`, padding: 10, borderRadius: 5 } }}
                >
                    <Icon iconName={notification.type} styles={{ root: { color: notification.color, fontSize: 20 } }} />
                    <Stack>
                        <Text variant="mediumPlus" styles={{ root: { fontWeight: "bold" } }}>
                            {notification.type}: {notification.message}
                        </Text>
                        <Text variant="small">{notification.user}</Text>
                        <Text variant="small" styles={{ root: { color: "gray" } }}>
                            {notification.time}
                        </Text>
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
};

export default NotificationList;