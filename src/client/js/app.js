import { getTime, appUpTime, getValidationTime } from './getTime'

import { cleanUp } from './cleanUp'

import { alertFn, alertMoreDays } from './alertFunctions'

const axios = require('axios')
const spinner = document.querySelector('.spinner')
const inputDestination = document.querySelector('.form__input-search')
const btnSubmitForm = document.querySelector('.form__input-submit')
export const btnDelete = document.querySelector('.btn-delete')
export const counddownTitle = document.querySelector('.countdown__title')
export const timeCards = document.querySelector('.time-cards')
const warning = document.querySelector('.main-form__warming')
// Weather info details
export const temp = document.querySelector('.temp')
export const enterCity = document.querySelector('.city')
export const weatherDescription = document.querySelector('.weather')
export const imgCountry = document.querySelector('.feature-plan__img-city')

// Links From APIs

const urlGeonames = 'https://secure.geonames.org/searchJSON?q='
const urlCurrentWeatherbit = 'https://api.weatherbit.io/v2.0/current?lat='
const urlDailytWeatherbit = 'https://api.weatherbit.io/v2.0/forecast/daily?lat='
const urlPixabay = 'https://pixabay.com/api/?key='
const urlEndPixabay = '&orientation=horizontal&category=buildings&per_page=3'

export async function getDataFromApi(e) {
    try {
        e.preventDefault()
        const inputDestinationValue = inputDestination.value

        if (inputDestinationValue === '') {
            alertFn()
            return false
        }
        // receive api key from server side
        const keys = await fetchApiData()
        const { geonamesUsername, weatherbitApiKey, pixabayApiKey } = keys

        showLoading()

        // fetching data
        const location = await getDataFromGeonames(
            inputDestinationValue,
            geonamesUsername
        )
        const { days } = getValidationTime()

        if (days > 16 || days < 0) {
            alertMoreDays()
            cleanUp()
            return
        }
        showItem()
        enterCity.innerHTML = inputDestination.value.toUpperCase()

        let weather
        const country = location.geonames[0].countryName
        const latitude = location.geonames[0].lat
        const longitude = location.geonames[0].lng

        if (days === -1 || days === 0) {
            weather = await getCurrentWeather(
                latitude,
                longitude,
                weatherbitApiKey
            )
            updateFields(
                weather.data[0].temp,
                weather.data[0].weather.description
            )
        } else if (days >= 1 && days <= 16) {
            weather = await getPredictedWeather(
                latitude,
                longitude,
                weatherbitApiKey
            )
            updateFields(
                weather.data[0].temp,
                weather.data[0].weather.description
            )
        }

        const pixabayData = await getImgPixabay(pixabayApiKey, country)

        if (pixabayData && pixabayData.hits && pixabayData.hits.length) {
            imgCountry.setAttribute('src', pixabayData.hits[0].webformatURL)
        }
        hideLoading()
    } catch (error) {
        console.log('something went wrong', err)
        warning.textContent = 'We are sorry but something went wrong'
    }
}

// asynchronous function
const fetchApiData = async () => {
    const isNetlify = window.location.host.includes('.netlify.app')
    if (isNetlify) {
        return fetch('/.netlify/functions/api_data').then((res) => res.json())
    }
    return fetch('/api_data').then((res) => res.json())
}

const getDataFromGeonames = async (inputDestinationValue, geonamesUsername) => {
    const res = await axios.get(
        `${urlGeonames}${inputDestinationValue}&maxRows=1&username=${geonamesUsername}`
    )
    try {
        return res.data
    } catch (error) {
        console.log('error with geonames', error)
    }
}

const getCurrentWeather = async (latitude, longitude, weatherbitApiKey) => {
    const res = await axios.get(
        `${urlCurrentWeatherbit}${latitude}&lon=${longitude}&key=${weatherbitApiKey}`
    )
    try {
        return res.data
    } catch (error) {
        console.log('error with current weather', error)
    }
}

const getPredictedWeather = async (latitude, longitude, weatherbitApiKey) => {
    const res = await axios.get(
        `${urlDailytWeatherbit}${latitude}&lon=${longitude}&key=${weatherbitApiKey}`
    )
    try {
        return res.data
    } catch (error) {
        console.log('error with predicted weather ', error)
    }
}

const getImgPixabay = async (pixabayApiKey, country) => {
    const res = await axios.get(
        `${urlPixabay}${pixabayApiKey}&q=${country}${urlEndPixabay}`
    )
    try {
        return res.data
    } catch (error) {
        console.log('error with Pixabay ')
    }
}

// Function updateFields
const updateFields = (temperature, descWeather) => {
    temp.innerHTML = `${Math.round(temperature)}°C`
    weatherDescription.innerHTML = descWeather
}

// Show Items
const showItem = () => {
    counddownTitle.classList.add('active')
    timeCards.classList.add('active')
    btnDelete.classList.add('active')
    imgCountry.classList.add('active')
}

// show and hide loading
const showLoading = () => {
    spinner.classList.add('spinner--visible')
}

const hideLoading = () => {
    spinner.classList.remove('spinner--visible')
}

const today = new Date()
document.querySelector('.date__day').value = today.getDate()
document.querySelector('.date__month').value = today.getMonth() + 1

btnSubmitForm.addEventListener('click', getDataFromApi)
btnSubmitForm.addEventListener('click', appUpTime)
btnDelete.addEventListener('click', cleanUp)
