import React, { useState } from 'react'

import NewItemForm from "../components/NewItemForm"

const NewItemFormContainer = props => {

  const fetchPostNewItem = (itemPayload) => {
    fetch("/api/v1/items", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(itemPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      let item = body
      props.setUserItems([
        ...props.userItems,
        item
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div id="new-item-form-container">
      <h1>Post a new item below</h1>
      <NewItemForm fetchPostNewItem={fetchPostNewItem}/>
    </div>
  )
}

export default NewItemFormContainer
