exports.handler = async function (event, context) {
    const responseObject = {
        geonamesUsername: process.env.GEONAMES_USERNAME,
        weatherbitApiKey: process.env.WEATHER_BIT_API_KEY,
        pixabayApiKey: process.env.PIXABAY_API_KEY,
    }
    return {
        statusCode: 200,
        body: JSON.stringify(responseObject),
    }
}
