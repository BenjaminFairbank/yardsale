import React from 'react'
import { Link } from 'react-router-dom'

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

  const timestampConverter = (timestamp) => {

    const time = new Date(timestamp)
    let hour = time.getHours()
    let timeOfDay = "AM"
    let min = time.getMinutes()

    if (time.getHours() > 12) {
      hour = time.getHours() - 12
      timeOfDay = "PM"
    }

    if (time.getHours() === 0 ) {
      hour = 12
    }

    if (time.getMinutes() < 10) {
      min = '0' + time.getMinutes()
    }

    const timeString = time.toDateString() + " " + hour + ":" + min + " " + timeOfDay
    return timeString
  }

  const timeString = timestampConverter(props.comment.created_at)

  const id = props.comment.user.id

  let email = ""
  if ( props.comment.item.user_id === props.currentUser.id ) {
    email = <h5><span>{`${props.comment.user.email}`}</span></h5>
  }

  return (
    <div className="comment-tile">
      <h3><Link to={`../users/${id}`}>{props.comment.user.user_name}</Link>:</h3>
      <h4>&nbsp;&nbsp;&nbsp;{props.comment.body}</h4>
      <h5>{timeString}</h5>
      {email}
      {deleteButton}
    </div>
  )
}

export default CommentTile
