import yargs from 'yargs/yargs';

function parse(list: any[], times?: number[]): { [key: string]: number } {
    let tempObj: { [key: string]: number } = {};

    for (let i = 0; i < list.length; i++) {
        
        if (typeof list[i] == 'string') //@ts-ignore TYPESCRIPT I AM CHECKING IF ITS A GODDAMN STRING YOU RETARDED PIECE OF SHIT
            tempObj[list[i]] = typeof list[i + 1] == 'number' ? list[i + 1] : 0;

        else tempObj[list[i]] = 0;
    }

    return tempObj;
}

export const args = yargs(process.argv)
    .options({
        "time": {
            alias: "t",
            describe: "Time to wait between each message",
            type: 'number'
        },
        "msg": {
            alias: "m",
            describe: "The array of messages to send",
            type: 'array'
        },
        "list": {
            alias: 'l',
            describe: "(Recommended) An entire list containing <msg> <time> ... <msg> <time> values,\
useful for specific timing. You can only send <msg> values, which will use the value of the times field\
in the config if specified, or the default time.",
            type: 'array'
        },
        "count": {
            alias: "c",
            describe: "Specify to count from 1 to infinity and beyond",
            type: 'boolean'
        },
        "verbose": {
            alias: 'v',
            describe: "Show more INFO, literally",
            type: 'boolean'
        }
    })
    .coerce(['list', 'msg'], parse)
    .check(argv => {
        if (!argv.list && !argv.msg)
            throw new Error("Required 1 or more arguments, 0 found. Provide a message or list.");

        else if (argv.msg && !argv.time) {
            console.error("Didn't specify a time parameter. Using defdelay in config.");
            return true;

        } else return true;
    })
    .help(true)
    .argv