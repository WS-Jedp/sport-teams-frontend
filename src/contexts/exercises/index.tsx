import React, { useState, createContext } from 'react'
import { Exercise, LastExercises } from '../../dto/exercise'

import { ExercisesMock, UserExercisesMock, LastExercisesMock } from '../../mocks/exercises'
import { PurposesMock } from '../../mocks/purposes'
import { Purpose } from '../../dto/purposes'

type ExercisesInitialState = {
    userLastExercises: LastExercises[],
    teamLastExercises: LastExercises[],
    exercise?: Exercise,
    selectExercise: (exercise:Exercise) => void,
    updateExercise: (exercise:Exercise) => void,
    exercises: Exercise[],
    addExercise: (...data:Exercise[]) => void,
    setExercises: (...data:Exercise[]) => void,
    removeExercise: (id:string) => void,
    userExercises: Exercise[],
    addUserExercise: (exercise:Exercise) => void,
    removeUserExercise: (id:string) => void,
    teamExercises: Exercise[],
    addTeamExercise: (exercise:Exercise) => void,
    removeTeamExercise: (id:string) => void,
    purposes: Purpose[]
}

const exercisesInitialState:ExercisesInitialState = {
    userExercises: [],
    exercise: undefined,
    selectExercise: () => {},
    updateExercise: () => {},
    addUserExercise: () => {},
    removeUserExercise: () => {},
    userLastExercises: [],
    exercises: [],
    addExercise: () => {},
    setExercises: () => {},
    removeExercise: () => {},
    teamLastExercises: [],
    teamExercises: [],
    addTeamExercise: () => {},
    removeTeamExercise: () => {},
    purposes: []
} 

export const ExercisesContext = createContext<ExercisesInitialState>(exercisesInitialState)

export const ExercisesContextProvider:React.FC = ({ children }) => {

    const [userExercises, setUserExercises] = useState<Exercise[]>([])
    const [userLastExercises, setUserLastExercises] = useState<LastExercises[]>([])
    const [exercise, setExercise] = useState<Exercise | undefined>(undefined)
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [teamLastExercises, setTeamLastExercises] = useState<LastExercises[]>([])
    const [teamExercises, setTeamExercises] = useState<Exercise[]>([])
    const [purposes, setPurposes] = useState<Purpose[]>([])

    const addUserExercise = (exercise:Exercise) => setUserExercises([...userExercises, exercise])
    const removeUserExercise = (id:string) => setUserExercises(userExercises.filter(exercise => exercise.id !== id))

    const addExercise = (...data:Exercise[]) => setExercises([...exercises, ...data])
    const setAllExercises = (...data:Exercise[]) => setExercises([...data])
    const removeExercise = (id:string) => setExercises(exercises.filter(exercise => exercise.id !== id))

    const selectExercise = (exercise:Exercise) => setExercise(exercise)
    const updateExercise = (exercise:Exercise) => setExercise(exercise)

    const addTeamExercise = (exercise:Exercise) => setTeamExercises([...teamExercises, exercise])
    const removeTeamExercise = (id:string) => setTeamExercises(teamExercises.filter(exercise => exercise.id !== id))

    const initialState:ExercisesInitialState = {
        userExercises,
        addUserExercise,
        removeUserExercise,
        userLastExercises,
        exercise,
        selectExercise,
        updateExercise,
        exercises,
        addExercise,
        setExercises: setAllExercises,
        removeExercise,
        teamLastExercises,
        teamExercises,
        addTeamExercise,
        removeTeamExercise,
        purposes
    }

    return (
        <ExercisesContext.Provider value={initialState}>
            {
                children
            }
        </ExercisesContext.Provider>
    )
}
