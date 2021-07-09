import firebase from 'firebase'
import { ROLES } from '../../dto/roles'
import { UserInformation } from '../../dto/user'

const USERS = 'users'

export const auth = async ({ email, password }:{email:string, password: string}) => {
    const db = await firebase.firestore()
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    const auth = await firebase.auth().signInWithEmailAndPassword(email, password)
    const user = await (await db.collection('users').doc(auth.user?.uid).get()).data() as UserInformation        
    const token = await auth.user?.getIdToken()
    
    if(!auth.user) {
        throw new Error('Error in authentication')
    }

    const data = {
        id: auth.user.uid,
        email: auth.user.email,
        token,
        userInformation: user,
    }

    return data
}

export const register = ({ role }:{ role: ROLES }) => async ({ email, password }:{email:string, password: string}) => {
    let data
    const register = await firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
        const db = firebase.firestore()
        const lastUser = db.collection('users').doc(cred.user?.uid).set({role})     

        if(!cred.user) {
            throw new Error('Error in registration')
        }

        data = {
            user: lastUser,
            id: Number(cred.user.uid),
            email: cred.user.email
        }
    })

    return data
}

export const isLogged = async () => {
    await firebase.auth().onAuthStateChanged(async user => {
        if(user) {
            const token = await user.getIdToken()
            localStorage.setItem('token', token)
            localStorage.setItem('userId', user.uid)
            localStorage.setItem('userEmail', user.email || '')
            return true
        }

        return false
    })

}


export const logout = async ({ email, password }:{email:string, password: string}) => {
    const logout = await firebase.auth().signOut()
    return logout
}