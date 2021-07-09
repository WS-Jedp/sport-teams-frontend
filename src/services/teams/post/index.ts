import firebase from 'firebase'
import { format, addDays } from 'date-fns'
import { MYSQL_FORMAT } from '../../../tools/dateFormats'
import { RegisterExerciseForm } from '../../../containers/exercisesContainers/forms/registerExercise'

const TEAMS = 'teams'
const EXERCISES = 'exercises'
const EXERCISES_REFERENCE = '/exercises'

// Posts services
export const registerTeamExercise = async (body:RegisterExerciseForm) => {
    const data = await firebase.firestore().collection(TEAMS).doc(body.user_id).collection(EXERCISES).add({
        result: body.result,
        exercise: (await firebase.firestore().collection(EXERCISES).doc(body.exercise_id).get()).ref,
        date: format(addDays(body.date, 1), MYSQL_FORMAT)
    })
    const lastExercise = await (await firebase.firestore().collection(TEAMS).doc(body.user_id).collection(EXERCISES).doc(data.id).get()).data()
    return lastExercise
}