import React from 'react'
import { Exercise } from '../../../dto/exercise'
import { ExerciseDetailCard } from '../../../components/exercises/detailCard'

export const renderExercises = (exercises:Exercise[]) => {

    if(exercises.length === 0) {
        return (
            <>
                <p className="content__paragraph">
                    This training did not have registered exercises
                </p>
            </>
        )
    }

    return (
        <>
            <p className="content__paragraph">See the exercises registered to this training</p>
            <ul className="flex flex-row align-center justify-start training__exercises-list">
                {
                    exercises.map(exercise => (
                        <li key={exercise.id} className="flex align-center justify-center">
                            <ExerciseDetailCard 
                                key={exercise.id}
                                exerciseName={exercise.title}
                                exerciseType={exercise.type}
                                category={exercise.category}
                                action={() => {}}
                                result={exercise.result ? exercise.result : 'none'}
                                date={exercise.date && exercise.date}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    )

}