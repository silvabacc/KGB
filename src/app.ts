import dotenv from 'dotenv';
import { exec } from 'child_process';
dotenv.config();

// Require the necessary discord.js classes
import { Client, Intents } from 'discord.js';
import { getConfig } from './config/getConfig';
import EventHandler from './eventHandler';

const DISCORD_TOKEN = getConfig().DISCORD_TOKEN;

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]
});

const eventHandler = new EventHandler(client);
eventHandler.initEvents();

// Login to Discord with your client's token
client.login(DISCORD_TOKEN).catch((error) => {
  //Kill the current container if there was a problem connecting (a reset)
  exec('kill 1', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  //Attempt to reconnect after the kill. If this doesn't work, then something went horribly wrong
  client.login(DISCORD_TOKEN).catch((error) => console.log(error));
});
client.on('debug', (e) => console.log(e));
