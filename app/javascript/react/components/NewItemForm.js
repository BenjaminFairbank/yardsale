import React, { useState } from 'react'
import _ from 'lodash'
import ErrorList from "./ErrorList"


const NewItemForm = props => {

  const defaultFormData = {
    name: "",
    description: "",
    image: "",
    asking_price: "",
  }

  const [newItemFormData, setNewItemFormData] = useState(defaultFormData)
  const [errors, setErrors] = useState({})

  const clearFormData = () => {
    setNewItemFormData(defaultFormData)
    setErrors({})
  }

  const handleChange = (event) => {
    event.preventDefault()
    setNewItemFormData({
      ...newItemFormData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      props.fetchPostNewItem(newItemFormData)
      clearFormData()
    }
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "description", "image", "asking_price"]
    requiredFields.forEach(field => {
      if (newItemFormData[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank!"
        }
      }
    });
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  return (
    <div id="new-item-form">
      <form id="form" onSubmit={onSubmitHandler}>

        <label htmlFor="name">What is it?</label>
        <input type="text" name="name" id="name" onChange={handleChange} value={newItemFormData.name} />

        <label htmlFor="description">Can you describe it a little more?</label>
        <input type="text" name="description" id="description" onChange={handleChange} value={newItemFormData.description} />

        <label htmlFor="asking_price">Enter the asking price in CENTS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>(ex: enter "4000" for $40.00)</span></label>
        <input type="text" name="asking_price" id="asking_price" onChange={handleChange} value={newItemFormData.asking_price} />

        <label htmlFor="image">Let's take a look!</label>
        <input type="text" name="image" id="image" onChange={handleChange} value={newItemFormData.image} />

        <ErrorList errors={errors} />

        <input id="button" type="submit" value="Put the new item out on your lawn!" />
      </form>
    </div>
  )
}

export default NewItemForm
