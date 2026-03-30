export enum ActivityStateCode {
    Open = 0,
    Completed = 1,
    Canceled = 2,
    Scheduled = 3
}

export const Interactiontypes = [
    {key: 512150000, text: "Routine Check-In Meeting"},
    {key: 512150001, text: "Quarterly Strategic Review Meeting"},
    {key: 512150002, text: "Security Deep Dive"},
    {key: 512150003, text: "Cost Optimization"},
    {key: 512150004, text: "Technical Deep Dive"},
    {key: 512150005, text: "Other"},
]

export enum CMSAlertType {
    Success = "success",
    Info = "info",
    Warning = "warning",
    Error = "error"
}

export enum NoteTabs {
    Details = "Details",
    Comments = "Comments",
    ActionItems = "Action Items",
    Applications = "Applications"
}
