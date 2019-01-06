import { Colors } from './../constants/colors';
import { PiLedModel } from '../Models/PiLedModel';
var senseHatImu = require('node-sense-hat').Imu;
var senseLed = require("sense-hat-led");
var senseJoystick = require('sense-joystick');

export class SenseService {

    // ==== Singleton
    private static _service: SenseService;

    // ==== IMU Sensor
    private internalImu: any;

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

    getNumberOfPixels() {
        return this.xMax * this.yMax;
    }

    getTemperature(callback: any) {
        this.internalImu.getValue((err: any, data: any) => {
            callback(data.temperature);
        });
    }

    randomizeFullPixelArray(numberOfPixels: number): Array<Array<number>> {
        let list = new Array<Array<number>>(numberOfPixels);
        
        for (let pixelIndex = 0; pixelIndex < list.length; pixelIndex++) {
            let pixelArray = list[pixelIndex];

            pixelArray = [
                Math.floor(Math.random() * Math.floor(255)),
                Math.floor(Math.random() * Math.floor(255)),
                Math.floor(Math.random() * Math.floor(255))
            ]

            list[pixelIndex] = pixelArray;
        }
        
        return list;
    }

    setPixel(x: number, y: number, playerColor: Array<number>) {
        var index = x * this.xMax + y;
        this.pixelMatrix[index] = playerColor;
        senseLed.setPixels(this.pixelMatrix);
    }

    setPixelsFromLedModel(ledModel: PiLedModel) {
        let matrix = ledModel.matrix;
        senseLed.setPixels(matrix);
    }
}


