import * as React from "react";
import {
    Checkbox,
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    IDetailsListStyles,
    IDetailsRowProps,
    IRenderFunction,
    IconButton,
    SelectionMode,
    Stack,
    Text,
    TextField
} from "@fluentui/react";
import { GridRow, GridValue, displayGridValue } from "../models/GridModels";
import { IInputs } from "../generated/ManifestTypes";
import { GridCellEditor } from "./GridCellEditor";
import { GridRowActions } from "./GridRowActions";

export interface EditableGridProps {
    context: ComponentFramework.Context<IInputs>;
    rows: GridRow[];
    dataColumns: ComponentFramework.PropertyHelper.DataSetApi.Column[];
    selectedIds: Set<string>;
    editingRowId?: string;
    saving: boolean;
    error?: string;
    onToggleRow: (rowId: string, checked: boolean) => void;
    onToggleRows: (rowIds: string[], checked: boolean) => void;
    onEditRow: (rowId: string) => void;
    onCancelEdit: () => void;
    onSaveEdit: () => void;
    onAddRow: () => void;
    onValueChange: (columnName: string, value: GridValue) => void;
}

interface EditableGridState {
    searchText: string;
}

const green = "#00814F";

const detailsListStyles: Partial<IDetailsListStyles> = {
    root: {
        border: "1px solid #D1D1D1",
        borderRadius: 4,
        overflow: "hidden"
    },
    headerWrapper: {
        background: "#DFF1E8",
        overflow: "hidden",
        willChange: "transform"
    },
    contentWrapper: {
        overflowX: "auto",
        overflowY: "visible"
    }
};

const addButtonStyles = {
    root: {
        color: green,
        width: 32,
        height: 32
    },
    rootHovered: {
        color: "#005C39",
        background: "#DFF1E8"
    }
};

export class EditableGrid extends React.Component<EditableGridProps, EditableGridState> {
    private detailsListContainer = React.createRef<HTMLDivElement>();

    public state: EditableGridState = {
        searchText: ""
    };

    public render(): React.ReactNode {
        const visibleRows = this.getVisibleRows();
        const selectedVisibleCount = visibleRows.filter((row) => this.props.selectedIds.has(row.id)).length;
        const allVisibleSelected = visibleRows.length > 0 && selectedVisibleCount === visibleRows.length;

        return (
            <Stack tokens={{ childrenGap: 10 }} styles={{ root: { fontFamily: "Segoe UI, Arial, sans-serif" } }}>
                <Stack
                    horizontal
                    horizontalAlign="space-between"
                    verticalAlign="center"
                    tokens={{ childrenGap: 8 }}
                >
                    <TextField
                        ariaLabel="Search records"
                        placeholder="Search records"
                        value={this.state.searchText}
                        onChange={this.onSearchChange}
                        styles={{ root: { width: 260 } }}
                    />
                    <IconButton
                        ariaLabel="Add new row"
                        title="Add new row"
                        iconProps={{ iconName: "Add" }}
                        styles={addButtonStyles}
                        disabled={!!this.props.editingRowId}
                        onClick={this.props.onAddRow}
                    />
                </Stack>

                {this.props.error && (
                    <Text role="alert" styles={{ root: { color: "#A4262C" } }}>
                        {this.props.error}
                    </Text>
                )}

                <div ref={this.detailsListContainer} onScrollCapture={this.onGridScrollCapture}>
                    <DetailsList
                        items={visibleRows}
                        columns={this.getColumns(visibleRows, allVisibleSelected, selectedVisibleCount)}
                        getKey={this.getRowKey}
                        selectionMode={SelectionMode.none}
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        compact
                        styles={detailsListStyles}
                        onRenderRow={this.renderRow}
                    />
                </div>

                <Text variant="small" styles={{ root: { color: "#616161" } }}>
                    {visibleRows.length} record(s) · {this.props.selectedIds.size} selected
                </Text>
            </Stack>
        );
    }

