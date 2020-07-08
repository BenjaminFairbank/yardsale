import React from 'react'

const ItemsTabComponent = props => {

  const setItemsToAll = event => {
    event.preventDefault()
    props.setDisplayedItems(props.items)
  }

  const setItemsToLocal = event => {
    event.preventDefault()
    let itemsToDisplay = []
    props.items.forEach((item) => {
      if (item.zip_code === props.currentUser.zip_code) {
        itemsToDisplay.push(item)
      }
    });
    props.setDisplayedItems(itemsToDisplay)
    props.setSearchMessage("Whoops!" + "\xa0\xa0\xa0" + `There are no items posted in your area (${props.currentUser.zip_code}) at this time.`)
  }

  const setItemsToFree = event => {
    event.preventDefault()
    let itemsToDisplay = []
    props.items.forEach((item) => {
      if (item.asking_price === 0) {
        itemsToDisplay.push(item)
      }
    });
    props.setDisplayedItems(itemsToDisplay)
    props.setSearchMessage("Whoops!" + "\xa0\xa0\xa0" + "There are no free items posted at this time.")

  }

  return (
    <div id="item-tab-component">
      <div className="grid-x">
        <a onClick={setItemsToAll} id="button1" className="button cell small-12 medium-4 large-4">All</a>
        <a onClick={setItemsToLocal} id="button2" className="button cell small-12 medium-4 large-4">Local</a>
        <a onClick={setItemsToFree} id="button3" className="button cell small-12 medium-4 large-4">Free</a>
      </div>
    </div>
  )
}

export default ItemsTabComponent
