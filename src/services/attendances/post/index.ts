import firebase from 'firebase'
import { Player } from '../../../dto/player'

const ATTENDANCES = 'attendances'
const TRAININGS = 'trainings'
const USERS = 'users' 

export const createAttendance = async (trainingId: string, players: Player[] = [], ) => {
    const db = firebase.firestore()
    const trainingRef = await (await db.collection(TRAININGS).doc(trainingId).get()).ref
    const resp = await db.collection(ATTENDANCES).add({
        players: players,
        training: trainingRef
    })

    const lastAttendance = await (await db.collection(ATTENDANCES).doc(resp.id).get()).ref


    return lastAttendance
}

export const addPlayerToAttendance = async (attendanceId: string, playerId: string) => {
    const db = firebase.firestore()
    const playerRef = await (await db.collection(USERS).doc(playerId).get()).data()
    const resp = await db.collection(ATTENDANCES).doc(attendanceId).update({
        players: firebase.firestore.FieldValue.arrayUnion(playerRef)
    })
    const attendanceRef = await (await db.collection(ATTENDANCES).doc(attendanceId).get()).data()

    if (attendanceRef) return attendanceRef.players

    return attendanceRef

}