import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { EditableGrid } from "./components/EditableGrid";
import { GridDataService } from "./services/GridDataService";
import { GridRow, GridValue } from "./models/GridModels";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class CustomEditableGrid implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private context!: ComponentFramework.Context<IInputs>;
    private container!: HTMLDivElement;
    private reactRoot!: Root;
    private rows = new Map<string, GridRow>();
    private selectedIds = new Set<string>();
    private editingRowId?: string;
    private saving = false;
    private error?: string;

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this.context = context;
        this.container = container;
        this.reactRoot = createRoot(container);
        context.mode.trackContainerResize(true);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.context = context;
        this.synchroniseRows();
        this.render();
    }

    public getOutputs(): IOutputs { return {}; }

    public destroy(): void {
        this.reactRoot.unmount();
        this.rows.clear();
        this.selectedIds.clear();
    }

    private synchroniseRows(): void {
        const dataset = this.context.parameters.grid;
        const activeIds = new Set(dataset.sortedRecordIds);
        dataset.sortedRecordIds.forEach((id) => {
            if (this.editingRowId === id) return;
            const record = dataset.records[id];
            const values: Record<string, GridValue> = {};
            dataset.columns.forEach((column) => values[column.name] = record.getValue(column.name) as GridValue);
            this.rows.set(id, { id, isNew: false, values, originalValues: { ...values } });
        });
        Array.from(this.rows.values()).forEach((row) => {
            if (!row.isNew && !activeIds.has(row.id)) {
                this.rows.delete(row.id);
                this.selectedIds.delete(row.id);
            }
        });
    }

    private render(): void {
        this.reactRoot.render(React.createElement(EditableGrid, {
            context: this.context,
            rows: Array.from(this.rows.values()),
            dataColumns: this.context.parameters.grid.columns,
            selectedIds: this.selectedIds,
            editingRowId: this.editingRowId,
            saving: this.saving,
            error: this.error,
            onToggleRow: this.toggleRow,
            onToggleRows: this.toggleRows,
            onEditRow: this.editRow,
            onCancelEdit: this.cancelEdit,
            onSaveEdit: this.saveEdit,
            onAddRow: this.addRow,
            onValueChange: this.changeValue
        }));
    }

    private toggleRow = (rowId: string, checked: boolean): void => {
        if (checked) this.selectedIds.add(rowId);
        else this.selectedIds.delete(rowId);
        this.render();
    };

    private toggleRows = (rowIds: string[], checked: boolean): void => {
        rowIds.forEach((rowId) => {
            if (checked) this.selectedIds.add(rowId);
            else this.selectedIds.delete(rowId);
        });
        this.render();
    };

    private editRow = (rowId: string): void => {
        this.editingRowId = rowId;
        this.selectedIds.add(rowId);
        this.error = undefined;
        this.render();
    };

    private cancelEdit = (): void => {
        if (!this.editingRowId) return;
        const row = this.rows.get(this.editingRowId);
        if (row?.isNew) {
            this.rows.delete(row.id);
            this.selectedIds.delete(row.id);
        } else if (row) {
            row.values = { ...row.originalValues };
        }
        this.editingRowId = undefined;
        this.error = undefined;
        this.render();
    };

    private addRow = (): void => {
        if (this.editingRowId) return;
        const values: Record<string, GridValue> = {};
        this.context.parameters.grid.columns.forEach((column) => values[column.name] = null);
        const id = `new-${Date.now()}`;
        const newRow: GridRow = { id, isNew: true, values, originalValues: {} };
        this.rows = new Map([[id, newRow], ...this.rows.entries()]);
        this.selectedIds.add(id);
        this.editingRowId = id;
        this.error = undefined;
        this.render();
    };

    private changeValue = (columnName: string, value: GridValue): void => {
        if (!this.editingRowId) return;
        const row = this.rows.get(this.editingRowId);
        if (!row) return;
        row.values[columnName] = value;
        this.error = undefined;
        this.render();
    };

    private saveEdit = async (): Promise<void> => {
        if (!this.editingRowId) return;
        const row = this.rows.get(this.editingRowId);
        if (!row) return;
        this.saving = true;
        this.error = undefined;
        this.render();
        try {
            await GridDataService.save(this.context, row, this.context.parameters.grid.columns);
            this.saving = false;
            this.editingRowId = undefined;
            this.selectedIds.delete(row.id);
            if (row.isNew) this.rows.delete(row.id);
            else row.originalValues = { ...row.values };
            this.render();
            this.context.parameters.grid.refresh();
        } catch (error) {
            this.saving = false;
            this.error = error instanceof Error ? error.message : "Unable to save the row.";
            this.render();
        }
    };
}
