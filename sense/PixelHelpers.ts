/*
    Utilities for Pixel Manipulation
*/

export class PixelHelpers {
    static setAllMatrixPixelsToColor(matrix: Array<Array<number>>, generatePixel: (index: number) => Array<number>) {
        for (let pixelIndex = 0; pixelIndex < matrix.length; pixelIndex++) {
            matrix[pixelIndex] = generatePixel(pixelIndex);
        }
    }

    static getRandomPixelArray(numberOfPixels: number): Array<Array<number>> {
        let list = new Array<Array<number>>(numberOfPixels);

        this.setAllMatrixPixelsToColor(list, () =>
            [
                Math.floor(Math.random() * Math.floor(255)),
                Math.floor(Math.random() * Math.floor(255)),
                Math.floor(Math.random() * Math.floor(255))
            ]);

        return list;
    }
}