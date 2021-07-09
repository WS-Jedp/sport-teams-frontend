import { UserInformation } from '../../../contexts/user'
import firebase from 'firebase'
import { EditUserForm } from '../../../containers/user/editUser'
import { usePost } from '../../../hooks/requests'
import { addDays, format } from 'date-fns'
import { MYSQL_FORMAT } from '../../../tools/dateFormats'

const USERS = 'users'

export const addUser = async () => {
    // const resp = usePost({  })
}

export const editUser = async (body:EditUserForm) => {
    const data = await firebase.firestore().collection(USERS).doc(body.id).update({...body, birthdate: format(addDays(new Date(body.birthdate), 1), MYSQL_FORMAT)})
    const user = await (await firebase.firestore().collection(USERS).doc(body.id).get()).data()
    return user as UserInformation
}