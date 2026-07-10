export interface SectionOption {
    key: string;
    text: string;
}

export interface TabOption {
    key: string;
    text: string;
    sections: SectionOption[];
}

export const TabOptions: TabOption[] = [
    {
        key: "general",
        text: "General",
        sections: [
            { key: "details", text: "Details" },
            { key: "hosting", text: "Hosting Details" },
            { key: "owners", text: "Business & System Owners" },
            { key: "funding", text: "Funding" },
            { key: "fisma", text: "FISMA" },
            { key: "dates", text: "Dates" },
            { key: "communication", text: "Communication" },
            { key: "marketplace", text: "Market Place" },
            { key: "accounts", text: "Accounts" },
            { key: "other", text: "Other or N/A" }
        ]
    },
    {
        key: "accounts",
        text: "Accounts",
        sections: [
            { key: "other", text: "Other or N/A" }
        ]
    },
    {
        key: "assignedpeople",
        text: "Assigned People",
        sections: [
            { key: "other", text: "Other or N/A" }
        ]
    },
    {
        key: "applicationnotes",
        text: "Application Notes",
        sections: [
            { key: "other", text: "Other or N/A" }
        ]
    },
    {
        key: "componentnotes",
        text: "Component Notes",
        sections: [
            { key: "other", text: "Other or N/A" }
        ]
    },
    {
        key: "inquirynotes",
        text: "Inquiry Notes",
        sections: [
            { key: "other", text: "Other or N/A" }
        ]
    },
    {
        key: "applicationurls",
        text: "Application URLs",
        sections: [
            { key: "other", text: "Other or N/A" }
        ]
    },
    {
        key: "jira",
        text: "JIRA Tickets",
        sections: [
            { key: "other", text: "Other or N/A" }
        ]
    },
    {
        key: "emails",
        text: "Emails",
        sections: [
            { key: "other", text: "Other or N/A" }
        ]
    },
    {
        key: "documents",
        text: "Documents",
        sections: [
            { key: "other", text: "Other or N/A" }
        ]
    },
    {
        key: "other",
        text: "Other or N/A",
        sections: [
            { key: "other", text: "Other or N/A" }
        ]
    }
];