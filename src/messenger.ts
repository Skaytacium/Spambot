import { times, defdelay } from '../config/config.json'
import { UIEvents } from './UI'
import { Timer } from './timer'

export class Messenger {
    msgList;
    count;

    constructor(paramList: { [key: string]: number }, time?: number, count?: boolean) {
        if (count) this.count = count;

        else {
            this.msgList = paramList;

            for (let msg in paramList) { //@ts-ignore TYPESCRIPT YOU USELESS EXTRA BULKY SHIT
                if (msg in times) this.msgList[msg] = times[msg];
                else if (!this.msgList[msg]) this.msgList[msg] = time ? time : defdelay;
            }
        }
    }

    start() {
        console.log(this);
    }
}