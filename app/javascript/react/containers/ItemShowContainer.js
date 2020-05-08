import React, { useState, useEffect } from 'react'

import ItemShowComponent from '../components/ItemShowComponent'
import CommentsComponent from "../components/CommentsComponent"
import NewCommentForm from '../components/NewCommentForm'

const ItemShowContainer = props => {

  const [comments, setComments] = useState([])

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

  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
    user_name: "",
    zip_code: "",
    items: [],
    comments: []
  })

  useEffect(() => {
    fetch(`/api/v1/current_user.json`)
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
      setCurrentUser(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

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
      setItem(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  useEffect(() => {
    fetch(`/api/v1/items/${itemID}/comments.json`)
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
      setComments(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const fetchPostNewComment = (commentPayload) => {
    fetch(`/api/v1/items/${itemID}/comments`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(commentPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
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
      let comment = body
      setComments([
        ...comments,
        comment
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const fetchDeleteComment = (commentID) => {
    fetch(`/api/v1/comments/${commentID}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
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
      setComments(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let commentsComponent
  if (comments.length > 0) {
    commentsComponent = <CommentsComponent comments={comments} currentUser={currentUser} fetchDeleteComment={fetchDeleteComment}/>
  }

  return (
    <div id="item-show-container">
      <ItemShowComponent item={item} />
      {commentsComponent}
      <NewCommentForm fetchPostNewComment={fetchPostNewComment}/>
    </div>
  )
}

export default ItemShowContainer
