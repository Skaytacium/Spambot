console.log("INFO: Starting.");

import { Client, DMChannel, GroupDMChannel, TextChannel, User } from 'discord.js';
import { start, token } from '../config/config.json';
import { args } from './args';
import { Messenger } from './messenger';

let store: {
    channel: TextChannel | DMChannel | GroupDMChannel,
    author: User
};
const client = new Client();

if (!args.debug)
    client.login(token)
        .then(() => console.log("SUCCESS: Succesfully logged in."))
        .catch((res) => console.log(`ERROR: Couldn't log in, check your credentials.\
${args.verbose ? `\n${res}` : ''}`));

else console.log("INFO: Skipping login as debug is specified.");

const messenger = new Messenger( //@ts-ignore DUDE I AM CHECKING IF ITS NULL IN ARGS.TS BUDDY HELLO TYPESCRIPT BRUH?
    args.list ? args.list : args.msg,
    args.verbose,
    args.time,
    args.init,
    args.count,
);

messenger.on('send', msg => {
    if (!args.debug)
        store.channel.send(msg)
            .then(() => {
                if (args.verbose)
                    console.log("SUCCESSINFO: Sent message " + msg + '.');
            });
    else console.log("INFO: Send event emitted " + msg + ".")
});

if (!args.debug)
    client.on('message', (message) => {
        if (message.content == start) {
            if (args.verbose)
                console.log(`INFO: Received command at ${Date()} in ${message.channel.type == "text" //@ts-ignore	
                    ? `channel ${message.channel.name}.` //I think TS doesn't know about if statements
                    : `a DM channel.`
                    }`);

            store = {
                channel: message.channel,
                author: message.author
            };

            message.delete();
            messenger.start();
        }
    });

else messenger.start();