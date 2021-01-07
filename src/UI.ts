import { EventEmitter } from 'events';
import { createInterface } from 'readline';

export const uievents = new EventEmitter()

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    tabSize: 4,
    prompt: ''
});

rl.on('line', inp => {
    let msg = inp.split(" ");

    switch (msg[0]) {
        case "stop" || "leave" || "exit" || "end" || "kill":
            console.log("Spam the world, my final message.");
            process.exit(0);
        case "pause" || "halt" || "wait":
            console.log("Paused spamming, type resume or continue to resume.");
            uievents.emit('pause');
            break;
        case "resume" || "continue":
            console.log("Resumed spamming.");
            uievents.emit('res');
            break;
        case "add" || "include":
            console.log("Added " + msg[1]);
            uievents.emit('add');
            break;
        case "delete" || "subtract" || "remove":
            console.log("Removed " + msg[1]);
            uievents.emit('del');
            break;
        default:
            console.error("Command not found.");
            break;
    }
});