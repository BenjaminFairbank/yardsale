import React from 'react'

const Weather = props => {

  return (
    <div id="weather">
      <p>Weather in your area: {props.weatherData.description} {props.weatherData.currentTemperature}</p>
    </div>
  )
}

export default Weather
