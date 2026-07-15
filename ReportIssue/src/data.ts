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
            {
                key: "details",
                text: "Details",
                fields: [
                    { key: "cr549_id", text: "Application Name (Lhort)" },
                    { key: "cr549_long_app_name", text: "Application Name (Long)"},
                    { key: "cr549_description", text: "Application Description" },
                    { key: "cr549_hostingcoordinator", text: "Hosting Coordinator"},
                    { key: "cr549_technicaladvisor", text: "Technical Advisor"},
                    { key: "cr549_financialanalyst", text: "Financial Analyst"},
                    { key: "cr549_app_live_status", text: "Application Live Status"},
                    { key: "cr549_proj_phase_name", text: "Stage"},
                    { key: "cr549_period_name", text: "Period"},
                    { key: "cr549_region", text: "Region"}
                ]
            },
            { 
                key: "hostingdetails", 
                text: "Hosting Details", 
                fields: [
                    { key: "cr549_hostingplatform", text: "Hosting Platform" }, 
                    { key: "cr549_hosting_tenancy_model", text: "Hosting Tenancy Model" },
                    { key: "cr549_multi_tenancy_group_name_new", text: "Multi Tenancy Group"},
                    { key: "cr549_cloud_hosting_intention", text: "Cloud Hosting Intention"},
                    { key: "cr549_cloud_hosting_type", text: "Cloud Hosting Type"},
                    { key: "cr549_cloud_vdc_purpose", text: "Cloud Hosting Purpose"},
                    { key: "cr549_hosting_delivery_platform_name", text: "Hosting Delivery Model"},
                    { key: "cr549_is_internal", text: "Internal Application"},
                    { key: "cr549_blanket_pass_reset", text: "Blanket Passwrod Reset Approval"},
                    { key: "cr549_blanket_pass_reset_info", text: "Blanket Password Reset Approval"},
                    { key: "cr549_legacy_mark", text: "Reason For Onboarding"},
                    { key: "cr549_other_data_center", text: "Other Data Center"},
                    { key: "cr549_other_data_center", text: "Hosting Data Center Migrating/ed From"}
                ] 
            },
            { 
                key: "businessandsystemowners", 
                text: "Business & System Owners", 
                fields: [
                    { key: "cr549_cms_office", text: "Business Owner Office/Center" }, 
                    { key: "cr549_cms_group", text: "Business Owner Group" },
                    { key: "cr549_cms_division", text: "Business Owner Division"},
                    { key: "cr549_cms_system_owner_office", text: "System Owner Office/Center"},
                    { key: "cr549_cms_system_owner_group", text : "System Owner Group"}
                ] 
            },
            { 
                key: "funding", 
                text: "Funding", 
                fields: [
                    { key: "cr549_project_num", text: "Project" }, 
                    { key: "cr549_cms_funding_group", text: "Funding Source Organization" },
                    { key: "cr549_project_num_projectname", text: "Project Name"},
                    { key: "cr549_project_num_projectname_short", text: "Project Name (Short)"},
                    { key: "cr549_project_num_projectname_projectnumber", text: "Project Number"},
                    { key: "cr549_project_num_hosting_projectid", text: "Hosting Project Id"},
                    { key: "cr549_project_num_hosting_projectnumber", text: "Hosting Project Number"}
                ] 
            },
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
        key: "jiratickets",
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