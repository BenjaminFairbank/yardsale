import React from 'react'
import UserItemTile from "./UserItemTile"

const UserItemsComponent = props => {

  let userItems = []
  if (props.userItems) {
    userItems = props.userItems.map((item) => {
      debugger
      return (
        <UserItemTile key={item.id} item={item} user={props.user} currentUser={props.currentUser} fetchDeleteItem={props.fetchDeleteItem} />
      )
    })
  }

  let title
  if (props.user.id === props.currentUser.id) {
    title = `You have no items!`
    if (userItems !== []) {
      title = `You have posted ${userItems.length} items:`
    }
  } else {
    title = `${props.user.user_name} has no items`
    if (userItems !== []) {
      title = `${props.user.user_name} has posted ${userItems.length} items:`
    }
  }

  return (
    <div id="user-items-component">
      <div className="user-items-title">
        <h3>{title}</h3>
      </div>
      <div id="tile-field" className="grid-x grid-margin-x grid-margin-y">
        {userItems}
      </div>
    </div>
  )
}

export default UserItemsComponent
