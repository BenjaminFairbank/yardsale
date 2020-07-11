import React from 'react'

const Weather = props => {

  const hideWeather = (event) => {
    event.preventDefault()
    props.setDisplayWeather(false)
  }

  let weatherGreeting
  let weatherOutput

  if ( props.weatherData.responseCode ) {
    if ( props.weatherData.responseCode === 200 ) {

      if (props.weatherData.main === "Rain") {
        weatherGreeting = <h6>It's wet out there! &nbsp; Aren't you glad you're shopping online? &nbsp; <span>☔</span></h6>
      } else if (props.weatherData.main === "Clear") {
        weatherGreeting = <h6>Beautiful day! &nbsp; Perfect day to meet up and exchange items! &nbsp; <span>☀</span></h6>
      } else if (props.weatherData.main === "Clouds") {
        weatherGreeting = <h6>Nothing brightens up a cloudy day like finding the perfect item! &nbsp; <span>⛅</span></h6>
      } else if (props.weatherData.main === "Snow") {
        weatherGreeting = <h6>Brrrr! &nbsp; <span>🥶</span> &nbsp; Maybe just stay home and do your shopping online! &nbsp; <span>❄</span></h6>
      } else {
        weatherGreeting = <h6>Welcome to YardSale! &nbsp; Browse items in your local area and beyond!</h6>
      }

      const wDInDegrees = props.weatherData.windDirection
      let wDCompass = ''

      if ( wDInDegrees >= 337.5 || wDInDegrees < 22.5 ) {
        wDCompass = "wind " + 'N'
      } else if ( wDInDegrees >= 22.5 && wDInDegrees < 67.5 ) {
        wDCompass = "wind " + 'NE'
      } else if ( wDInDegrees >= 67.5 && wDInDegrees < 112.5 ) {
        wDCompass = "wind " + 'E'
      } else if ( wDInDegrees >= 112.5 && wDInDegrees < 157.5 ) {
        wDCompass = "wind " + 'SE'
      } else if ( wDInDegrees >= 157.5 && wDInDegrees < 202.5 ) {
        wDCompass = "wind " + 'S'
      } else if ( wDInDegrees >= 202.5 && wDInDegrees < 247.5 ) {
        wDCompass = "wind " + 'SW'
      } else if ( wDInDegrees >= 247.5 && wDInDegrees < 292.5 ) {
        wDCompass = "wind " + 'W'
      } else if ( wDInDegrees >= 292.5 && wDInDegrees < 337.5 ) {
        wDCompass = "wind " + 'NW'
      }

      weatherOutput = <p>Local Weather{props.weatherData.description} {props.weatherData.currentTemperature} {props.weatherData.humidity} {wDCompass} {props.weatherData.wind} {props.weatherData.cloudCover}<input className="button hide-weather" type="button" onClick={hideWeather} value="❎"/></p>
    } else {
      weatherOutput = <p>The OpenWeatherMap API failed to provide weather data for your zip code: {props.weatherData.errorMessage}<input className="button hide-weather" type="button" onClick={hideWeather} value="❎"/></p>
    }
  } else if ( props.weatherData.error ) {
    weatherOutput = <p>{props.weatherData.error}<input className="button hide-weather" type="button" onClick={hideWeather} value="❎"/></p>
  } else {
    weatherOutput = <p>Loading local weather data...</p>
  }

  return (
    <div id="weather">
      {weatherGreeting}
      {weatherOutput}
    </div>
  )
}

export default Weather
