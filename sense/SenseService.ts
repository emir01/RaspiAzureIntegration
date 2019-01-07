import { Colors } from './../constants/colors';
import { PiLedModel } from '../Models/PiLedModel';
import { PixelHelpers } from './PixelHelpers';

var senseHatImu = require('node-sense-hat').Imu;
var senseLed = require("sense-hat-led");
var senseJoystick = require('sense-joystick');

export class SenseService {
    private static _service: SenseService;

    private internalImu: any;

    private readonly xMaxBoard: number = 8;
    private readonly yMaxBoard: number = 8;
    private pixelMatrix: Array<Array<number>>;

    static getInstance() {
        if (!this._service) {
            this._service = new SenseService();
        }

        return this._service;
    }

    private constructor() {
        this.internalImu = new senseHatImu.IMU();
        this.pixelMatrix = new Array<Array<number>>(this.xMaxBoard * this.yMaxBoard);

        this.turnOffBoardLeds();
    }

    getNumberOfPixelsOfCurrentBoard() {
        return this.xMaxBoard * this.yMaxBoard;
    }

    getTemperature(callback: any) {
        this.internalImu.getValue((err: any, data: any) => {
            callback(data.temperature);
        });
    }

    turnOffBoardLeds() {
        PixelHelpers.setAllMatrixPixelsToColor(this.pixelMatrix, () => Colors.Off)
        senseLed.setPixels(this.pixelMatrix);
    }

    setBoardPixelsFromLedModel(ledModel: PiLedModel) {
        let matrix = ledModel.matrix;
        senseLed.setPixels(matrix);
    }
}


