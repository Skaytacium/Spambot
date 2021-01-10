import yargs from 'yargs/yargs';

function parse(list: any[], allString?: boolean): { [key: string]: number } {
    let tempObj: { [key: string]: number } = {};

    for (let i = 0; i < list.length; i++) {

        if (allString) {
            tempObj[list[i].toString()] = 0;
        }

        else if (typeof list[i] == 'string') {
            if (typeof list[i + 1] == 'number') { tempObj[list[i]] = list[i + 1]; i++; }

            else tempObj[list[i]] = 0;
        }
    }

    return tempObj;
}

export const args = yargs(process.argv)
    .options({
        "time": {
            alias: "t",
            describe: "(Recommended, not necessary) Time to wait between each message. \
Also an alternative to defdelay in config.",
            type: 'number'
        },
        "msg": {
            alias: "m",
            describe: "(Use for simpler spams) The array of messages to send",
            type: 'array'
        },
        "list": {
            alias: 'l',
            describe: "(Recommended) An entire list containing <msg> <time> ... <msg> <time> values.\
You can also only send <msg> values, which will use the value of the times field\
in the config if specified, or the default time. Use '' or \"\" to include numbers in <msg>",
            type: 'array'
        },
        "count": {
            alias: "c",
            describe: "Specify to count from 1 to infinity and beyond",
            type: 'boolean'
        },
        "suppress": {
            alias: 'w',
            describe: "(Not recommended) Suppress warnings",
            type: 'boolean'
        },
        "verbose": {
            alias: 'v',
            describe: "(Recommended for most people) Show more INFO, literally. If you don't like \
seeing too much text or it gives you a headache, don't use this.",
            type: 'boolean'
        }
    })
    .coerce('list', list => parse(list, false))
    .coerce('msg', msgs => parse(msgs, true))
    .check(argv => {
        if (!argv.list && !argv.msg)
            throw new Error("ERROR: Required 1 or more arguments, 0 found. Provide a message or list.");

        else if (!argv.suppress && !argv.time) {
            console.error("WARNING: Didn't specify a --time parameter. Using defdelay in config.");
            return true;
        }

        else return true;
    })
    .help(true)
    .argv