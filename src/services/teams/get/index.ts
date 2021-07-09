import firebase from 'firebase'
import { Team } from '../../../dto/team'
import { Exercise } from '../../../dto/exercise'
import { useGet } from '../../../hooks/requests'
import { TeamMock } from '../../../mocks/teams'

const TEAMS = 'teams'
const EXERCISES = 'exercises'

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
    const team = await (await firebase.firestore().collection(TEAMS).doc(id).get()).data()
    return team as Team
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