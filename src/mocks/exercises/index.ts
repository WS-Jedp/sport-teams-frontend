import { Exercise, LastExercises } from '../../dto/exercise'
import { PurposesMock } from '../../mocks/purposes'

export const ExercisesMock:Exercise[] = [
    {
        id: 1,
        title: 'Mock Exercise',
        category: 'cardio',
        type: 'time',
        description: 'Description for this mock exercise',
        purposes: PurposesMock,
    },
    {
        id: 2,
        title: 'Mock Exercise 2',
        category: 'technical',
        type: 'time',
        description: 'Description for this mock exercise 2',
        purposes: PurposesMock,
    }
]

export const UserExercisesMock:Exercise[] = [
    {
        id: 1,
        title: 'Mock Exercise',
        category: 'cardio',
        type: 'time',
        description: 'Description for this mock exercise',
        purposes: [PurposesMock[0]],
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