import yargs from 'yargs/yargs';

function parse(parameter: unknown[]): {} {
    let tempObj: any;

    for (let i = 0; i < parameter.length; i += 2) {
        console.log(tempObj);
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
            type: 'array',
            coerce: parse
        },
        "count": {
            alias: "c",
            describe: "Specify to count from 1 to infinity and beyond",
            type: 'boolean'
        }
    })
    .check(argv => {
        if (!argv.list && !argv.msg) {
            console.log("Required 1 or more arguments, 0 found\nProvide a message or list");
            process.exit(1);
        } else return true
    })
    .help()
    .argv