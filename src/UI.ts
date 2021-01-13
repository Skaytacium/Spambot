import yargs from 'yargs/yargs'
import { EventEmitter } from 'events'
import { createInterface } from 'readline'
import { commands } from '../config/config.json'

export class UIEvents extends EventEmitter {
    verbose;

    constructor(verbose: boolean, prompt?: string, tabsize?: number) {
        super()

        this.verbose = verbose;

        if (this.verbose) console.log(
            `INFO: Created a new user interface with prompt ${prompt ? prompt : '<none>'} and tabsize ${tabsize ? tabsize : 4}.`
        );

        createInterface({
            input: process.stdin,
            output: process.stdout,
            tabSize: tabsize ? tabsize : 4,
            prompt: prompt ? prompt : ''
        })
        .on('line', inp => {
            yargs(inp.split(" ")).argv;
        });
    }
}