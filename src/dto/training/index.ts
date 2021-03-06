import firebase from 'firebase'
import { TeamVideo } from '../teamVideo'
import { Exercise } from '../exercise'
import { Player } from '../player'

export type Training = {
    id: string,
    datetime: Date | null,
    state: boolean,
    exercises: Exercise[],
    players: Player[],
    videos?: TeamVideo[],
    attendance: firebase.firestore.DocumentReference
}

export type TrainingFirebase = {
    id: string,
    datetime: Date | null,
    state: boolean,
    exercises: Exercise[],
    players: Player[],
    attendance: firebase.firestore.DocumentReference   
}
