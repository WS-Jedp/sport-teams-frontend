import firebase from 'firebase'
import { format, addDays } from 'date-fns'
import { MYSQL_FORMAT } from '../../../tools/dateFormats'
import { RegisterExerciseForm } from '../../../containers/exercisesContainers/forms/registerExercise'
import { AddExerciseRegisterForm } from '../../../containers/nextTrainingContainers/addExerciseRegister'
import { CreateExerciseForm } from '../../../containers/exercisesContainers/forms/createExercise'
import { defineIdYoutubeVideo } from '../../../tools/defineYoutubeVideoId'

const USER = 'users'
const EXERCISES = 'exercises'
const EXERCISES_REFERENCE = '/exercises'

// Posts services
export const registerExercise = async (body:RegisterExerciseForm) => {
    let url:string | undefined
    if(body.video) {
        const videoRef = await firebase.storage().ref().child(`/exercises/${body.user_id}/${body.video[0].name}`).put(body.video[0]).then(async snapshot => {
            url = await snapshot.ref.getDownloadURL()
        })
    }


    const data = await firebase.firestore().collection(USER).doc(body.user_id).collection(EXERCISES).add({
        result: body.result,
        exercise: (await firebase.firestore().collection(EXERCISES).doc(body.exercise_id).get()).ref,
        date: format(addDays(body.date, 1), MYSQL_FORMAT),
        videoUrl: url ? url : null
    })
    const lastExercise = await (await firebase.firestore().collection(USER).doc(body.user_id).collection(EXERCISES).doc(data.id).get()).data()
    return lastExercise
}

export const registerUserExercise = async (body:AddExerciseRegisterForm) => {
    let url:string | undefined
    if(body.video) {
        const videoRef = await firebase.storage().ref().child(`/exercises/${body.playerId}/${body.video[0].name}`).put(body.video[0]).then(async snapshot => {
            url = await snapshot.ref.getDownloadURL()
        })
    }
    const data = await firebase.firestore().collection(USER).doc(body.playerId).collection(EXERCISES).add({
        result: body.result,
        exercise: (await firebase.firestore().collection(EXERCISES).doc(body.exerciseId).get()).ref,
        date: format(addDays(new Date(), 1), MYSQL_FORMAT)
    })
    const lastExercise = await (await firebase.firestore().collection(USER).doc(body.playerId).collection(EXERCISES).doc(data.id).get()).data()
    return lastExercise
}


export const createExercise = async (body:CreateExerciseForm) => {
    const exerciseRef = await firebase.firestore().collection(EXERCISES).doc()
    exerciseRef.set({
        ...body,
    })
    return exerciseRef.id
}

export const updateExercise = async (exerciseId: string, body:CreateExerciseForm) => {
    let videoId:string | undefined 
    if(body.videoId) {
        videoId = defineIdYoutubeVideo(body.videoId)
    }
    const exerciseRef = await firebase.firestore().collection(EXERCISES).doc(exerciseId)
    await exerciseRef.update({
        ...body,
        videoId
    })
    return exerciseRef.id
}

export const removeExercise = async (exerciseId:string) => {
    const resp = await firebase.firestore().collection(EXERCISES).doc(exerciseId).delete()
    return resp
}