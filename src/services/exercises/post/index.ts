import firebase from 'firebase'
import { format, addDays } from 'date-fns'
import { MYSQL_FORMAT } from '../../../tools/dateFormats'
import { RegisterExerciseForm } from '../../../containers/exercisesContainers/forms/registerExercise'
import { CreateExerciseForm } from '../../../containers/exercisesContainers/forms/createExercise'

const USER = 'users'
const EXERCISES = 'exercises'
const EXERCISES_REFERENCE = '/exercises'

// Posts services
export const registerExercise = async (body:RegisterExerciseForm) => {
    const data = await firebase.firestore().collection(USER).doc(body.user_id).collection(EXERCISES).add({
        result: body.result,
        exercise: (await firebase.firestore().collection(EXERCISES).doc(body.exercise_id).get()).ref,
        date: format(addDays(body.date, 1), MYSQL_FORMAT)
    })
    const lastExercise = await (await firebase.firestore().collection(USER).doc(body.user_id).collection(EXERCISES).doc(data.id).get()).data()
    return lastExercise
}

export const createExercise = async (body:CreateExerciseForm) => {
    const exerciseRef = await firebase.firestore().collection(EXERCISES).doc()
    exerciseRef.set({
        ...body
    })
    const exerciseCreated = await (await firebase.firestore().collection(EXERCISES).doc(exerciseRef.id).get()).data()
    return exerciseCreated
}

export const updateExercise = async (exerciseId: string, body:CreateExerciseForm) => {
    const exerciseRef = await firebase.firestore().collection(EXERCISES).doc(exerciseId).update({
        ...body
    })
    return exerciseRef
}

export const removeExercise = async (exerciseId:string) => {
    const resp = await firebase.firestore().collection(EXERCISES).doc(exerciseId).delete()
    return resp
}