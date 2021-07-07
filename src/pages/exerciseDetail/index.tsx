import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { Exercise } from '../../dto/exercise'
import { getExerciseHistory } from '../../services/exercises/get'
import { UserContext } from '../../contexts/user'

import { Button } from '../../components/buttons/simple'
import { renderExerciseHistory } from '../../containers/exerciseContainers/exerciseHistory'
import { LineGraph } from '../../components/graphs/lineGraph'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { RegisterExerciseContainer } from '../../containers/exercisesContainers/forms/registerExercise'
import { ExerciseResultCard } from '../../components/exercises/resultCard'

import { Loading } from '../../components/loading/basic'

import './styles.scss'

export const ExerciseDetail:React.FC = () => {

    const { id: exerciseId } = useParams<{id?:string}>()
    const { id } = useContext(UserContext)
    const { exercise } = useContext(ExercisesContext)

    const [showRegisterExercise, setShowRegisterExercise] = useState<boolean>(false)
    
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
            const history = await getExerciseHistory({ userId: id, exerciseId: exerciseId || '' })
            console.log(history)
            // setExerciseHistory(history)
            setIsLoading(false)
        } 
        getData()
    }, [exerciseHistory])

    if(isLoading) (<Loading />)


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
                    action={() => setShowRegisterExercise(true)}
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
                            <ExerciseResultCard 
                                date={exerciseResult?.date}
                                result={exerciseResult?.result}
                                videoId={exerciseResult?.videoUrl}
                            />

                        </ModalContent>
                    </Modal>

                )
            }

            {
                showRegisterExercise && (
                    <Modal>
                        <ModalContent onClose={() => setShowRegisterExercise(false)}>
                            <RegisterExerciseContainer 
                                onSubmit={() => {}}
                                selectedExercise={exerciseResult?.id}
                            />
                        </ModalContent>
                    </Modal>
                )
            }

        </DashboardLayout>
    )
}