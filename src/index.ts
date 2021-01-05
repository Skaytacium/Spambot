import { Client } from 'discord.js';
import * as config from "../config/config.json";

const client = new Client();

client.login(config.token)
.then(() => console.log("Succesfully logged in."))
.catch(() => console.log("Couldn't log in, check your credentials."));