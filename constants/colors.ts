export class Colors {
    public static White: Array<number> = [255, 255, 255];
    public static Off: Array<number> = [0, 0, 0];

    public GetRandomColor(): Array<number> {
        var color = [this.getRandomInRange(0, 255), this.getRandomInRange(0, 255), this.getRandomInRange(0, 255)];
        console.log(color);

        return color;
    }

    private getRandomInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}