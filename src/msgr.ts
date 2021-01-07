import { times, defdelay } from '../config/config.json'
import { uievents } from './UI'

export class Controller {
    msgList;
    count;

    constructor(paramList: { [key: string]: number }, count?: boolean) {
        if (count) this.count = count;
        
        else {
            this.msgList = paramList;

            for (let msg in paramList) { //@ts-ignore TYPESCRIPT YOU USELESS EXTRA BULKY SHIT
                if (msg in times) this.msgList[msg] = times[msg];
                else if (!this.msgList[msg]) this.msgList[msg] = defdelay;
            }
        }

        this.start();
    }

    start() {
        console.log(this);
    }
}