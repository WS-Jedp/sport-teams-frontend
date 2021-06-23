import { ExerciseSmall } from "dto/exercise";
import React, { createContext, useState } from "react";
import { Training } from '../../dto/training'

type TrainingInitialState = {
    nextTraining: Training,
    createNextTraining: (training:Training) => void,
    lastTrainings: Training[],
    nextTrainingExercises: ExerciseSmall[],
    addNextTrainingExercise: (...exercises:ExerciseSmall[]) => void,
    removeNextTrainingExercise: (id:number) => void,
    training?: Training,
    selectTraining: (training:Training) => void
}

const trainingInitialState:TrainingInitialState = {
    nextTraining: {id: 0, datetime: null, exercises: [], players: [], state: true},
    addNextTrainingExercise: () => {},
    nextTrainingExercises: [],
    removeNextTrainingExercise: () => {},
    createNextTraining: () => {},
    lastTrainings: [],
    training: undefined,
    selectTraining: () => {}
}

export const TrainingContext = createContext(trainingInitialState)

export const TrainingContextProvider:React.FC = ({children}) => {

    const [nextTraining, setNextTraining] = useState<Training>({id: 0, datetime: null, exercises: [], players: [], state: true})
    const [lastTrainings, setLastTrainings] = useState<Training[]>([])
    const [nextTrainingExercises, setNextTrainingExercises] = useState<ExerciseSmall[]>(nextTraining.exercises)
    const [training, setTraining] = useState<Training | undefined>()


    const createNextTraining = (training:Training) => setNextTraining(training)
    const addNextTrainingExercise = (...exercises:ExerciseSmall[]) => setNextTrainingExercises([...nextTrainingExercises, ...exercises])
    const removeNextTrainingExercise = (id:number) => setNextTrainingExercises(nextTrainingExercises.filter(exercise => exercise.id !== id))

    const selectTraining = (training:Training) => setTraining(training)

    const initialState:TrainingInitialState = {
        nextTraining,
        lastTrainings,
        createNextTraining,
        nextTrainingExercises,
        addNextTrainingExercise,
        removeNextTrainingExercise,
        training,
        selectTraining
    }
    
    return (
        <TrainingContext.Provider value={initialState}>
            {
                children
            }
        </TrainingContext.Provider>
    )
}
