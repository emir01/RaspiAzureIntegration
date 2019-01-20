import { SenseService } from './sense/SenseService';
import { AzureConstants } from './constants/AzureConstants';
import { AzureIoTService } from './azure/AzureIoTService';
import { MessageHub } from './hub/MessageHub';
import { AzureLedTableStorage } from './azure/AzureLedTableStorage';
import { PiLedModel } from './Models/PiLedModel';
import { Strings } from './constants/Strings';

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

        this.loadModelAndDisplay(ledModel);

        this.messageHub.subscribe((msg: any) => {
            if(msg.data.toString() == Strings.MESSAGE_REFRESH){
                this.loadModelAndDisplay(ledModel);
            }
        });
    }

    loadModelAndDisplay(ledModel: PiLedModel) {
        console.log("LMAD");
        let model = ledModel;
        this.azureLedTableStorage.loadLedModel(ledModel, (ledModel) => {
            console.log("LMAD:SUCCESS");
            this.senseService.setBoardPixelsFromLedModel(ledModel);
        }, ()=>{
            console.log("LMAD:ERROR");
            this.loadModelAndDisplay(model);
        });
    }
}

new Startup().main();