import { useGet } from '../../../hooks/requests'
import { TeamMock } from '../../../mocks/teams'

const URL = ''

export const getTeam = async (id:number, token?: string) => {
    // const resp = await useGet({ url: `${URL}/${id}`, token })
    return TeamMock[0]
}