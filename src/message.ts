export class Controller {
    msgList;
    count;

    constructor(msgList: {[key: string]: number}, count?: boolean) {
        this.msgList = msgList;
        if (count) this.count = count;
    }
}

export function start(controller: Controller) {
    console.log(controller);
}