import React, { createContext, useState } from "react";
import { ExerciseSmall } from "../../dto/exercise";
import { Training } from '../../dto/training'
import { TrainingsMock } from '../../mocks/training'

type TrainingInitialState = {
    nextTraining: Training,
    createNextTraining: (training:Training) => void,
    lastTrainings: Training[],
    nextTrainingExercises: ExerciseSmall[],
    addNextTrainingExercise: (...exercises:ExerciseSmall[]) => void,
    removeNextTrainingExercise: (id:number) => void,
    training?: Training,
    selectTraining: (training:Training) => void,
    trainings: Training[],
    addTrainings: (...training:Training[]) => void
}

const trainingInitialState:TrainingInitialState = {
    nextTraining: {id: 0, datetime: null, exercises: [], players: [], state: true},
    addNextTrainingExercise: () => {},
    nextTrainingExercises: [],
    removeNextTrainingExercise: () => {},
    createNextTraining: () => {},
    lastTrainings: [],
    training: undefined,
    selectTraining: () => {},
    trainings: [],
    addTrainings: () => {}
}

export const TrainingContext = createContext(trainingInitialState)

export const TrainingContextProvider:React.FC = ({children}) => {

    const [nextTraining, setNextTraining] = useState<Training>({id: 0, datetime: new Date(), exercises: [], players: [], state: true})
    const [lastTrainings, setLastTrainings] = useState<Training[]>(TrainingsMock)
    const [nextTrainingExercises, setNextTrainingExercises] = useState<ExerciseSmall[]>(nextTraining.exercises)
    const [training, setTraining] = useState<Training | undefined>()
    const [trainings, setTrainings] = useState<Training[]>([])


    const createNextTraining = (training:Training) => setNextTraining(training)
    const addNextTrainingExercise = (...exercises:ExerciseSmall[]) => setNextTrainingExercises([...nextTrainingExercises, ...exercises])
    const removeNextTrainingExercise = (id:number) => setNextTrainingExercises(nextTrainingExercises.filter(exercise => exercise.id !== id))

    const selectTraining = (training:Training) => setTraining(training)

    const addTrainings = (...data:Training[]) => setTrainings([...trainings, ...data])

    const initialState:TrainingInitialState = {
        nextTraining,
        lastTrainings,
        createNextTraining,
        nextTrainingExercises,
        addNextTrainingExercise,
        removeNextTrainingExercise,
        training,
        selectTraining,
        trainings,
        addTrainings
    }
    
    return (
        <TrainingContext.Provider value={initialState}>
            {
                children
            }
        </TrainingContext.Provider>
    )
}
