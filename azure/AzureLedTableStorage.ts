import { AzureHelpers } from './AzureHelpers';
import { PiLedModel } from '../Models/PiLedModel';
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
                console.log("!!! Error Creating Table !!!");
            }
        });
    }

    static getInstance() {
        if (!AzureLedTableStorage.instance) {
            AzureLedTableStorage.instance = new AzureLedTableStorage();
        }

        return AzureLedTableStorage.instance;
    }

    writeLedModel(model: PiLedModel) {
        this.tableService.insertOrReplaceEntity(this.tableName, model.serializeForStorage(), function (error, result, response) {
            if (error) {
                console.log(error);
            }
        });
    }

    loadLedModel(ledModel: PiLedModel, callback: (ledModel: PiLedModel) => any) {
        this.tableService.retrieveEntity(this.tableName, ledModel.PartitionKey, ledModel.RowKey, (error: any, result: any, response: any) => {
            if (!error) {
                var ledMatrixDto = AzureHelpers.mapMetadataToRegularObject(result);
                ledModel.mapFromDto(ledMatrixDto);

                callback(ledModel);
            }
        })
    }
}