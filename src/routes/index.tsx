import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { UserContext } from '../contexts/user'

import { Login } from '../pages/login'

import { Home } from '../pages/home'

import { Teams } from '../pages/teams'
import { Team } from '../pages/team'

import { Training } from '../pages/training'
import { NextTraining } from '../pages/nextTraining'

import { Exercises } from '../pages/exercises'
import { Exercise } from '../pages/exercise'
import { ExerciseDetail } from '../pages/exerciseDetail'

import { User } from '../pages/user'

export const App = () => {

    const { isAuth } = useContext(UserContext)

    return (
        <BrowserRouter>
            <Switch>

                {
                    isAuth && (
                        <>
                            <Route exact path="/" component={Home}  />
                            <Route exact path="/home" component={Home}  />
            
                            <Route exact path="/teams"  component={Teams}  />
                            <Route exact path="/team"  component={Team}  />
            
                            <Route exact path="/exercises"  component={Exercises}  />
                            <Route exact path="/exercise/:id"  component={Exercise}  />
                            <Route exact path="/exercise/:id/history"  component={ExerciseDetail}  />

                            <Route exact path="/trainings"  component={NextTraining}  />
                            <Route exact path="/trainings/:id"  component={Training}  />
            
                            <Route exact path="/user"  component={User}  />
                            <Redirect to="/" />
                        </>
                    ) 
                }

                <Route exact path="/login"  component={Login}  />

                <Redirect to="/login" />
            </Switch>
        </BrowserRouter>
    )
}