import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ItemsIndexContainer from './containers/ItemsIndexContainer'
import ItemShowContainer from './containers/ItemShowContainer'
import ItemEditContainer from './containers/ItemEditContainer'
import UserShowContainer from './containers/UserShowContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ItemsIndexContainer} />
        <Route exact path='/items' component={ItemsIndexContainer} />
        <Route exact path='/items/:id' component={ItemShowContainer} />
        <Route exact path='/items/:id/edit' component={ItemEditContainer} />
        <Route exact path='/users/:id' component={UserShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
