export type GridLookup = ComponentFramework.LookupValue | ComponentFramework.EntityReference;
export type GridValue = string | number | boolean | Date | GridLookup | GridLookup[] | null | undefined;

export function isLookupColumn(column: ComponentFramework.PropertyHelper.DataSetApi.Column): boolean {
    return /lookup|customer|owner/.test((column.dataType || "").toLowerCase());
}

/** Dataset values can use either LookupValue or EntityReference. */
export function getLookupValue(value: GridValue): ComponentFramework.LookupValue | undefined {
    const candidate = Array.isArray(value) ? value[0] : value;
    if (!candidate || typeof candidate !== "object" || candidate instanceof Date || !("id" in candidate)) {
        return undefined;
    }
    const id = typeof candidate.id === "string" ? candidate.id : candidate.id.guid;
    const entityType = "entityType" in candidate ? candidate.entityType : candidate.etn;
    return id && entityType ? { id, entityType, name: candidate.name } : undefined;
}

export function displayGridValue(value: GridValue): string {
    if (value === null || value === undefined) return "";
    const lookup = getLookupValue(value);
    if (lookup) return lookup.name || lookup.id;
    return value instanceof Date ? value.toLocaleDateString() : String(value);
}

export interface GridRow {
    id: string;
    isNew: boolean;
    values: Record<string, GridValue>;
    originalValues: Record<string, GridValue>;
}
