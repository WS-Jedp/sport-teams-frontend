import firebase from 'firebase'
import { useGet } from '../../../hooks/requests'
import { TrainingsMock } from '../../../mocks/training'
import { Training, TrainingFirebase } from '../../../dto/training'
import { Player } from '../../../dto/player'
import { Exercise } from '../../../dto/exercise'

import { getExercise } from '../../exercises/get'
import { getUser } from '../../user/get'

const TRAININGS = 'trainings'
const EXERCISES = 'exercises'
const ATTENDANCES = 'attendances'
const USERS = 'users'

export const getTraining = async (trainingId:string) => {
    // const resp = await useGet({url: `${URL}/${id}`, token})
    const db = firebase.firestore()
    const trainingRef = await db.collection(TRAININGS).doc(trainingId)
    const training = (await trainingRef.get()).data()

    if (!training) return null
    const attendance = await (await db.collection(ATTENDANCES).doc(training.attendance.id).get()).data()
    const exercises:Exercise[] = []
    const players:Player[] = []
    
    if(attendance && attendance.players.length > 0) {
        await Promise.all(   
            attendance.players.map(async (player:firebase.firestore.DocumentReference) => {
                const playerData = await (await db.collection(USERS).doc(player.id).get()).data() as Player
                if(playerData) players.push({
                    ...playerData,
                    id: player.id
                })
            })
        )
    }

    if(training && training.exercises.length > 0) {
        await Promise.all(
            training.exercises.map((async (exercise:firebase.firestore.DocumentReference) => {
                const exerciseData = await getExercise(exercise.id)
                if(exerciseData) exercises.push({...exerciseData, id: exercise.id})
            }))
        )
    }
    return {
        ...training,
        id: trainingId,
        exercises,
        players,
    } as Training
}

export const getNextTraining = async () => {
    const trainingId = await (await firebase.database().ref().child('nextTraining').get()).toJSON() 
    let nextTraining:Training|undefined|null
    const players:Player[] = []
    const exercises:Exercise[] = []
    if(trainingId) {
        nextTraining = await getTraining(trainingId.toString())
    }
    
    
    if(nextTraining) {
        const attendance = await (await firebase.firestore().collection(ATTENDANCES).doc(nextTraining.attendance.id).get()).data()
        if(attendance && attendance.players.length > 0) {
            await Promise.all(
                attendance.players.map(async (player:firebase.firestore.DocumentReference) => {
                    const user = await getUser(player.id)
                    players.push({
                        ...user,
                        id: player.id
                    })
                })
            )
        }
    }

    if(nextTraining && nextTraining.exercises.length > 0) {
        await Promise.all(
            nextTraining.exercises.map(async exercise => {
                const exerciseData = await getExercise(exercise.id)
                exercises.push({
                    ...exerciseData,
                    id: exercise.id
                })
            })
        )
    }

    return !nextTraining ? undefined : {...nextTraining, exercises, players}
    
}

export const getLastTrainings = async () => {
    const db = firebase.firestore()
    const trainings:Training[] = []
    const data = (await (await db.collection(TRAININGS).limit(3).where('state', '==', true).get()).docs)
    await data.forEach(doc => {
        let trainingData = doc.data() as Training
        trainings.push({
            ...trainingData,
            id: doc.id
        })
    })

    return trainings
}

export const getLastScheduledTrainings = async () => {
    const db = firebase.firestore()
    const trainings:Training[] = []
    const data = (await (await db.collection(TRAININGS).limit(3).where('state', '==', false).get()).docs)
    await data.forEach(doc => {
        let trainingData = doc.data() as Training
        trainings.push({
            ...trainingData,
            id: doc.id
        })
    })

    return trainings
}

export const getTrainings = async () => {
    // const resp = await useGet({url: URL, token})
    const db = firebase.firestore()
    const allTrainings:Training[] = []
    const trainings = await (await db.collection(TRAININGS).where('state', '==', true).get()).docs
    trainings.map((training) => {
        allTrainings.push({...training.data() as Training, id: training.id})
    })
    return allTrainings
}

export const getScheduledTraining = async () => {
    const db = firebase.firestore()
    const allTrainings:Training[] = []
    const trainings = await (await db.collection(TRAININGS).where('state', '==', false).get()).docs
    trainings.map((training) => {
        allTrainings.push({...training.data() as Training, id: training.id})
    })
    return allTrainings
}

