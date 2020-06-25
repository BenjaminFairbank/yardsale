import React, { useState, useEffect } from 'react'

import ItemsDisplayComponent from "../components/ItemsDisplayComponent"
import ItemSearchComponent from "../components/ItemSearchComponent"
import ItemsTabComponent from "../components/ItemsTabComponent"
import Weather from "../components/Weather"

const ItemsIndexContainer = props => {

  const [currentUser, setCurrentUser] = useState({})
  const [weatherData, setWeatherData] = useState({})
  const [search, setSearch] = useState({search: ""})
  const [searchMessage, setSearchMessage] = useState(false)
  const [items, setItems] = useState([])
  const [displayedItems, setDisplayedItems] = useState([])

  useEffect(() => {
    fetch("/api/v1/items.json")
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
      let weatherBody = body.weather
      let weather = {
        city: weatherBody["name"],
        description: " · " + weatherBody["weather"][0]["description"],
        currentTemperature: parseInt((weatherBody["main"]["temp"] - 272.15)*(9/5)+32).toString() + "°F · ",
        wind: parseInt(weatherBody["wind"]["speed"]*2.23694) + "mph · ",
        humidity: "humidity " + weatherBody["main"]["humidity"] + "% · ",
        windDirection: weatherBody["wind"]["deg"],
        cloudCover: "cloud cover " + weatherBody["clouds"]["all"] + "%"
      }
      setWeatherData(weather)
      setCurrentUser(body.current)
      setItems(body.items)
      setDisplayedItems(body.items)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  return (
    <div id="items-index-container">
      <div className="grid-container">
        <div id="power-box">
          <Weather weatherData={weatherData} />
          <ItemsTabComponent
            currentUser={currentUser}
            items={items}
            setDisplayedItems={setDisplayedItems}
          />
          <ItemSearchComponent
            setSearch={setSearch}
            items={items}
            setDisplayedItems={setDisplayedItems}
            setSearchMessage={setSearchMessage}
          />
        </div>
        <ItemsDisplayComponent
          search={search}
          items={displayedItems}
          searchMessage={searchMessage}
        />
      </div>
    </div>
  )
}

export default ItemsIndexContainer
