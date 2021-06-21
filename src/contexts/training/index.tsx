import { ExerciseSmall } from "dto/exercise";
import React, { createContext, useState } from "react";
import { Training } from '../../dto/training'

type TrainingInitialState = {
    nextTraining: Training,
    createNextTraining: (training:Training) => void,
    lastTrainings: Training[],
    nextTrainingExercises: ExerciseSmall[],
    addNextTrainingExercise: (exercise:ExerciseSmall) => void,
    removeNextTrainingExercise: (id:number) => void,
}

const trainingInitialState:TrainingInitialState = {
    nextTraining: {id: 0, datetime: null, exercises: [], players: [], state: true},
    addNextTrainingExercise: () => {},
    nextTrainingExercises: [],
    removeNextTrainingExercise: () => {},
    createNextTraining: () => {},
    lastTrainings: []
}

export const TrainingContext = createContext(trainingInitialState)

export const TrainingContextProvider:React.FC = ({children}) => {

    const [nextTraining, setNextTraining] = useState<Training>({id: 0, datetime: null, exercises: [], players: [], state: true})
    const [lastTrainings, setLastTrainings] = useState<Training[]>([])
    const [nextTrainingExercises, setNextTrainingExercises] = useState<ExerciseSmall[]>(nextTraining.exercises)

    const createNextTraining = (training:Training) => setNextTraining(training)
    const addNextTrainingExercise = (exercise:ExerciseSmall) => setNextTrainingExercises([...nextTrainingExercises, exercise])
    const removeNextTrainingExercise = (id:number) => setNextTrainingExercises(nextTrainingExercises.filter(exercise => exercise.id !== id))

    const initialState:TrainingInitialState = {
        nextTraining,
        lastTrainings,
        createNextTraining,
        nextTrainingExercises,
        addNextTrainingExercise,
        removeNextTrainingExercise
    }
    
    return (
        <TrainingContext.Provider value={initialState}>
            {
                children
            }
        </TrainingContext.Provider>
    )
}
