import { PiLedModel } from './Models/PiLedModel';
import { AzureLedTableStorage } from './azure/AzureLedTableStorage';
import { AzureConstants } from './constants/AzureConstants';
import { SenseService } from './sense/SenseService';
import { AzureIoTService } from './azure/AzureIoTService';
import { MessageHub } from './hub/MessageHub';

class Startup {
    senseService: SenseService = SenseService.getInstance();
    azureLedTableStorage: AzureLedTableStorage = AzureLedTableStorage.getInstance();
    azureIotService: AzureIoTService = AzureIoTService.getInstance();
    messageHub: MessageHub = MessageHub.getInstance();

    constructor() {
        this.senseService = SenseService.getInstance();
        this.azureLedTableStorage = AzureLedTableStorage.getInstance();
        this.azureIotService = AzureIoTService.getInstance();
        this.messageHub = MessageHub.getInstance();
    }

    main(): any {
        /*
            Design Note:
            1. Listen to messages from the message hub - notifiying that changes have been made to led storage model
            2. After message read from storage and show new led matrix
        */
        let ledModel = new PiLedModel(AzureConstants.LedMatrixPartition, AzureConstants.LedMatrixKey, AzureConstants.LedMatrixSize);
        this.senseService.turnOffBoardLeds();

        this.messageHub.subscribe((msg: any) => {
            console.log("Message Recieved: ", msg.data.toString());

            // for now ignore message content and just update the led matrix from storage data
            
            this.loadModelAndDisplay(ledModel);
        });
    }

    loadModelAndDisplay(ledModel: PiLedModel) {
        this.azureLedTableStorage.loadLedModel(ledModel, (ledModel) => {
            this.senseService.setBoardPixelsFromLedModel(ledModel);
        });
    }
}

new Startup().main();