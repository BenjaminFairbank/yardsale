import React from 'react'

const CommentTile = props => {

  let commentID = props.comment.id

  const onClickHandler = (event) => {
    event.preventDefault()
    props.fetchDeleteComment(commentID)
  }

  let deleteButton

  if (props.comment.user_id === props.currentUser.id) {
    deleteButton = <input id="button" type="button" onClick={onClickHandler} value="Unsay" />
  }

  return (
    <div className="comment-tile">
      <h3>{props.comment.user.user_name}</h3>
      <h4>{props.comment.body}</h4>
      <h5>{props.comment.created_at}</h5>
      {deleteButton}
    </div>
  )
}

export default CommentTile
