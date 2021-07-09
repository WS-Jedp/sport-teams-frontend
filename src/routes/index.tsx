import React, { useContext, useEffect, useState } from 'react'
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

    const { isAuth, setIsAuth, handleId, handleUserInformation, setName, setRole, handleTeamId  } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            await isLogged()
            const id = localStorage.getItem('userId')
            const token = localStorage.getItem('token')
            const email = localStorage.getItem('userEmail')
            if(!id || !token || !email) {
                setIsAuth(false)
                return null
            }


            if(id) {
                const {name, role, ...rest} = await getUser(id)
                
                handleId(id)
                setRole(role)
                setName(name)
                handleTeamId(rest.teamId || '')
                handleUserInformation({...rest, email})
                setIsAuth(true)
            }
        } 
        fetchData()
        setIsLoading(false)
    }, [])

    return (
        <BrowserRouter>
            <Switch>
            <>
                {
                    isLoading && (
                        <Loading />
                    )
                }
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