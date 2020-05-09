import React, { useState, useEffect } from 'react'

import UserItemsComponent from '../components/UserItemsComponent'
import NewItemFormComponent from '../components/NewItemFormComponent'
import UserProfileComponent from '../components/UserProfileComponent'

const UserShowContainer = props => {

  const [user, setUser] = useState({
    id: "",
    email: "",
    user_name: "",
    zip_code: "",
    items: []
  })

  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
    user_name: "",
    zip_code: "",
    items: [],
    comments: []
  })

  const [userItems, setUserItems] = useState(user.items)

  const userID = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/users/${userID}.json`)
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
      let user = body
      setUser(user)
      setUserItems(user.items)
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
      setUserItems([
        ...userItems,
        item
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const fetchDeleteItem = (itemID) => {
    fetch(`/api/v1/items/${itemID}`, {
      credentials: "same-origin",
      method: "DELETE",
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
      setUserItems(body.items)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let newItemForm
  if (user.id === currentUser.id) {
    newItemForm = <NewItemFormComponent userItems={userItems} setUserItems={setUserItems} fetchPostNewItem={fetchPostNewItem}/>
  }

  return (
    <div id="user-show-container">
      <div className="user-info">
        <UserProfileComponent user={user} />
        <h2>{user.user_name}'s Lawn</h2>
      </div>
      <div>
        <UserItemsComponent fetchDeleteItem={fetchDeleteItem} userItems={userItems} user={user} currentUser={currentUser}/>
      </div>
      <div id="new-item-form">
        {newItemForm}
      </div>
    </div>
  )
}

export default UserShowContainer
