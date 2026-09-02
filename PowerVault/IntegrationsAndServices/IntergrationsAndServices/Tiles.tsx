import * as React from "react";
import { Stack, Text, Icon, initializeIcons, StackItem, Separator } from "@fluentui/react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { DataverseIcon, ClockIcon, SharePointIcon, ConfluenceIcon, JIRAIcon, PowerAutomateIcon, PowerBIIcon, CopilotIcon, TeamsIcon, OutlookIcon } from "./Icons";
import { JSX, ReactElement } from "react";
import IntegrationSelector from "./MultiSelection";
import { IIntegrationAndServices, IntegrationsAndServices } from "./Constants";


interface IOptionTilesProps {
    context: ComponentFramework.Context<IInputs,IOutputs>;
    onChange?: (selected: number[]) => void;
}
interface IOptionTilesState {
    selectedoptions: IIntegrationAndServices[];
}

class OptionTiles extends React.Component<IOptionTilesProps,IOptionTilesState> {
    
    constructor(props: IOptionTilesProps) {
        super(props);
        initializeIcons();

        var selectedoptions_raw = [711980000,711980001] //this.props.context.parameters.multioptions.raw || [];

        var selectedoptions = [] as IIntegrationAndServices[];
        if(selectedoptions_raw && selectedoptions_raw.length > 0) {
            
            for (var i = 0; i < selectedoptions_raw.length; i++) {
                //alert(selectedoptions_raw[i]);
                var option = IntegrationsAndServices.find(option => option.key === selectedoptions_raw[i]);
                if(option) {
                    selectedoptions.push(option);
                }
            }
        }
        this.state = { selectedoptions: selectedoptions };
    }
    public render(): React.ReactNode {
        const { selectedoptions } = this.state;

        return (
            <Stack>
                <Stack horizontal  wrap tokens={{ childrenGap: 6}}>
                    {selectedoptions.map(function(option) {
                        const customIcon = option.icon;
                        return <Stack key={option.key} horizontal verticalAlign="center" tokens={{ childrenGap: 7}}
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
                                {customIcon && React.createElement(customIcon, { size: 20 })}
                                <Text styles={{ root: { fontSize: 12,fontWeight: 600, color: "#323130", whiteSpace: "nowrap" }}} >
                                    {option.text}
                                </Text>
                            </Stack>
                        })
                    }
                </Stack>
                <Separator styles={{ root: { marginTop: 5 } }} />
                <StackItem align="end">
                    <IntegrationSelector
                        selectedIntegrations={this.state.selectedoptions}
                        onApply={(selected) => {
                            this.setState({ selectedoptions: selected });
                            this.props.onChange && this.props.onChange(selected.map(option => option.key));
                        }}
                    />
                </StackItem>
            </Stack>
        );
    }
}

export default OptionTiles;