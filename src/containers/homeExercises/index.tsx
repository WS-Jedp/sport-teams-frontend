import React from 'react'
import { ExerciseSmall, LastExercises } from '../../dto/exercise'
import { ExerciseDetailCard } from '../../components/exercises/detailCard'
import { Button } from '../../components/buttons/simple'
import { ButtonCircle } from '../../components/buttons/circle'
import { MdAdd, MdClose } from 'react-icons/md'
import { ExerciseSmallCard } from '../../components/exercises/smallCard'

export function renderLastExercises(exercises:LastExercises[]) {

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
                    exercises.map(exercise => (
                        <ExerciseDetailCard
                            key={exercise.id}
                            exerciseName={exercise.title}
                            category={exercise.category}
                            date={exercise.date}
                            exerciseType={exercise.type}
                            result={exercise.result}
                            action={() => {}}
                        />
                    ))
                }
            </section>
            <div className="flex flex-row align-start justify-start home__exercises-buttons">
                <Button 
                    action={() => {}}
                    text="See All"
                    color="purple"
                />
                <ButtonCircle 
                    action={() => {}}
                    Icon={MdAdd}
                    color="purple"
                />
            </div>
        </>
    )
}

export function renderNextTraining(exercises:ExerciseSmall[]) {

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
                            <ButtonCircle Icon={MdClose} action={() => {}} color="main"  />
                            <ExerciseSmallCard
                                key={exercise.id}
                                exerciseName={exercise.title}
                                category={exercise.category}
                                exerciseType={exercise.type}
                            />
                        </li>
                    ))
                }
            </ul>
            <div className="flex flex-row align-start justify-start home__exercises-buttons">
                <Button 
                    action={() => {}}
                    text="See All"
                    color="purple"
                />
                <ButtonCircle 
                    action={() => {}}
                    Icon={MdAdd}
                    color="purple"
                />
            </div>
        </>
    )
}
