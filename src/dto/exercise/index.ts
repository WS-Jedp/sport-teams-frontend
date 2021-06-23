import { EXERCISES_TYPE, EXERCISE_CATEGORY } from '../../tools/defineExercise'
import { Purpose } from '../purposes'
export type Exercise = {
    id: number,
    title: string,
    description: string,
    purposes: Purpose[],
    type: EXERCISES_TYPE,
    category: EXERCISE_CATEGORY,
    videoUrl?: string,
    result?: number,
    date?: Date
}

export type ExerciseHistory = {
    id: number,
    title: string,
    type: EXERCISES_TYPE,
    category: EXERCISE_CATEGORY,
    result: number,
    date: Date
}

export type LastExercises = {
    id: number,
    title: string,
    type: EXERCISES_TYPE,
    category: EXERCISE_CATEGORY,
    result: number,
    date: Date
}

export type ExerciseSmall = {
    id: number,
    title: string,
    category: EXERCISE_CATEGORY
    type: EXERCISES_TYPE
}