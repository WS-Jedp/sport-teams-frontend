import firebase from 'firebase'
import { ROLES } from '../../dto/roles'
import { UserInformation } from '../../dto/user'


const USERS = 'users'

export const auth = async ({ email, password }:{email:string, password: string}) => {
    const db = await firebase.firestore()
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    // const userRef = await (await db.collection(USERS).where('email', '==', email).get()).docs[0]

    const auth = await firebase.auth().signInWithEmailAndPassword(email, password)
    const user = await (await db.collection(USERS).doc(auth.user?.uid).get()).data() as UserInformation        
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
    const register = await firebase.auth().createUserWithEmailAndPassword(email, password).then(async cred => {
        const db = firebase.firestore()
        const lastUser = await db.collection(USERS).doc(cred.user?.uid).set({role})     

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

export const isLogged = async (existUser:boolean) => {
    await firebase.auth().onAuthStateChanged(async user => {
        if(user) {
            const token = await user.getIdToken()
            localStorage.setItem('token', token)
            localStorage.setItem('userId', user.uid)
            localStorage.setItem('userEmail', user.email || '')
            existUser = true
            return existUser
        }

        return existUser

    })

}


export const logout = async () => {
    const logout = await firebase.auth().signOut()
    return logout
}