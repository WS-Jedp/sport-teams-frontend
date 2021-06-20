import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

interface TeamSmallCard {
    teamName: string,
    teamLocation: string,
    teamLogo: string
}

export const TeamSmallCard:React.FC<TeamSmallCard> = ({ teamLocation, teamLogo, teamName }) => {

    return (
        <Link to={`/teams/${teamName}`} className="relative flex flex-col align-center justify-center team-small-card">
            <article className="flex flex-col align-center justify-center">
                <figure className="team-small-card__logo">
                    <img title={teamName} alt={`Logo of the ${teamName} team`} src={teamLogo} />
                </figure>
                <h1 className="team-small-card__name">{teamName}</h1>
                <p className="team-small-card__location">{teamLocation}</p>
            </article>
        </Link>
    )
}