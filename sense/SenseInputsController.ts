var senseHatImu = require('node-sense-hat').Imu;
var IMU = new senseHatImu.IMU();

export class SenseInputController {

    private internalImu:any;

    public boot() {
        this.internalImu = new senseHatImu.IMU();

        setInterval(() => this.printValues(), 1000);
    }

    private printValues() {
        this.internalImu.getValue((err:any, data:any) => {
            console.log("Temp is: ", data.temperature);
        });
    }
}


