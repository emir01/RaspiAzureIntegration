import { SenseService } from './sense/SenseService';
import { AzureService } from './azure/AzureService';
import { MessageHub } from './hub/MessageHub';

class Startup {
    public static main(): number {
        let azureConnection = AzureService.getInstance();
        let senseService = SenseService.getInstance();
        let messageHub = MessageHub.getInstance();

        messageHub.subscribe(msg => {
            var object = JSON.parse(msg.data.toString());
            
            senseService.setPixel(object.x, object.y, object.color);
        });

        return 0;
    }
}

Startup.main();