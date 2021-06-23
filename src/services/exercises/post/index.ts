import { RegisterExerciseForm } from '../../../containers/exercisesContainers/forms/registerExercise'
import { usePost } from '../../../hooks/requests'

const URL = ''

// Posts services
export const registerExercise = async (body:RegisterExerciseForm, token?: string) => {
    const resp = await usePost({ url: `${URL}/register`, body, token})
    return resp
}