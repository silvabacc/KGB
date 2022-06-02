# Kerry Gobby Bergerson
Discord bot that is definitely not monitoring and logging your hours

My own version of the app working on my discord server [here](https://kgb-web.nasdiscordbots.repl.co) (Could take a while to load up, it's deployed on free tier servers)

My own version of the API working with [Swagger UI](https://kgb-api.nasdiscordbots.repl.co/api-docs/).

## Structure of KGB
![image](https://github.com/k-h-f/KGB/blob/master/docs/images/architecture.png)

This repoistory contains three applications, which are the `KGB Application`, `Backend API` and `Visualisation Web Application`. You can find the `KGB Application` at the root of this repository, the `Backend Api` inside `api` folder and the `Visualisation Web Application` in the `ui` folder.


# Prerequisites
* Node v16.15.0
* Set up your own Supabase project

# Set Up Bot
1. Install dependecies via `npm install`
2. Create an .env file and copy the values from env.defaults 
    * Add your Discord token in the .env. Guide on how to create a Discord token found [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
3. Run the application by `npm run dev`

# Set up Supabase
1. Go to [Supabase](https://app.supabase.io/) and set up your own personal project
2. Once setup, go onto the Database page and create a new table
   * Follow this schema [here](https://github.com/k-h-f/KGB/blob/master/docs/images/schema.png)

# Set Up API
1. Go into `api` folder
2. Install dependecies via `npm install`
3. Create an .env file and copy the values from env.defaults
   * Default port is `4000`
   * You can ignore the GCP variables as this project is moving away from Firebase
   * To get Supabase credentials (assuming you've followed the Set up Supabase step): 
      * go to the Supabase project dashboard [here](https://app.supabase.io/).
      * Go to APIs, then Authentication tab 
      * There you will see the `SUPABASE_URL` and `SUPABASE_KEY`. Use those values and save them in .env
4. Run the application either `npm run dev`
   * Ensure that you're in the `api` directory before starting

# Set Up UI
1. Go into `UI` folder
2. Install dependecies via `npm install`
3. You should update the variable `KGB_API_URL` in `ui/src/constants.ts` to either local API endpoint (http://localhost:4000 as default) or the currently deployed endpoint https://kgb-api.nasdiscordbots.repl.co/
4. Run the application either by `npm run dev` or `yarn dev`
   * Ensure that you're in the `ui` directory before starting
5. Your app should be opened at `localhost:3000`

# Linting
* Using ESLint and Prettier for formatting
* Both projects have linting
* Run `npm run lint` or `yarn lint` for manual linting

