import React, { createContext, useState } from 'react'
import { CardTeam, Team } from '../../dto/team'
import { Directive } from '../../dto/directive'
import { Player } from '../../dto/player'

interface TeamInitialContext {
    userTeam?: Team,
    addPlayerUserTeam: (player:Player) => void,
    removePlayerUserTeam: (id:number) => void,
    addDirectiveUserTeam: (directive:Directive) => void,
    removeDirectiveUserTeam: (id:number) => void,
    teams: CardTeam[],
    addTeam: (team:Team) => void,
    removeTeam: (id:number) => void,
    team?: Team 
}

const teamInitialContext:TeamInitialContext = {
    userTeam: undefined,
    addPlayerUserTeam: () => {},
    removePlayerUserTeam: () => {},
    addDirectiveUserTeam: () => {},
    removeDirectiveUserTeam: () => {},
    teams: [],
    addTeam: () => {},
    removeTeam: () => {},
    team: undefined
}

export const TeamContext = createContext(teamInitialContext)

export const TeamContextProvider:React.FC = ({ children }) => {

    const [userTeam, setUserTeam] = useState<Team | undefined>(undefined)
    const [team, setTeam] = useState<Team | undefined>(undefined)
    const [teams, setTeams] = useState<CardTeam[]>([])

    const addPlayerUserTeam = (player:Player) => userTeam && setUserTeam({...userTeam, players: [...userTeam.players, player]})
    const removePlayerUserTeam = (id:number) => userTeam && setUserTeam({...userTeam, players: userTeam.players.filter(player => player.id !== id)})

    const addDirectiveUserTeam = (directive:Directive) => userTeam && setUserTeam({...userTeam, directives: [...userTeam.directives, directive]})
    const removeDirectiveUserTeam = (id:number) => userTeam && setUserTeam({...userTeam, directives: userTeam.directives.filter(directive => directive.id !== id)})

    const addTeam = (team:Team) => setTeams([...teams, team])
    const removeTeam = (id:number) => setTeams(teams.filter(team => team.id !== id))

    const initialState:TeamInitialContext = {
        userTeam,
        addPlayerUserTeam,
        removePlayerUserTeam,
        addDirectiveUserTeam,
        removeDirectiveUserTeam,
        teams,
        addTeam,
        removeTeam,
        team
    }

    return (
        <TeamContext.Provider value={initialState}>
            {
                children
            }
        </TeamContext.Provider>
    )
}
