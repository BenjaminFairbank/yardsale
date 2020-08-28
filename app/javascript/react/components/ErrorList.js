import React from 'react'
import _ from 'lodash'

const ErrorList = props => {
  const errantFields = Object.keys(props.errors)
  if (errantFields.length > 0) {

    let index = 0

    const listItems = errantFields.map(field => {
      index++
      return (
        <li key={index}>
          {_.capitalize(field).replace('_', ' ')} {props.errors[field]}
        </li>
      )
    })

    let pluralError = 'errors'

    if (errantFields.length === 1) {
      pluralError = 'error'
    }

    return (
      <div className='callout alert'>
        <h3>{errantFields.length} {pluralError} prohibited this item from being saved:</h3>
        <ul>{listItems}</ul>
      </div>
    )

  } else {
    return ''
  }
}

export default ErrorList
