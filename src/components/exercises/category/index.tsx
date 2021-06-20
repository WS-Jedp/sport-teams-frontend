import React from 'react'
import { EXERCISE_CATEGORY, defineCategoryIcon } from '../../../tools/defineExercise'
import './styles.scss'

interface ExerciseCategoryCard {
    category: EXERCISE_CATEGORY
}

export const ExerciseCategoryCard:React.FC<ExerciseCategoryCard> = ({ category }) => {
    return (
        <article className="flex flex-col align-center justify-center exercise-category-card">
            <figure className="exercise-category-card__icon">
                <img src={defineCategoryIcon({category})} />
            </figure>
            <h1 className="exercise-category-card__category">{category}</h1>
        </article>
    )
}