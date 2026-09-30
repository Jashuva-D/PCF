import * as React from "react";
import { IconButton, Stack } from "@fluentui/react";

export interface GridRowActionsProps {
    isEditing: boolean;
    disabled: boolean;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
}

const iconButtonStyles = {
    root: { color: "#00814F", width: 32, height: 32 },
    rootHovered: { color: "#005C39", background: "#DFF1E8" }
};

export class GridRowActions extends React.PureComponent<GridRowActionsProps> {
    public render(): React.ReactNode {
        if (this.props.isEditing) {
            return (
                <Stack horizontal tokens={{ childrenGap: 2 }}>
                    <IconButton
                        ariaLabel="Save row"
                        title="Save row"
                        iconProps={{ iconName: "CheckMark" }}
                        styles={iconButtonStyles}
                        disabled={this.props.disabled}
                        onClick={this.props.onSave}
                    />
                    <IconButton
                        ariaLabel="Cancel row changes"
                        title="Cancel row changes"
                        iconProps={{ iconName: "Cancel" }}
                        styles={iconButtonStyles}
                        disabled={this.props.disabled}
                        onClick={this.props.onCancel}
                    />
                </Stack>
            );
        }

        return (
            <IconButton
                ariaLabel="Edit row"
                title="Edit row"
                iconProps={{ iconName: "Edit" }}
                styles={iconButtonStyles}
                onClick={this.props.onEdit}
            />
        );
    }
}
