import React from 'react'

import NewItemForm from "../components/NewItemForm"

const NewItemFormComponent = props => {

  return (
    <div id="new-item-form-container">
      <h1>Post a new item below</h1>
      <NewItemForm defaultFormData={props.defaultFormData} newItemFormData={props.newItemFormData} setNewItemFormData={props.setNewItemFormData} fetchPostNewItem={props.fetchPostNewItem}/>
    </div>
  )
}

export default NewItemFormComponent
