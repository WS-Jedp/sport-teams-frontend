import React from 'react'
import { Exercise } from '../../dto/exercise'

import { ExerciseMediumCard } from '../../components/exercises/mediumCard'

export const renderExercises = (exercises:Exercise[], action: (id:string) => void = () => {}) => {

    if(exercises.length === 0) {
        return (
            <p className="content__paragraph">There is no exercises register</p>
        )
    }

    return (
        <>
            <p className="content__name">Take a look at all the exercises available!</p>
            <ul className="relative flex flex-col align-start justify-center exercises__list-cards">
                {
                    exercises.map((exercise, i) => (
                        <ExerciseMediumCard
                            key={exercise.id}
                            id={exercise.id}
                            exerciseName={exercise.title}
                            category={exercise.category}
                            exerciseType={exercise.type}
                            action={(id) => action(id)}
                        />
                    ))
                }
            </ul>
            
        </>
    )
}