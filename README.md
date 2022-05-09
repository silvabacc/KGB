# Kerry Gobby Bergerson (WIP)
Discord bot that is definitely not monitoring and logging your hours

## Structure of KGB
![image](https://user-images.githubusercontent.com/47926269/167037675-64422691-427d-4c14-a1fe-06ba20603cb3.png)

This repoistory contains three applications, which are the `KGB Application`, `Backend API` and `Visualisation Web Application`. You can find the `KGB Application` at the root of this repository, the `Backend Api` inside `api` folder and the `Visualisation Web Application` in the `ui` folder.


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

