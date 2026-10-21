import * as React from "react";
import { Dropdown, IDropdownOption } from "@fluentui/react";
import type { GridCellEditorProps } from "./GridCellEditor";

interface ChoiceCellEditorState {
    options: IDropdownOption[];
}

export class ChoiceCellEditor extends React.Component<
    GridCellEditorProps,
    ChoiceCellEditorState
> {
    public state: ChoiceCellEditorState = {
        options: []
    };

    public async componentDidMount(): Promise<void> {
        const table =
            this.props.context.parameters.grid.getTargetEntityType();

        const field = this.props.column.name;

        const url =
            `/api/data/v9.2/EntityDefinitions(LogicalName='${table}')` +
            `/Attributes(LogicalName='${field}')` +
            `/Microsoft.Dynamics.CRM.PicklistAttributeMetadata` +
            `?$select=LogicalName&$expand=OptionSet`;

        try {
            const response = await fetch(url, {
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                throw new Error("Unable to load Choice options.");
            }

            const metadata = await response.json() as {
                OptionSet: {
                    Options: {
                        Value: number;
                        Label: {
                            UserLocalizedLabel?: { Label: string };
                        };
                    }[];
                };
            };

            this.setState({
                options: metadata.OptionSet.Options.map(option => ({
                    key: option.Value,
                    text:
                        option.Label.UserLocalizedLabel?.Label ||
                        String(option.Value)
                }))
            });
        } catch (error) {
            console.error(error);
        }
    }

    public render(): React.ReactNode {
        return (
            <Dropdown
                options={this.state.options}
                selectedKey={
                    this.props.value == null
                        ? null
                        : Number(this.props.value)
                }
                disabled={this.props.disabled}
                ariaLabel={
                    this.props.column.displayName ||
                    this.props.column.name
                }
                onChange={(_, option) => {
                    if (option) {
                        this.props.onChange(Number(option.key));
                    }
                }}
            />
        );
    }
}
