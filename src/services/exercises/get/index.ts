import firebase from 'firebase'
import { ExercisesMock, LastExercisesMock, UserExercisesMock } from '../../../mocks/exercises'
import { Exercise } from '../../../dto/exercise'
import { useGet } from '../../../hooks/requests'

const DOCUMENT = 'exercises'
const USER_EXERCISES = 'userHasExercises'

export const getExercise = async (id:number, token?: string) => {
    // const resp = await useGet({ url: `${URL}/exercise/${id}`, token}) 
    return ExercisesMock[0]
}

export const getExercises = async (token?: string) => {
    // const resp = await useGet({ url: `${URL}/exercises`, token}) 
    const resp:Exercise[] = []
    const data = await firebase.firestore().collection(DOCUMENT).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            let exercise = {
                id: doc.id,
                ...doc.data()
            }
            resp.push(exercise as Exercise)
        })
    })
    return resp
}

export const getUserExercises = async (token?: string) => {
    // const resp = await useGet({ url: `${URL}/exercises`, token}) 
    return UserExercisesMock
}

export const getUserLastExercise = async (id:number, token?: string) => {
    // const resp = await useGet({ url: `${URL}/user/${id}/exercises/last`, token})
    return LastExercisesMock
}

export const getTeamLastExercises = async (id:number, token?:string) => {
    // const resp = await useGet({ url: `${URL}/exercises`, token}) 
    return LastExercisesMock
}

export const getExerciseHistory = async ({userId, exerciseId}: {userId:string, exerciseId: string}) => {
    // const resp = await useGet({ url: `${URL}/user/${id}/exercises/history`, token}) 
    const userExercises:Exercise[] = []
    await firebase.firestore().collection(USER_EXERCISES).where('userId', '==', `/users/${userId}`).where('exercieId', '==', `/exercises/${exerciseId}`).get().then(querySnapshot => {
        querySnapshot.forEach(async doc => {
            const data = {
                id: doc.id,
                ...doc.data(),
            } as Exercise
            userExercises.push(data)
        })
    })
    return userExercises
}

export const getMoreExercises = async (information:{from: number, to: number}, token?: string) => {
    const { from, to } = information
    // const resp = await useGet({ url: `${URL}/`, token}) 
    return ExercisesMock
}


