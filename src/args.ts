import yargs from 'yargs/yargs';

function parse(list: string[] | number[]): { [key: string]: number } {
    let tempObj: { [key: string]: number } = {};

    for (let i = 0; i < list.length; i++) {

        if (typeof list[i] == 'string') //@ts-ignore TYPESCRIPT I AM CHECKING IF ITS A GODDAMN STRING YOU RETARDED PIECE OF SHIT
            tempObj[list[i]] = typeof list[i + 1] == 'number'
            ? list[i + 1]
            : 0;

        else continue;
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
            describe: "An entire list containing <msg> <time> ... <msg> <time> values, useful for specific timing",
            type: 'array'
        },
        "count": {
            alias: "c",
            describe: "Specify to count from 1 to infinity and beyond",
            type: 'boolean'
        }
    })
    .coerce('list', parse)
    .check(argv => {
        if (!argv.list && !argv.msg) {
            console.log("Required 1 or more arguments, 0 found\nProvide a message or list");
            process.exit(1);
        } else return true
    })
    .help(true)
    .argv