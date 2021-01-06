import { Client } from 'discord.js';
import * as config from '../config/config.json';
import { args } from './args';
import * as messenger from './message';

const client = new Client();
// client.login(config.token)
//     .then(() => console.log("Succesfully logged in."))
//     .catch(() => console.log("Couldn't log in, check your credentials."));

messenger.start(new messenger.Controller(args.list ? args.list : process.exit(1)))

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