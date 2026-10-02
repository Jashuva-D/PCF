import * as React from "react";
import { Checkbox, DatePicker, TextField } from "@fluentui/react";
import { GridValue, isLookupColumn } from "../models/GridModels";
import { IInputs } from "../generated/ManifestTypes";
import { LookupCellEditor } from "./LookupCellEditor";

export interface GridCellEditorProps {
    context: ComponentFramework.Context<IInputs>;
    isNew: boolean;
    disabled?: boolean;
    column: ComponentFramework.PropertyHelper.DataSetApi.Column;
    value: GridValue;
    ariaLabelledBy: string;
    onChange: (value: GridValue) => void;
}

export class GridCellEditor extends React.PureComponent<GridCellEditorProps> {
    public render(): React.ReactNode {
        const dataType = (this.props.column.dataType || "").toLowerCase();

        if (dataType.includes("partylist")) {
            return <TextField readOnly value="Party list editing is not supported in this POC." />;
        }

        if (isLookupColumn(this.props.column)) {
            return <LookupCellEditor {...this.props} />;
        }

        if (dataType.indexOf("boolean") >= 0 || dataType.indexOf("twooptions") >= 0) {
            return (
                <Checkbox
                    disabled={this.props.disabled}
                    aria-labelledby={this.props.ariaLabelledBy}
                    checked={Boolean(this.props.value)}
                    onChange={(_, checked) => this.props.onChange(!!checked)}
                />
            );
        }

        if (dataType.indexOf("date") >= 0) {
            return (
                <DatePicker
                    disabled={this.props.disabled}
                    aria-labelledby={this.props.ariaLabelledBy}
                    value={this.asDate(this.props.value)}
                    onSelectDate={(value) => this.props.onChange(value || null)}
                    formatDate={(value) => value ? value.toLocaleDateString() : ""}
                />
            );
        }

        return (
            <TextField
                disabled={this.props.disabled}
                aria-labelledby={this.props.ariaLabelledBy}
                value={this.displayValue(this.props.value)}
                type={this.isNumber(dataType) ? "number" : "text"}
                onChange={(_, value) => this.props.onChange(this.toValue(value || "", dataType))}
                styles={{ fieldGroup: { borderColor: "#00814F" }, field: { minWidth: 120 } }}
            />
        );
    }

    private isNumber(dataType: string): boolean {
        return ["decimal", "currency", "whole", "fp"].some((type) => dataType.indexOf(type) >= 0);
    }

    private toValue(value: string, dataType: string): GridValue {
        if (!value) {
            return null;
        }

        if (this.isNumber(dataType)) {
            const numberValue = Number(value);
            return Number.isNaN(numberValue) ? value : numberValue;
        }

        return value;
    }

    private asDate(value: GridValue): Date | undefined {
        if (value instanceof Date) {
            return value;
        }
        if (typeof value === "string") {
            const date = new Date(value);
            return Number.isNaN(date.getTime()) ? undefined : date;
        }
        return undefined;
    }

    private displayValue(value: GridValue): string {
        if (value === null || value === undefined) {
            return "";
        }
        return value instanceof Date ? value.toLocaleDateString() : String(value);
    }
}
