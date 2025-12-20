export enum ActivityStateCode {
    Open = 0,
    Completed = 1,
    Canceled = 2,
    Scheduled = 3
}

export const Interactiontypes = [
    {key: 1, text: "Routine Check-In Meeting"},
    {key: 2, text: "Quarterly Strategic Review Meeting"},
    {key: 3, text: "Security Deep Dive"},
    {key: 4, text: "Cost Optimization"},
    {key: 5, text: "Technical Deep Dive"},
    {key: 6, text: "Other"}
]

export enum CMSAlertType {
    Success = "success",
    Info = "info",
    Warning = "warning",
    Error = "error"
}
