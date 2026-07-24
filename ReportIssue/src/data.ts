export interface FieldOption {
    key: string;
    text: string;
    multiline?: boolean
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
    fieldlabel: string;
    currentvalue: string;
    newvalue: string,
    multiline?: boolean
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
                    { key: "cr549_id", text: "Application Name (Short)" },
                    { key: "cr549_long_app_name", text: "Application Name (Long)", multiline: true},
                    { key: "cr549_description", text: "Application Description", multiline: true },
                    { key: "cr549_hostingcoordinator", text: "Hosting Coordinator"},
                    { key: "cr549_technicaladvisor", text: "Technical Advisor"},
                    { key: "cr549_financialanalyst", text: "Financial Analyst"},
                    { key: "cr549_app_live_status", text: "Application Live Status"},
                    { key: "cr549_proj_phase_name", text: "Stage"},
                    { key: "cr549_period_name", text: "Period"},
                    { key: "cr549_region", text: "Region", multiline: true}
                ]
            },
            { 
                key: "hostingdetails", 
                text: "Hosting Details", 
                fields: [
                    { key: "cr549_hostingplatform", text: "Hosting Platform", multiline: true }, 
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
                    { key: "cr549_cms_group", text: "Business Owner Group" , multiline: true},
                    { key: "cr549_cms_division", text: "Business Owner Division", multiline: true},
                    { key: "cr549_cms_system_owner_office", text: "System Owner Office/Center"},
                    { key: "cr549_cms_system_owner_group", text : "System Owner Group"}
                ] 
            },
            { 
                key: "funding", 
                text: "Funding", 
                fields: [
                    { key: "cr549_project_num", text: "Project", multiline: true }, 
                    { key: "cr549_cms_funding_group", text: "Funding Source Organization" },
                    { key: "cr549_project_num_projectname", text: "Project Name", multiline: true},
                    { key: "cr549_project_num_projectname_short", text: "Project Name (Short)"},
                    { key: "cr549_project_num_projectname_projectnumber", text: "Project Number"},
                    { key: "cr549_project_num_hosting_projectid", text: "Hosting Project Id"},
                    { key: "cr549_project_num_hosting_projectnumber", text: "Hosting Project Number"}
                ] 
            },
            { 
                key: "fisma", 
                text: "FISMA", 
                fields: [
                    { key: "cr549_cfactsfismasystem", text: "CFACTS FISMA System", multiline: true }, 
                    { key: "cr549_cfactsfismasystem_cmsfismaacronym", text: "CMS FISAM Acronym" },
                    { key: "cr549_cfactsfismasystem_name", text: "Name", multiline: true},
                    { key: "cr549_cfactsfismasystem_cmsfismasecuritycategorization", text: "CMS FISMA Security Categorization"},
                    { key: "cr549_cfactsfismasystem_cmsfismauuid", text: "CMS FISMA UUID", multiline: true}
                ] 
            },
            {
                key: "ado",
                text: "ADO",
                fields: [
                    { key: "cr549_ado_name", text: "ADO Name"},
                    { key: "cr549_ado_dl", text: "ADO Distribution List"},
                    { key: "cr549_oncall_sec_dl", text: "ADO On-Call Distribution List"},
                    { key: "cr549_ado_sec_dl", text: "ADO Security Distribution List"},
                    { key: "cr549_ado_ops_dl", text: "ADO Operations Distribution List"}
                ]
            },
            { 
                key: "dates", 
                text: "Dates", 
                fields: [
                    { key: "cr549_date_intake_submit", text: "Intake Date" }, 
                    { key: "cr549_date_funded", text: "Funded Date" },
                    { key: "cr549_date_acct_delivered", text: "Accounts Delivered Date"},
                    { key: "cr549_date_golive", text: "Go-Live Date"},
                    { key: "cr549_date_intended_golive", text: "Intended Go-Live Date"},
                    { key: "cr549_date_app_decom", text: "Decommissioned Date"}
                ] 
            },
            { 
                key: "communication", 
                text: "Communication", 
                fields: [
                    { key: "cr549_conf_link", text: "Confluence", multiline: true }, 
                    { key: "cr549_meeting_link", text: "Meeting Notes" },
                    { key: "cr549_jira_link", text: "Jira"},
                    { key: "cr549_slack_channel", text: "Slack", multiline: true}
                ] 
            },
            { 
                key: "marketplace", 
                text: "Market Place", 
                fields: [
                    { key: "cr549_marketplace", text: "Marketplace Application" },
                    { key: "cr549_managed", text: "Managed Application" },
                    { key: "cr549_oe_effect", text: "Marketplace OE Impacting"},
                    { key: "cr549_medic_oe_effect", text: "Medicare OE Impacting"}
                ] 
            },
            { 
                key: "accounts", 
                text: "Accounts", 
                fields: [] 
            },
            { 
                key: "other", 
                text: "Other or N/A", 
                fields: [] 
            }
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