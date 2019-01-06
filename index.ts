import { PiLedModel } from './Models/PiLedModel';
import { AzureLedTableStorage } from './azure/AzureLedTableStorage';
import { AzureConstants } from './constants/AzureConstants';
import { SenseService } from './sense/SenseService';
import { AzureService } from './azure/AzureService';
import { MessageHub } from './hub/MessageHub';

class Startup {
    public static main(): number {
        // let azureConnection = AzureService.getInstance();
        let senseService = SenseService.getInstance();
        let storage = AzureLedTableStorage.getInstance();

        // messageHub.subscribe(msg => {
        //     var object = JSON.parse(msg.data.toString());
        //     senseService.setPixel(object.x, object.y, object.color);
        // });

        let ledMatrixModel = new PiLedModel(AzureConstants.LedMatrixPartition, AzureConstants.LedMatrixKey, AzureConstants.LedMatrixSize);

        setInterval(() => {
            ledMatrixModel.matrix = senseService.randomizeFullPixelArray(senseService.getNumberOfPixels());
            senseService.setPixelsFromLedModel(ledMatrixModel);
        }, 200);

        // load it from storage
        // storage.loadLedModel(ledMatrixModel, (ledModel) => {
        //     senseService.setPixelsFromLedModel(ledModel);
        // });

        return 0;
    }
}

Startup.main();