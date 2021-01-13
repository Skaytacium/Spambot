import { times, defdelay, definit } from '../config/config.json'
import { UIEvents } from './UI'
import { paramparse } from './args'
import { Plate } from './plate'
import { EventEmitter } from 'events'
import { objsize } from './utils'
import { send } from 'process'

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

        else this.msgList = this.setDefaults(paramList);

        if (this.verbose) console.log( //@ts-ignore yeah ok this is right but i'll change this later
            `INFO: Created a new message manager with ${count ? "" : `${objsize(this.msgList)} message(s), `}
    a default time of ${time ? `${time}s` : `defdelay (${defdelay}s)`}, \
initializing time of ${this.init}ms and \
${count ? "counting turned on." : "counting turned off."}`);
    }

    private setDefaults(parsedParams: { [key: string]: number }) {
        let tempObj: { [key: string]: number } = {};

        for (let msg in parsedParams) {
            if (msg in times)   //@ts-ignore TYPESCRIPT YOU USELESS EXTRA BULKY SHIT
                tempObj[msg] = times[msg] * 1000;

            else if (parsedParams[msg])
                tempObj[msg] = Math.abs(parsedParams[msg]) * 1000;

            else tempObj[msg] = this.newTime;
        }

        return tempObj;
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
                    msgs.forEach(this.plate.pause);
                    break;

                case "add":
                    delay = this.init;
                    let sendAdd = this.setDefaults(paramparse(msgs, false));

                    for (const msg in sendAdd) {
                        this.plate.add(msg, delay).then(() => { //@ts-ignore Heard of not being a little shit sometimes?
                            this.msgList[msg] = sendAdd[msg];
                        });
                        delay += this.init;
                    }
                    break;

                case "res":
                    msgs.forEach(this.plate.res);
                    break;

                case "del":
                    msgs.forEach(this.plate.del);
                    break;
            }
        });

        this.plate.on('fin', id => {
            this.emit('send', id); //@ts-ignore TYPESCRIPT YOU CAN COMMIT SUICIDE
            this.plate.add(id, this.msgList[id] ? this.msgList[id] : this.newTime);
        });
    }
}