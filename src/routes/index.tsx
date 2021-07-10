import React, { useContext, useEffect, useState } from 'react'
import firebase from 'firebase'
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { UserContext } from '../contexts/user'
import { isLogged } from '../services/auth'
import { getUser } from '../services/user/get'

import { Loading } from '../components/loading/basic'

import { Login } from '../pages/login'

import { Home } from '../pages/home'

import { Teams } from '../pages/teams'
import { Team } from '../pages/team'

import { Training } from '../pages/training'
import { NextTraining } from '../pages/nextTraining'
import { Trainings } from '../pages/trainings'

import { Exercises } from '../pages/exercises'
import { Exercise } from '../pages/exercise'
import { ExerciseDetail } from '../pages/exerciseDetail'
import { ExerciseDetailTeam } from '../pages/exerciseDetailTeam'

import { User } from '../pages/user'
import { Person } from '../pages/person'

export const App = () => {

    const { isAuth, setIsAuth, handleId, handleUserInformation, setName, setRole, handleTeamId, id  } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            await firebase.auth().onAuthStateChanged(async user => {
                if(user) {
                    const {name, role, ...rest} = await getUser(user.uid)
                    handleId(user.uid)
                    setRole(role)
                    setName(name)
                    handleTeamId(rest.teamId || '')
                    handleUserInformation({...rest, email: rest.email})
                    setIsAuth(true)
                } else {
                    if(!id) {
                        setIsAuth(false)
                        return null
                    }
                }
        
            })
        } 
        fetchData()
        setIsLoading(false)
    }, [])

    return (
        <BrowserRouter>
                {
                    isLoading && (
                        <Loading />
                    )
                }
            <Switch>
            <>
                
                {
                    isAuth && (
                        <>
                            <Route exact path="/" component={Home}  />
                            <Route exact path="/home" component={Home}  />
            
                            <Route exact path="/teams"  component={Teams}  />
                            <Route exact path="/teams/:id"  component={Team}  />
            
                            <Route exact path="/exercises"  component={Exercises}  />
                            <Route exact path="/exercise/:id"  component={Exercise}  />
                            <Route exact path="/exercise/:id/history" component={ExerciseDetail}  />
                            <Route exact path="/exercise/:id/team/:teamId/history" component={ExerciseDetailTeam}  />

                            <Route exact path="/trainings"  component={NextTraining} />
                            <Route exact path="/trainings/:id"  component={Training} />
                            <Route exact path="/all/trainings"  component={Trainings} />
            
                            <Route exact path="/user"  component={User}  />
                            <Route exact path="/user/:id"  component={Person}  />
                            <Redirect to="/" />
                        </>
                    ) 
                }

                    <Route exact path="/login"  component={Login}  />

                    <Redirect to="/login" />
                </>
            </Switch>
        </BrowserRouter>
    )
}