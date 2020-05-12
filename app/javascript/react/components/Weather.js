import React from 'react'

const Weather = props => {

  return (
    <div id="weather">
      <h3>{props.weatherData.city}</h3>
      <p>{props.weatherData.currentTemperature} C</p>
    </div>
  )
}

export default Weather
