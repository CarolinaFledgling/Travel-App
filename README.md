
#  Travel app

## Description 
It is a Travel app which gives weather information, image about the destination you want to travel and Countdown Timer that counts down in seconds, minutes, hours and days to the date of your travel. 

## The goal of this project is to practice:

* Vanilla JS
* Setting up Webpack
* Sass styles
* Webpack Loaders and Plugins
* Creating layouts and page design
* Setup localhost server
* Using APIs and creating requests to external URLs


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
- Geoname API [here](http://www.geonames.org/)
- Weatherbit API [here](https://www.weatherbit.io/)
- Pixabay API [here](https://pixabay.com/api/docs/)
- Signing up will get you an API key 
- **create** .env file to match api keys in server.js :rocket:
```
   geonamesUsername ='********'
   pixabayApiKey=20731488-****************
   weatherbitApiKey=*********************

```


## ProTip ⚡️
You can use Axios instead of fetch. It's a promise-based HTTP client for the browser and node.js. It has a number of benefits over fetch.
Here are some of them:

- Make XMLHttpRequests from the browser
- Make HTTP requests from node.js
- Supports the Promise API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client-side support for protecting against XSRF




