import { EventEmitter } from 'events';

export class Timer {
    set;
    cur: number;
    was;

    constructor(future: number) {
        this.set = future;
        this.cur = Date.now();
        this.was = this.cur;

        this.wait();
    }

    private wait() {
        return new Promise(res => {
            const future = this.cur + this.set;

            while (future - this.cur) this.cur = Date.now();

            res(this.set);
        });
    }
}

export class Plate extends EventEmitter {
    readonly timers: { [id: string]: Timer | false } = {};
    readonly paused: { [id: string]: { cur: number, set: number, was: number } } = {};
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

        return this.timers[id];
    }

    private done(id: string, wasPaused?: boolean) {
        if (this.timers[id]) {
            console.log("SUCCESS: Timer with ID " + id + " is done.");
            this.emit('fin', id);

            if (wasPaused) {
                this.timers[id] = new Timer(this.paused[id].set);
                delete this.paused[id];
            }

            return true;
        } else if (this.timers[id] == false) {
            if (this.verbose) console.error("INFO: Timer with ID " + id + " is paused.");

            return false;
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ".");

            return false;
        }
    }

    public res(id: string) {
        if (this.timers[id]) { //@ts-ignore TYPESCRIPT THE IF STATEMENT IS ON THIS BLOODY LINE
            this.timers[id] = new Timer(this.paused[id].cur - this.paused[id].was);

            console.log("SUCCESS: Resumed timer " + id + ".");
            this.emit('res', id);

            return true;
        } else if (this.timers[id] != false) {
            console.error("ERROR: Timer with ID " + id + " is already resumed.");

            return false;
        } else {
            console.error("ERROR: Couldn't find timer with ID " + id + ".");

            return false;
        }
    }

    public pause(id: string) {
        if (this.timers[id]) { //@ts-ignore TYPESCRIPT THE IF STATEMENT IS ON THIS BLOODY LINE
            this.paused[id] = { cur: this.timers[id].cur, set: this.timers[id].set, was: this.timers[id].was };
            this.timers[id] = false;

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