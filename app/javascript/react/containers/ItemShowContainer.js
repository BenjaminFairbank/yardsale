import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import ItemShowComponent from '../components/ItemShowComponent'
import CommentsComponent from '../components/CommentsComponent'
import NewCommentForm from '../components/NewCommentForm'
import EditOrDeleteLinks from '../components/EditOrDeleteLinks'

const ItemShowContainer = props => {

  const [comments, setComments] = useState([])
  const [deleteError, setDeleteError] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [itemDeleteError, setItemDeleteError] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [item, setItem] = useState({
    name: '',
    description: '',
    image: '',
    asking_price: '',
    zip_code: '',
    user: {
      user_name: '',
      email: ''
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
      setComments(body.comments)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const fetchPostNewComment = (commentPayload) => {
    fetch('/api/v1/comments', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(commentPayload),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
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
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
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
      if (body.error) {
        setItemDeleteError(body.error)
      } else {
        setComments(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const fetchDeleteItem = (itemID) => {
    fetch(`/api/v1/items/${itemID}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
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
      if (body.error) {
        setItemDeleteError(body.error)
      } else {
        setRedirect(true)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let commentsComponent
  if (comments.length > 0) {
    commentsComponent = <CommentsComponent
      comments={comments}
      currentUser={currentUser}
      fetchDeleteComment={fetchDeleteComment}
      deleteError={deleteError}
    />
  }

  let editOrDeleteLinks = ''
  if (item.user.id === currentUser.id) {
    editOrDeleteLinks =
      <EditOrDeleteLinks
        itemId={item.id}
        fetchDeleteItem={fetchDeleteItem}
        itemDeleteError={itemDeleteError}
      />
  }

  let page = ''
  if (!redirect) {
    page =
      <div id='item-show-container'>
        <ItemShowComponent item={item} />
        {editOrDeleteLinks}
        <NewCommentForm
          currentUser={currentUser}
          item={item}
          commentsComponent={commentsComponent}
          fetchPostNewComment={fetchPostNewComment}
        />
      </div>
  } else {
    page = <Redirect to={`/users/${currentUser.id}`} />
  }

  return (
    <>{page}</>
  )
}

export default ItemShowContainer
