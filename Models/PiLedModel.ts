import { TemperatureMeasuremenetMessage } from './AzureMessage';
import { TableEntity } from "./TableEntity";
import { Colors } from "../constants/colors";

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
        this.size = dto.size;
        this.matrix = JSON.parse(dto.matrix);
    }

    serializeForStorage(): object {
        var seriazible = {
            PartitionKey: this.PartitionKey,
            RowKey: this.RowKey,
            size: this.size,
            matrix: JSON.stringify(this.matrix)
        };

        return seriazible;
    }
}