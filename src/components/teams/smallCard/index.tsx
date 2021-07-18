import React from 'react'
import { Link } from 'react-router-dom'

interface TeamSmallCard {
    teamId: string,
    teamName: string,
    teamLocation: string,
    teamLogo: string
}

export const TeamSmallCard:React.FC<TeamSmallCard> = ({ teamLocation, teamLogo, teamName, teamId }) => {

    return (
        <Link to={`/teams/${teamId}`} className="relative flex flex-col align-center justify-center team-small-card">
            <article className="flex flex-row align-center justify-start">
                <figure className="team-small-card__logo">
                    <img title={teamName} alt={`Logo of the ${teamName} team`} src={teamLogo} />
                </figure>
                <div className="flex text-start flex-col align-start justify-start">
                    <h1 className="text-start team-small-card__name">{teamName}</h1>
                    <p className="text-start team-small-card__location">{teamLocation}</p>
                </div>
            </article>
        </Link>
    )
}