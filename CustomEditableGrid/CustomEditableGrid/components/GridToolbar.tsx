import * as React from "react";
import { DefaultButton, IButtonStyles, PrimaryButton, Stack } from "@fluentui/react";

const buttonStyles: Partial<IButtonStyles> = {
    root: { borderRadius: 6 }
};

export interface GridToolbarProps {
    selectedCount: number;
    selectedSavedCount: number;
    busy: boolean;
    editing: boolean;
    onNewRecord: () => void;
    onRefresh: () => void;
    onEditSelected: () => void;
    onDeleteSelected: () => void;
}

export class GridToolbar extends React.PureComponent<GridToolbarProps> {
    public render(): React.ReactNode {
        const { selectedCount, selectedSavedCount, busy, editing } = this.props;
        const savedSelection = selectedCount === selectedSavedCount;
        return (
            <Stack horizontal wrap verticalAlign="center" tokens={{ childrenGap: 6 }}>
                <PrimaryButton text="New" iconProps={{ iconName: "Add" }}
                    disabled={busy || editing} onClick={this.props.onNewRecord}
                    styles={{ root: { borderRadius: 6, background: "#00814F", borderColor: "#00814F" },
                        rootHovered: { background: "#005C39", borderColor: "#005C39" } }} />
                <DefaultButton text="Refresh" iconProps={{ iconName: "Refresh" }}
                    styles={buttonStyles}
                    disabled={busy} onClick={this.props.onRefresh} />
                <DefaultButton text="Edit" iconProps={{ iconName: "Edit" }}
                    styles={buttonStyles}
                    disabled={busy || selectedCount !== 1 || !savedSelection}
                    onClick={this.props.onEditSelected} />
                <DefaultButton text="Delete" iconProps={{ iconName: "Delete" }}
                    styles={buttonStyles}
                    disabled={busy || selectedCount < 1 || !savedSelection}
                    onClick={this.props.onDeleteSelected} />
            </Stack>
        );
    }
}
