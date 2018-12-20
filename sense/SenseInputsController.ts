var senseHatImu = require('node-sense-hat').Imu;
var IMU = new senseHatImu.IMU();

export class SenseInputController {

    private internalImu;

    public boot() {
        this.internalImu = new senseHatImu.IMU();

        setInterval(() => this.printValues(), 1000);
    }

    private printValues() {
        this.internalImu.getValue((err, data) => {
            console.log("Temp is: ", data.temperature);
        });
    }
}


