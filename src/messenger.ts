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
    newTime;

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

        this.newTime = time ? time : defdelay;
        this.newTime *= 1000;

        this.init = init ? init : definit;
        this.init *= 1000;

        if (count) this.count = count;

        else {
            this.msgList = paramList;

            for (let msg in paramList) {
                if (msg in times) //@ts-ignore TYPESCRIPT YOU USELESS EXTRA BULKY SHIT
                    this.msgList[msg] = times[msg] * 1000;

                else if (!this.msgList[msg])
                    this.msgList[msg] = this.newTime * 1000;
            }
        }

        if (this.verbose) console.log( //@ts-ignore yeah ok this is right but i'll change this later
            `INFO: Created a new message manager with ${count ? "" : `${objsize(this.msgList)} message(s), `}
    a default time of ${time ? `${time}s` : `defdelay (${defdelay}s)`}, \
initializing time of ${this.init}s and \
${count ? "counting turned on." : "counting turned off."}`);
    }

    start() {
        if (this.verbose) console.log("INFO: Started message manager.");

        let delay = this.init;

        for (const msg in this.msgList) {
            this.plate.add(msg, delay);
            delay += this.init;
        }

        this.ui.on('ui', (event: string, msgs: string[]) => {
            switch (event) {
                case "pause":
                    msgs.forEach(msg => {
                        this.plate.pause(msg);
                    });
                    break;
                case "add":
                    console.log(this.newTime);
                    msgs.forEach(msg => {
                        this.plate.add(msg, this.newTime);
                    });
                    break;
                case "res":
                    msgs.forEach(msg => {
                        this.plate.res(msg);
                    });
                    break;
                case "del":
                    msgs.forEach(msg => {
                        this.plate.del(msg);
                    });
                    break;
            }
        });

        this.plate.on('fin', id => {
            this.emit('send', id); //@ts-ignore TYPESCRIPT YOU CAN SUCK MY D-
            this.plate.add(id, this.msgList[id] ? this.msgList[id] : this.newTime);
        });
    }
}