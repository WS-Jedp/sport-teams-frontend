import React, { useState, createContext } from 'react'
import { Exercise, LastExercises } from '../../dto/exercise'

import { ExercisesMock, UserExercisesMock, LastExercisesMock } from '../../mocks/exercises'

type ExercisesInitialState = {
    userLastExercises: LastExercises[],
    teamLastExercises: LastExercises[],
    exercise?: Exercise,
    selectExercise: (exercise:Exercise) => void,
    updateExercise: (exercise:Exercise) => void,
    exercises: Exercise[],
    addExercise: (...exercises:Exercise[]) => void,
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
    exercise: undefined,
    selectExercise: () => {},
    updateExercise: () => {},
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

    const [userExercises, setUserExercises] = useState<Exercise[]>(UserExercisesMock)
    const [userLastExercises, setUserLastExercises] = useState<LastExercises[]>(LastExercisesMock)
    const [exercise, setExercise] = useState<Exercise | undefined>(undefined)
    const [exercises, setExercises] = useState<Exercise[]>(ExercisesMock)
    const [teamLastExercises, setTeamLastExercises] = useState<LastExercises[]>(LastExercisesMock)
    const [teamExercises, setTeamExercises] = useState<Exercise[]>(ExercisesMock)

    const addUserExercise = (exercise:Exercise) => setUserExercises([...userExercises, exercise])
    const removeUserExercise = (id:number) => setUserExercises(userExercises.filter(exercise => exercise.id !== id))

    const addExercise = (...exercises:Exercise[]) => setExercises([...exercises, ...exercises])
    const removeExercise = (id:number) => setExercises(exercises.filter(exercise => exercise.id !== id))

    const selectExercise = (exercise:Exercise) => setExercise(exercise)
    const updateExercise = (exercise:Exercise) => setExercise(exercise)

    const addTeamExercise = (exercise:Exercise) => setTeamExercises([...teamExercises, exercise])
    const removeTeamExercise = (id:number) => setTeamExercises(teamExercises.filter(exercise => exercise.id !== id))

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
