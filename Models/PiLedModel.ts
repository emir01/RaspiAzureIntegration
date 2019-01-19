import { Colors } from './../constants/colors';
import { TableEntity } from './TableEntity';
export class PiLedModel extends TableEntity {
    size: number;
    matrix: Array<Array<number>> = new Array<Array<number>>();

    constructor(partition: string, key: string, size: number) {
        super(partition, key)

        this.size = size;

        for (var index = 0; index < this.size * this.size; index++) {
            this.matrix.push(Colors.Off);
        }
    }

    mapFromDto(dto: any) {
        this.size = dto.Size;
        this.matrix = JSON.parse(dto.Matrix);
    }

    serializeForStorage(): object {
        var seriazible = {
            PartitionKey: this.PartitionKey,
            RowKey: this.RowKey,
            Size: this.size,
            Matrix: JSON.stringify(this.matrix)
        };

        return seriazible;
    }
}