export class TableEntity {
    PartitionKey: string;
    RowKey: string

    constructor(partKey:string, rowKey:string) {
        this.PartitionKey = partKey;
        this.RowKey = rowKey;
    }
}