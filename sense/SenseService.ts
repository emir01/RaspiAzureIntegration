import { Colors } from './../constants/colors';
var senseHatImu = require('node-sense-hat').Imu;
var senseLed = require("sense-hat-led");
var senseJoystick = require('sense-joystick');

export class SenseService {

    // ==== Singleton
    private static _service: SenseService;

    // ==== IMU Sensor
    private internalImu;

    // ==== Matrix Controls
    private readonly xMax: number = 8;
    private readonly yMax: number = 8;

    private pixelMatrix: Array<Array<number>>;

    // ==== Implementation

    static getInstance() {
        if (!this._service) {
            this._service = new SenseService();
        }

        return this._service;
    }

    private constructor() {
        this.internalImu = new senseHatImu.IMU();

        this.pixelMatrix = new Array<Array<number>>();

        for (var index = 0; index < this.xMax * this.yMax; index++) {
            this.pixelMatrix.push(Colors.Off);
        }
    }

    getTemperature(callback) {
        this.internalImu.getValue((err, data) => {
            callback(data.temperature);
        });
    }

    setPixel(x: number, y: number, playerColor: Array<number>) {
        var index = x * this.xMax + y;
        this.pixelMatrix[index] = playerColor;
        senseLed.setPixels(this.pixelMatrix);
    }
}


