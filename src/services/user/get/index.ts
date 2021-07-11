import firebase from 'firebase'
import { UserInformation } from '../../../dto/user'

const URL = ''

export const getUser = async (id:string) => {
    const user = await (await firebase.firestore().collection('users').doc(id).get()).data()  as UserInformation     
    return {...user, id}
}