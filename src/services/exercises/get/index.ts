import firebase from 'firebase'
import { ExercisesMock, LastExercisesMock, UserExercisesMock } from '../../../mocks/exercises'
import { Exercise } from '../../../dto/exercise'
import { useGet } from '../../../hooks/requests'

const EXERCISES = 'exercises'
const USER_EXERCISES = 'users/exercises'
const USER = 'users'

export const getExercise = async (id:string) => {
    // const resp = await useGet({ url: `${URL}/exercise/${id}`, token}) 
    const exercise = await (await firebase.firestore().collection(EXERCISES).doc(id).get()).data()
    return {
        id,
        ...exercise
    } as Exercise
}

export const getExercises = async (token?: string) => {
    // const resp = await useGet({ url: `${URL}/exercises`, token}) 
    const resp:Exercise[] = []
    const data = await firebase.firestore().collection(EXERCISES).get().then(querySnapshot => {
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

export const getUserExercises = async (id: string) => {
    // const resp = await useGet({ url: `${URL}/exercises`, token}) 
    const exercises:Exercise[] = []
    const data = await firebase.firestore().collection(USER).doc(id).collection(EXERCISES).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            exercises.push({
                id: doc.id,
                ...doc.data() 
            } as Exercise)
        });
    })
    return exercises
}

export const getUserLastExercise = async (id:string) => {
    // const resp = await useGet({ url: `${URL}/user/${id}/exercises/last`, token})
    const lastExercises:Exercise[] = []
    const docs = await (await firebase.firestore().collection(USER).doc(id).collection(EXERCISES).limit(3).get()).docs
    await Promise.all(docs.map(async doc => {
        const exerciseId:string = doc.data().exercise.id
        const exercise = await (await firebase.firestore().collection(EXERCISES).doc(exerciseId).get()).data()
        lastExercises.push({
            id: exerciseId,
            result: doc.data().result,
            ...exercise
        } as Exercise)
    }))
    return lastExercises
}

export const getTeamLastExercises = async (id:number, token?:string) => {
    // const resp = await useGet({ url: `${URL}/exercises`, token}) 
    return LastExercisesMock
}

export const getExerciseHistory = async ({exerciseId, userId}: {userId:string, exerciseId: string}) => {
    // const resp = await useGet({ url: `${URL}/user/${id}/exercises/history`, token}) 
    const userExercises:Exercise[] = []
    await firebase.firestore().collection(USER).doc(userId).collection(EXERCISES).get().then(querySnapshot => {
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


