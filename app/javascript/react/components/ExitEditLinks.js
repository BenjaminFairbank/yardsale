import React from 'react'
import { Link } from 'react-router-dom'

const ExitEditLinks = props => {

  return (
    <div className='grid-x' id='exit-edit-links'>
      <div className='item cell small-12 medium-6 large-6'>
        <Link to={`/items/${props.itemId}`}>Return to item page</Link>
      </div>
      <div className='user cell small-12 medium-6 large-6'>
        <Link to={`/users/${props.userId}`}>Return to My Lawn</Link>
      </div>
    </div>
  )
}

export default ExitEditLinks
