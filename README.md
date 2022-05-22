# Kerry Gobby Bergerson
Discord bot that is definitely not monitoring and logging your hours

My own version of the app working on my discord server [here](https://kgb-web.nasdiscordbots.repl.co)
My own version of the API working with [Swagger UI](https://kgb-api.nasdiscordbots.repl.co/api-docs/).

## Structure of KGB
![image](https://user-images.githubusercontent.com/47926269/167037675-64422691-427d-4c14-a1fe-06ba20603cb3.png)

This repoistory contains three applications, which are the `KGB Application`, `Backend API` and `Visualisation Web Application`. You can find the `KGB Application` at the root of this repository, the `Backend Api` inside `api` folder and the `Visualisation Web Application` in the `ui` folder.


# Prerequisites
* Node v16.15.0
* Set up your own personal Firebase Firestore project

# Set Up Bot
1. Install dependecies via `npm install`
2. Create an .env file and copy the values from env.defaults 
    * Add your Discord token in the .env. Guide on how to create a Discord token found [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
3. Run the application by `npm run dev`

# Set Up API
1. Go into `api` folder
2. Install dependecies via `npm install`
3. Create an .env file and copy the values from env.defaults
   * Default port is `4000`
   * To get GCP environment credentials, you need to get them from Firebase. You can view all service accounts associated with your project in the Service accounts tab of your settings > Project Settings in the Firebase console. You generate a new key which you can download a JSON file. Use this JSON file to fill in the GCP variables
4. Run the application either `npm run dev`
   * Ensure that you're in the `api` directory before starting

# Set Up UI
1. Go into `UI` folder
2. Install dependecies via `npm install`
3. You should update the variable `KGB_API_URL` in `ui/src/constants.ts` to either local API endpoint (http://localhost:4000 as default) or the currently deployed endpoint https://kgb-api.herokuapp.com/
4. Run the application either by `npm run dev` or `yarn dev`
   * Ensure that you're in the `ui` directory before starting
5. Your app should be opened at `localhost:3000`

# Linting
* Using ESLint and Prettier for formatting
* Both projects have linting
* Run `npm run lint` or `yarn lint` for manual linting

