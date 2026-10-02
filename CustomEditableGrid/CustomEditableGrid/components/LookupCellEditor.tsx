import * as React from "react";
import { IconButton, Stack, TextField } from "@fluentui/react";
import { IInputs } from "../generated/ManifestTypes";
import { GridValue, displayGridValue, getLookupValue } from "../models/GridModels";
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

interface LookupCellEditorState {
    loading: boolean;
    busy: boolean;
    targets: string[];
    editable: boolean;
    error?: string;
}

export class LookupCellEditor extends React.Component<LookupCellEditorProps, LookupCellEditorState> {
    private mounted = false;
    private requestId = 0;
    public state: LookupCellEditorState = { loading: true, busy: false, targets: [], editable: false };

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
        this.requestId++;
    }

    public render(): React.ReactNode {
        const disabled = this.props.disabled || this.state.loading || this.state.busy || !this.state.editable;
        const label = this.props.column.displayName || this.props.column.name;
        return (
            <Stack tokens={{ childrenGap: 2 }}>
                <Stack horizontal verticalAlign="center">
                    <TextField
                        aria-labelledby={this.props.ariaLabelledBy}
                        value={displayGridValue(this.props.value)}
                        readOnly
                        placeholder={this.state.loading ? "Loading lookup…" : "Select a record"}
                        onKeyDown={(event) => {
                            if (!disabled && event.key === "Enter") { event.preventDefault(); void this.openLookup(); }
                        }}
                        styles={{ root: { flex: 1, minWidth: 0 }, fieldGroup: { borderColor: "#00814F" } }}
                        errorMessage={this.state.error}
                    />
                    <IconButton iconProps={{ iconName: "Search" }} ariaLabel={`Select ${label}`} title={`Select ${label}`}
                        disabled={disabled} onClick={() => { void this.openLookup(); }} styles={{ root: { color: "#00814F" } }} />
                    <IconButton iconProps={{ iconName: "Clear" }} ariaLabel={`Clear ${label}`} title={`Clear ${label}`}
                        disabled={disabled || !getLookupValue(this.props.value)} onClick={() => this.props.onChange(null)} />
                </Stack>
            </Stack>
        );
    }

    private async loadMetadata(): Promise<void> {
        const request = ++this.requestId;
        this.setState({ loading: true, editable: false, error: undefined });
        try {
            const metadata = await LookupMetadataService.getField(
                this.props.context.parameters.grid.getTargetEntityType(), this.props.column.name
            );
            if (!this.mounted || request !== this.requestId) return;
            const editable = this.props.isNew ? metadata.IsValidForCreate : metadata.IsValidForUpdate;
            this.setState({ loading: false, targets: metadata.Targets, editable,
                error: editable ? undefined : "This lookup is read-only." });
        } catch (error) {
            if (this.mounted && request === this.requestId) this.setState({ loading: false,
                error: error instanceof Error ? error.message : "Unable to load this lookup." });
        }
    }

    private async openLookup(): Promise<void> {
        if (this.props.disabled || this.state.loading || this.state.busy || !this.state.editable) return;
        const request = this.requestId;
        this.setState({ busy: true, error: undefined });
        try {
            const current = getLookupValue(this.props.value);
            const selected = await this.props.context.utils.lookupObjects({
                allowMultiSelect: false,
                entityTypes: this.state.targets,
                defaultEntityType: current?.entityType || this.state.targets[0]
            });
            if (this.mounted && request === this.requestId && selected?.length) this.props.onChange(selected[0]);
        } catch (error) {
            if (this.mounted && request === this.requestId) this.setState({
                error: error instanceof Error ? error.message : "Unable to open the lookup picker." });
        } finally {
            if (this.mounted && request === this.requestId) this.setState({ busy: false });
        }
    }
}
