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

    async add(id: string, time: number) {
        this.timers[id] = new Timer(time);
        this.emit('add', [id, time]);

        if (this.verbose) console.log("INFO: Added a new timer with ID " + id + " and time " + time + "ms.");//I felt like using +

        //@ts-ignore You're right, but this scenario will never occur, SO SHUT UP
        return this.timers[id].start().then(() => this.done(id));
    }

    pause(id: string) {
        if (this.timers[id]) {
            if (this.timers[id]) {
                this.timers[id].pause();

                if (this.verbose)
                    console.log("SUCCESSINFO: Paused timer " + id + " with time remaining " + this.timers[id].rem + 'ms.');
                this.emit('pause', id);

                return true;
            } else if (this.timers[id] && !this.timers[id].running) {
                console.error("ERROR: Timer with ID " + id + " is already paused.");

                return false;
            }
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ", or it has been deleted.");

            return false;
        }
    }

    private done(id: string, wasPaused?: boolean) {
        if (this.timers[id]) {
            if (this.timers[id]) {
                if (this.verbose)
                    console.log("SUCCESSINFO: Timer with ID " + id + " is done.");

                this.emit('fin', id);

                if (wasPaused) this.timers[id].rem = this.timers[id].set;

                return true;
            } else if (!this.timers[id].running) {
                if (this.verbose) console.error("INFO: Timer with ID " + id + " is paused.");

                return false;
            }
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ", or it has been deleted.");

            return false;
        }
    }

    res(id: string) {
        if (this.timers[id]) {
            if (!this.timers[id].running) {
                this.add(id, this.timers[id].rem);

                if (this.verbose)
                    console.log("SUCCESSINFO: Resumed timer " + id + " with time remaining " + this.timers[id].rem + 'ms.');

                this.emit('res', id);

                return true;
            } else if (this.timers[id].running) {
                console.error("ERROR: Timer with ID " + id + " is already resumed.");

                return false;
            }
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ", or it has been deleted.");

            return false;
        }
    }

    del(id: string) {
        if (this.timers[id]) {
            delete this.timers[id];
            if (this.verbose)
                console.log("SUCCESSINFO: Deleted timer " + id + ".");

            this.emit('del', id);

            return true;
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ", or it has been deleted already.");

            return false;
        }
    }
}