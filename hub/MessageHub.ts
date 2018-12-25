/*
    Maintain the Azure Connection
*/
export class MessageHub {
    private static instance: MessageHub;

    private _subscribers: Array<Function>;

    private constructor() {
        this._subscribers = new Array<Function>();
    }

    static getInstance() {
        if (!MessageHub.instance) {
            MessageHub.instance = new MessageHub();
        }

        return MessageHub.instance;
    }

    subscribe(callback: any) {
        this._subscribers.push(callback);
    }

    notify(message: any) {
        this._subscribers.forEach(callback => {
            callback(message);
        });
    }
}