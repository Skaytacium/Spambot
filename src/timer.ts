import { EventEmitter } from 'events';

function timer(time: number) {
    return new Promise(res => {
        setTimeout(res, time);
    });
}

export class Plate extends EventEmitter {
    readonly timers: { [id: string]: Promise<any> } = {};

    constructor() {
        super()

        console.log("Created a new Plate.");
    }

    public add(id: string, time: number) {
        this.timers[id] = timer(time);
        this.emit('add', [id, time]);

        this.timers[id].then(() => { this.done(id) });

        console.log("Added a new timer with ID " + id + " and time " + time); //I felt like using +
    }

    private done(id: string) {
        console.log("Timer with ID " + id + " is done");
        this.emit('fin', id);
    }

    public del(id: string) {
        if (this.timers[id]) {
            delete this.timers[id];
            this.emit('del', id);

            console.log("Deleted timer " + id);

            return true;
        } else {
            console.error("Couldn't find timer with ID " + id);
            return false;
        }
    }
}