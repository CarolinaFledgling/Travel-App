import './app'

//Global variable for coundown date
const eventDay = document.querySelector('#event-day')
const eventMonth = document.querySelector('#event-month')
const eventYear = document.querySelector('#event-year')
const daysCount = document.querySelector('.days-count')
const hoursCount = document.querySelector('.hours-count')
const minutesCount = document.querySelector('.minutes-count')
const secondsCount = document.querySelector('.seconds-count')
let usersTime

// id for interval Coundown seconds
let intervalId

export const getValidationTime = () => {
    const currentTime = new Date()
    currentTime.setHours(0)
    currentTime.setMinutes(0)
    currentTime.setSeconds(0)
    currentTime.setMilliseconds(0)

    //the difference between now and the our enter date
    const differenceTime = usersTime - currentTime
    //differenceTime is millisecond

    //1000 milisecond is 1 seconds , 1 minutes is 60 seconds , 1 hour is 60 minutes  1 day is 24 hours
    //Time calculations for days, hours, minutes, seconds from today`s date to our enter date
    const days = differenceTime / 1000 / 60 / 60 / 24
    const hours = Math.floor(differenceTime / 1000 / 60 / 60) % 24
    const minutes = Math.floor(differenceTime / 1000 / 60) % 60
    const seconds = Math.floor(differenceTime / 1000) % 60

    return {
        days,
        hours,
        minutes,
        seconds,
        currentTime,
    }
}

export const getTime = () => {
    const currentTime = new Date()

    //the difference between now and the our enter date
    const differenceTime = usersTime - currentTime
    //differenceTime is millisecond

    //1000 milisecond is 1 seconds , 1 minutes is 60 seconds , 1 hour is 60 minutes  1 day is 24 hours
    //Time calculations for days, hours, minutes, seconds from today`s date to our enter date
    let days = differenceTime / 1000 / 60 / 60 / 24
    let hours = Math.floor(differenceTime / 1000 / 60 / 60) % 24
    let minutes = Math.floor(differenceTime / 1000 / 60) % 60
    let seconds = Math.floor(differenceTime / 1000) % 60

    // Zero hours/minutes/seconds if day difference is less then 24h. So between 0 and -0.9999....
    if (days <= 0 && days > -1) {
        hours = 0
        minutes = 0
        seconds = 0
    }

    if (days < 0) {
        days = Math.ceil(days)
    } else {
        days = Math.floor(days)
    }

    return {
        days,
        hours,
        minutes,
        seconds,
        currentTime,
    }
}

export const setTime = () => {
    const { days, hours, minutes, seconds } = getTime()

    daysCount.textContent = days
    hoursCount.textContent = hours
    minutesCount.textContent = minutes
    secondsCount.textContent = seconds
}

export const appUpTime = () => {
    const year = parseInt(eventYear.value)
    const month = parseInt(eventMonth.value) - 1
    const day = parseInt(eventDay.value)

    usersTime = new Date(year, month, day)
    setTime()
    clearInterval(intervalId)
    intervalId = setInterval(setTime, 1000)
}
