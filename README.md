# Travel app

## Description

It is a Travel app which gives information about the destination you want to travel and help you plan your trip better.

## Tech stack

-   Webpack
-   Webpack Loaders and Plugins
-   Sass styles
-   HTML/CSS layouts and page design
-   API Server

## Getting started

Clone or fork the project, you will still need to install everything:

cd into your new folder and run:

`npm install`
`npm run start`
go to http://localhost:3000/

To run the project on the development webpack server, open the terminal in the root directory and run the command
`npm run build-dev`

To run the project on the production server, open terminal in the root directory and run the command
`npm run build-prod`

## Setting up the API

You will need to go :

-   Geoname API [here](http://www.geonames.org/)
-   Weatherbit API [here](https://www.weatherbit.io/)
-   Pixabay API [here](https://pixabay.com/api/docs/)
-   Signing up will get you an API key
-   **create** .env file to match api keys in server.js :rocket:

```
   geonamesUsername ='********'
   pixabayApiKey=20731488-****************
   weatherbitApiKey=*********************

```
