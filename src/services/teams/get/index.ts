import firebase from 'firebase'
import { Team } from '../../../dto/team'
import { Exercise } from '../../../dto/exercise'
import { Player } from '../../../dto/player'
import { Directive } from '../../../dto/directive'
import { UserInformation } from '../../../contexts/user'

const TEAMS = 'teams'
const EXERCISES = 'exercises'
const USERS = 'users'

export const getTeams = async () => {
    // const resp = await useGet({ url: `${URL}/${id}`, token })
    const teams:Team[] = []
    const docs = await (await firebase.firestore().collection(TEAMS).get()).docs
    docs.forEach(doc => {
        teams.push({
            id: doc.id,
            ...doc.data()
        } as Team)
    })

    return teams
}

export const getTeam = async (id:string) => {
    const db = firebase.firestore()
    const team = await (await db.collection(TEAMS).doc(id).get()).data()
    if(!team) {
        throw new Error("The team doesn't exist")
    }

    const players:Player[] = []
    const directives:Directive[] = []
    if(team && team.players.length > 0) {
        await Promise.all(
                team.players.map(async (player:firebase.firestore.DocumentReference) => {
                    
                    const playerData = await (await db.collection(USERS).doc(player.id).get()).data()
                    if(playerData) {
                        players.push({
                            ...playerData,
                            position: playerData.position ? playerData.position : playerData.role,
                            id: player.id 
                        } as Player)
                    }
                })
        )
    }

    if(team && team.directives.length > 0) {
        await Promise.all(
            team.directives.map(async (directive:firebase.firestore.DocumentReference) => {
                const directiveData = await (await db.collection(USERS).doc(directive.id).get()).data()
                if(directiveData) {
                    directives.push({
                        ...directiveData,
                        id: directive.id
                    } as Directive)
                }
            }) 
        )
    }

    return {
        ...team,
        players,
        directives
    } as Team
}

export const getTeamsHistoryExercise = async ({teamId, exerciseId}:{teamId:string, exerciseId:string}) => {
    const teamExercises:Exercise[] = []
    await firebase.firestore().collection(TEAMS).doc(teamId).collection(EXERCISES).get().then(querySnapshot => {
        querySnapshot.forEach(async doc => {
            const data = {
                id: doc.data().exercise.id,
                ...doc.data(),
            } as Exercise

            if(data.id === exerciseId) teamExercises.push(data)
        })
    })
    return teamExercises
}