import React, { useState, useEffect } from 'react'

import ItemShowComponent from '../components/ItemShowComponent'

const ItemShowContainer = props => {
  const [item, setItem] = useState({
    name: "",
    description: "",
    image: "",
    asking_price: "",
    zip_code: "",
    user: {
      user_name: "",
      email: ""
    }
  })

  const itemID = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/items/${itemID}.json`)
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
      setItem(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  return (
    <div id="item-show-container">
      <ItemShowComponent item={item} />
    </div>
  )
}

export default ItemShowContainer
