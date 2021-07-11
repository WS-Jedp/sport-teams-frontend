import React from 'react'

interface TeamHeader {
    photoUrl: string,
    name: string,
    location: string
}

export const TeamHeader:React.FC<TeamHeader> = ({ name, photoUrl, location }) => {

    return (
        <article className="flex flex-row align-center justify-start team-header">
            <figure className="team-header__figure">
                <img alt={`Picture of the team ${name}`} title={name} src={photoUrl} />
            </figure>

            <div className="flex flex-col align-start justify-start team-header__about">
                <h1>{name}</h1>
                <h2>{location}</h2>
            </div>

        </article>
    )
}