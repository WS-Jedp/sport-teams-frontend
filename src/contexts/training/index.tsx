import React, { createContext, useState } from "react";
import { Exercise, ExerciseSmall } from "../../dto/exercise";
import { Training } from '../../dto/training'
import { Player } from "../../dto/player";

type TrainingInitialState = {
    nextTraining: Training | undefined,
    createNextTraining: (training:Training) => void,
    lastTrainings: Training[],
    setLastTrainings: (...trainings:Training[]) => void,
    removeLastTraining: (id:string) => void,
    nextTrainingExercises: ExerciseSmall[],
    addNextTrainingExercise: (...exercises:Exercise[]) => void,
    removeNextTrainingExercise: (id:string) => void,
    addNextTrainingPlayer: (...players:Player[]) => void,
    removeNextTrainingPlayer: (id:string) => void,
    training?: Training,
    addExercisesToTraining: (...exercises:Exercise[]) => void,
    removeExerciseToTraining: (id:string) => void,
    selectTraining: (training:Training) => void,
    trainings: Training[],
    addTrainings: (...training:Training[]) => void
    lastScheduledTrainings: Training[],
    setLastScheduledTrainings: (trainings:Training[]) => void,
    scheduledTrainings: Training[],
    setScheduledTrainings: (trainings:Training[]) => void,
    addTrainingToLastScheduledTrainings: (training:Training) => void
    removeLastScheduledTraining: (id:string) => void
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
    removeLastTraining: () => {},
    training: undefined,
    addExercisesToTraining: () => {},
    removeExerciseToTraining: () => {},
    selectTraining: () => {},
    trainings: [],
    addTrainings: () => {},
    scheduledTrainings: [],
    setScheduledTrainings: () =>  {},
    lastScheduledTrainings: [],
    setLastScheduledTrainings: () => {},
    addTrainingToLastScheduledTrainings: () => {},
    removeLastScheduledTraining: () => {}
}

export const TrainingContext = createContext(trainingInitialState)

export const TrainingContextProvider:React.FC = ({children}) => {

    const [nextTraining, setNextTraining] = useState<Training | undefined>(undefined)
    const [lastTrainings, setLastTrainings] = useState<Training[]>([])
    const [nextTrainingExercises, setNextTrainingExercises] = useState<ExerciseSmall[]>([])
    const [training, setTraining] = useState<Training | undefined>()
    const [trainings, setTrainings] = useState<Training[]>([])
    const [scheduledTrainings, setScheduledTrainings] = useState<Training[]>([])
    const [lastScheduledTrainings, setLastScheduledTrainings] = useState<Training[]>([])


    const createNextTraining = (training:Training) => setNextTraining(training)
    const addNextTrainingExercise = (...exercises:Exercise[]) => nextTraining && setNextTraining({...nextTraining, exercises: [...nextTraining.exercises, ...exercises]})
    const removeNextTrainingExercise = (id:string) => nextTraining && setNextTraining({...nextTraining, exercises: nextTraining.exercises.filter(exercise => (exercise.id !== id))})

    const addNextTrainingPlayer = (...player:Player[]) => nextTraining && setNextTraining({...nextTraining, players: [...nextTraining.players, ...player]})
    const removeNextTrainingPlayer = (id:string) => nextTraining && setNextTraining({...nextTraining, players: nextTraining.players.filter(exercise => (exercise.id !== id))})

    const handleSetLastTrainings = (...trainings:Training[]) => setLastTrainings(trainings)

    const selectTraining = (training:Training) => setTraining(training)
    const addExercisesToTraining = (...exercises:Exercise[]) => setTraining((old) => ({...old as Training, exercises: [...old?.exercises ? old.exercises : [], ...exercises]} ))
    const removeExerciseToTraining= (id:string) => setTraining((old) => ({...old as Training, exercises: [...old?.exercises ? old.exercises.filter((exercise) => exercise.id !== id) : []]} ))

    const addTrainings = (...data:Training[]) => setTrainings([...trainings, ...data])

    const addTrainingToLastScheduledTrainings = (training:Training) => setLastScheduledTrainings((old) => [...old, training])
    const removeLastScheduledTraining = (id:string) => setLastScheduledTrainings((old) => old.filter(training => training.id !== id))

    const removeLastTraining = (id:string) => setLastTrainings(old => old.filter(training => training.id !== id))

    const initialState:TrainingInitialState = {
        nextTraining,
        lastTrainings,
        setLastTrainings: handleSetLastTrainings,
        removeLastTraining,
        createNextTraining,
        nextTrainingExercises,
        addNextTrainingExercise,
        removeNextTrainingExercise,
        addNextTrainingPlayer,
        removeNextTrainingPlayer,
        training,
        addExercisesToTraining,
        removeExerciseToTraining,
        selectTraining,
        trainings,
        addTrainings,
        scheduledTrainings,
        setScheduledTrainings,
        lastScheduledTrainings,
        setLastScheduledTrainings,
        addTrainingToLastScheduledTrainings,
        removeLastScheduledTraining
    }
    
    return (
        <TrainingContext.Provider value={initialState}>
            {
                children
            }
        </TrainingContext.Provider>
    )
}
