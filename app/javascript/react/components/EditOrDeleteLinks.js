import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const EditOrDeleteLinks = props => {

  const onClickHandler = (event) => {
    event.preventDefault()
    if (confirm('Are you sure you want to delete this posted item?')) {
      props.fetchDeleteItem(props.itemId)
    }
  }

  return (
    <>
      <div className='grid-x' id='edit-or-delete-links'>
        <div className='edit cell small-12 medium-6 large-6'>
          <Link to={`/items/${props.itemId}/edit`}>Edit this item</Link>
        </div>
        <div className='delete cell small-12 medium-6 large-6'>
          <div id='item-delete-button'>
            <input
              id='button'
              type='button'
              onClick={onClickHandler}
              value='Delete this item'
            />
          </div>
        </div>
      </div>
      <h2>{props.itemDeleteError}</h2>
    </>
  )
}

export default EditOrDeleteLinks
