import React from 'react'

import NewItemForm from "../components/NewItemForm"

const NewItemFormComponent = props => {

  return (
    <div id="new-item-form-container">
      <h1>Post a new item</h1>
      <NewItemForm
        userItems={props.userItems}
        setUserItems={props.setUserItems}
      />
    </div>
  )
}

export default NewItemFormComponent
