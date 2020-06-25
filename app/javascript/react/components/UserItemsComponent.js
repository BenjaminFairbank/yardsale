import React from 'react'
import UserItemTile from "./UserItemTile"

const UserItemsComponent = props => {

  let userItems = []
  if (props.userItems) {
    userItems = props.userItems.map((item) => {
      return (
        <UserItemTile
          key={item.id}
          item={item}
          user={props.user}
          currentUser={props.currentUser}
          fetchDeleteItem={props.fetchDeleteItem}
        />
      )
    })
  }

  let title
  if (props.user.id === props.currentUser.id) {
    title = <h3>You have no items posted at the moment</h3>
    if (userItems !== []) {
      title = <h3>You have {userItems.length} items posted on your lawn:</h3>
    }
  } else {
    title = <h3>{props.user.user_name} has no items on their lawn at the moment</h3>
    if (userItems !== []) {
      title = <h3>{props.user.user_name} has {userItems.length} items posted on their lawn:</h3>
    }
  }

  return (
    <div id="user-items-component">
      <div className="user-items-title">
        {title}
        <h2>{props.deleteError}</h2>
      </div>
      <div id="tile-field" className="grid-x grid-margin-x grid-margin-y">
        {userItems}
      </div>
    </div>
  )
}

export default UserItemsComponent
