# Spambot

## The most elegant and powerful discord.js based spambot written in TypeScript

### Requirements

- Node.js
- NPM/Yarn
- Babel

### Description

The most powerful and elegant discord.js spambot. It has features ranging from simple single message spamming to complex multi-message and multi-timing spamming. Yes, I did waste 1 week of my life making this. Written in TypeScript and has a decent amount of @ts-ignores but those are justifiable if you look where they are placed.

### Get started

1. Clone the repository with `git clone https://github.com/Skaytacium/Spambot.git`.
2. Run `npm i` or `yarn` depending on which one you use in the main git branch.
3. How to compile to javascript:
    - npm users: `npx babel src -d build -x .ts`
    - yarn users: `yarn babel src -d build -x .ts`
4. Copy ex.config.jsonc in the config directory, modify it, and save it as config.json in the same directory.
5. This is kind of sad, but the new stages update broke discord.js 11.6.4 (The one this project uses), do you need to add `if (channel != null)` in the beginning of line 81 in the file `node_modules/discord.js/src/client/ClientDataManager.js`.
6. Run `node build --help` to get started or look [here](HELP.md) *TODO*

### Developing

Look over [here](DEVELOP.md)

### Notice

This is only for educational purposes and should not be used for accounts. If you want to use it, go ahead and make a bot in the Discord API, log into to it and do stuff with it. Using it for personal accounts is against the Terms of Service and can get you banned. No warranty or liability is offered with this piece of software
