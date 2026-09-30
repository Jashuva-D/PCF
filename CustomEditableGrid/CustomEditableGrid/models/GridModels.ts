export type GridValue = string | number | boolean | Date | null | undefined;

export interface GridRow {
    id: string;
    isNew: boolean;
    values: Record<string, GridValue>;
    originalValues: Record<string, GridValue>;
}
