import { useGet } from '../../../hooks/requests'
import { TrainingsMock } from '../../../mocks/training'

const URL = ''

export const getTraining = async (id:number, token?: string) => {
    // const resp = await useGet({url: `${URL}/${id}`, token})
    return TrainingsMock[1]
}

export const getTrainings = async (token?: string) => {
    // const resp = await useGet({url: URL, token})
    return TrainingsMock
}