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
                    { key: "cr549_id", text: "Application Name (Short)", type: "string" },
                    { key: "cr549_long_app_name", text: "Application Name (Long)", type: "string", multiline: true},
                    { key: "cr549_description", text: "Application Description", type:"string", multiline: true },
                    { key: "cr549_hostingcoordinator", text: "Hosting Coordinator", type: "lookup"},
                    { key: "cr549_technicaladvisor", text: "Technical Advisor", type: "lookup"},
                    { key: "cr549_financialanalyst", text: "Financial Analyst", type: "lookup"},
                    { key: "cr549_app_live_status", text: "Application Live Status", type: "dropdown", values: ["Live", "Non-Live"]},
                    { key: "cr549_proj_phase_name", text: "Stage", type: "dropdown", values: ["Interest and Onboarding", "Cloud tenant provisioning", "Build/ Go live", "O&M", "Decommissioned", "Canceled", "Cloud to Cloud Migration", "Power Platform Environment Provisioning"]},
                    { key: "cr549_period_name", text: "Period", type: "dropdown", values: ["Interest and Intros", "Kickoff and education", "Cloud Walkthrough", "Funding", "Environment Setup", "Provisioning required and optional Cloud Shared Services", "Tenant env Validation & Notification", "Build", "Production readiness checklist", "Go live", "O&M", "Decommissioned", "Canceled", "NA", "Archived", "Provisioning connectors and other services", "Environment Validation & Notification"]},
                    { key: "cr549_region", text: "Region",type: "string", multiline: true}
                ]
            },
            { 
                key: "hostingdetails", 
                text: "Hosting Details", 
                fields: [
                    { key: "cr549_hostingplatform", text: "Hosting Platform",type: "string", multiline: true }, 
                    { key: "cr549_hosting_tenancy_model", text: "Hosting Tenancy Model", type: "dropdown", values: ["Single Tenancy", "Multi Tenancy"] },
                    { key: "cr549_multi_tenancy_group_name_new", text: "Multi Tenancy Group", type: "dropdown", values: ["BCMT ISPG", "BCMT CCSQ", "Pending", "FFS Workload A", "FFS Workload B"]},
                    { key: "cr549_cloud_hosting_intention", text: "Cloud Hosting Intention", type: "dropdown", values: ["Production", "Non-Production", "Proof of Concept"]},
                    { key: "cr549_cloud_hosting_type", text: "Cloud Hosting Type", type: "dropdown", values: ["Application", "Component", "Sandbox", "System", "Tool", "Unique FISMA System"]},
                    { key: "cr549_cloud_vdc_purpose", text: "Cloud Hosting Purpose", type: "string"},
                    { key: "cr549_hosting_delivery_platform_name", text: "Hosting Delivery Model", type: "dropdown", values: ["Self-Service", "Fully Managed Services - batCAVE", "Managed Services - Marketplace", "TBD", "Managed Services - MISP", "Managed Services - FFS", "Citizen Developer", "DaaS (Development as a Service)", "BYOADO (Bring your own ADO)"]},
                    { key: "cr549_is_internal", text: "Internal Application", type: "dropdown", values: ["Yes", "No"]},
                    { key: "cr549_blanket_pass_reset", text: "Blanket Passwrod Reset Approval", type: "dropdown", values: ["Yes", "No"]},
                    { key: "cr549_blanket_pass_reset_info", text: "Blanket Password Reset Approval", type: "string"},
                    { key: "cr549_legacy_mark", text: "Reason For Onboarding", type: "dropdown", values: ["Migration", "New Application"]},
                    { key: "cr549_other_data_center", text: "Other Data Center", type: "string"},
                    { key: "cr549_other_data_center", text: "Hosting Data Center Migrating/ed From", type: "string"}
                ] 
            },
            { 
                key: "businessandsystemowners", 
                text: "Business & System Owners", 
                fields: [
                    { key: "cr549_cms_office", text: "Business Owner Office/Center", type: "dropdown", values: ["CCIIO", "CCSQ", "CM", "CMCS", "CMMI", "CPI", "OA", "OAGM", "OBRHI", "OC", "OEDA", "OFM", "OHC", "OHEI", "OHI", "OIT", "OMH", "OPOLE", "OSFLO", "OSORA", "OSPR", "FCHCO", "OACT"] }, 
                    { key: "cr549_cms_group", text: "Business Owner Group" ,type: "string", multiline: true},
                    { key: "cr549_cms_division", text: "Business Owner Division", type: "string", multiline: true},
                    { key: "cr549_cms_system_owner_office", text: "System Owner Office/Center", type: "string"},
                    { key: "cr549_cms_system_owner_group", text : "System Owner Group", type: "string"}
                ] 
            },
            { 
                key: "funding", 
                text: "Funding", 
                fields: [
                    { key: "cr549_project_num", text: "Project", multiline: true, type: "string" }, 
                    { key: "cr549_cms_funding_group", text: "Funding Source Organization",  type: "dropdown", values: ["AMG", "CCSQ", "CM", "CMCS", "CMMI", "CPI", "EADG", "ESSG", "ISPG", "IUSG", "MITG", "OBRHI", "OC", "OEDA", "OFM", "OHI", "OMH", "OSORA", "OSPR"] },
                    { key: "cr549_project_num.cr549_projectname", text: "Project Name", type: "string", multiline: true},
                    { key: "cr549_project_num.cr549_projectnameshort", text: "Project Name (Short)",  type: "string"},
                    { key: "cr549_project_num.cr549_projectnumber", text: "Project Number",  type: "string"},
                    { key: "cr549_project_num.cr549_hostingprojectid", text: "Hosting Project Id",  type: "string"},
                    { key: "cr549_project_num.cr549_hostingprojectnumber", text: "Hosting Project Number",  type: "string"}
                ] 
            },
            { 
                key: "fisma", 
                text: "FISMA", 
                fields: [
                    { key: "cr549_cfactsfismasystem", text: "CFACTS FISMA System", type: "string", multiline: true }, 
                    { key: "cr549_CFACTSFismaSystem.cr549_fisma_acronym", text: "CMS FISAM Acronym",  type: "string" },
                    { key: "cr549_CFACTSFismaSystem.cr549_name", text: "Name", type: "string", multiline: true},
                    { key: "cr549_CFACTSFismaSystem.cr549_impact_rating", text: "CMS FISMA Security Categorization",  type: "string"},
                    { key: "cr549_CFACTSFismaSystem.cr549_fisma_uuid", text: "CMS FISMA UUID", type: "string", multiline: true}
                ] 
            },
            {
                key: "ado",
                text: "ADO",
                fields: [
                    { key: "cr549_ado_name", text: "ADO Name",  type: "string"},
                    { key: "cr549_ado_dl", text: "ADO Distribution List",  type: "string"},
                    { key: "cr549_oncall_sec_dl", text: "ADO On-Call Distribution List",  type: "string"},
                    { key: "cr549_ado_sec_dl", text: "ADO Security Distribution List",  type: "string"},
                    { key: "cr549_ado_ops_dl", text: "ADO Operations Distribution List",  type: "string"}
                ]
            },
            { 
                key: "dates", 
                text: "Dates", 
                fields: [
                    { key: "cr549_date_intake_submit", text: "Intake Date",  type: "date" }, 
                    { key: "cr549_date_funded", text: "Funded Date",  type: "date" },
                    { key: "cr549_date_acct_delivered", text: "Accounts Delivered Date",  type: "date"},
                    { key: "cr549_date_golive", text: "Go-Live Date",  type: "date"},
                    { key: "cr549_date_intended_golive", text: "Intended Go-Live Date",  type: "date"},
                    { key: "cr549_date_app_decom", text: "Decommissioned Date",  type: "date"}
                ] 
            },
            { 
                key: "communication", 
                text: "Communication", 
                fields: [
                    { key: "cr549_conf_link", text: "Confluence", multiline: true,  type: "string" }, 
                    { key: "cr549_meeting_link", text: "Meeting Notes",  type: "string" },
                    { key: "cr549_jira_link", text: "Jira",  type: "string"},
                    { key: "cr549_slack_channel", text: "Slack", type: "string", multiline: true}
                ] 
            },
            { 
                key: "marketplace", 
                text: "Market Place", 
                fields: [
                    { key: "cr549_marketplace", text: "Marketplace Application", type: "dropdown", values: ["Yes", "No"]},
                    { key: "cr549_managed", text: "Managed Application", type: "dropdown", values:["Yes", "No"] },
                    { key: "cr549_oe_effect", text: "Marketplace OE Impacting", type: "dropdown", values: ["Yes", "No"]},
                    { key: "cr549_medic_oe_effect", text: "Medicare OE Impacting", type: "dropdown", values: ["Yes", "No"]}
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
            { key: "accounts", text: "Accounts", fields: [{ key: "otherdetails", text: "Other Details", type: "string"}] }
        ]
    },
    {
        key: "assignedpeople",
        text: "Assigned People",
        sections: [
            { 
                key: "assignedpeople", 
                text: "Assigned People", 
                fields: [
                    { key: "cr549_person.cr549_direct_phone", text: "Phone Number", type: "string" },
                    { key: "cr549_person.cr549_email_address", text: "Email Address", type: "string" },
                    { key: "cr549_person.cr549_email_address_2", text: "Alternate Email", type: "string" },
                    { key: "cr549_person", text: "Person", type: "lookup"},
                    { key: "cr549_role", text: "Role", type: "lookup"}
                ] 
            }
        ]
    },
    {
        key: "applicationnotes",
        text: "Application Notes",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "string" }] }
        ]
    },
    {
        key: "componentnotes",
        text: "Component Notes",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "string" }] }
        ]
    },
    {
        key: "inquirynotes",
        text: "Inquiry Notes",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "string" }] }
        ]
    },
    {
        key: "applicationurls",
        text: "Application URLs",
        sections: [
            { key: "other", text: "Other or N/A", fields: [{ key: "otherdetails", text: "Other Details", type: "string" }] }
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