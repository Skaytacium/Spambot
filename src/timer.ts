import { EventEmitter } from 'events';

export class Timer<T> extends Promise<T> {
    id: any;
    time;

    constructor(
        cb: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void,
        time: number,
        id: any,
    ) {
        super(cb)

        this.time = time;
        this.id = id;
        console.log(`Created a new timer with time ${time} and id ${id}`);
    }

    sleep(callback: () => void, ms: number) {
        const date = Date.now();
        let cur = date + ms;

        while (cur - date > 0)
            cur = Date.now();

        callback();
    }

    pause() {
        //TODO
        return "TODO";
    }
}

export class Plate extends EventEmitter {

    constructor() {
        super()

        console.log("Created a new Plate.");
    }

    add(id?: string) {
        //new Timer(res => )
    }
}