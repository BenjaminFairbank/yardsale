import React, { useState, Fragment } from 'react'
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
    <>
      <div id="new-comment-form">
        {props.commentsComponent}
        <h1>Leave a comment</h1>
        <p>If you a leave a comment, the item's owner will be able to see your email address, <br /> and may contact you if they like what you have to say.</p>

        <ErrorList errors={errors} />

        <form id="form" onSubmit={onSubmitHandler}>

          <input
            type="text"
            name="body"
            id="body"
            onChange={handleChange}
            value={newCommentFormData.body}
          />

          <input
            id="button"
            type="submit"
            value="Tell 'em how you REALLY feel!"
          />

        </form>
      </div>
    </>
  )
}

export default NewCommentForm
