import React from 'react'
import { ExerciseSmall, Exercise } from '../../dto/exercise'
import { ExerciseDetailCard } from '../../components/exercises/detailCard'
import { ButtonCircle } from '../../components/buttons/circle'
import { MdClose } from 'react-icons/md'
import { ExerciseSmallCard } from '../../components/exercises/smallCard'

export function renderLastExercises(exercises:Exercise[], action: (id:string) => void) {

    if(exercises.length === 0) {
        return (
            <p className="content__paragraph">
                You don't have exercises done yet!
            </p>
        )
    }

    return (
        <>
            <p className="content__paragraph">
                Take a look at your last exercises done!
            </p>
            <section className="relative flex flex-row align-start justify-start home__exercises-cards">
                {
                    exercises.map((exercise, i) => (
                        
                        <ExerciseDetailCard
                            key={i}
                            exerciseName={exercise.title}
                            category={exercise.category}
                            date={new Date(exercise.date || '')}
                            exerciseType={exercise.type}
                            result={exercise.result || 0}
                            action={() => action(exercise.id)}
                        />
                    ))
                }
            </section>
        </>
    )
}

export function renderNextTraining(exercises:ExerciseSmall[], action: (id:string) => void, onDelete: (id:string) => void) {

    if(exercises.length === 0) {
        return (
            <p className="content__paragraph">
                There is no exercises for the next training!
            </p>
        )
    }

    return (
        <>
            <p className="content__paragraph">
                Take a look at your last exercises done!
            </p>
            <ul className="relative flex flex-row align-start justify-start home__exercises-cards">
                {
                    exercises.map(exercise => (
                        <li key={exercise.id} className="home__next-training-exercises-item">
                            <ButtonCircle Icon={MdClose} action={() => onDelete(exercise.id)} color="main"  />
                            <ExerciseSmallCard
                                key={exercise.id}
                                exerciseName={exercise.title}
                                category={exercise.category}
                                exerciseType={exercise.type}
                                action={() => action(exercise.id)}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
