import { GridRow, GridValue } from "../models/GridModels";
import { IInputs } from "../generated/ManifestTypes";

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
        columns.forEach((column) => {
            const value = row.values[column.name];
            if (row.isNew || !this.valuesAreEqual(value, row.originalValues[column.name])) {
                changes[column.name] = value instanceof Date ? value.toISOString() : value;
            }
        });

        if (row.isNew) {
            await context.webAPI.createRecord(entityName, changes);
        } else if (Object.keys(changes).length > 0) {
            await context.webAPI.updateRecord(entityName, row.id, changes);
        }
    }

    private static valuesAreEqual(left: GridValue, right: GridValue): boolean {
        if (left instanceof Date && right instanceof Date) {
            return left.getTime() === right.getTime();
        }
        return left === right;
    }
}
