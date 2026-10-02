import * as React from "react";
import {
    Checkbox,
    createTheme,
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    IDetailsListStyles,
    IDetailsHeaderProps,
    IDetailsRowProps,
    IRenderFunction,
    SelectionMode,
    Stack,
    Text,
    TextField,
    ThemeProvider
} from "@fluentui/react";
import { GridRow, GridValue, displayGridValue } from "../models/GridModels";
import { IInputs } from "../generated/ManifestTypes";
import { GridCellEditor } from "./GridCellEditor";
import { GridRowActions } from "./GridRowActions";
import { GridToolbar } from "./GridToolbar";

export interface EditableGridProps {
    context: ComponentFramework.Context<IInputs>;
    rows: GridRow[];
    dataColumns: ComponentFramework.PropertyHelper.DataSetApi.Column[];
    selectedIds: Set<string>;
    editingRowId?: string;
    saving: boolean;
    commandBusy: boolean;
    loading: boolean;
    error?: string;
    onToggleRow: (rowId: string, checked: boolean) => void;
    onToggleRows: (rowIds: string[], checked: boolean) => void;
    onEditRow: (rowId: string) => void;
    onCancelEdit: () => void;
    onSaveEdit: () => void;
    onAddRow: () => void;
    onRefresh: () => void;
    onEditSelected: () => void;
    onDeleteSelected: () => void;
    onValueChange: (columnName: string, value: GridValue) => void;
}

interface EditableGridState {
    searchText: string;
}

const green = "#00814F";
const headerBackground = "#B4DECD";
const selectedRowBackground = "#F3FAF6";

// Keep the organization theme local to this grid; do not change the hosting form.
const gridTheme = createTheme({
    palette: {
        themePrimary: green,
        themeDarkAlt: "#007548",
        themeDark: "#00633D",
        themeDarker: "#00492D",
        themeSecondary: "#14915F",
        themeTertiary: "#58B28F",
        themeLight: "#B4DECD",
        themeLighter: "#DFF1E8",
        themeLighterAlt: "#F3FAF6"
    },
    semanticColors: {
        inputBackgroundChecked: green,
        inputBackgroundCheckedHovered: "#00633D",
        inputForegroundChecked: "#FFFFFF",
        inputBorderHovered: green,
        inputFocusBorderAlt: green
    }
});

const detailsListStyles: Partial<IDetailsListStyles> = {
    root: {
        border: "1px solid #D1D1D1",
        borderRadius: 4,
        overflow: "hidden"
    },
    headerWrapper: {
        background: headerBackground,
        overflow: "hidden",
        willChange: "transform"
    },
    contentWrapper: {
        overflowX: "auto",
        overflowY: "visible"
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
            <ThemeProvider theme={gridTheme}>
                <Stack tokens={{ childrenGap: 10 }} styles={{ root: { fontFamily: "Segoe UI, Arial, sans-serif" } }}>
                    <Stack
                        horizontal
                        wrap
                        horizontalAlign="space-between"
                        verticalAlign="center"
                        tokens={{ childrenGap: 8 }}
                        styles={{ root: { padding: "4px 12px", boxSizing: "border-box" } }}
                    >
                        <TextField
                            ariaLabel="Search records"
                            placeholder="Search records"
                            value={this.state.searchText}
                            onChange={this.onSearchChange}
                            styles={{ root: { width: 260, maxWidth: "100%" }, field: { paddingLeft: 10 } }}
                        />
                        <GridToolbar
                            selectedCount={this.props.selectedIds.size}
                            selectedSavedCount={this.props.rows.filter((row) =>
                                !row.isNew && this.props.selectedIds.has(row.id)).length}
                            busy={this.isBusy()}
                            editing={!!this.props.editingRowId}
                            onNewRecord={this.props.onAddRow}
                            onRefresh={this.props.onRefresh}
                            onEditSelected={this.props.onEditSelected}
                            onDeleteSelected={this.props.onDeleteSelected}
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
                            onRenderDetailsHeader={this.renderHeader}
                        />
                    </div>

                    <Text variant="small" styles={{ root: { color: "#616161" } }}>
                        {visibleRows.length} record(s) · {this.props.selectedIds.size} selected
                    </Text>
                </Stack>
            </ThemeProvider>
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
                    theme={gridTheme}
                    styles={{
                        root: { height: 42, alignItems: "center" },
                        label: { alignItems: "center" },
                        checkbox: { margin: 0 }
                    }}
                    ariaLabel="Select all visible rows"
                    disabled={this.isBusy()}
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
                    theme={gridTheme}
                    styles={{
                        root: { height: 32, alignItems: "center" },
                        label: { alignItems: "center" },
                        checkbox: { margin: 0 }
                    }}
                    ariaLabel="Select row"
                    disabled={this.isBusy()}
                    checked={this.props.selectedIds.has(row.id)}
                    onChange={(_, checked) => this.props.onToggleRow(row.id, !!checked)}
                />
            )
        };

        const actionsColumn: IColumn = {
            key: "__actions",
            name: "Actions",
            onRenderHeader: () => this.renderHeaderLabel("__actions", "Actions"),
            minWidth: 82,
            maxWidth: 82,
            isResizable: false,
            onRender: (row: GridRow) => (
                <GridRowActions
                    isEditing={this.props.editingRowId === row.id}
                    disabled={this.isBusy() || (!!this.props.editingRowId && this.props.editingRowId !== row.id)}
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
            onRenderHeader: () => this.renderHeaderLabel(column.name, column.displayName || column.name),
            onRender: (row: GridRow) => {
                if (this.props.editingRowId !== row.id || column.name.includes(".")) {
                    return <Text>{this.displayValue(row.values[column.name])}</Text>;
                }

                return (
                    <GridCellEditor
                        context={this.props.context}
                        isNew={row.isNew}
                        disabled={this.isBusy()}
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

    private renderHeaderLabel(columnName: string, label: string): React.ReactElement {
        return (
            <Text
                id={this.getHeaderId(columnName)}
                styles={{ root: { fontWeight: 600, fontSize: 14, color: green, lineHeight: "20px" } }}
            >
                {label}
            </Text>
        );
    }

    private renderHeader: IRenderFunction<IDetailsHeaderProps> = (headerProps, defaultRender) => {
        if (!headerProps || !defaultRender) {
            return null;
        }

        return defaultRender({
            ...headerProps,
            styles: {
                root: {
                    paddingTop: 0,
                    paddingBottom: 0,
                    height: 42,
                    background: headerBackground,
                    borderBottom: "1px solid #B4DECD",
                    selectors: {
                        ".ms-DetailsHeader-cellTitle": {
                            height: 42,
                            alignItems: "center"
                        },
                        ".ms-DetailsHeader-cellName": {
                            display: "flex",
                            alignItems: "center",
                            height: "100%"
                        }
                    }
                }
            }
        });
    };

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
                    background: isSelected ? selectedRowBackground : undefined,
                    borderLeft: isSelected ? `3px solid ${green}` : "3px solid transparent",
                    borderBottom: "1px solid #F0F0F0"
                }
            }
        });
    };

    private onSearchChange = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string): void => {
        this.setState({ searchText: value || "" });
    };

    private getRowKey = (row: GridRow): string => row.id;

    private isBusy(): boolean {
        return this.props.saving || this.props.commandBusy || this.props.loading;
    }

    private getHeaderId(columnName: string): string {
        return `custom-editable-grid-header-${columnName.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
    }

    private displayValue(value: GridValue): string {
        return displayGridValue(value);
    }
}
