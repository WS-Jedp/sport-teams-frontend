import { format } from 'date-fns'
import React from 'react'
import { FORMAT } from '../../../tools/dateFormats'
import './styles.scss'

interface TeamVideo {
    videoId: string,
    title: string,
    date: Date
}

export const TeamVideo:React.FC<TeamVideo> = ({ date, title, videoId }) => {

    return (
        <article className="relative flex flex-col align-start justify-start team-video">
            <iframe className="team-video__video" src={`https://www.youtube.com/embed/${videoId}`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen  />
            <p className="team-video__date">{format(date, FORMAT)}</p>
            <h1 className="team-video__title">{title}</h1>
        </article>
    )
}