console.log("Starting...");

import { Client } from 'discord.js';
import { start, token } from '../config/config.json';
import { args } from './args';
import { Messenger } from './messenger';

const client = new Client();
// client.login(token)
//     .then(() => console.log("Succesfully logged in."))
//     .catch(() => console.log("Couldn't log in, check your credentials."));

const messenger = new Messenger( //@ts-ignore DUDE I AM CHECKING IF ITS NULL IN ARGS.TS BUDDY HELLO TYPESCRIPT BRUH?
    args.list ? args.list : args.msg,
    args.msg ? args.time : undefined,
    args.count
);

client.on('message', (message) => {
    if (message.content == start) {
        console.log(`Received command at ${Date()} in ${message.channel.type == "text" //@ts-ignore	
            ? `channel ${message.channel.name}.` //I think TS doesn't know about if statements
            : `a DM channel.`
            }`);

        message.delete();
        messenger.start();
    }
});