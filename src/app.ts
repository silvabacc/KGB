import dotenv from 'dotenv';
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
client.login(DISCORD_TOKEN);
