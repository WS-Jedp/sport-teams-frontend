import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Home } from '../pages/home'
import { Teams } from '../pages/teams'
import { Team } from '../pages/team'
import { Training } from '../pages/training'
import { NextTraining } from '../pages/nextTraining'

export const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/home" component={Home}  />

                <Route exact path="/teams"  component={Teams}  />
                <Route exact path="/team"  component={Team}  />

                {/* <Route exact path="/trainings"  component={Training}  /> */}
                <Route exact path="/trainings"  component={NextTraining}  />

                <Redirect to="/home" />
            </Switch>
        </BrowserRouter>
    )
}