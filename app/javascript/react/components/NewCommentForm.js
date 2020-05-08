import React, { useState } from 'react'
import _ from 'lodash'
import ErrorList from "./ErrorList"

const NewCommentForm = props => {

  const defaultFormData = {
    body: ""
  }

  const [newCommentFormData, setNewCommentFormData] = useState(defaultFormData)
  const [errors, setErrors] = useState({})

  const clearFormData = () => {
    setNewCommentFormData(defaultFormData)
    setErrors({})
  }

  const handleChange = (event) => {
    event.preventDefault()
    setNewCommentFormData({
      ...newCommentFormData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      props.fetchPostNewComment(newCommentFormData)
      clearFormData()
    }
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["body"]
    requiredFields.forEach(field => {
      if (newCommentFormData[field].trim() === "") {
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
    <div id="new-comment-form">
      <h1>Leave a comment</h1>

      <form id="form" onSubmit={onSubmitHandler}>

        <input type="text" name="body" id="body" onChange={handleChange} value={newCommentFormData.body} />

        <ErrorList errors={errors} />

        <input id="button" type="submit" value="Tell 'em how you REALLY feel!" />
      </form>
    </div>
  )
}

export default NewCommentForm
