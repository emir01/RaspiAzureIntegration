import { PiLEDStorageModel } from './../Models/PiLedStorageModel';
import { PiLEDModel } from '../Models/PiLedModel';
import { AzureConstants } from "../constants/AzureConstants";

import * as Azure from "azure-storage";

// todo Make it generic for any table - This one does not have to be a singleton 
export class AzureLedTableStorage {
    private static instance: AzureLedTableStorage;

    private tableService: Azure.TableService;

    private tableName = "piledboard"

    private constructor() {
        this.tableService = Azure.createTableService(AzureConstants.DataConnectionString);

        this.tableService.createTableIfNotExists(this.tableName, function (error: any, result: any, response: any) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }

    static getInstance() {
        if (!AzureLedTableStorage.instance) {
            AzureLedTableStorage.instance = new AzureLedTableStorage();
        }

        return AzureLedTableStorage.instance;
    }

    writeLedModel(model: PiLEDModel) {

        this.tableService.insertOrReplaceEntity(this.tableName, new PiLEDStorageModel(model), function (error, result, response) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }

    loadLedModel(ledModel: PiLEDModel, callback: (ledModel: PiLEDModel) => any) {
        // todo:!
    }
}