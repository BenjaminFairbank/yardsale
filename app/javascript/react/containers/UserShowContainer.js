import React, { useState, useEffect } from 'react'
import UserItemsComponent from '../components/UserItemsComponent'

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
    items: []
  })

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
      setUser(body)
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
    <div id="user-show-container">
      <div className="user-info">
        <h2>{user.user_name}'s Lawn</h2>
      </div>
      <UserItemsComponent user={user} currentUser={currentUser}/>
    </div>
  )
}

export default UserShowContainer
