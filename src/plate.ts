import { EventEmitter } from 'events';
import { Timer } from './timer';

export class Plate extends EventEmitter {
    readonly timers: { [id: string]: Timer } = {};
    verbose;

    constructor(verbose: boolean) {
        super()
        this.verbose = verbose;

        if (this.verbose) console.log("INFO: Created a new Plate.");
    }

    add(id: string, time: number) {
        this.timers[id] = new Timer(time);
        this.emit('add', [id, time]);

        //@ts-ignore You're right, but this scenario will never occur, SO SHUT UP
        this.timers[id].start().then(() => this.done(id));

        if (this.verbose) console.log("INFO: Added a new timer with ID " + id + " and time " + time + ".");//I felt like using +
    }

    pause(id: string) {
        if (this.timers[id]) {
            this.timers[id].pause();

            console.log("SUCCESS: Paused timer " + id + " with time remaining " + this.timers[id].rem + '.');
            this.emit('pause', id);

            return true;
        } else if (!this.timers[id].running) {
            console.error("ERROR: Timer with ID " + id + " is already paused.");

            return false;
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ".");

            return false;
        }
    }

    private done(id: string, wasPaused?: boolean) {
        if (this.timers[id]) {
            console.log("SUCCESS: Timer with ID " + id + " is done.");
            this.emit('fin', id);

            if (wasPaused) this.timers[id].rem = this.timers[id].set;

            return true;
        } else if (!this.timers[id].running) {
            if (this.verbose) console.error("INFO: Timer with ID " + id + " is paused.");

            return false;
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ".");

            return false;
        }
    }

    res(id: string) {
        if (!this.timers[id].running) {
            this.add(id, this.timers[id].rem);

            console.log("SUCCESS: Resumed timer " + id + " with time remaining " + this.timers[id].rem + '.');
            this.emit('res', id);

            return true;
        } else if (this.timers[id].running) {
            console.error("ERROR: Timer with ID " + id + " is already resumed.");

            return false;
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ".");

            return false;
        }
    }

    del(id: string) {
        if (this.timers[id]) {
            delete this.timers[id];

            console.log("SUCCESS: Deleted timer " + id + ".");
            this.emit('del', id);

            return true;
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ".");

            return false;
        }
    }
}