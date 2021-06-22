import { ExercisesMock, LastExercisesMock, UserExercisesMock } from '../../../mocks/exercises'
import { useGet } from '../../../hooks/requests'

const URL = ''

export const getExercise = async (id:number, token?: string) => {
    // const resp = await useGet({ url: `${URL}/exercise/${id}`, token}) 
    return ExercisesMock[0]
}

export const getExercises = async (token?: string) => {
    // const resp = await useGet({ url: `${URL}/exercises`, token}) 
    return ExercisesMock
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

export const getExerciseHistory = async (id:number, token?:string) => {
    // const resp = await useGet({ url: `${URL}/user/${id}/exercises/history`, token}) 
    return UserExercisesMock
}

export const getMoreExercises = async (information:{from: number, to: number}, token?: string) => {
    const { from, to } = information
    // const resp = await useGet({ url: `${URL}/`, token}) 
    return ExercisesMock
}


