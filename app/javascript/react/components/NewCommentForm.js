import React, { useState, Fragment } from 'react'
import _ from 'lodash'

import ErrorList from './ErrorList'

const NewCommentForm = props => {

  const defaultFormData = {
    body: "",
    user_id: "",
    item_id: ""
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
      [event.currentTarget.id]: event.currentTarget.value,
      ["user_id"]: props.currentUser.id,
      ["item_id"]: props.item.id
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
    if (newCommentFormData["body"].trim() === "") {
      submitErrors = {
        ...submitErrors,
        ["comment"]: "can't be blank!"
      }
    }
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  return (
    <>
      <div id="new-comment-form">
        {props.commentsComponent}
        <h1>
          <span>If you are interested...</span><br />
          Leave a comment!
        </h1>
        <p>The item's owner will be notified via email and<br />
          can see your email address below your comment.<br />
          <span>They may contact you in regards to an exchange!</span>
        </p>

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
            value="Add your comment"
          />

        </form>
      </div>
    </>
  )
}

export default NewCommentForm
