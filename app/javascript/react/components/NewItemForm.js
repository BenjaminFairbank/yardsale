import React, { useState } from 'react'
import _ from 'lodash'
import ErrorList from "./ErrorList"
import Dropzone from 'react-dropzone'

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
      fetchPostNewItem()
      clearFormData()
    }
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "description", "asking_price"]
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

  const handleFileUpload = (acceptedFiles) => {
    setNewItemFormData({
      ...newItemFormData,
      image: acceptedFiles[0]
    })
  }

  const fetchPostNewItem = () => {
    let formPayload = new FormData()
    formPayload.append("item[name]", newItemFormData.name)
    formPayload.append("item[image]", newItemFormData.image)
    formPayload.append("item[description]", newItemFormData.description)
    formPayload.append("item[asking_price]", newItemFormData.asking_price)

    const csrfToken = $('meta[name="csrf-token"]').attr('content');

    fetch("/api/v1/items", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        'Accept': 'application/json', 
        'Accept': 'image/jpeg', 
        'X-CSRF-Token': csrfToken
      },
      body: formPayload,
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
      debugger
      props.setUserItems([
        ...props.userItems,
        item
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
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

        <Dropzone onDrop={handleFileUpload}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>

        <ErrorList errors={errors} />

        <input id="button" type="submit" value="Put the new item out on your lawn!" />
      </form>
    </div>
  )
}

export default NewItemForm
