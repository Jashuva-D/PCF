interface LookupRelationship {
    ReferencedEntity: string;
    ReferencingEntityNavigationPropertyName: string;
}

export interface LookupFieldMetadata {
    Targets: string[];
    IsValidForCreate: boolean;
    IsValidForUpdate: boolean;
    relationships: LookupRelationship[];
}

/** Dataverse Online model-driven host: metadata requests use the current org origin. */
export class LookupMetadataService {
    private static fields = new Map<string, Promise<LookupFieldMetadata>>();
    private static entitySets = new Map<string, Promise<string>>();

    public static getField(entityName: string, columnName: string): Promise<LookupFieldMetadata> {
        this.validateName(entityName);
        this.validateName(columnName);
        const key = `${window.location.origin}/${entityName}/${columnName}`;
        let pending = this.fields.get(key);
        if (!pending) {
            pending = this.loadField(entityName, columnName).catch((error: unknown) => {
                this.fields.delete(key);
                throw error;
            });
            this.fields.set(key, pending);
        }
        return pending;
    }

    public static getEntitySet(entityName: string): Promise<string> {
        this.validateName(entityName);
        const key = `${window.location.origin}/${entityName}`;
        let pending = this.entitySets.get(key);
        if (!pending) {
            pending = this.request<{ EntitySetName: string }>(
                `EntityDefinitions(LogicalName='${entityName}')?$select=EntitySetName`
            ).then((metadata) => {
                if (!metadata.EntitySetName) throw new Error(`Entity set unavailable for ${entityName}.`);
                return metadata.EntitySetName;
            }).catch((error: unknown) => {
                this.entitySets.delete(key);
                throw error;
            });
            this.entitySets.set(key, pending);
        }
        return pending;
    }

    public static getNavigationProperty(metadata: LookupFieldMetadata, target: string): string {
        const relationship = metadata.relationships.find((item) => item.ReferencedEntity === target);
        if (!relationship?.ReferencingEntityNavigationPropertyName) {
            throw new Error(`No lookup relationship was found for target table ${target}.`);
        }
        return relationship.ReferencingEntityNavigationPropertyName;
    }

    private static async loadField(entityName: string, columnName: string): Promise<LookupFieldMetadata> {
        const table = `EntityDefinitions(LogicalName='${entityName}')`;
        const [attribute, relationships] = await Promise.all([
            this.request<Omit<LookupFieldMetadata, "relationships">>(
                `${table}/Attributes(LogicalName='${columnName}')/Microsoft.Dynamics.CRM.LookupAttributeMetadata` +
                "?$select=Targets,IsValidForCreate,IsValidForUpdate"
            ),
            this.request<{ value: LookupRelationship[] }>(
                `${table}/ManyToOneRelationships?$select=ReferencedEntity,ReferencingEntityNavigationPropertyName` +
                `&$filter=ReferencingAttribute eq '${columnName}'`
            )
        ]);
        if (!attribute.Targets?.length) throw new Error(`Lookup targets unavailable for ${columnName}.`);
        return { ...attribute, relationships: relationships.value };
    }

    private static validateName(name: string): void {
        if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(name)) {
            throw new Error(`Unsupported logical name: ${name}. Related-table columns are read-only.`);
        }
    }

    private static async request<T>(path: string): Promise<T> {
        const response = await fetch(`/api/data/v9.2/${path}`, {
            credentials: "same-origin",
            headers: { Accept: "application/json", "OData-MaxVersion": "4.0", "OData-Version": "4.0" }
        });
        if (!response.ok) {
            throw new Error(`Unable to read lookup metadata (HTTP ${response.status}). Deploy this POC to a Dataverse Online model-driven app.`);
        }
        return response.json() as Promise<T>;
    }
}
