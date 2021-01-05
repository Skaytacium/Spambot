import { Client } from 'discord.js';
import yargs from 'yargs';
import * as config from "../config/config.json";

const client = new Client();

// client.login(config.token)
//     .then(() => console.log("Succesfully logged in."))
//     .catch(() => console.log("Couldn't log in, check your credentials."));

const argv = yargs.argv;
console.log(argv);

client.on('message', (message) => {
    if (message.content == config.start) {
        console.log(`Received command at ${Date.now()} in ${
            message.channel.type == "text"					//@ts-ignore
            ? `channel ${message.channel.name}`				//@ts-ignore
            : `a DM with ${message.channel.recipient}`
        }`);
    }
});