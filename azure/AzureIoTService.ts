import { AzureConstants } from "../constants/AzureConstants";
import { MessageHub } from "../hub/MessageHub";

let Protocol = require('azure-iot-device-mqtt').Mqtt;

let Client = require('azure-iot-device').Client;

let Message = require('azure-iot-device').Message;

/*
    Maintain the Azure Connection
*/

export class AzureIoTService {
    private static instance: AzureIoTService;

    private client = Client.fromConnectionString(AzureConstants.ConnectionString, Protocol);

    private constructor() {
        console.log(AzureConstants.ConnectionString);
        this.client.open((err: any) => this.connectCallback(err));
    }

    static getInstance() {
        if (!AzureIoTService.instance) {
            AzureIoTService.instance = new AzureIoTService();
        }

        return AzureIoTService.instance;
    }

    private connectCallback(err: any) {
        if (err) {
            console.error('Could not connect: ' + err.message);
        } else {
            console.log('Client connected');
        }

        this.client.on('message', function (msg: any) {
            MessageHub.getInstance().notify(msg);
        });
    }

    sendMessage(data: any) {
        var messageData = {
            deviceId: AzureConstants.DeviceId,
            data: data
        }

        let jsonData = JSON.stringify(messageData);
        let message = new Message(jsonData);

        this.client.sendEvent(message, (err: any, response: any) => {
            if (err) console.log("SendMessage: error: " + err.toString());
            if (response) console.log("SendMessage: status: " + response.constructor.name);
        });
    }
}