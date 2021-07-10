import firebase from 'firebase'
import { format } from 'date-fns'
import { Training } from '../../../dto/training'
import { NextTrainingForm } from '../../../containers/nextTrainingContainers/defineNextTraining'
import { createAttendance } from '../../attendances/post'

import { MYSQL_FORMAT } from '../../../tools/dateFormats'
import { Player } from '../../../dto/player'
import { Exercise, ExerciseSmall } from '../../../dto/exercise'

const TRAININGS = 'trainings'
const USERS = 'users'
const EXERCISES = 'exercises'
const ATTENDANCES = 'attendances'

export const createTraining = async (body:NextTrainingForm) => {

    const formattedDay = `${body.date} ${body.time}`
    
    const trainingRef = await firebase.firestore().collection(TRAININGS).doc()
    const attendanceRef = await createAttendance(trainingRef.id, [])

    
    trainingRef.set({
        exercises: [],
        players: [],
        attendance: attendanceRef,
        datetime: formattedDay,
        state: body.state
    })

    const data = (await trainingRef.get()).data()
    const resp = {
        id: trainingRef.id,
        ...data
    }

    return resp as Training
    
}

export const createNextTraining = async (body:NextTrainingForm) => {
    const db = firebase.firestore()
    const training = await createTraining(body)
    await firebase.database().ref().set({
        nextTraining: training.id
    })
    
    return {
        ...training,
    } as Training

}

export const addPlayerToTraining = async (playerId:string, trainingId: string) => {
    const db = firebase.firestore()
    const playerRef = await (await db.collection(USERS).doc(playerId).get()).ref
    const trainingRef = (await db.collection(TRAININGS).doc(trainingId).get()).data()
    if(!trainingRef) {
        throw new Error("The trainign doesn't exist!")
    }
    const attendanceRef = await db.collection(ATTENDANCES).doc(trainingRef.attendance.id)
    attendanceRef.update({
        players: firebase.firestore.FieldValue.arrayUnion(playerRef)
    })

    const userData = await (await playerRef.get()).data()
    const user = await {...userData ,id: playerRef.id}

    return user as Player
}

export const addExerciseToTraining = async (exerciseId:string, trainingId: string) => {
    const db = firebase.firestore()
    const exerciseRef = await (await db.collection(EXERCISES).doc(exerciseId).get()).ref
    const exercise = (await exerciseRef.get()).data()
    const trainingRef = db.collection(TRAININGS).doc(trainingId)
    trainingRef.update({
        exercises: firebase.firestore.FieldValue.arrayUnion(exerciseRef)
    })

    const resp = await {...exercise, id: exerciseRef.id} as Exercise
    return resp
}

export const removeExerciseToTraining = async (exerciseId:string, trainingId: string) => {
    const db = firebase.firestore()
    const exerciseRef = await (await db.collection(EXERCISES).doc(exerciseId).get()).ref
    const trainingRef = db.collection(TRAININGS).doc(trainingId)
    trainingRef.update({
        exercises: firebase.firestore.FieldValue.arrayRemove(exerciseRef)
    })

    return (await trainingRef.get()).data()
}