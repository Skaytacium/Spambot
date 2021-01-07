import { Client } from 'discord.js';
import * as config from '../config/config.json';
import { args } from './args';
import * as msger from './msgr';

const client = new Client();
// client.login(config.token)
//     .then(() => console.log("Succesfully logged in."))
//     .catch(() => console.log("Couldn't log in, check your credentials."));

//@ts-ignore DUDE I AM CHECKING IF ITS NULL IN ARGS.TS BUDDY HELLO TYPESCRIPT BRUH?
const messenger = new msger.Controller(args.list, args.count);

client.on('message', (message) => {
    if (message.content == config.start) {
        console.log(`Received command at ${Date()} in ${message.channel.type == "text" //@ts-ignore	
            ? `channel ${message.channel.name}.` //I think TS doesn't know about if statements
            : `a DM channel.`
            }`);
        message.delete();
    }
});