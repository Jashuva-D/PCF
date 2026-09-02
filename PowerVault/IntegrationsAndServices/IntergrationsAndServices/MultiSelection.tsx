import * as React from "react";
import { Callout, Checkbox, DefaultButton, IconButton,PrimaryButton,SearchBox,Stack,Text,DirectionalHint,mergeStyleSets, createTheme } from "@fluentui/react";
import { DataverseIcon, PowerAutomateIcon, PowerBIIcon, SharePointIcon, CopilotIcon, OutlookIcon, JIRAIcon, ConfluenceIcon } from "./Icons";

interface IIntegration {
    key: string;
    text: string;
    group: string;
    icon?: React.ReactElement;
}

interface IIntegrationSelectorProps {
    selectedIntegrations?: string[];
    onApply?: (selectedIntegrations: string[]) => void;
}

interface IIntegrationSelectorState {
    isOpen: boolean;
    searchText: string;
    selectedIntegrations: string[];
}

class IntegrationSelector extends React.Component<
    IIntegrationSelectorProps,
    IIntegrationSelectorState
> {
    private editButtonRef = React.createRef<HTMLDivElement>();

    private integrations: IIntegration[] = [
        // Microsoft Power Platform
        { key: "dataverse", text: "Dataverse", group: "Microsoft Power Platform", icon: <DataverseIcon size={16} color="#106EBE" /> },
        { key: "powerapps", text: "Power Apps / Power Platform", group: "Microsoft Power Platform", icon: <PowerAutomateIcon size={16} color="#106EBE" /> },
        { key: "powerpages", text: "Power Pages", group: "Microsoft Power Platform", icon: <SharePointIcon size={16} color="#106EBE" /> },
        { key: "powerautomate", text: "Power Automate", group: "Microsoft Power Platform", icon: <PowerAutomateIcon size={16} color="#106EBE" /> },
        { key: "copilotstudio", text: "Copilot Studio", group: "Microsoft Power Platform", icon: <CopilotIcon size={16} color="#106EBE" /> },
        { key: "powerbi", text: "Power BI", group: "Microsoft Power Platform", icon: <PowerBIIcon size={16} color="#106EBE" /> },

        // Microsoft / Cloud Services
        { key: "sharepoint", text: "SharePoint", group: "Microsoft / Cloud Services", icon: <SharePointIcon size={16} color="#106EBE" /> },
        { key: "email", text: "Email", group: "Microsoft / Cloud Services", icon: <OutlookIcon size={16} color="#106EBE" /> },
        { key: "aiservices", text: "AI Services", group: "Microsoft / Cloud Services", icon: <PowerAutomateIcon size={16} color="#106EBE" /> },
        { key: "azure", text: "Azure Services", group: "Microsoft / Cloud Services", icon: <PowerAutomateIcon size={16} color="#106EBE" /> },

        // External Integrations
        { key: "jira", text: "JIRA", group: "External Integrations", icon: <JIRAIcon size={16} color="#106EBE" /> },
        { key: "confluence", text: "Confluence", group: "External Integrations", icon: <ConfluenceIcon size={16} color="#106EBE" /> }
    ];

    private styles = mergeStyleSets({
        editContainer: {
            display: "inline-flex"
        },

        editButton: {
            padding: "0 4px",
            color: "#01395E",
            fontSize: "14px",
            fontWeight: 600,
            minWidth: "auto",
            height: "28px"
        },

        callout: {
            width: "360px",
            padding: "0",
            borderRadius: "4px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.18)"
        },

        header: {
            padding: "12px 12px 8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        },

        title: {
            fontSize: "14px",
            fontWeight: 600,
            color: "#242424"
        },

        closeButton: {
            width: "24px",
            height: "24px"
        },

        searchContainer: {
            padding: "0 12px 10px 12px"
        },

        searchBox: {
            width: "100%",
            borderradius: "6px",
        },

        listContainer: {
            maxHeight: "280px",
            overflowY: "auto",
            padding: "0 12px 8px 12px"
        },

        groupContainer: {
            marginBottom: "8px"
        },

        groupTitle: {
            fontSize: "12px",
            fontWeight: 600,
            color: "#424242",
            padding: "6px 0"
        },

        checkbox: {
            margin: "5px 0",
            selectors: {
                ".ms-Checkbox-label": {
                    alignItems: "center"
                },

                ".ms-Checkbox-text": {
                    fontSize: "12px",
                    color: "#323130"
                },
                ".ms-Checkbox-checkbox.is-checked": {
                    backgroundColor: "#01395E",
                    borderColor: "#01395E"
                },
                "input:checked + .ms-Checkbox-checkbox": {
            backgroundColor: "#01395E",
            borderColor: "#01395E"
        },

        "input:checked + .ms-Checkbox-checkbox .ms-Checkbox-checkmark": {
            color: "#FFFFFF"
        }
            }
        },

        footer: {
            borderTop: "1px solid #E1E1E1",
            padding: "10px 12px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px"
        },

        cancelButton: {
            minWidth: "72px"
        },

        applyButton: {
            minWidth: "72px"
        }
    });

    constructor(props: IIntegrationSelectorProps) {
        super(props);

        this.state = {
            isOpen: false,
            searchText: "",
            selectedIntegrations: props.selectedIntegrations || [
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
            ]
        };
    }

    private openSelector = (): void => {
        this.setState({
            isOpen: true,
            searchText: ""
        });
    };

    private closeSelector = (): void => {
        this.setState({
            isOpen: false,
            searchText: ""
        });
    };

    private handleSearch = (
        event?: React.ChangeEvent<HTMLInputElement>,
        newValue?: string
    ): void => {
        this.setState({
            searchText: newValue || ""
        });
    };

    private handleCheckboxChange = (
        integrationKey: string,
        checked?: boolean
    ): void => {
        this.setState(prevState => {
            const selected = [...prevState.selectedIntegrations];

            if (checked) {
                if (!selected.includes(integrationKey)) {
                    selected.push(integrationKey);
                }
            } else {
                const index = selected.indexOf(integrationKey);

                if (index > -1) {
                    selected.splice(index, 1);
                }
            }

            return {
                selectedIntegrations: selected
            };
        });
    };

    private handleApply = (): void => {
        if (this.props.onApply) {
            this.props.onApply(this.state.selectedIntegrations);
        }

        this.closeSelector();
    };

    private getFilteredIntegrations = (): IIntegration[] => {
        const searchText = this.state.searchText.trim().toLowerCase();

        if (!searchText) {
            return this.integrations;
        }

        return this.integrations.filter(integration =>
            integration.text.toLowerCase().includes(searchText)
        );
    };

    private renderGroup = (
        groupName: string,
        integrations: IIntegration[]
    ): React.ReactNode => {
        const filteredIntegrations = integrations.filter(integration =>
            this.getFilteredIntegrations().some(
                filtered => filtered.key === integration.key
            )
        );

        if (filteredIntegrations.length === 0) {
            return null;
        }

        return (
            <div className={this.styles.groupContainer} key={groupName}>
                <Text className={this.styles.groupTitle}>
                    {groupName}
                </Text>

                {filteredIntegrations.map(integration => (
                    <Checkbox
                        key={integration.key}
                        className={this.styles.checkbox}
                        label={integration.text}
                        onRenderLabel={() => <Stack horizontal tokens={{ childrenGap: 5 }} style={{paddingLeft: 5}}>{integration.icon} <Text style={{alignItems: "center"}} >{integration.text}</Text></Stack>}
                        checked={this.state.selectedIntegrations.includes(
                            integration.key
                        )}
                        onChange={(
                            _event,
                            checked
                        ) =>
                            this.handleCheckboxChange(
                                integration.key,
                                checked
                            )
                        }
                        theme={ createTheme({
                        palette: {
                            themePrimary: "#01395E",
                            themeDark: "#091a70",
                            themeDarker: "#06124d"
                        },
                    })}
                    />
                ))}
            </div>
        );
    };

    private renderSelectionPanel = (): React.ReactNode => {
        if (!this.state.isOpen) {
            return null;
        }

        const groups = Array.from(
            new Set(this.integrations.map(integration => integration.group))
        );

        return (
            <Callout
                target={this.editButtonRef.current}
                isBeakVisible={false}
                directionalHint={DirectionalHint.bottomRightEdge}
                onDismiss={this.closeSelector}
                className={this.styles.callout}
                setInitialFocus={false}
            >
                <div className={this.styles.header}>
                    <Text className={this.styles.title}>
                        Select Integrations & Services
                    </Text>

                    <IconButton
                        className={this.styles.closeButton}
                        iconProps={{ iconName: "Cancel" }}
                        ariaLabel="Close"
                        onClick={this.closeSelector}
                    />
                </div>

                <div className={this.styles.searchContainer}>
                    <SearchBox
                        className={this.styles.searchBox}
                        placeholder="Search services..."
                        value={this.state.searchText}
                        onChange={this.handleSearch}
                    />
                </div>

                <div className={this.styles.listContainer}>
                    {groups.map(group =>
                        this.renderGroup(
                            group,
                            this.integrations.filter(
                                integration =>
                                    integration.group === group
                            )
                        )
                    )}
                </div>

                <div className={this.styles.footer}>
                    <DefaultButton
                        className={this.styles.cancelButton}
                        text="Cancel"
                        onClick={this.closeSelector}
                        style={{ borderRadius: 4 }}
                    />
                    <PrimaryButton
                        className={this.styles.applyButton}
                        text="Apply"
                        onClick={this.handleApply}
                        style={{ borderRadius: 4, backgroundColor: "#01395E", color: "#FFFFFF" }}
                    />
                </div>
            </Callout>
        );
    };

    public render(): React.ReactNode {
        return (
            <>
                <div ref={this.editButtonRef} className={this.styles.editContainer}>
                    <DefaultButton
                        className={this.styles.editButton}
                        iconProps={{ iconName: "Edit" }}
                        text="Edit"
                        onClick={this.openSelector}
                        style={{border: 0}}
                    />
                </div>
                {this.renderSelectionPanel()}
            </>
        );
    }
}

export default IntegrationSelector;