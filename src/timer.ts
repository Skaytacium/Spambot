export class Timer { //@ts-ignore WE'RE FINE WITH THAT BUDDY
    private timeout: NodeJS.Timeout;
    running;
    set;
    rem: number;
    was;

    constructor(future: number) {
        this.set = future;
        this.rem = future;
        this.was = Date.now();
        this.running = false;
    }

    start() {
        return new Promise(res => {
            this.timeout = setTimeout(res, this.rem);
        });
    }

    pause() {
        this.running = false;
        clearTimeout(this.timeout)
        this.rem -= Date.now() - this.was;

        return this.rem;
    }

    resume() {
        this.running = true;
        return new Promise(res => {
            this.timeout = setTimeout(res, this.rem);
        });
    }
}