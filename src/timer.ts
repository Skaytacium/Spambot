import { EventEmitter } from 'events';

export class Timer {
    cur: number;
    future;

    constructor(future: number) {
        this.future = future;
        this.cur = Date.now();
    }

    public wait() {
        return new Promise(res => {
            const future = this.cur + this.future;

            while (future - this.cur) this.cur = Date.now();

            res(this.future);
        });
    }
}

export class Plate extends EventEmitter {
    readonly timers: { [id: string]: Timer | false } = {};
    readonly paused: { [id: string]: { cur: number, future: number } } = {};
    verbose;

    constructor(verbose: boolean) {
        super()
        this.verbose = verbose;

        if (this.verbose) console.log("INFO: Created a new Plate.");
    }

    public add(id: string, time: number) {
        this.timers[id] = new Timer(time);
        this.emit('add', [id, time]);

        //@ts-ignore You're right, but this scenario will never occur, SO SHUT UP
        this.timers[id].then(() => { this.done(id) });

        if (this.verbose) console.log("INFO: Added a new timer with ID " + id + " and time " + time + ".");//I felt like using +
    }

    private done(id: string) {
        if (this.timers[id]) {
            console.log("SUCCESS: Timer with ID " + id + " is done.");
            this.emit('fin', id);

            return true;
        } else if (this.timers[id] == false) {
            if (this.verbose) console.error("INFO: Timer with ID " + id + " is paused.");

            return false;
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ".");

            return false;
        }
    }

    public pause(id: string) {
        if (this.timers[id]) { //@ts-ignore TYPESCRIPT THE IF STATEMENT IS ON THIS BLOODY LINE
            this.paused[id] = { cur: this.timers[id].cur, future: this.timers[id].future };

            console.log("SUCCESS: Paused timer " + id + ".");
            this.emit('pause', id);

            return true;
        } else if (this.timers[id] == false) {
            console.error("ERROR: Timer with ID " + id + " is already paused.");

            return false;
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ".");

            return false;
        }
    }

    public del(id: string) {
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