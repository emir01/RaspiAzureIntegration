import { TableEntity } from "./TableEntity";
import { Colors } from "../constants/colors";

export class PiLEDModel extends TableEntity {
    size: number;
    matrix: Array<Array<number>> = new Array<Array<number>>();

    constructor(partition: string, key: string, size: number) {
        super(partition, key)
        this.size = size;

        for (var index = 0; index < this.size * this.size; index++) {
            this.matrix.push(Colors.Off);
        }
    }
}