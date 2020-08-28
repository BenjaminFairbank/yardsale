import React, { useState, useEffect } from 'react'

import ItemsDisplayComponent from '../components/ItemsDisplayComponent'
import ItemSearchComponent from '../components/ItemSearchComponent'
import ItemsTabComponent from '../components/ItemsTabComponent'
import Weather from '../components/Weather'

const ItemsIndexContainer = props => {

  const [currentUser, setCurrentUser] = useState({})
  const [weatherData, setWeatherData] = useState({})
  const [displayWeather, setDisplayWeather] = useState(true)
  const [searchMessage, setSearchMessage] = useState('Loading items...')
  const [items, setItems] = useState([])
  const [displayedItems, setDisplayedItems] = useState([])

  useEffect(() => {
    fetch('/api/v1/items.json')
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json() )
    .then(body => {
      let weather
      if ( body.weather.cod === 200 ) {
        weather = {
          responseCode: body.weather.cod,
          main: body.weather['weather'][0]['main'],
          description: ':\xa0\xa0' + body.weather['weather'][0]['description'],
          currentTemperature: parseInt((body.weather['main']['temp'] - 272.15)*(9/5)+32).toString() + '°F · ',
          wind: parseInt(body.weather['wind']['speed']*2.23694) + 'mph · ',
          humidity: 'humidity ' + body.weather['main']['humidity'] + '% · ',
          windDirection: body.weather['wind']['deg'],
          cloudCover: 'cloud cover ' + body.weather['clouds']['all'] + '%'
        }
      } else {
        weather = {
          responseCode: body.weather.cod,
          errorMessage: body.weather.message
        }
      }
      setWeatherData(weather)
      setCurrentUser(body.current)
      setItems(body.items)
      setDisplayedItems(body.items)
      if (body.items.length === 0 ) {
        setSearchMessage('Whoops' + '\xa0\xa0\xa0' + 'There are no items posted at this time.')
      }
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
      setSearchMessage('Whoops!' + '\xa0\xa0\xa0' + 'There was a problem fetching our inventory of items.' + '\xa0\xa0\xa0' + 'Check your internet connection, try reloading the page, or contact the site administator via email at benfairbank26@gmail.com.'  + '\xa0\xa0\xa0' + 'We apologize for the inconvenience.')
      setWeatherData({ error: 'There was a problem fetching local weather data.'})
    })
  }, [])

  let weatherComponent
  if (displayWeather) {
    weatherComponent = <Weather weatherData={weatherData} setDisplayWeather={setDisplayWeather} />
  }

  return (
    <div id='items-index-container'>
      <div className='grid-container'>
        <div id='power-box'>
          {weatherComponent}
          <ItemsTabComponent
            currentUser={currentUser}
            items={items}
            setDisplayedItems={setDisplayedItems}
            setSearchMessage={setSearchMessage}
          />
          <ItemSearchComponent
            items={items}
            setDisplayedItems={setDisplayedItems}
            setSearchMessage={setSearchMessage}
          />
        </div>
        <ItemsDisplayComponent
          items={displayedItems}
          searchMessage={searchMessage}
        />
      </div>
    </div>
  )
}

export default ItemsIndexContainer
