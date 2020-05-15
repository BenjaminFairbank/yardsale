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
  }

  return (
    <div id="item-tab-component">
      <div className="expanded button-group">
        <a onClick={setItemsToAll} id="button1" className="button">All</a>
        <a onClick={setItemsToLocal} id="button2" className="button">Local</a>
        <a onClick={setItemsToFree} id="button3" className="button">Free</a>
      </div>
    </div>
  )
}

export default ItemsTabComponent
