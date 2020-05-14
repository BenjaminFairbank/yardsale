import React, { useState } from 'react'

import CommentTile from "../components/CommentTile"

const CommentsComponent = props => {

  let commentList = null
  if (props.comments.length > 0) {
    commentList = props.comments.map((comment) => {
      return (
        <CommentTile
          key={comment.id}
          comment={comment}
          currentUser={props.currentUser}
          fetchDeleteComment={props.fetchDeleteComment}
        />
      )
    })
  }

  return (
    <div id="comments-container">
      <h1>Comments</h1>
      {commentList}
    </div>
  )
}

export default CommentsComponent
