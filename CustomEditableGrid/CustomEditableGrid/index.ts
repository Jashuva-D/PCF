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
    private commandBusy = false;
    private destroyed = false;
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
        this.destroyed = true;
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
        if (this.destroyed) return;
        this.reactRoot.render(React.createElement(EditableGrid, {
            context: this.context,
            rows: Array.from(this.rows.values()),
            dataColumns: this.context.parameters.grid.columns,
            selectedIds: this.selectedIds,
            editingRowId: this.editingRowId,
            saving: this.saving,
            commandBusy: this.commandBusy,
            loading: this.context.parameters.grid.loading,
            error: this.error,
            onToggleRow: this.toggleRow,
            onToggleRows: this.toggleRows,
            onEditRow: this.editRow,
            onCancelEdit: this.cancelEdit,
            onSaveEdit: this.saveEdit,
            onAddRow: this.addRow,
            onRefresh: this.refreshGrid,
            onEditSelected: this.openSelectedRecord,
            onDeleteSelected: this.deleteSelectedRecords,
            onValueChange: this.changeValue
        }));
    }

    private toggleRow = (rowId: string, checked: boolean): void => {
        if (this.isBusy()) return;
        if (checked) this.selectedIds.add(rowId);
        else this.selectedIds.delete(rowId);
        this.render();
    };

    private toggleRows = (rowIds: string[], checked: boolean): void => {
        if (this.isBusy()) return;
        rowIds.forEach((rowId) => {
            if (checked) this.selectedIds.add(rowId);
            else this.selectedIds.delete(rowId);
        });
        this.render();
    };

    private editRow = (rowId: string): void => {
        if (this.isBusy() || (this.editingRowId && this.editingRowId !== rowId)) return;
        this.editingRowId = rowId;
        this.selectedIds.add(rowId);
        this.error = undefined;
        this.render();
    };

    private cancelEdit = (): void => {
        if (this.saving) return;
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
        if (this.isBusy() || this.editingRowId) return;
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
        if (this.isBusy() || !this.editingRowId) return;
        const row = this.rows.get(this.editingRowId);
        if (!row) return;
        row.values[columnName] = value;
        this.error = undefined;
        this.render();
    };

    private saveEdit = async (): Promise<void> => {
        if (this.isBusy() || !this.editingRowId) return;
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

    private isBusy(): boolean {
        return this.destroyed || this.saving || this.commandBusy || this.context.parameters.grid.loading;
    }

    private getSelectedSavedRows(): GridRow[] {
        return Array.from(this.rows.values()).filter((row) => !row.isNew && this.selectedIds.has(row.id));
    }

    private async discardInlineEdit(): Promise<boolean> {
        if (!this.editingRowId) return true;
        const result = await this.context.navigation.openConfirmDialog({
            title: "Discard row changes?",
            text: "The row being edited has not been saved. Discard its changes and continue?",
            confirmButtonLabel: "Discard",
            cancelButtonLabel: "Cancel"
        });
        if (!result.confirmed || this.destroyed) return false;
        this.cancelEdit();
        return true;
    }

    private refreshGrid = async (): Promise<void> => {
        if (this.isBusy()) return;
        this.commandBusy = true;
        this.error = undefined;
        this.render();
        try {
            if (await this.discardInlineEdit()) this.context.parameters.grid.refresh();
        } catch (error) {
            this.error = error instanceof Error ? error.message : "Unable to refresh records.";
        } finally {
            this.commandBusy = false;
            this.render();
        }
    };

    private openSelectedRecord = async (): Promise<void> => {
        const selected = this.getSelectedSavedRows();
        if (this.isBusy() || this.selectedIds.size !== 1 || selected.length !== 1) return;
        const entityName = this.context.parameters.grid.getTargetEntityType();
        if (!entityName) { this.error = "The dataset target table is unavailable."; this.render(); return; }
        this.commandBusy = true;
        this.error = undefined;
        this.render();
        try {
            if (!await this.discardInlineEdit()) return;
            await this.context.navigation.openForm({
                entityName,
                entityId: selected[0].id.replace(/[{}]/g, ""),
                openInNewWindow: false
            });
        } catch (error) {
            this.error = error instanceof Error ? error.message : "Unable to open the selected record.";
        } finally {
            this.commandBusy = false;
            this.render();
        }
    };

    private deleteSelectedRecords = async (): Promise<void> => {
        const selected = this.getSelectedSavedRows();
        if (this.isBusy() || selected.length < 1 || selected.length !== this.selectedIds.size) return;
        const entityName = this.context.parameters.grid.getTargetEntityType();
        if (!entityName) { this.error = "The dataset target table is unavailable."; this.render(); return; }
        this.commandBusy = true;
        this.error = undefined;
        this.render();
        let deletedCount = 0;
        try {
            const result = await this.context.navigation.openConfirmDialog({
                title: "Delete selected records?",
                text: `Delete ${selected.length} selected record(s)?` +
                    (selected.some((row) => row.id === this.editingRowId)
                        ? " Unsaved changes to the selected row will also be discarded." : ""),
                confirmButtonLabel: "Delete",
                cancelButtonLabel: "Cancel"
            });
            if (!result.confirmed || this.destroyed) return;
            const failures: string[] = [];
            for (const row of selected) {
                if (this.destroyed) break;
                try {
                    await this.context.webAPI.deleteRecord(entityName, row.id.replace(/[{}]/g, ""));
                    deletedCount++;
                    this.rows.delete(row.id);
                    this.selectedIds.delete(row.id);
                    if (this.editingRowId === row.id) this.editingRowId = undefined;
                } catch (error) {
                    failures.push(error instanceof Error ? error.message : "Deletion failed.");
                }
            }
            if (failures.length) {
                this.error = `${deletedCount} record(s) deleted; ${failures.length} could not be deleted. ` +
                    `Failed records remain selected. ${failures[0]}`;
            }
        } catch (error) {
            this.error = error instanceof Error ? error.message : "Unable to delete the selected records.";
        } finally {
            this.commandBusy = false;
            if (!this.destroyed) {
                if (deletedCount > 0) this.context.parameters.grid.refresh();
                this.render();
            }
        }
    };
}
