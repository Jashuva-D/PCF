export interface FieldOption {
    key: string;
    text: string;
}

export interface SectionOption {
    key: string;
    text: string;
    fields?: FieldOption[];
}

export interface TabOption {
    key: string;
    text: string;
    sections: SectionOption[];
}

export interface DataField {
    newrecord: boolean;
    tabname: string;
    sectionname: string;
    fieldname: string;
    currentvalue: string;
    newvalue: string
}

export const TabOptions: TabOption[] = [
    {
        key: "general",
        text: "General",
        sections: [
            { key: "details", text: "Details", fields: [{ key: "applicationname", text: "Application Name" }, { key: "description", text: "Description" }] },
            { key: "hosting", text: "Hosting Details", fields: [{ key: "hostingtype", text: "Hosting Type" }, { key: "environment", text: "Environment" }] },
            { key: "owners", text: "Business & System Owners", fields: [{ key: "businessowner", text: "Business Owner" }, { key: "systemowner", text: "System Owner" }] },
            { key: "funding", text: "Funding", fields: [{ key: "fundingsource", text: "Funding Source" }, { key: "budget", text: "Budget" }] },
            { key: "fisma", text: "FISMA", fields: [{ key: "fismastatus", text: "FISMA Status" }, { key: "impactlevel", text: "Impact Level" }] },
            { key: "dates", text: "Dates", fields: [{ key: "startdate", text: "Start Date" }, { key: "reviewdate", text: "Review Date" }] },
            { key: "communication", text: "Communication", fields: [{ key: "contactemail", text: "Contact Email" }, { key: "escalationcontact", text: "Escalation Contact" }] },
            { key: "marketplace", text: "Market Place", fields: [{ key: "marketplaceavailability", text: "Marketplace Availability" }, { key: "marketplacestatus", text: "Marketplace Status" }] },
            { key: "accounts", text: "Accounts", fields: [{ key: "accountname", text: "Account Name" }, { key: "adminaccount", text: "Admin Account" }] },
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    },
    {
        key: "accounts",
        text: "Accounts",
        sections: [
            { key: "accounts", text: "Accounts", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    },
    {
        key: "assignedpeople",
        text: "Assigned People",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    },
    {
        key: "applicationnotes",
        text: "Application Notes",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    },
    {
        key: "componentnotes",
        text: "Component Notes",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    },
    {
        key: "inquirynotes",
        text: "Inquiry Notes",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    },
    {
        key: "applicationurls",
        text: "Application URLs",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    },
    {
        key: "jira",
        text: "JIRA Tickets",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    },
    {
        key: "emails",
        text: "Emails",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    },
    {
        key: "documents",
        text: "Documents",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    },
    {
        key: "other",
        text: "Other or N/A",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details" }] }
        ]
    }
];