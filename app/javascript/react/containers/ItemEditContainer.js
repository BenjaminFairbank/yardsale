import React, { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import ErrorList from "../components/ErrorList"
import Dropzone from 'react-dropzone'

import ItemShowComponent from '../components/ItemShowComponent'

const ItemEditContainer = props => {

  const defaultFormData = {
    name: '',
    description: '',
    image: '',
    asking_price: '',
  }

  const [editItemFormData, setEditItemFormData] = useState(defaultFormData)
  const [imageDropIndicator, setImageDropIndicator] = useState("")
  const [errors, setErrors] = useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [fileDropped, setFileDropped] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [item, setItem] = useState({
    name: "",
    description: "",
    image: "",
    asking_price: "",
    zip_code: "",
    user: {
      user_name: "",
      email: ""
    }
  })

  const itemID = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/items/${itemID}.json`)
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
      setItem(body.item)
      setCurrentUser(body.current)
      setEditItemFormData({
        name: body.item.name,
        description: body.item.description,
        asking_price: parseFloat(body.item.asking_price/100).toFixed(2),
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const fieldList = Object.keys(defaultFormData)
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

  const handleChange = (event) => {
    event.preventDefault()
    setEditItemFormData({
      ...editItemFormData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      fetchPostNewItem()
      setErrors({})
      setImageDropIndicator("")
      fieldErrorIndicators = defaultFormData
      setFormSubmitted(false)
    }
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "description", "asking_price"]
    requiredFields.forEach(field => {
      if (editItemFormData[field].toString().trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank!"
        }
      }
    });
    if (editItemFormData["name"].length > 20) {
      submitErrors = {
        ...submitErrors,
        ["name"]: "must be 20 characters or less!"
      }
    }
    if (editItemFormData["description"].length > 200) {
      submitErrors = {
        ...submitErrors,
        ["description"]: "must be 200 characters or less!"
      }
    }
    if (isNaN(editItemFormData["asking_price"])) {
      submitErrors = {
        ...submitErrors,
        ["asking_price"]: "must be a number!"
      }
    }
    if (editItemFormData["asking_price"] > 10000000) {
      submitErrors = {
        ...submitErrors,
        ["asking_price"]: "must be $ 10 million or less!"
      }
    }
    if (editItemFormData["image"] === "") {
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
    setFileDropped(true)
    setImageDropIndicator("✅")
    setEditItemFormData({
      ...editItemFormData,
      image: acceptedFiles[0]
    })
  }

  const fetchPostNewItem = () => {
    let formPayload = new FormData()
    if (fileDropped) {
      formPayload.append("item[image]", editItemFormData.image)
    }
    formPayload.append("item[name]", editItemFormData.name)
    formPayload.append("item[description]", editItemFormData.description)
    formPayload.append("item[asking_price]", parseInt(editItemFormData.asking_price*100))

    const csrfToken = $('meta[name="csrf-token"]').attr('content');

    fetch(`/api/v1/special_access/items/${itemID}`, {
      method: 'PATCH',
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
      setItem(body.item)
      if (body.error) {
        setErrors({['UNAUTHORIZED: ']: body.error})
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const allowed = () => {
    let allow = false
    currentUser.items.forEach((item) => {
      if (item.id.toString() === itemID) {
        allow = true
      }
    });
    return allow
  }

  let page = ''
  if (currentUser.id) {
    if (allowed()) {
      page =
        <div id="item-edit-container">
          <ItemShowComponent item={item} />
          <div id="new-item-form">
            <div id="new-item-form-container">
              <h1>Edit this item</h1>

              <ErrorList errors={errors} />

              <form className="grid-x" id="form" onSubmit={onSubmitHandler}>

                <div className="input-box cell small-12 medium-6 large-6">
                  <label htmlFor="name">Item {fieldErrorIndicators.name}</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={editItemFormData.name}
                  />

                <label htmlFor="description">Description {fieldErrorIndicators.description}</label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    onChange={handleChange}
                    value={editItemFormData.description}
                  />
                </div>

                <div className="input-box cell small-12 medium-6 large-6">
                  <label htmlFor="asking_price">Asking Price ($USD) {fieldErrorIndicators.asking_price}</label>
                  <input
                    type="text"
                    name="asking_price"
                    id="asking_price"
                    onChange={handleChange}
                    value={editItemFormData.asking_price}
                  />

                  <label htmlFor="description">Image {fieldErrorIndicators.image}</label>
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
                    value="Update your item!"
                  />
                </div>

              </form>
            </div>
          </div>
        </div>
    } else {
      page =
        <div id="unauthorized-edit">
          <h1>YOU ARE NOT AUTHORIZED !<br /> THIS IS NOT YOUR ITEM !</h1>
        </div>
    }
  }

  return (
    <>{page}</>
  )
}

export default ItemEditContainer
