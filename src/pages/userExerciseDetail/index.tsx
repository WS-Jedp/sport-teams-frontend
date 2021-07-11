import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { Exercise } from '../../dto/exercise'

import { renderExerciseHistory } from '../../containers/exerciseContainers/exerciseHistory'
import { LineGraph } from '../../components/graphs/lineGraph'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { ExerciseResultCard } from '../../components/exercises/resultCard'

import { Loading } from '../../components/loading/basic'

import { getExerciseHistory, getExercise } from '../../services/exercises/get'


export const UserExerciseDetail:React.FC = () => {

    const { id: userId, exerciseId } = useParams<{id?:string, exerciseId?:string}>()
    const { exercise, selectExercise: setExercise } = useContext(ExercisesContext)
    
    const [exerciseResult, setExerciseResult] = useState<Exercise | undefined>(undefined)
    const [exerciseHistory, setExerciseHistory] = useState<Exercise[]>([])
    const [showExerciseDetail, setShowExerciseDetail] = useState<boolean>(false)

    const selectExercise = (exercise:Exercise) => {
        setShowExerciseDetail(true)
        setExerciseResult(exercise)
    }
    const closeExerciseDetail = () => setShowExerciseDetail(false)

    
    // Fetch history exercises
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const getData = async () => {
            const exercise = await getExercise(exerciseId || '')
            setExercise(exercise)
            const history = await getExerciseHistory({ userId: userId || '', exerciseId: exerciseId || '' })
            setExerciseHistory(history)
            setIsLoading(false)
        } 
        getData()
    }, [])

    // Loading
    if(!exercise || isLoading) (<Loading />)


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
                    renderExerciseHistory(exerciseHistory, exercise, selectExercise)
                }
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
                            <ExerciseResultCard 
                                date={exerciseResult && exerciseResult.date ? new Date(exerciseResult.date) : undefined}
                                result={exerciseResult?.result}
                                videoId={exerciseResult?.videoUrl}
                            />

                        </ModalContent>
                    </Modal>

                )
            }
        </DashboardLayout>
    )
}