import { UserCoachMock } from '../../../mocks/people'
import { useGet } from '../../../hooks/requests'

const URL = ''

export const getUser = (id:number, token?: string) => {
    // const resp = useGet({url: `${URL}/${id}`, token})
    return UserCoachMock
}