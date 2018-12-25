import { PiLEDModel } from './PiLedModel';
import { TableEntity } from "./TableEntity";

export class PiLEDStorageModel extends TableEntity {
    size: number;
    matrix: string;
    
    constructor(ledModel:PiLEDModel) {
        super(ledModel.PartitionKey, ledModel.RowKey)
        this.size = ledModel.size;
        this.matrix = JSON.stringify(ledModel.matrix)
    }
}