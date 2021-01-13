import yargs from 'yargs/yargs'

export function paramparse(list: string[], allString: boolean): { [key: string]: number } {
    let tempObj: { [key: string]: number } = {};

    for (let i = 0; i < list.length; i++) {

        if (allString)
            tempObj[list[i].toString()] = 0;

        else if (typeof list[i] == 'string') { //@ts-ignore YOU HAVE TO BE JOKING BUDDY, NO WAY YOU'RE THIS DUMB
            if (typeof list[i + 1] == 'number') { tempObj[list[i]] = list[i + 1]; i++; }

            else tempObj[list[i]] = 0;
        }
    }

    return tempObj;
}

export const args = yargs(process.argv)
    .options({
        "msg": {
            alias: "m",
            describe: "(Use for simpler spams) The array of messages to send.",
            type: 'array'
        },
        "list": {
            alias: 'l',
            describe: "(Recommended) An entire list containing <msg> <time> ... <msg> <time> values.\
You can also only send <msg> values, which will use the value of the times field\
in the config if specified, or the default time. Use '' or \"\" to include numbers in <msg>.",
            type: 'array'
        },
        "time": {
            alias: "t",
            describe: "(Not necessary) Time to wait between each message. \
Also an alternative to defdelay in config. This is also used for adding new messages.",
            type: 'number'
        },
        "init": {
            alias: 'i',
            describe: "(Not necessary) The initial delay between sending messages \
so that discord doesn't rate limit them. Also an alternative to definit in config.",
            type: 'number'
        },
        "max": {
            alias: "x",
            describe: "(Not necessary) Set the maximum amount of messages to be sent. \
Also acts as a limiter for --count.",
            type: 'number'
        },
        "count": {
            alias: "c",
            describe: "Specify to count from 1 (or --start if specified) to infinity and beyond.",
            type: 'boolean'
        },
        "start": {
            alias: 's',
            describe: "Specify the starting number for --count, by default 1.",
            type: 'number'
        },
        "suppress": {
            alias: 'w',
            describe: "(Not recommended) Suppress warnings.",
            type: 'boolean'
        },
        "verbose": {
            alias: 'v',
            describe: "(Recommended for most people) Show more INFO, literally. If you don't like \
seeing too much text or it gives you a headache, don't use this.",
            type: 'boolean'
        },
        "debug": {
            alias: 'd',
            describe: "(Not recommended for non-devs) Turns off integration with discord and logs the \
messages instead. Unless you want to test stuff or your copy isn't working, it's not recommended \
to set this option as it also enables pre-beta/nightly features and other arcane things. \
Do not rely on this to even work at times.",
            type: 'boolean'
        }
    })
    .coerce('list', list => paramparse(list, false))
    .coerce('msg', msgs => paramparse(msgs, true))
    .check(argv => {
        if (!argv.list && !argv.msg && !argv.count)
            throw new Error("ERROR: Required 1 or more arguments, 0 found. Provide a list, message or specify --count to count.");

        if (!argv.suppress && !argv.time)
            console.error("WARNING: Didn't specify a --time parameter. Using defdelay in config if new timers are added.");

        if (argv.start && !argv.count && (argv.list || argv.msg))
            console.error("WARNING: Specified --start with a message or list, there will be no effect.");

        if (argv.debug)
            console.log("INFO: Starting in debug mode.");

        return true;
    })
    .epilogue('https://github.com/Skaytacium/Spambot. \
Fork, star and open a PR.')
    .help("help", "Shows available options.")
    .argv