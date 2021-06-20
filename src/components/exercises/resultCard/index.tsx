import React from 'react'
import { format } from 'date-fns'
import { FORMAT } from '../../../tools/dateFormats'
import { Content } from '../../content'
import './styles.scss'

interface ExerciseResultCard {
    videoId?: string
    result: string,
    date: Date
}

export const ExerciseResultCard:React.FC<ExerciseResultCard> = ({ date, result, videoId = '' }) => {

    return (
        <article className="flex justify-start exercise-result-card">
            <h2 className="exercise-result-card__title">Result</h2>

            <Content position="start" size="full">
                <h2 className="exercise-result-card__small-title">Video</h2>
                {
                    videoId.length > 0 ? (
                        <iframe className="exercise-result-card__video" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen  />
                    ) : (
                        <p className="exercise-result-card__content--no-video">There is no an available video</p>
                    )
                }
            </Content>

            <div className="flex flex-row align-start justify-start exercise-result-card__text">
                <Content position="start" size="full">
                    <h2 className="exercise-result-card__small-title">Result</h2>
                    <p className="exercise-result-card__content">{result}</p>
                </Content>

                <Content position="start" size="full">
                    <h2 className="exercise-result-card__small-title">Date</h2>
                    <p className="exercise-result-card__content">{format(date, FORMAT)}</p>
                </Content>
            </div>
        </article>
    )
}