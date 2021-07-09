import React from 'react'
import { ExerciseDetailCard } from '../../../components/exercises/detailCard'
import { Exercise } from '../../../dto/exercise'

export const renderExerciseHistory = (exercises:Exercise[], currentExercise: Exercise, action: (exercise:Exercise) => void) => {

    if(exercises.length === 0) {
        return (
            <p className="content__paragraph">You don't have any register of this exercise</p>
        )
    }

    return (
        <section className="relative flex flex-row align-start justify-start exercise-detail__history-list">
            {
                exercises.map((exercise, i) => (
                    <ExerciseDetailCard
                        key={i}
                        exerciseName={currentExercise.title}
                        category={currentExercise.category}
                        date={new Date(exercise.date || '')}
                        exerciseType={currentExercise.type}
                        result={exercise.result ? exercise.result : 'There is no result registered'}
                        action={() => action(currentExercise)}
                    />
                ))
            }
        </section>
    )
}