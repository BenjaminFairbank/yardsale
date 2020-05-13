import React from 'react'

const Weather = props => {

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

  return (
    <div id="weather">
      <p>Local Weather{props.weatherData.description} {props.weatherData.currentTemperature} {props.weatherData.humidity} {wD} {props.weatherData.wind} {props.weatherData.cloudCover}</p>
    </div>
  )
}

export default Weather
