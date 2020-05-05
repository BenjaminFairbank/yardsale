import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import ItemsIndexContainer from "../containers/ItemsIndexContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/items" component={ItemsIndexContainer} />
        <Route exact path="/" component={ItemsIndexContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
