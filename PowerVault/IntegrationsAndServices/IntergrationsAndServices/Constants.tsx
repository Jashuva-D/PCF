import * as React from "react";
import { ConfluenceIcon, CopilotIcon, DataverseIcon, JIRAIcon, MSFormsIcon, OneDriveIcon, OutlookIcon, PowerAutomateIcon, PowerBIIcon, SharePointIcon, TeamsIcon, AzureAIIcon, MSEntraIDIcon, MicrosoftFoundryIcon, AzureIcon, SlackIcon, PostmanIcon, PowerAppsIcon, RestAPIIcon, DataFlowIcon } from "./Icons";
import { Icon } from "@fluentui/react/lib/components/Icon/Icon";

export interface IIntegrationAndServices {
    key: number;
    text: string;
    group: string;
    icon?: React.ElementType<{size : number}>;
}

export const IntegrationsAndServices: IIntegrationAndServices[] = [
    // Microsoft Power Platform
    { key: 711980000, text: "Dataverse", group: "Microsoft Power Platform", icon: DataverseIcon },
    { key: 711980005, text: "Copilot Studio", group: "Microsoft Power Platform", icon: CopilotIcon },
    { key: 711980008, text: "Power Pages", group: "Microsoft Power Platform", icon: PowerAutomateIcon },
    { key: 711980009, text: "Power Automate", group: "Microsoft Power Platform", icon: PowerAutomateIcon },
    { key: 711980010, text: "Power BI", group: "Microsoft Power Platform", icon: PowerBIIcon },
    { key: 711980011, text: "Power Apps", group: "Microsoft Power Platform", icon: PowerAppsIcon },
    { key: 711980012, text: "AI Builder", group: "Microsoft Power Platform", icon: PowerAutomateIcon },

    // Microsoft 365 / Collaboration
    { key: 711980001, text: "SharePoint", group: "Microsoft 365 / Collaboration", icon: SharePointIcon },
    { key: 711980013, text: "Teams", group: "Microsoft 365 / Collaboration", icon: TeamsIcon },
    { key: 711980002, text: "Outlook / Email", group: "Microsoft 365 / Collaboration", icon: OutlookIcon },
    { key: 711980014, text: "OneDrive", group: "Microsoft 365 / Collaboration", icon: OneDriveIcon },
    { key: 711980015, text: "Microsoft Forms", group: "Microsoft 365 / Collaboration", icon: MSFormsIcon },

    // Azure & AI Services
    { key: 711980007, text: "Azure AI Services", group: "Azure & AI Services", icon: AzureAIIcon },
    { key: 711980016, text: "Microsoft Entra ID", group: "Azure & AI Services", icon: MSEntraIDIcon },

    // Azure AI Services
    { key: 711980024, text: "Azure OpenAI", group: "Azure AI Services", icon: AzureAIIcon },
    { key: 711980022, text: "Microsoft Foundry", group: "Azure AI Services", icon: MicrosoftFoundryIcon },
    { key: 711980006, text: "Microsoft Graph API", group: "Azure AI Services", icon: AzureIcon },

    // External Integrations
    { key: 711980003, text: "JIRA", group: "External Integrations", icon: JIRAIcon },
    { key: 711980004, text: "Confluence", group: "External Integrations", icon: ConfluenceIcon },
    { key: 711980017, text: "ServiceNow", group: "External Integrations", icon: PowerAutomateIcon },
    { key: 711980018, text: "Slack", group: "External Integrations", icon: SlackIcon },
    { key: 711980019, text: "Other REST APIs", group: "External Integrations", icon: RestAPIIcon },

    // Data & Integration
    { key: 711980020, text: "Dataflows", group: "Data & Integration", icon: DataFlowIcon },
    { key: 711980021, text: "Custom Connectors", group: "Data & Integration", icon: PowerAutomateIcon }
];

