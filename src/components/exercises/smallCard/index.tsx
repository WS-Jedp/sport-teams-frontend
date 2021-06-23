import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

import { EXERCISE_CATEGORY, defineCategoryIcon, EXERCISES_TYPE } from '../../../tools/defineExercise'

interface ExerciseSmallCard {
    exerciseType: EXERCISES_TYPE,
    exerciseName: string,
    category?: EXERCISE_CATEGORY,
    action?: () => void
}

export const ExerciseSmallCard:React.FC<ExerciseSmallCard> = ({ exerciseName, exerciseType, category = 'technical', action = () => {} }) => {

    return (
        <article className="flex flex-col align-center justify-center exercise-small-card" onClick={action}>
            <figure className="exercise-small-card__icon">
                <img title={category} alt={`Icon of ${category}`}  src={defineCategoryIcon({ category })} />
            </figure>

            <h1 className="exercise-small-card__name">{ exerciseName }</h1>
            <h2 className="exercise-small-card__category">{ category }</h2>

        </article>
    )
}
