# Kerry Gobby Bergerson (WIP)
Discord bot that is definitely not monitoring and logging your hours

This repoistory contains two node.js applications, the bot (at root project) and the api (inside `api` folder). 

# Prerequisites
* Node v16.15.0

# Set Up Bot
1. Install dependecies via `npm install`
2. Create an .env file and copy the values from env.defaults 
    * Add your Discord token in the .env. Guide on how to create a Discord token found [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
3. Run the application either by `npm run dev` or `yarn dev`

# Set Up API
1. Go into `api` folder
2. Install dependecies via `npm install`
3. Create an .env file and copy the values from env.defaults
   * Default port is `4000`
4. Run the application either by `npm run dev` or `yarn dev`
   * Ensure that you're in the `api` directory before starting

# Linting
* Using ESLint and Prettier for formatting
* Both projects have linting
* Run `npm run lint` or `yarn lint` for manual linting

