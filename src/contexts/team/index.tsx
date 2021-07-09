import React, { createContext, useState } from 'react'
import { CardTeam, Team } from '../../dto/team'
import { Directive } from '../../dto/directive'
import { Player } from '../../dto/player'

import { TeamMock } from '../../mocks/teams'

interface TeamInitialContext {
    userTeam?: Team,
    addPlayerUserTeam: (player:Player) => void,
    removePlayerUserTeam: (id:string) => void,
    addDirectiveUserTeam: (directive:Directive) => void,
    removeDirectiveUserTeam: (id:string) => void,
    teams: CardTeam[],
    addTeam: (team:Team) => void,
    addTeams: (...team:Team[]) => void,
    removeTeam: (id:string) => void,
    team?: Team 
    selectTeam: (team:Team) => void
}

const teamInitialContext:TeamInitialContext = {
    userTeam: undefined,
    addPlayerUserTeam: () => {},
    removePlayerUserTeam: () => {},
    addDirectiveUserTeam: () => {},
    removeDirectiveUserTeam: () => {},
    teams: [],
    addTeam: () => {},
    addTeams: () => {},
    removeTeam: () => {},
    team: undefined,
    selectTeam: () => {}
}

export const TeamContext = createContext(teamInitialContext)

export const TeamContextProvider:React.FC = ({ children }) => {

    const [userTeam, setUserTeam] = useState<Team | undefined>(undefined)
    const [team, setTeam] = useState<Team | undefined>(undefined)
    const [teams, setTeams] = useState<CardTeam[]>([])

    const addPlayerUserTeam = (player:Player) => userTeam && setUserTeam({...userTeam, players: [...userTeam.players, player]})
    const removePlayerUserTeam = (id:string) => userTeam && setUserTeam({...userTeam, players: userTeam.players.filter(player => player.id !== id)})

    const addDirectiveUserTeam = (directive:Directive) => userTeam && setUserTeam({...userTeam, directives: [...userTeam.directives, directive]})
    const removeDirectiveUserTeam = (id:string) => userTeam && setUserTeam({...userTeam, directives: userTeam.directives.filter(directive => directive.id !== id)})

    const addTeam = (team:Team) => setTeams([...teams, team])
    const addTeams = (...teams:Team[]) => setTeams(teams)
    const removeTeam = (id:string) => setTeams(teams.filter(team => team.id !== id))

    const selectTeam = (team:Team) => setTeam(team)

    const initialState:TeamInitialContext = {
        userTeam,
        addPlayerUserTeam,
        removePlayerUserTeam,
        addDirectiveUserTeam,
        removeDirectiveUserTeam,
        teams,
        addTeam,
        addTeams,
        removeTeam,
        team,
        selectTeam
    }

    return (
        <TeamContext.Provider value={initialState}>
            {
                children
            }
        </TeamContext.Provider>
    )
}
