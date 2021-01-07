import { EventEmitter } from 'events';

export class Timer extends Promise {
    readonly timers: { [id: string]: number } = {};

    constructor(cb: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
        super(cb)
    }

    private sleep(callback: () => void, ms: number) {
        const date = Date.now();
        let cur = date;

        while (cur - date < ms)
            cur = Date.now();

        callback();
    }

    time(time: number, id: string) {

        if (!time) return new Error("Invalid time");

        else return new Promise(res => {

            this.timers.push(id);
            this.sleep(() => {
                this.emit(id);
                res(id);
            }, time);

        });
    }

    pause(id: string) {
        //TODO
        return "TODO";
    }
}

export class Plate extends EventEmitter {

}