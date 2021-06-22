import { Exercise, LastExercises } from '../../dto/exercise'

export const ExercisesMock:Exercise[] = [
    {
        id: 1,
        title: 'Mock Exercise',
        category: 'cardio',
        type: 'time',
        description: 'Description for this mock exercise',
        purposes: ['Resialiance', 'Stamina', 'Velocity'],
    }
]

export const UserExercisesMock:Exercise[] = [
    {
        id: 1,
        title: 'Mock Exercise',
        category: 'cardio',
        type: 'time',
        description: 'Description for this mock exercise',
        purposes: ['Resialiance', 'Stamina', 'Velocity'],
        date: new Date(2021, 5, 2),
        result: 12,
        videoUrl: 'L3aMtj44chU'
    }
]

export const LastExercisesMock:LastExercises[] = [
    {
        id: 1,
        category: 'cardio',
        date: new Date(2021, 6, 21),
        result: 12,
        title:'Laps',
        type: 'repetitions'
    }
]