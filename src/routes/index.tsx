import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Home } from '../pages/home'

export const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}  />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}