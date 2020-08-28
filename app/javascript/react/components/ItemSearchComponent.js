import React, { useState } from 'react'

const ItemSearchComponent = props => {
  const [searchFormData, setSearchFormData] = useState({search: ""})

  const handleChange = event => {
    event.preventDefault()
    setSearchFormData({
      ...searchFormData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    let foundItems = []
    let terms = searchFormData.search.trim().toLowerCase().split(' ')

    terms.forEach((term) => {

      props.items.forEach((item) => {
        const values = Object.values(item)
        let tipOff = false
        values.forEach((value) => {
          if (typeof value === 'string') {
            if ( value.toLowerCase().includes(term) ) {
              tipOff = true
            }
          } else {
            if ( value.length > 0 ) {
              value.forEach((comment) => {
                if ( comment.body.toLowerCase().includes(term) ) {
                  tipOff = true
                }
              });
            }
          }
        });
        if ( tipOff && !foundItems.includes(item)) {
          foundItems.push(item)
        }
      });

    });

    props.setDisplayedItems(foundItems)
    if (foundItems.length === 0) {
      props.setSearchMessage('Whoops!' + '\xa0\xa0\xa0' + `No results for "${searchFormData.search}"`)
    }
  }

  return (
    <div id='item-search-component'>
      <form id='item-search-form' onSubmit={onSubmitHandler} >

        <input
          type='text'
          name='search'
          id='search'
          onChange={handleChange}
          value={searchFormData.search}
          placeholder='You never know what you might find!'
        />

      <input id='button' type='submit' value='Search the Yard' />

      </form>
    </div>
  )
}

export default ItemSearchComponent
