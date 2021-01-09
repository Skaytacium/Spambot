import { EventEmitter } from 'events';
import { createInterface } from 'readline';
import { commands } from '../config/config.json';

export class UIEvents extends EventEmitter {
    verbose;

    constructor(verbose: boolean, prompt?: string, tabsize?: number) {
        super()

        this.verbose = verbose;

        if (this.verbose) console.log(`
        INFO: Created a new user interface with prompt ${prompt ? prompt : '<none>'} and tabsize ${tabsize ? tabsize : 4}`
        );

        createInterface({
            input: process.stdin,
            output: process.stdout,
            tabSize: tabsize ? tabsize : 4,
            prompt: prompt ? prompt : ''
        })
            .on('line', inp => {
                let msg = inp.split(" ");

                switch (true) { //Clever trick from Gumbo https://stackoverflow.com/users/53114/gumbo
                    case (commands.exit.includes(msg[0])): //even though he recommended against it
                        console.log("Spam the world, my final message.");
                        process.exit(0);

                    case (commands.pause.includes(msg[0])):
                        if (msg[1]) {

                            if (this.verbose) console.log("INFO: Paused spamming, type resume or continue to resume.");
                            this.emit('pause');

                        } else console.error("Provide an ID or specify 'all'.");
                        break;

                    case (commands.resume.includes(msg[0])):
                        if (msg[1]) {

                            if (this.verbose) console.log("INFO: Resumed spamming.");
                            this.emit('res');

                        } else console.error("Provide an ID.")
                        break;

                    case (commands.add.includes(msg[0])):
                        if (msg[1]) {

                            if (this.verbose) console.log("INFO: Added " + msg[1]);
                            this.emit('add');

                        } else console.error("Provide an ID.")
                        break;

                    case (commands.delete.includes(msg[0])):
                        if (msg[1]) {

                            if (this.verbose) console.log("INFO: Removed " + msg[1]);
                            this.emit('del');

                        } else console.error("Provide an ID or specify 'all'")
                        break;

                    case (commands.help.includes(msg[0])):
                        console.log(commands);
                        break;

                    default:
                        console.error("ERROR: Command not found.");
                        break;
                }
            });
    }
}