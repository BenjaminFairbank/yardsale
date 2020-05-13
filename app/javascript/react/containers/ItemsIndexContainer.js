import React, { useState, useEffect } from 'react'

import ItemsDisplayComponent from "../components/ItemsDisplayComponent"
import ItemSearchComponent from "../components/ItemSearchComponent"
import ItemsTabComponent from "../components/ItemsTabComponent"
import Weather from "../components/Weather"

const ItemsIndexContainer = props => {
  const [items, setItems] = useState([])
  const [displayedItems, setDisplayedItems] = useState([])
  const [search, setSearch] = useState({search: ""})
  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
    user_name: "",
    zip_code: "",
    items: [],
    comments: []
  })

  const [weatherData, setWeatherData] = useState({
    city: '',
    currentTemperature: ''
  })

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
      setItems(body)
      setDisplayedItems(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  useEffect(() => {
    fetch(`/api/v1/current_user.json`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      setCurrentUser(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  useEffect(() => {
    if (currentUser.zip_code !== "") {
      fetch(`api/v1/forecast?zip=${currentUser.zip_code},us`)
      .then(response => response.json())
      .then((weatherBody) => {
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
      })
    }
  }, [currentUser])

  return (
    <div id="items-index-container">
      <div className="grid-container">
        <Weather weatherData={weatherData} />
        <ItemSearchComponent items={items} setDisplayedItems={setDisplayedItems} setSearch={setSearch} />
        <ItemsTabComponent items={items} setDisplayedItems={setDisplayedItems} currentUser={currentUser} />
        <ItemsDisplayComponent items={displayedItems} search={search} />
      </div>
    </div>
  )
}

export default ItemsIndexContainer
