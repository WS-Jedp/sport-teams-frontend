import firebase from 'firebase'
import { UserInformation } from '../../../contexts/user'
import { format, addDays } from 'date-fns'
import { EditUserForm } from '../../../containers/user/editUser'
import { MYSQL_FORMAT } from '../../../tools/dateFormats'

import { ROLES } from '../../../dto/roles'
import { getUser } from '../get'

const USERS = 'users'
const REGISTERED_USERS = 'registeredUsers'
const TEAMS = 'teams'

export const addUser = async () => {
    // const resp = usePost({  })
}

export const editUser = async (body:EditUserForm) => {
    const data = await firebase.firestore().collection(USERS).doc(body.id).update({...body, birthdate: format(addDays(new Date(body.birthdate), 1), MYSQL_FORMAT)})
    const user = await (await firebase.firestore().collection(USERS).doc(body.id).get()).data()
    return user as UserInformation
}

// export const registerUser = async ({email, password}:{email:string, password:string}) => {
//     const userRef = await firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
//         return user.user?.uid
//     })
//     return userRef
// }

export const registerDirective = async (body:UserInformation) => {
    const db = firebase.firestore()
    const uid = await (await db.collection(REGISTERED_USERS).doc(body.email).get()).data()
    const teamRef = await db.collection(TEAMS).doc(body.teamId)

    if(!uid || !uid.id || !teamRef) {
        throw new Error("That user isn't registered yet")
    } 

    const playerRef = await db.collection(USERS).doc(uid.id)
    await playerRef.set({
        ...body,
        role: body.role ? body.role : ROLES['DIRECTIVE']
    })

    await teamRef.update({
        directives: firebase.firestore.FieldValue.arrayUnion(await (await playerRef.get()).ref)
    })

    const user = await getUser(uid.id)

    return user
} 

export const registerPlayer = async (body:UserInformation) => {
    const db = firebase.firestore()
    const uid = await (await db.collection(REGISTERED_USERS).doc(body.email).get()).data()
    const teamRef = await db.collection(TEAMS).doc(body.teamId)

    if(!uid || !uid.id || !teamRef) {
        throw new Error("The user isn't registered yet")
    }
    const playerRef = await db.collection(USERS).doc(uid.id)
    await playerRef.set({
        ...body,
        birthdate: format(addDays(new Date(body.birthdate), 1), MYSQL_FORMAT),
        role: ROLES['PLAYER']
    })
    
    await teamRef.update({
        players: firebase.firestore.FieldValue.arrayUnion(await (await playerRef.get()).ref)
    })

    const user = await getUser(uid.id)

    return user
}

export const editPhoto = async ({file, userId}:{file:File[], userId:string}) => {
    let userRef:firebase.firestore.DocumentData | undefined
    await firebase.storage().ref().child(`/profile/${userId}/${file[0].name}`).put(file[0]).then(async snapshot => {
        const user = await firebase.firestore().collection(USERS).doc(userId)
        user.update({
            photoUrl: await snapshot.ref.getDownloadURL()
        })
        userRef = (await user.get()).data()

    })

    if(userRef) return userRef.photoUrl

    return null
    
}