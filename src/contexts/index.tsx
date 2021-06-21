import React from 'react'
import { UserContextProvider } from './user'
import { TeamContextProvider } from './team'
import { TrainingContextProvider } from './training'
import { ExercisesContextProvider } from './exercises'

export const Contexts:React.FC = ({children}) => {

    return (
        <UserContextProvider>
            <TeamContextProvider>
                <TrainingContextProvider>
                    <ExercisesContextProvider>
                        { children }
                    </ExercisesContextProvider>
                </TrainingContextProvider>
            </TeamContextProvider>
        </UserContextProvider>
    )
}