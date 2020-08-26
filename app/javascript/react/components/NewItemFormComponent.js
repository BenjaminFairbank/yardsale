import React, { useState } from 'react'
import _ from 'lodash'
import ErrorList from "./ErrorList"
import Dropzone from 'react-dropzone'

const NewItemFormComponent = props => {

  const defaultFormData = {
    name: "",
    description: "",
    image: "",
    asking_price: "",
  }

  const fieldList = Object.keys(defaultFormData)
  const [newItemFormData, setNewItemFormData] = useState(defaultFormData)
  const [imageDropIndicator, setImageDropIndicator] = useState("")
  const [errors, setErrors] = useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  let fieldErrorIndicators = defaultFormData
  if (formSubmitted) {
    fieldList.forEach((field) => {
      if ( Object.keys(errors).includes(field) ) {
        fieldErrorIndicators = {
          ...fieldErrorIndicators,
          [field]: "❗"
        }
      } else {
        fieldErrorIndicators = {
          ...fieldErrorIndicators,
          [field]: "✅"
        }
      }
    });
  }

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
      setImageDropIndicator("")
      fieldErrorIndicators = defaultFormData
      setFormSubmitted(false)
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
    if (newItemFormData["name"].length > 20) {
      submitErrors = {
        ...submitErrors,
        ["name"]: "must be 20 characters or less!"
      }
    }
    if (newItemFormData["description"].length > 200) {
      submitErrors = {
        ...submitErrors,
        ["description"]: "must be 200 characters or less!"
      }
    }
    if (isNaN(newItemFormData["asking_price"])) {
      submitErrors = {
        ...submitErrors,
        ["asking_price"]: "must be a number!"
      }
    }
    if (newItemFormData["asking_price"] > 10000000) {
      submitErrors = {
        ...submitErrors,
        ["asking_price"]: "must be $ 10 million or less!"
      }
    }
    if (newItemFormData["image"] === "") {
      submitErrors = {
        ...submitErrors,
        ["image"]: "must be uploaded!"
      }
    }
    setErrors(submitErrors)
    setFormSubmitted(true)
    return _.isEmpty(submitErrors)
  }

  const handleFileUpload = (acceptedFiles) => {
    setImageDropIndicator("✅")
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
    formPayload.append("item[asking_price]", parseInt(newItemFormData.asking_price*100))

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
      props.setUserItems([
        ...props.userItems,
        item
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div id="new-item-form">
      <div id="new-item-form-container">
        <h1>Post a new item</h1>

        <ErrorList errors={errors} />

        <form className="grid-x" id="form" onSubmit={onSubmitHandler}>

          <div className="input-box cell small-12 medium-6 large-6">
            <label htmlFor="name">What is it? {fieldErrorIndicators.name}</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={newItemFormData.name}
            />

          <label htmlFor="description">Can you describe it a little more? {fieldErrorIndicators.description}</label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={handleChange}
              value={newItemFormData.description}
            />
          </div>

          <div className="input-box cell small-12 medium-6 large-6">
            <label htmlFor="asking_price">What do you want for it? ($USD) {fieldErrorIndicators.asking_price}</label>
            <input
              type="text"
              name="asking_price"
              id="asking_price"
              onChange={handleChange}
              value={newItemFormData.asking_price}
            />

            <label htmlFor="description">Can we see a photo of it? {fieldErrorIndicators.image}</label>
            <Dropzone onDrop={handleFileUpload}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>📎 Upload image (click/drop) {imageDropIndicator}</p>
                  </div>
                </section>
              )}
            </Dropzone>

            <input
              id="button"
              type="submit"
              value="Post new item to My Lawn!"
            />
          </div>

        </form>
      </div>
    </div>
  )
}

export default NewItemFormComponent
