import { times } from '../config/config.json'
export class Controller {
    msgList;
    count;

    constructor(paramList: { [key: string]: number }, useDefaults?: boolean, count?: boolean) {
        this.msgList = paramList;

        if (useDefaults) for (let msg in paramList) { //@ts-ignore TYPESCRIPT YOU USELESS EXTRA BULKY SHIT
            if (msg in times) this.msgList[msg] = times[msg];
        }

        if (count) this.count = count;
    }
}

export function start(controller: Controller) {
    console.log(controller);
}