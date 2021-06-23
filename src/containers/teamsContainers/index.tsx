import React from 'react'
import LogoPureVibes from '../../assets/images/pure-vibes-logo.jpg'
import { CardTeam } from '../../dto/team'
import { TeamSmallCard } from '../../components/teams/smallCard'

export const renderTeams = (teams:CardTeam[]) => {

    if(teams.length === 0) {
        return (
            <>
                <p className="content__paragraph">There is no team registerd yet</p>
            </>
        )
    }

    return (
        <>
            <p className="content__paragraph">Check out all the teams of the organization!</p>
            <ul className="align-center justify-start teams__list">
                {
                    teams.map(team => (
                        <li key={team.id} className="flex align-center justify-center">
                            <TeamSmallCard 
                                teamId={team.id}
                                teamName={team.name}
                                teamLocation={team.location}
                                teamLogo={team.photoUrl ? team.photoUrl : LogoPureVibes}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}