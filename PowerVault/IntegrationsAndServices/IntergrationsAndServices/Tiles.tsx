import * as React from "react";
import { Stack, Text, Icon, initializeIcons, StackItem, Separator } from "@fluentui/react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { DataverseIcon, ClockIcon, SharePointIcon, ConfluenceIcon, JIRAIcon, PowerAutomateIcon, PowerBIIcon, CopilotIcon, TeamsIcon, OutlookIcon } from "./Icons";
import { JSX, ReactElement } from "react";
import IntegrationSelector from "./MultiSelection";

export interface IOptionTile {
    key: number;
    text: string;
    icon?: ReactElement;
}

interface IOptionTilesProps {
    context: ComponentFramework.Context<IInputs,IOutputs>;
}
interface IOptionTilesState {
    options: IOptionTile[];
}

class OptionTiles extends React.Component<IOptionTilesProps,IOptionTilesState> {
    
    constructor(props: IOptionTilesProps) {
        super(props);
        initializeIcons();
        this.state = {
            options: [
            {
                key: 1,
                text: "Dataverse",
                icon: <DataverseIcon size={20} color="#106EBE" />
            },
            {
                key: 2,
                text: "SharePoint",
                icon: <SharePointIcon size={20} color="#106EBE" />
            },
            {
                key: 3,
                text: "Confluence",
                icon: <ConfluenceIcon size={20} color="#106EBE" />
            },
            {
                key: 4,
                text: "JIRA",
                icon: <JIRAIcon size={20} color="#106EBE" />
            },
            {
                key: 5,
                text: "Power Automate",
                icon: <PowerAutomateIcon size={20} color="#106EBE" />
            },
            {
                key: 6,
                text: "Power BI",
                icon: <PowerBIIcon size={20} color="#106EBE" />
            },
            {
                key: 7,
                text: "Copilot",
                icon: <CopilotIcon size={20} color="#106EBE" />
            },
            {
                key: 8,
                text: "Teams",
                icon: <TeamsIcon size={20} color="#106EBE" />
            },
            {
                key: 9,
                text: "Outlook",
                icon: <OutlookIcon size={20} color="#106EBE" />
            }
            
        ]
        };
    }
    public render(): React.ReactNode {
        const { options } = this.state;

        return (
            <Stack>
                <Stack horizontal  wrap tokens={{ childrenGap: 6}}>
                    {options.map((option) => (
                        <Stack key={option.key} horizontal verticalAlign="center" tokens={{ childrenGap: 7}}
                            styles={{
                                root: {
                                    height: 32,
                                    padding: "0 10px",
                                    border: "1px solid #E1E1E1",
                                    borderRadius: 4,
                                    backgroundColor: "#FFFFFF",
                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                                    boxSizing: "border-box"
                                }
                            }}
                        >
                            {option.icon}
                            <Text styles={{ root: { fontSize: 12,fontWeight: 600, color: "#323130", whiteSpace: "nowrap" }}} >
                                {option.text}
                            </Text>
                        </Stack>
                    ))}
                </Stack>
                <Separator styles={{ root: { marginTop: 5 } }} />
                <StackItem align="end">
                    <IntegrationSelector
                        selectedIntegrations={[
                            "dataverse",
                            "powerapps",
                            "powerpages",
                            "copilotstudio",
                            "powerbi",
                            "sharepoint",
                            "email",
                            "aiservices",
                            "jira",
                            "confluence"
                        ]}
                        onApply={(selected) => {
                            console.log("Selected integrations:", selected);
                        }}
                    />
                </StackItem>
            </Stack>
        );
    }
}

export default OptionTiles;