import { EXERCISES_TYPE, EXERCISE_CATEGORY } from '../../tools/defineExercise'
export type Exercise = {
    id: number,
    title: string,
    description: string,
    purposes: string[],
    type: EXERCISES_TYPE,
    category: EXERCISE_CATEGORY,
    videoUrl?: string,
    result?: string,
    date?: Date
}

export type LastExercises = {
    id: number,
    title: string,
    type: EXERCISES_TYPE,
    category: EXERCISE_CATEGORY,
    result: string,
    date: Date
}

export type ExerciseSmall = {
    id: number,
    title: string,
    category: EXERCISE_CATEGORY
    type: EXERCISES_TYPE
}