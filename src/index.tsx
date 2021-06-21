import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './routes'
import { UserContextProvicder } from './contexts/user'
import { ExercisesContextProvider } from './contexts/exercises'
import { TrainingContextProvider } from './contexts/training'

import './assets/styles/main.scss'

ReactDOM.render((
    <UserContextProvicder>
        <TrainingContextProvider>
            <ExercisesContextProvider>
                <App />
            </ExercisesContextProvider>
        </TrainingContextProvider>
    </UserContextProvicder>
), window.document.getElementById('app'))
