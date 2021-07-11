import React from 'react'
import { Link } from 'react-router-dom'
import { Content } from '../../content'
import { EXERCISES_TYPE, EXERCISE_CATEGORY, defineCategoryIcon } from '../../../tools/defineExercise'

import './styles.scss'

interface ExerciseMediumCard {
    exerciseType: EXERCISES_TYPE,
    exerciseName: string,
    category?: EXERCISE_CATEGORY,
    id: string,
    action: (id:string) => void
}

export const ExerciseMediumCard:React.FC<ExerciseMediumCard> = ({ exerciseName, exerciseType, category = "technical", id, action = () => {} }) => {

    return (
        // <Link to={`/exercise/${id}`} className="exercise-medium-card__container">
            <article onClick={() => action(id)} className="flex flex-row  align-center justify-start exercise-medium-card__container exercise-medium-card">
                <figure className="flex align-center justify-center exercise-medium-card__icon">
                    <img src={defineCategoryIcon({ category })}/>
                </figure>

                <Content position="start" size="full">
                    <h1 className="exercise-medium-card__name">{ exerciseName }</h1>
                    <h2 className="exercise-medium-card__category">{ category }</h2>
                </Content>

            </article>
        // </Link>

    )
}