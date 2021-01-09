import { EventEmitter } from 'events';

export class Timer extends Promise<undefined>{
    id: string;
    time;

    constructor(
        time: number,
        id: string,
    ) {
        super((res) => { Timer.sleep(time); res(undefined); });

        this.time = time;
        this.id = id;
        console.log(`Created a new timer with time ${time} and id ${id}`);
    }

    static sleep(ms: number) {
        const date = Date.now();
        let future = date + ms;

        while (future - date > 0)
            future = Date.now();

        return true;
    }
}

export class Plate extends EventEmitter {
    readonly timers: { [id: string]: Timer } = {};

    constructor() {
        super()

        console.log("Created a new Plate.");
    }

    add(id: string, time: number) {
        this.timers[id] = new Timer(time, id);
        this.emit('add', [id, time]);
        console.log("Added a new timer with id " + id + " and time " + time); //I felt like using +
    }

    del(id: string) {
        if (this.timers[id]) {
            delete this.timers[id];
            this.emit('del', id);
            console.log("Deleted timer " + id);
        } else {
            console.error("Couldn't find timer with id " + id);
        }
    }
}