import { times, defdelay } from '../config/config.json'
import { UIEvents } from './UI'
import { Plate } from './plate'

export class Messenger {
    msgList;
    count;
    verbose;
    plate;
    ui;

    constructor(paramList: { [key: string]: number }, verbose: boolean, time?: number, count?: boolean) {
        this.verbose = verbose;
        this.plate = new Plate(verbose);
        this.ui = new UIEvents(verbose);

        if (count) this.count = count;

        else {
            this.msgList = paramList;

            for (let msg in paramList) { //@ts-ignore TYPESCRIPT YOU USELESS EXTRA BULKY SHIT
                if (msg in times) this.msgList[msg] = times[msg];
                else if (!this.msgList[msg]) this.msgList[msg] = time ? time : defdelay;
            }
        }

        if (this.verbose) console.log(`INFO: Created a new message manager with ${"bur"} messages, \
${time ? `a time of ${time}` : `default timings`} and ${count ? "counting turned on" : "counting turned off"}`);
    }

    start() {
        for (const msg in this.msgList) {
            this.plate.add(msg, this.msgList[msg] * 60000);
        }
    }
}