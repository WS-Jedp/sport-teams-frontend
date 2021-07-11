import React, { createContext, useState } from "react";
import { Exercise, ExerciseSmall } from "../../dto/exercise";
import { Training } from '../../dto/training'
import { Player } from "../../dto/player";

type TrainingInitialState = {
    nextTraining: Training | undefined,
    createNextTraining: (training:Training) => void,
    lastTrainings: Training[],
    setLastTrainings: (...trainings:Training[]) => void,
    nextTrainingExercises: ExerciseSmall[],
    addNextTrainingExercise: (...exercises:Exercise[]) => void,
    removeNextTrainingExercise: (id:string) => void,
    addNextTrainingPlayer: (...players:Player[]) => void,
    removeNextTrainingPlayer: (id:string) => void,
    training?: Training,
    selectTraining: (training:Training) => void,
    trainings: Training[],
    addTrainings: (...training:Training[]) => void
}

const trainingInitialState:TrainingInitialState = {
    nextTraining: undefined,
    addNextTrainingExercise: () => {},
    nextTrainingExercises: [],
    removeNextTrainingExercise: () => {},
    createNextTraining: () => {},
    addNextTrainingPlayer: () => {},
    removeNextTrainingPlayer: () => {},
    lastTrainings: [],
    setLastTrainings: () => {},
    training: undefined,
    selectTraining: () => {},
    trainings: [],
    addTrainings: () => {}
}

export const TrainingContext = createContext(trainingInitialState)

export const TrainingContextProvider:React.FC = ({children}) => {

    const [nextTraining, setNextTraining] = useState<Training | undefined>(undefined)
    const [lastTrainings, setLastTrainings] = useState<Training[]>([])
    const [nextTrainingExercises, setNextTrainingExercises] = useState<ExerciseSmall[]>([])
    const [training, setTraining] = useState<Training | undefined>()
    const [trainings, setTrainings] = useState<Training[]>([])


    const createNextTraining = (training:Training) => setNextTraining(training)
    const addNextTrainingExercise = (...exercises:Exercise[]) => nextTraining && setNextTraining({...nextTraining, exercises: [...nextTraining.exercises, ...exercises]})
    const removeNextTrainingExercise = (id:string) => nextTraining && setNextTraining({...nextTraining, exercises: nextTraining.exercises.filter(exercise => (exercise.id !== id))})

    const addNextTrainingPlayer = (...player:Player[]) => nextTraining && setNextTraining({...nextTraining, players: [...nextTraining.players, ...player]})
    const removeNextTrainingPlayer = (id:string) => nextTraining && setNextTraining({...nextTraining, players: nextTraining.players.filter(exercise => (exercise.id !== id))})

    const handleSetLastTrainings = (...trainings:Training[]) => setLastTrainings(trainings)

    const selectTraining = (training:Training) => setTraining(training)

    const addTrainings = (...data:Training[]) => setTrainings([...trainings, ...data])

    const initialState:TrainingInitialState = {
        nextTraining,
        lastTrainings,
        setLastTrainings: handleSetLastTrainings,
        createNextTraining,
        nextTrainingExercises,
        addNextTrainingExercise,
        removeNextTrainingExercise,
        addNextTrainingPlayer,
        removeNextTrainingPlayer,
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
