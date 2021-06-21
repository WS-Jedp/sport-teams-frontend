import React, { useState, createContext } from 'react'
import { Exercise, LastExercises } from '../../dto/exercise'

type ExercisesInitialState = {
    userLastExercises: LastExercises[],
    teamLastExercises: LastExercises[],
    exercises: Exercise[],
    addExercise: (exercise:Exercise) => void,
    removeExercise: (id:number) => void,
    userExercises: Exercise[],
    addUserExercise: (exercise:Exercise) => void,
    removeUserExercise: (id:number) => void,
    teamExercises: Exercise[],
    addTeamExercise: (exercise:Exercise) => void,
    removeTeamExercise: (id:number) => void
}

const exercisesInitialState:ExercisesInitialState = {
    userExercises: [],
    addUserExercise: () => {},
    removeUserExercise: () => {},
    userLastExercises: [],
    exercises: [],
    addExercise: () => {},
    removeExercise: () => {},
    teamLastExercises: [],
    teamExercises: [],
    addTeamExercise: () => {},
    removeTeamExercise: () => {},
} 

export const ExercisesContext = createContext<ExercisesInitialState>(exercisesInitialState)

export const ExercisesContextProvider:React.FC = ({ children }) => {

    const [userExercises, setUserExercises] = useState<Exercise[]>([])
    const [userLastExercises, setUserLastExercises] = useState<LastExercises[]>([])
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [teamLastExercises, setTeamLastExercises] = useState<LastExercises[]>([])
    const [teamExercises, setTeamExercises] = useState<Exercise[]>([])

    const addUserExercise = (exercise:Exercise) => setUserExercises([...userExercises, exercise])
    const removeUserExercise = (id:number) => setUserExercises(userExercises.filter(exercise => exercise.id !== id))

    const addExercise = (exercise:Exercise) => setExercises([...exercises, exercise])
    const removeExercise = (id:number) => setExercises(exercises.filter(exercise => exercise.id !== id))

    const addTeamExercise = (exercise:Exercise) => setTeamExercises([...teamExercises, exercise])
    const removeTeamExercise = (id:number) => setTeamExercises(teamExercises.filter(exercise => exercise.id !== id))

    const initialState = {
        userExercises,
        addUserExercise,
        removeUserExercise,
        userLastExercises,
        exercises,
        addExercise,
        removeExercise,
        teamLastExercises,
        teamExercises,
        addTeamExercise,
        removeTeamExercise
    }

    return (
        <ExercisesContext.Provider value={initialState}>
            {
                children
            }
        </ExercisesContext.Provider>
    )
}
