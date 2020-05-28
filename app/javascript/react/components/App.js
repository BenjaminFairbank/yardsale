import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import ItemsIndexContainer from "../containers/ItemsIndexContainer"
import ItemShowContainer from "../containers/ItemShowContainer"
import UserShowContainer from "../containers/UserShowContainer"
import AdminPageContainer from "../containers/AdminPageContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ItemsIndexContainer} />
        <Route exact path="/items" component={ItemsIndexContainer} />
        <Route exact path="/items/:id" component={ItemShowContainer} />
        <Route exact path="/users/:id" component={UserShowContainer} />
        <Route exact path="/admin" component={AdminPageContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
