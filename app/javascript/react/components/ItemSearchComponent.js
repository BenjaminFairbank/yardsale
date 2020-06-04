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
    props.items.forEach((item) => {
      const values = Object.values(item)
      let tipOff = 0
      values.forEach((value) => {
        if (typeof value === "string") {
          if (value.toLowerCase().includes(searchFormData.search.trim().toLowerCase())) {
            tipOff = 1
          }
        } else {
          if ( value.length > 0 ) {
            value.forEach((comment) => {
              if (comment.body.toLowerCase().includes(searchFormData.search.trim().toLowerCase())) {
                tipOff = 1
              }
            });
          }
        }
      });
      if (tipOff > 0) {
        foundItems.push(item)
      }
    });
    props.setDisplayedItems(foundItems)
    props.setSearch(searchFormData)
  }

  return (
    <div id="item-search-component">
      <form id="item-search-form" onSubmit={onSubmitHandler} >

        <input
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
          value={searchFormData.search}
          placeholder="You never know what you might find!"
        />

        <input id="button" type="submit" value="Search the Yard" />

      </form>
    </div>
  )
}

export default ItemSearchComponent
