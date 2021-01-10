console.log("INFO: Starting...");

import { Client, DMChannel, GroupDMChannel, TextChannel, User } from 'discord.js';
import { start, token } from '../config/config.json';
import { args } from './args';
import { Messenger } from './messenger';

let store: {
    channel: TextChannel | DMChannel | GroupDMChannel,
    author: User
};
const client = new Client();

client.login(token)
    .then(() => console.log("SUCCESS: Succesfully logged in."))
    .catch(() => console.log("ERROR: Couldn't log in, check your credentials."));

const messenger = new Messenger( //@ts-ignore DUDE I AM CHECKING IF ITS NULL IN ARGS.TS BUDDY HELLO TYPESCRIPT BRUH?
    args.list ? args.list : args.msg,
    args.verbose,
    args.time ? args.time : undefined,
    args.count,
);

messenger.on('send', msg => {
    store.channel.send(msg).then(sentmsg => {
        if (args.verbose) console.log("SUCCESSINFO: Sent message " + sentmsg.content);
    });
});

client.on('message', (message) => {
    if (message.content == start) {
        if (args.verbose)
            console.log(`INFO: Received command at ${Date()} in ${message.channel.type == "text" //@ts-ignore	
                ? `channel ${message.channel.name}.` //I think TS doesn't know about if statements
                : `a DM channel.`
                }`);

        message.delete();
        messenger.start();

        store = {
            channel: message.channel,
            author: message.author
        }
    }
});