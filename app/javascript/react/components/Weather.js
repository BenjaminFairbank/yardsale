import React from 'react'

const Weather = props => {

  let weatherOutput = <p>Loading local weather data...</p>

  if ( props.weatherData.responseCode ) {
    if ( props.weatherData.responseCode === 200 ) {
      let wD = ''
      if ( props.weatherData.windDirection >= 337.5 || props.weatherData.windDirection < 22.5 ) {
        wD = "wind " + 'N'
      } else if ( props.weatherData.windDirection >= 22.5 && props.weatherData.windDirection < 67.5 ) {
        wD = "wind " + 'NE'
      } else if ( props.weatherData.windDirection >= 67.5 && props.weatherData.windDirection < 112.5 ) {
        wD = "wind " + 'E'
      } else if ( props.weatherData.windDirection >= 112.5 && props.weatherData.windDirection < 157.5 ) {
        wD = "wind " + 'SE'
      } else if ( props.weatherData.windDirection >= 157.5 && props.weatherData.windDirection < 202.5 ) {
        wD = "wind " + 'S'
      } else if ( props.weatherData.windDirection >= 202.5 && props.weatherData.windDirection < 247.5 ) {
        wD = "wind " + 'SW'
      } else if ( props.weatherData.windDirection >= 247.5 && props.weatherData.windDirection < 292.5 ) {
        wD = "wind " + 'W'
      } else if ( props.weatherData.windDirection >= 292.5 && props.weatherData.windDirection < 337.5 ) {
        wD = "wind " + 'NW'
      }

      weatherOutput = <p>Local Weather{props.weatherData.description} {props.weatherData.currentTemperature} {props.weatherData.humidity} {wD} {props.weatherData.wind} {props.weatherData.cloudCover}</p>
    } else {
      weatherOutput = <p>The OpenWeatherMap API failed to provide weather data for your zip code: {props.weatherData.errorMessage}</p>
    }
  }

  if ( props.weatherData.error ) {
    weatherOutput = <p>{props.weatherData.error}</p>
  }

  return (
    <div id="weather">
      {weatherOutput}
    </div>
  )
}

export default Weather
