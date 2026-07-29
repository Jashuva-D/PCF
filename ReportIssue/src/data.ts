export interface FieldOption {
    key: string;
    text: string;
    multiline?: boolean;
    type: string,
    values?: any
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
                    { key: "cr549_id", text: "Application Name (Short)", type: "stirng" },
                    { key: "cr549_long_app_name", text: "Application Name (Long)", type: "string", multiline: true},
                    { key: "cr549_description", text: "Application Description", type:"string", multiline: true },
                    { key: "cr549_hostingcoordinator", text: "Hosting Coordinator", type: "stirng"},
                    { key: "cr549_technicaladvisor", text: "Technical Advisor", type: "string"},
                    { key: "cr549_financialanalyst", text: "Financial Analyst", type: "string"},
                    { key: "cr549_app_live_status", text: "Application Live Status", type: "string"},
                    { key: "cr549_proj_phase_name", text: "Stage", type: "dropdown", values: ["Interest and Onboarding", "Cloud tenant provisioning", "Build/ Go live", "O&M", "Decommissioned", "Canceled", "Cloud to Cloud Migration", "Power Platform Environment Provisioning"]},
                    { key: "cr549_period_name", text: "Period", type: "string"},
                    { key: "cr549_region", text: "Region",type: "string", multiline: true}
                ]
            },
            { 
                key: "hostingdetails", 
                text: "Hosting Details", 
                fields: [
                    { key: "cr549_hostingplatform", text: "Hosting Platform",type: "string", multiline: true }, 
                    { key: "cr549_hosting_tenancy_model", text: "Hosting Tenancy Model", type: "string" },
                    { key: "cr549_multi_tenancy_group_name_new", text: "Multi Tenancy Group", type: "string"},
                    { key: "cr549_cloud_hosting_intention", text: "Cloud Hosting Intention", type: "string"},
                    { key: "cr549_cloud_hosting_type", text: "Cloud Hosting Type", type: "string"},
                    { key: "cr549_cloud_vdc_purpose", text: "Cloud Hosting Purpose", type: "string"},
                    { key: "cr549_hosting_delivery_platform_name", text: "Hosting Delivery Model", type: "string"},
                    { key: "cr549_is_internal", text: "Internal Application", type: "string"},
                    { key: "cr549_blanket_pass_reset", text: "Blanket Passwrod Reset Approval", type: "string"},
                    { key: "cr549_blanket_pass_reset_info", text: "Blanket Password Reset Approval", type: "string"},
                    { key: "cr549_legacy_mark", text: "Reason For Onboarding", type: "string"},
                    { key: "cr549_other_data_center", text: "Other Data Center", type: "string"},
                    { key: "cr549_other_data_center", text: "Hosting Data Center Migrating/ed From", type: "string"}
                ] 
            },
            { 
                key: "businessandsystemowners", 
                text: "Business & System Owners", 
                fields: [
                    { key: "cr549_cms_office", text: "Business Owner Office/Center", type: "stirng" }, 
                    { key: "cr549_cms_group", text: "Business Owner Group" ,type: "string", multiline: true},
                    { key: "cr549_cms_division", text: "Business Owner Division", type: "stirng", multiline: true},
                    { key: "cr549_cms_system_owner_office", text: "System Owner Office/Center", type: "stirng"},
                    { key: "cr549_cms_system_owner_group", text : "System Owner Group", type: "stirng"}
                ] 
            },
            { 
                key: "funding", 
                text: "Funding", 
                fields: [
                    { key: "cr549_project_num", text: "Project", multiline: true, type: "stirng" }, 
                    { key: "cr549_cms_funding_group", text: "Funding Source Organization",  type: "stirng" },
                    { key: "cr549_project_num_projectname", text: "Project Name", type: "stirng", multiline: true},
                    { key: "cr549_project_num_projectname_short", text: "Project Name (Short)",  type: "stirng"},
                    { key: "cr549_project_num_projectname_projectnumber", text: "Project Number",  type: "stirng"},
                    { key: "cr549_project_num_hosting_projectid", text: "Hosting Project Id",  type: "stirng"},
                    { key: "cr549_project_num_hosting_projectnumber", text: "Hosting Project Number",  type: "stirng"}
                ] 
            },
            { 
                key: "fisma", 
                text: "FISMA", 
                fields: [
                    { key: "cr549_cfactsfismasystem", text: "CFACTS FISMA System", type: "stirng", multiline: true }, 
                    { key: "cr549_cfactsfismasystem_cmsfismaacronym", text: "CMS FISAM Acronym",  type: "stirng" },
                    { key: "cr549_cfactsfismasystem_name", text: "Name", type: "stirng", multiline: true},
                    { key: "cr549_cfactsfismasystem_cmsfismasecuritycategorization", text: "CMS FISMA Security Categorization",  type: "stirng"},
                    { key: "cr549_cfactsfismasystem_cmsfismauuid", text: "CMS FISMA UUID", type: "stirng", multiline: true}
                ] 
            },
            {
                key: "ado",
                text: "ADO",
                fields: [
                    { key: "cr549_ado_name", text: "ADO Name",  type: "stirng"},
                    { key: "cr549_ado_dl", text: "ADO Distribution List",  type: "stirng"},
                    { key: "cr549_oncall_sec_dl", text: "ADO On-Call Distribution List",  type: "stirng"},
                    { key: "cr549_ado_sec_dl", text: "ADO Security Distribution List",  type: "stirng"},
                    { key: "cr549_ado_ops_dl", text: "ADO Operations Distribution List",  type: "stirng"}
                ]
            },
            { 
                key: "dates", 
                text: "Dates", 
                fields: [
                    { key: "cr549_date_intake_submit", text: "Intake Date",  type: "stirng" }, 
                    { key: "cr549_date_funded", text: "Funded Date",  type: "stirng" },
                    { key: "cr549_date_acct_delivered", text: "Accounts Delivered Date",  type: "stirng"},
                    { key: "cr549_date_golive", text: "Go-Live Date",  type: "stirng"},
                    { key: "cr549_date_intended_golive", text: "Intended Go-Live Date",  type: "stirng"},
                    { key: "cr549_date_app_decom", text: "Decommissioned Date",  type: "stirng"}
                ] 
            },
            { 
                key: "communication", 
                text: "Communication", 
                fields: [
                    { key: "cr549_conf_link", text: "Confluence", multiline: true,  type: "stirng" }, 
                    { key: "cr549_meeting_link", text: "Meeting Notes",  type: "stirng" },
                    { key: "cr549_jira_link", text: "Jira",  type: "stirng"},
                    { key: "cr549_slack_channel", text: "Slack", type: "stirng", multiline: true}
                ] 
            },
            { 
                key: "marketplace", 
                text: "Market Place", 
                fields: [
                    { key: "cr549_marketplace", text: "Marketplace Application", type: "stirng"},
                    { key: "cr549_managed", text: "Managed Application", type: "stirng" },
                    { key: "cr549_oe_effect", text: "Marketplace OE Impacting", type: "stirng"},
                    { key: "cr549_medic_oe_effect", text: "Medicare OE Impacting", type: "stirng"}
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
            { key: "accounts", text: "Accounts", fields: [{ key: "otherdetails", text: "Other Details", type: "stirng"}] }
        ]
    },
    {
        key: "assignedpeople",
        text: "Assigned People",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "stirng"}] }
        ]
    },
    {
        key: "applicationnotes",
        text: "Application Notes",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "stirng" }] }
        ]
    },
    {
        key: "componentnotes",
        text: "Component Notes",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "stirng" }] }
        ]
    },
    {
        key: "inquirynotes",
        text: "Inquiry Notes",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "stirng" }] }
        ]
    },
    {
        key: "applicationurls",
        text: "Application URLs",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "stirng" }] }
        ]
    },
    {
        key: "jiratickets",
        text: "JIRA Tickets",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "string" }] }
        ]
    },
    {
        key: "emails",
        text: "Emails",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "string" }] }
        ]
    },
    {
        key: "documents",
        text: "Documents",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "string" }] }
        ]
    },
    {
        key: "other",
        text: "Other or N/A",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "string"}] }
        ]
    }
];