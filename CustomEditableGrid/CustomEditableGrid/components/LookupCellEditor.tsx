import * as React from "react";
import { ITag, TagPicker, Text } from "@fluentui/react";
import { IInputs } from "../generated/ManifestTypes";
import { GridValue, getLookupValue } from "../models/GridModels";
import { LookupMetadataService } from "../services/LookupMetadataService";

export interface LookupCellEditorProps {
    context: ComponentFramework.Context<IInputs>;
    column: ComponentFramework.PropertyHelper.DataSetApi.Column;
    value: GridValue;
    ariaLabelledBy: string;
    isNew: boolean;
    disabled?: boolean;
    onChange: (value: GridValue) => void;
}

interface LookupTag extends ITag {
    lookup: ComponentFramework.LookupValue;
}

interface LookupCellEditorState {
    targets: string[];
    loading: boolean;
    editable: boolean;
    error?: string;
}

export class LookupCellEditor extends React.Component<LookupCellEditorProps, LookupCellEditorState> {
    public state: LookupCellEditorState = { targets: [], loading: true, editable: false };
    private mounted = false;
    private metadataId = 0;
    private searchId = 0;

    public componentDidMount(): void {
        this.mounted = true;
        void this.loadMetadata();
    }

    public componentDidUpdate(previous: LookupCellEditorProps): void {
        if (previous.column.name !== this.props.column.name || previous.isNew !== this.props.isNew ||
            previous.context.parameters.grid.getTargetEntityType() !== this.props.context.parameters.grid.getTargetEntityType()) {
            void this.loadMetadata();
        }
    }

    public componentWillUnmount(): void {
        this.mounted = false;
        this.metadataId++;
        this.searchId++;
    }

    private async loadMetadata(): Promise<void> {
        const request = ++this.metadataId;
        this.searchId++;
        this.setState({ targets: [], loading: true, editable: false, error: undefined });
        try {
            const metadata = await LookupMetadataService.getField(
                this.props.context.parameters.grid.getTargetEntityType(), this.props.column.name
            );
            if (this.mounted && request === this.metadataId) {
                const editable = this.props.isNew ? metadata.IsValidForCreate : metadata.IsValidForUpdate;
                this.setState({ targets: metadata.Targets, loading: false, editable,
                    error: editable ? undefined : "This lookup is read-only." });
            }
        } catch (error) {
            if (this.mounted && request === this.metadataId) {
                this.setState({ loading: false });
                this.showError(error);
            }
        }
    }

    public render(): React.ReactNode {
        const current = getLookupValue(this.props.value);
        const selectedItems: LookupTag[] = current ? [{
            key: `${current.entityType}:${current.id}`,
            name: current.name || current.id,
            lookup: current
        }] : [];
        return (
            <>
                <TagPicker
                    styles={{
                        root: {
                            width: "100%",
                            minWidth: 0,
                            boxSizing: "border-box",
                            padding: "2px 4px"
                        },
                        text: {
                            width: "100%",
                            minWidth: 0,
                            boxSizing: "border-box"
                        },
                        input: {
                            minWidth: 0,
                            maxWidth: "100%",
                            boxSizing: "border-box",
                            padding: "4px 6px"
                        }
                    }}
                    itemLimit={1}
                    disabled={this.props.disabled || this.state.loading || !this.state.editable}
                    selectedItems={selectedItems}
                    onResolveSuggestions={this.searchRecords}
                    resolveDelay={300}
                    getTextFromItem={(item) => item.name}
                    onChange={(items) => {
                        const selected = items?.[0] as LookupTag | undefined;
                        this.props.onChange(selected?.lookup || null);
                    }}
                    inputProps={{
                        placeholder: this.state.loading ? "Loading lookup…" : "Search records",
                        "aria-label": this.props.column.displayName || this.props.column.name,
                        "aria-labelledby": this.props.ariaLabelledBy
                    }}
                    pickerSuggestionsProps={{
                        suggestionsHeaderText: "Records",
                        noResultsFoundText: "No records found",
                        loadingText: "Searching…"
                    }}
                />
                {this.state.error && (
                    <Text role="alert" styles={{ root: { color: "#A4262C" } }}>{this.state.error}</Text>
                )}
            </>
        );
    }

    private searchRecords = async (searchText: string): Promise<LookupTag[]> => {
        const request = ++this.searchId;
        const text = searchText.trim();
        if (text.length < 2 || this.props.disabled || !this.state.editable || this.state.loading) return [];
        this.setState({ error: undefined });
        const context = this.props.context;
        const targets = this.state.targets;
        try {
            const results = await Promise.all(targets.map(async (entityType): Promise<LookupTag[]> => {
                const metadata = await context.utils.getEntityMetadata(entityType);
                const idField = (metadata.PrimaryIdAttribute || metadata.primaryIdAttribute) as string;
                const nameField = (metadata.PrimaryNameAttribute || metadata.primaryNameAttribute) as string;
                if (!idField || !nameField) throw new Error(`Search fields are unavailable for ${entityType}.`);
                const filter = `startswith(${nameField},'${text.replace(/'/g, "''")}')`;
                // Encode apostrophes as well as URL delimiters after escaping the OData literal.
                const encodedFilter = encodeURIComponent(filter).replace(/'/g, "%27");
                const query = `?$select=${idField},${nameField}&$filter=${encodedFilter}` +
                    `&$orderby=${nameField} asc&$top=10`;
                const response = await context.webAPI.retrieveMultipleRecords(entityType, query);
                return response.entities.map((record): LookupTag => {
                    const id = String(record[idField]);
                    const name = String(record[nameField] || id);
                    return {
                        key: `${entityType}:${id}`,
                        name: targets.length > 1 ? `${name} (${entityType})` : name,
                        lookup: { id, name, entityType }
                    };
                });
            }));
            return this.mounted && request === this.searchId ? results.flat() : [];
        } catch (error) {
            if (request === this.searchId) this.showError(error);
            return [];
        }
    };

    private showError(error: unknown): void {
        if (this.mounted) this.setState({
            error: error instanceof Error ? error.message : "Unable to search lookup records."
        });
    }
}
