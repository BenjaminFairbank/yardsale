import React, { useState, useEffect } from 'react'

import ItemsDisplayComponent from "../components/ItemsDisplayComponent"
import ItemSearchComponent from "../components/ItemSearchComponent"
import ItemsTabComponent from "../components/ItemsTabComponent"

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

  return (
    <div id="items-index-container" className="grid-container">
      <ItemSearchComponent items={items} setDisplayedItems={setDisplayedItems} setSearch={setSearch} />
      <ItemsTabComponent items={items} setDisplayedItems={setDisplayedItems} currentUser={currentUser} />
      <ItemsDisplayComponent items={displayedItems} search={search} />
    </div>
  )
}

export default ItemsIndexContainer
