import React from 'react'
import { format } from 'date-fns'
import { FORMAT } from '../../../tools/dateFormats'

interface TrainingSmallCard {
    date: Date | null,
    action: () => void
}

export const TrainingSmallCard:React.FC<TrainingSmallCard> = ({ date, action }) => {

    return (
        <article onClick={action} className="flex flex-col align-start justify-start training-small-card">
            <h2 className="content__title">Training Of:</h2>
            <h3 className="content__sub-title">{date ? format(date, FORMAT) : 'There is no date registered'}</h3>
        </article>
    )
}