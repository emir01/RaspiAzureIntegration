import { AzureConstants } from "../constants/AzureConstants";
import { MessageHub } from "../hub/MessageHub";

let Protocol = require('azure-iot-device-mqtt').Mqtt;
let Client = require('azure-iot-device').Client;
let Message = require('azure-iot-device').Message;

/*
    Maintain the Azure Connection
*/
export class AzureService {
    private static instance: AzureService;

    private client = Client.fromConnectionString(AzureConstants.ConnectionString, Protocol);

    private constructor() {
        console.log(AzureConstants.ConnectionString);

        this.client.open((err) => this.connectCallback(err));
    }

    static getInstance() {
        if (!AzureService.instance) {
            AzureService.instance = new AzureService();
        }

        return AzureService.instance;
    }

    private connectCallback(err) {
        if (err) {
            console.error('Could not connect: ' + err.message);
        } else {
            console.log('Client connected');
        }

        this.client.on('message', function (msg) {
            MessageHub.getInstance().notify(msg);
        });
    }

    sendMessage(data) {
        var messageData = {
            deviceId: AzureConstants.DeviceId,
            data: data
        }

        let jsonData = JSON.stringify(messageData);
        let message = new Message(jsonData);

        this.client.sendEvent(message, (err, response) => {
            if (err) console.log("SendMessage: error: " + err.toString());
            if (response) console.log("SendMessage: status: " + response.constructor.name);
        });
    }
}