    private getVisibleRows(): GridRow[] {
        const searchText = this.state.searchText.trim().toLowerCase();
        if (!searchText) {
            return this.props.rows;
        }

        return this.props.rows.filter((row) => this.props.dataColumns.some((column) =>
            this.displayValue(row.values[column.name]).toLowerCase().includes(searchText)
        ));
    }

    private onGridScrollCapture = (event: React.UIEvent<HTMLDivElement>): void => {
        const contentScroller = event.target as HTMLElement;
        if (!contentScroller.classList.contains("ms-DetailsList-contentWrapper")) {
            return;
        }

        const root = this.detailsListContainer.current;
        const header = root?.querySelector(".ms-DetailsList-headerWrapper") as HTMLElement | null;
        if (header) {
            header.style.width = `${contentScroller.scrollWidth}px`;
            header.style.transform = `translateX(-${contentScroller.scrollLeft}px)`;
        }
    };

    private getColumns(
        visibleRows: GridRow[],
        allVisibleSelected: boolean,
        selectedVisibleCount: number
    ): IColumn[] {
        const selectionColumn: IColumn = {
            key: "__selection",
            name: "",
            minWidth: 42,
            maxWidth: 42,
            isResizable: false,
            onRenderHeader: () => (
                <Checkbox
                    ariaLabel="Select all visible rows"
                    checked={allVisibleSelected}
                    indeterminate={selectedVisibleCount > 0 && !allVisibleSelected}
                    onChange={(_, checked) => this.props.onToggleRows(
                        visibleRows.map((row) => row.id),
                        !!checked
                    )}
                />
            ),
            onRender: (row: GridRow) => (
                <Checkbox
                    ariaLabel="Select row"
                    checked={this.props.selectedIds.has(row.id)}
                    onChange={(_, checked) => this.props.onToggleRow(row.id, !!checked)}
                />
            )
        };

        const actionsColumn: IColumn = {
            key: "__actions",
            name: "Actions",
            minWidth: 82,
            maxWidth: 82,
            isResizable: false,
            onRender: (row: GridRow) => (
                <GridRowActions
                    isEditing={this.props.editingRowId === row.id}
                    disabled={this.props.saving}
                    onEdit={() => this.props.onEditRow(row.id)}
                    onSave={this.props.onSaveEdit}
                    onCancel={this.props.onCancelEdit}
                />
            )
        };

        const dataColumns = this.props.dataColumns.map<IColumn>((column) => ({
            key: column.name,
            name: column.displayName || column.name,
            minWidth: 140,
            isResizable: true,
            onRenderHeader: () => (
                <Text id={this.getHeaderId(column.name)}>{column.displayName || column.name}</Text>
            ),
            onRender: (row: GridRow) => {
                if (this.props.editingRowId !== row.id || column.name.includes(".")) {
                    return <Text>{this.displayValue(row.values[column.name])}</Text>;
                }

                return (
                    <GridCellEditor
                        context={this.props.context}
                        isNew={row.isNew}
                        disabled={this.props.saving}
                        column={column}
                        value={row.values[column.name]}
                        ariaLabelledBy={this.getHeaderId(column.name)}
                        onChange={(value) => this.props.onValueChange(column.name, value)}
                    />
                );
            }
        }));

        return [selectionColumn, actionsColumn, ...dataColumns];
    }

    private renderRow: IRenderFunction<IDetailsRowProps> = (rowProps, defaultRender) => {
        if (!rowProps || !defaultRender) {
            return null;
        }

        const row = rowProps.item as GridRow;
        const isSelected = this.props.selectedIds.has(row.id);
        return defaultRender({
            ...rowProps,
            styles: {
                root: {
                    background: isSelected ? "#E8F5EF" : undefined,
                    borderLeft: isSelected ? `3px solid ${green}` : "3px solid transparent"
                }
            }
        });
    };

    private onSearchChange = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string): void => {
        this.setState({ searchText: value || "" });
    };

    private getRowKey = (row: GridRow): string => row.id;

    private getHeaderId(columnName: string): string {
        return `custom-editable-grid-header-${columnName.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
    }

    private displayValue(value: GridValue): string {
        return displayGridValue(value);
    }
}
