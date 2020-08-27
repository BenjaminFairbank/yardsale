import React, { useState, useEffect } from 'react'

import UserItemsComponent from '../components/UserItemsComponent'
import NewItemFormComponent from '../components/NewItemFormComponent'
import UserProfileComponent from '../components/UserProfileComponent'

const UserShowContainer = props => {

  const [user, setUser] = useState({})
  const [userItems, setUserItems] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [deleteError, setDeleteError] = useState('')

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
      setUser(body.target)
      setUserItems(body.target.items)
      setCurrentUser(body.current)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

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
      if (body.error) {
        setDeleteError(body.error)
      } else {
        setUserItems(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let newItemForm
  if (user.id === currentUser.id) {
    newItemForm = <NewItemFormComponent
      userItems={userItems}
      setUserItems={setUserItems}
    />
  }

  return (
    <div id="user-show-container">
      <div className="user-info">
        <UserProfileComponent
          user={user}
          currentUser={currentUser}
        />
      </div>
      <div>
        <h2>{user.user_name}'s Lawn</h2>
        <UserItemsComponent
          userItems={userItems}
          fetchDeleteItem={fetchDeleteItem}
          deleteError={deleteError}
          user={user}
          currentUser={currentUser}
        />
      </div>
      {newItemForm}
    </div>
  )
}

export default UserShowContainer
