import {
    getTime,
    appUpTime
} from './getTime'

import {
    cleanUp
} from './cleanUp'

import {
    alertFn,
    alertMoreDays
} from './alertFunctions'

const axios = require('axios');
const inputDestination = document.querySelector('.form__input-search');
const btnSubmitForm = document.querySelector('.form__input-submit');
export const btnDelete = document.querySelector('.btn-delete');
export const counddownTitle = document.querySelector('.countdown__title');
export const timeCards = document.querySelector('.time-cards');
const warning = document.querySelector('.main-form__warming');
// Weather info details
export const temp = document.querySelector('.temp');
export const enterCity = document.querySelector('.city');
export const weatherDescription = document.querySelector('.weather');
export const imgCountry = document.querySelector('.feature-plan__img-city');


// Links From APIs 

const urlGeonames = 'http://api.geonames.org/searchJSON?q=';
const urlCurrentWeatherbit = 'https://api.weatherbit.io/v2.0/current?lat=';
const urlDailytWeatherbit = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const urlPixabay = 'https://pixabay.com/api/?key=';
const urlEndPixabay = '&orientation=horizontal&category=buildings&per_page=3';




// API geonames api
//what we need latitude, longitude, country
function getDataFromApi(e) {
    e.preventDefault()
    const inputDestinationValue = inputDestination.value;
    enterCity.innerHTML = inputDestination.value;
    if (inputDestinationValue === '') {
        alertFn()
        return false;

    } else {
        // receive api key from server side
        fetch('/api_data')
            .then((res) => res.json())
            .then((keys) => {
                const geonamesUsername = keys.geonamesUsername;
                const weatherbitApiKey = keys.weatherbitApiKey;
                const pixabayApiKey = keys.pixabayApiKey;
                //fetching lat and lng from geonames api
                axios.get(`http://api.geonames.org/searchJSON?q=${inputDestinationValue}&maxRows=1&username=${geonamesUsername}`)
                    .then((res) => {
                        const latitude = res.data.geonames[0].lat;
                        const longitude = res.data.geonames[0].lng;
                        const country = res.data.geonames[0].countryName;
                        showItem()
                        //fetching current weather from weatherbit
                        if (days === -1 || days === 0) {
                            axios.get(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
                                .then((res) => {
                                    const temperature = res.data.data[0].temp;
                                    const descWeather = res.data.data[0].weather.description
                                    postData('/add', {
                                            temp: temperature,
                                            weatherDescription: descWeather,
                                        })
                                        .then((res) => {
                                            const responeJson = res.json();
                                            return responeJson
                                        })
                                        .then((res) => {
                                            updateUI();
                                        })
                                })
                        } else if (days >= 1 && days <= 16) {
                            //fetching future weather from weatherbit
                            // predicted weather of the departure date
                            axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
                                .then((res) => {
                                    temp.innerHTML = `${Math.round(res.data.data[days].temp)}°C`
                                    weatherDescription.innerHTML = `${res.data.data[days].weather.description}`;
                                })
                        } else {
                            alertFnDays()
                            cleanUp()
                            return false;
                        }

                        //fetching pixabay image
                        axios.get(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${country}&orientation=horizontal&category=buildings&per_page=3`)
                            .then((res) => {
                                imgCountry.src = `${res.data.hits[0].webformatURL}`;

                            })
                    })
            })
            .catch((err) => {
                console.log(err, 'something went wrong')
                warning.textContent = "We are sorry but something went wrong";
            })
    }
}


export async function getDataFromApi(e) {

    try {
        e.preventDefault()
        const inputDestinationValue = inputDestination.value;
        enterCity.innerHTML = inputDestination.value;

        if (inputDestinationValue === '') {
            alertFn()
            return false;
        }
        // receive api key from server side
        const keys = await fetchApiData()
        const {
            geonamesUsername,
            weatherbitApiKey,
            pixabayApiKey
        } = keys

        const location = await getDataFromGeonames(inputDestinationValue, geonamesUsername)
        showItem()
        const {
            days
        } = getTime()
        console.log(days)

        if (days > 16 || days < 0) {
            alertMoreDays()
            cleanUp()
            return
        }

        let weather;
        const country = location.geonames[0].countryName;
        const latitude = location.geonames[0].lat
        const longitude = location.geonames[0].lng
        console.log(latitude, longitude)

        if (days === -1 || days === 0) {
            weather = await getCurrentWeather(latitude, longitude, weatherbitApiKey)
            updateFields(weather.data[0].temp, weather.data[0].weather.description)
        } else if (days >= 1 && days <= 16) {
            weather = await getPredictedWeather(latitude, longitude, weatherbitApiKey)
            updateFields(weather.data[0].temp, weather.data[0].weather.description)
        }

        const pixabayData = await getImgPixabay(pixabayApiKey, country)

        if (pixabayData && pixabayData.hits && pixabayData.hits.length) {
            imgCountry.setAttribute('src', pixabayData.hits[0].webformatURL)
        }
    } catch (error) {
        console.log(err, 'something went wrong')
        warning.textContent = "We are sorry but something went wrong";
    }


}

// asynchronous function 
const fetchApiData = async () => {
    return fetch('/api_data')
        .then((res) => res.json())

}

const getDataFromGeonames = async (inputDestinationValue, geonamesUsername) => {
    const res = await axios.get(`${urlGeonames}${inputDestinationValue}&maxRows=1&username=${geonamesUsername}`)
    try {
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log("error with geonames", error)
    }
}


const getCurrentWeather = async (latitude, longitude, weatherbitApiKey) => {
    const res = await axios.get(`${urlCurrentWeatherbit}${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
    try {
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log('error with current weather ')
    }
}

const getPredictedWeather = async (latitude, longitude, weatherbitApiKey) => {
    const res = await axios.get(`${urlDailytWeatherbit}${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
    try {
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log('error with predicted weather ')
    }

}

const getImgPixabay = async (pixabayApiKey, country) => {
    const res = await axios.get(`${urlPixabay}${pixabayApiKey}&q=${country}${urlEndPixabay}`)
    try {
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log('error with Pixabay ')
    }
}

// Function updateFields 
const updateFields = (temperature, descWeather) => {
    temp.innerHTML = `${Math.round(temperature)}°C`
    weatherDescription.innerHTML = descWeather;
}

// Show Items
const showItem = () => {
    counddownTitle.classList.add('active')
    timeCards.classList.add('active')
    btnDelete.classList.add('active')
    imgCountry.classList.add('active')
}


btnSubmitForm.addEventListener('click', getDataFromApi)

btnSubmitForm.addEventListener('click', appUpTime)
btnDelete.addEventListener('click', cleanUp)

btnSubmitForm.addEventListener('click', appUpDate)
btnDelete.addEventListener('click', cleanUp)



export {
    getDataFromApi,
    appUpDate,
    setTime,
    alertFn,
    alertFnDays,
}

