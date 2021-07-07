import React from 'react'
import { Exercise, ExerciseSmall } from '../../../dto/exercise'
import { ExerciseSmallCard } from '../../../components/exercises/smallCard'
import { Button } from '../../../components/buttons/simple'
import { ButtonCircle } from '../../../components/buttons/circle'
import { MdClose } from 'react-icons/md'

export const renderExercisesToPlayers = (exercises:Exercise[]) => {

    if(exercises.length === 0) {
        return (
            <p className="content__paragraph">There is no exercises registered yet!</p>
        )
    }

    return (
        <>
            <p className="content__paragraph">See the exercises registered to the next training</p>
            <ul className="flex flex-row align-center justify-start next-training__exercises-list">
                {
                    exercises.map(exercise => (
                        <li key={exercise.id} className="flex align-center justify-center">
                            <ExerciseSmallCard 
                                key={exercise.id}
                                exerciseName={exercise.title}
                                exerciseType={exercise.type}
                                category={exercise.category}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export const renderExercisesToCoach = (exercises:ExerciseSmall[], action: (exercise: ExerciseSmall) => void, onDelete: (id:number) => void) => {

    if(exercises.length === 0) {
        return (
            <p className="content__paragraph">There is no exercises registered yet!</p>
        )
    }

    return (
        <>
            <p className="content__paragraph">See the exercises registered to the next training</p>
            <ul className="flex flex-row align-center justify-start next-training__exercises-list">
                {
                    exercises.map(exercise => (
                        <li key={exercise.id} className="relative flex align-center justify-center">
                            <div className="next-training__exercises-list-button">
                                <ButtonCircle 
                                    Icon={MdClose}
                                    color="main"
                                    action={() => onDelete(exercise.id)}
                                />
                            </div>
                            <ExerciseSmallCard 
                                key={exercise.id}
                                exerciseName={exercise.title}
                                exerciseType={exercise.type}
                                category={exercise.category}
                                action={() => action(exercise)}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}