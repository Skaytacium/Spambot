import { Client } from 'discord.js';
import * as config from '../config/config.json';
import { args } from './args';
import * as messenger from './message';

const client = new Client();
// client.login(config.token)
//     .then(() => console.log("Succesfully logged in."))
//     .catch(() => console.log("Couldn't log in, check your credentials."));

//@ts-ignore DUDE I AM CHECKING IF ITS NULL IN ARGS.TS BUDDY HELLO TYPESCRIPT BRUH?
messenger.start(new messenger.Controller(args.list, true, args.count));

client.on('message', (message) => {
    if (message.content == config.start) {
        console.log(`Received command at ${Date()} in ${
            message.channel.type == "text"					//@ts-ignore
            ? `channel ${message.channel.name}`				//@ts-ignore
            : `a DM channel`
        }`);
        message.delete();
    }
});