import { GridRow, GridValue, getLookupValue, isLookupColumn } from "../models/GridModels";
import { IInputs } from "../generated/ManifestTypes";
import { LookupMetadataService } from "./LookupMetadataService";

export class GridDataService {
    public static async save(
        context: ComponentFramework.Context<IInputs>,
        row: GridRow,
        columns: ComponentFramework.PropertyHelper.DataSetApi.Column[]
    ): Promise<void> {
        const entityName = context.parameters.grid.getTargetEntityType();
        if (!entityName) {
            throw new Error("The dataset target table is unavailable.");
        }

        const changes: Record<string, unknown> = {};
        for (const column of columns) {
            if (column.name.includes(".")) continue; // Joined view columns belong to another table.
            const value = row.values[column.name];
            if (value === undefined || (row.isNew && value === null)) continue;
            if (!row.isNew && this.valuesAreEqual(value, row.originalValues[column.name])) continue;
            if ((column.dataType || "").toLowerCase().includes("partylist")) {
                throw new Error("Party list editing is not supported in this POC.");
            }
            if (isLookupColumn(column)) {
                const metadata = await LookupMetadataService.getField(entityName, column.name);
                if (!(row.isNew ? metadata.IsValidForCreate : metadata.IsValidForUpdate)) {
                    throw new Error(`${column.displayName || column.name} is read-only.`);
                }
                const selected = getLookupValue(value);
                if (selected) {
                    if (!metadata.Targets.includes(selected.entityType)) {
                        throw new Error(`Invalid lookup target for ${column.name}: ${selected.entityType}.`);
                    }
                    const id = selected.id.replace(/[{}]/g, "");
                    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
                        throw new Error(`Invalid record ID for ${column.name}.`);
                    }
                    const navigation = LookupMetadataService.getNavigationProperty(metadata, selected.entityType);
                    const entitySet = await LookupMetadataService.getEntitySet(selected.entityType);
                    changes[`${navigation}@odata.bind`] = `/${entitySet}(${id})`;
                } else if (value === null || (Array.isArray(value) && value.length === 0)) {
                    // Clearing polymorphic lookups must use the previous target's navigation property.
                    const original = getLookupValue(row.originalValues[column.name]);
                    if (original) {
                        changes[LookupMetadataService.getNavigationProperty(metadata, original.entityType)] = null;
                    } else if (!row.isNew && row.originalValues[column.name]) {
                        throw new Error(`Cannot identify the previous lookup target for ${column.name}.`);
                    }
                } else {
                    throw new Error(`Select a record using the lookup picker for ${column.name}.`);
                }
            } else {
                changes[column.name] = value instanceof Date ? value.toISOString() : value;
            }
        }

        if (row.isNew) {
            await context.webAPI.createRecord(entityName, changes);
        } else if (Object.keys(changes).length > 0) {
            await context.webAPI.updateRecord(entityName, row.id, changes);
        }
    }

    private static valuesAreEqual(left: GridValue, right: GridValue): boolean {
        const leftLookup = getLookupValue(left);
        const rightLookup = getLookupValue(right);
        if (leftLookup || rightLookup) {
            return !!leftLookup && !!rightLookup && leftLookup.entityType === rightLookup.entityType &&
                leftLookup.id.replace(/[{}]/g, "").toLowerCase() === rightLookup.id.replace(/[{}]/g, "").toLowerCase();
        }
        if (left instanceof Date && right instanceof Date) {
            return left.getTime() === right.getTime();
        }
        return left === right;
    }
}
