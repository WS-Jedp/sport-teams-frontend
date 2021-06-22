import React from 'react'
import { Exercise } from '../../dto/exercise'

import { ExerciseMediumCard } from '../../components/exercises/mediumCard'

export const renderExercises = (exercises:Exercise[]) => {

    if(exercises.length === 0) {
        return (
            <p className="content__paragraph">There is no exercises register</p>
        )
    }

    return (
        <>
            <p className="content__name">Take a look at all the exercises available!</p>
            <ul className="relative flex flex-col align-center justify-center exercises__list-cards">
                {
                    exercises.map(exercise => (
                        <ExerciseMediumCard
                            key={exercise.id}
                            exerciseName={exercise.title}
                            category={exercise.category}
                            exerciseType={exercise.type}
                        />
                    ))
                }
            </ul>
            
        </>
    )
}