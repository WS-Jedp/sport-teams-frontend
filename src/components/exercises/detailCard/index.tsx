import React from 'react'
import { format } from 'date-fns'
import { Content } from '../../content'
import { EXERCISES_TYPE, EXERCISE_CATEGORY, defineCategoryIcon } from '../../../tools/defineExercise'
import { FORMAT } from '../../../tools/dateFormats'

import './styles.scss'

interface ExerciseDetailCard {
    exerciseType: EXERCISES_TYPE,
    exerciseName: string,
    category?: EXERCISE_CATEGORY,
    result: string,
    date?: Date,
    action: () => void
}

export const ExerciseDetailCard:React.FC<ExerciseDetailCard> = ({ date, exerciseName, exerciseType, result, category = "technical", action }) => {

    return (
        <article className="flex flex-col align-center justify-center exercise-detail-card" onClick={action}>
            <figure className="exercise-detail-card__icon">
                <img src={defineCategoryIcon({category})} />
            </figure>

            <Content position="center" size="full">
                <h1 className="exercise-detail-card__titles">{exerciseName}</h1>
                <h2 className="exercise-detail-card__contents">{category}</h2>
            </Content>

            <Content position="center" size="full">
                <h1 className="exercise-detail-card__titles">Result:</h1>
                <h2 className="exercise-detail-card__contents">{result}</h2>
            </Content>

            <Content position="center" size="full">
                <h1 className="exercise-detail-card__titles">Date:</h1>
                <h2 className="exercise-detail-card__contents">{date ? format(date, FORMAT) : 'There is no date registered'}</h2>
            </Content>
        </article>
    )
}