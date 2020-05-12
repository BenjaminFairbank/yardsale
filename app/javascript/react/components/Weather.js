import React from 'react'

const Weather = props => {

  let wD = ''
  if ( props.weatherData.windDirection >= 337.5 || props.weatherData.windDirection < 22.5 ) {
    wD = 'N'
  } else if ( props.weatherData.windDirection >= 22.5 && props.weatherData.windDirection < 67.5 ) {
    wD = 'NE'
  } else if ( props.weatherData.windDirection >= 67.5 && props.weatherData.windDirection < 112.5 ) {
    wD = 'E'
  } else if ( props.weatherData.windDirection >= 112.5 && props.weatherData.windDirection < 157.5 ) {
    wD = 'SE'
  } else if ( props.weatherData.windDirection >= 157.5 && props.weatherData.windDirection < 202.5 ) {
    wD = 'S'
  } else if ( props.weatherData.windDirection >= 202.5 && props.weatherData.windDirection < 247.5 ) {
    wD = 'SW'
  } else if ( props.weatherData.windDirection >= 247.5 && props.weatherData.windDirection < 292.5 ) {
    wD = 'W'
  } else if ( props.weatherData.windDirection >= 292.5 && props.weatherData.windDirection < 337.5 ) {
    wD = 'NW'
  }

  return (
    <div id="weather">
      <p>Local Weather: {props.weatherData.description} {props.weatherData.currentTemperature} {props.weatherData.wind} {wD}</p>
    </div>
  )
}

export default Weather
