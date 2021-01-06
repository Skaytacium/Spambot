export class Controller {
    msgArray;
    time;
    count;

    constructor(msgArray: string[], time: number | number[], count: boolean) {
        this.msgArray = msgArray;
        this.time = time;
        this.count = count;
    }
}

export function start(controller: Controller) {

}