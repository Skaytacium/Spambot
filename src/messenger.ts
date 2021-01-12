import { times, defdelay, definit } from '../config/config.json'
import { UIEvents } from './UI'
import { Plate } from './plate'
import { EventEmitter } from 'events';
import { objsize } from './utils';

export class Messenger extends EventEmitter {
    msgList;
    count;
    init;
    verbose;
    plate;
    ui;

    constructor(
        paramList: { [key: string]: number },
        verbose: boolean,
        time?: number,
        init?: number,
        count?: boolean
    ) {
        super();

        this.verbose = verbose;
        this.plate = new Plate(verbose);
        this.ui = new UIEvents(verbose);
        this.init = init ? init : definit;

        if (count) this.count = count;
        
        else {
            this.msgList = paramList;

            for (let msg in paramList) {
                if (msg in times) //@ts-ignore TYPESCRIPT YOU USELESS EXTRA BULKY SHIT
                    this.msgList[msg] = times[msg] * 1000;

                else if (!this.msgList[msg])
                    this.msgList[msg] = (time ? time : defdelay) * 1000;
            }
        }

        if (this.verbose) console.log( //@ts-ignore yeah ok this is right but i'll change this later
            `INFO: Created a new message manager with ${count ? "" : `${objsize(this.msgList)} messages, `}\
a default time of ${time ? `${time}` : `defdelay (config)`} and ${count ? "counting turned on." : "counting turned off."}`);
    }

    start() {
        for (const msg in this.msgList) {
            this.plate.add(msg, this.msgList[msg]);
            this.emit('send', msg);
        }
    }
}