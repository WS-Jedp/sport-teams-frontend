import React, { useContext, useState } from 'react'
import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { Exercise } from '../../dto/exercise'

import { Button } from '../../components/buttons/simple'
import { renderExerciseHistory } from '../../containers/exerciseContainers/exerciseHistory'
import { LineGraph } from '../../components/graphs/lineGraph'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'

import './styles.scss'

export const ExerciseDetail:React.FC = () => {

    const { exercise } = useContext(ExercisesContext)
    
    const [exerciseHistory, setExerciseHistory] = useState<Exercise[]>([])
    const [showExerciseDetail, setShowExerciseDetail] = useState<boolean>(false)
    const [exerciseResult, setExerciseResult] = useState<Exercise | undefined>(undefined)

    const selectExercise = (exercise:Exercise) => {
        setShowExerciseDetail(true)
        setExerciseResult(exercise)
    }
    const closeExerciseDetail = () => setShowExerciseDetail(false)
    

    if(!exercise) {
        return (
        <DashboardLayout>
            <article className="flex flex-col exercise-detail exercise-detail__header">
                <h1 className="exercise-detail__header-title">Exercise 🔥</h1>
                <p className="content__paragraph">You must need select a exercise</p>
            </article>
        </DashboardLayout>
        ) 
    }

    return (
        <DashboardLayout>
            <article className="flex flex-col exercise-detail exercise-detail__header">
                <h1 className="exercise-detail__header-title">Exercise 🔥</h1>
                <h2 className="content__title">{exercise.title}</h2>
                {
                    exercise.videoUrl && (
                        <iframe className="exercise-detail__video" src={`https://www.youtube.com/embed/${exercise.videoUrl}`} title={exercise.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen  />
                    )
                }
            </article>


            <article className="exercise-detail exercise-detail__about">
                <h2 className="content__title">Description</h2>
                <p className="content__pargraph">{exercise.description}</p>
            </article>

            <article className="exercise-detail exercise-detail__about">
                <h2 className="content__title">History</h2>
                {
                    renderExerciseHistory(exerciseHistory, selectExercise)
                }
                <Button 
                    text="Add New"
                    action={() => {}}
                />
            </article>

            {
                exerciseHistory.length > 0 && (
                    <article className="exercise-detail exercise-detail__graph">
                        <h1 className="content__title">Graph</h1>
                        <LineGraph exercises={exerciseHistory} />
                    </article>
                )
            }

            {
                showExerciseDetail && (
                    <Modal>
                        <ModalContent onClose={closeExerciseDetail}>
                            <h2 className="content__title">Create a component for this</h2>

                        </ModalContent>
                    </Modal>

                )
            }

        </DashboardLayout>
    )
}