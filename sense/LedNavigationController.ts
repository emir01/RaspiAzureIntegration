var senseLed = require("sense-hat-led");
var senseJoystick = require('sense-joystick');


import { Colors } from '../constants/colors';
import { Keys } from '../constants/keys';

export class LedNavigationController {
    private colorService = new Colors();

    private x: number = 0;
    private y: number = 0;

    private readonly xMax: number = 8;
    private readonly yMax: number = 8;

    private pixelMatrix: Array<Array<number>>;

    private playerColor: Array<number> = [255, 255, 255];

    private setLed(color: Array<number>) {
        senseLed.clear(color);
    }

    private ResetMatrix() {
        this.pixelMatrix = new Array<Array<number>>();

        for (var index = 0; index < this.xMax * this.yMax; index++) {
            this.pixelMatrix.push(Colors.Off);
        }
    }

    private SetCurrentPosition(x: number, y: number) {
        /*
            Given the following array and coordinates [1,1]
            [
                0, 0, 0, 0,
                0, X, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ]

            we need to calcualte the actual position in the one dim array:

            index = x * yMax + y

            Given xMax = 4 and yMax = 4

            index = 1 * 4 + 1 = 5

            Test Cases:
            [0, 0] = 0;
            [3, 3] = 13;
        */

        var index = x * this.xMax + y;
        this.pixelMatrix[index] = this.playerColor;
    }

    public boot() {
        this.ResetMatrix();
        this.SetCurrentPosition(this.x, this.y);
        senseLed.setPixels(this.pixelMatrix);

        senseJoystick.getJoystick()
            .then((joystick: any) => {
                joystick.on('press', (direction: any) => {
                    switch (direction) {
                        case Keys.Left:
                            this.y--;
                            if (this.y < 0) {
                                this.y = 0;
                            }

                            break;

                        case Keys.Right:
                            this.y++;
                            if (this.y > this.yMax - 1) {
                                this.y = this.yMax - 1;
                            }

                            break;

                        case Keys.Up:
                            this.x--;
                            if (this.x < 0) {
                                this.x = 0;
                            }

                            break;

                        case Keys.Down:
                            this.x++;
                            if (this.x > this.xMax - 1) {
                                this.x = this.xMax - 1
                            }

                            break;

                        case Keys.Click:
                            this.playerColor = this.colorService.GetRandomColor();
                            break;

                        default:
                            // do nothing
                            break;
                    }

                    console.log('Got button press in the direction: ', direction);

                    console.log("Current X: " + this.x);
                    console.log("Current Y: " + this.y);

                    this.ResetMatrix();
                    this.SetCurrentPosition(this.x, this.y);
                    senseLed.setPixels(this.pixelMatrix);
                });
            });
    }
}