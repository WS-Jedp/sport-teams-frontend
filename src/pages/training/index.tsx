import React, { useContext, useState, useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import { useParams, useHistory } from 'react-router-dom'

import { UserContext } from '../../contexts/user'
import { TrainingContext } from '../../contexts/training'

import { DashboardLayout } from '../../layouts/dashboard'

import { renderExercises } from '../../containers/trainingContainers/exercises' 
import { renderPlayers } from '../../containers/trainingContainers/players' 
import { renderVideos } from '../../containers/trainingContainers/videos' 

import { ROLES } from '../../dto/roles' 

import { Button } from '../../components/buttons/simple'
import { ButtonCircle } from '../../components/buttons/circle'
import { Loading } from '../../components/loading/basic'
import { ExerciseSmallCard } from '../../components/exercises/smallCard'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { GraphLoading } from '../../components/loading/graph'
import { AddNextTrainingExercise, AddNextTrainingExerciseForm } from '../../containers/nextTrainingContainers/exercises/add'

import { format } from 'date-fns'
import { FORMAT } from '../../tools/dateFormats'

import { getTraining } from '../../services/trainings/get'
import { addExerciseToTraining as registerExerciseToTraining, removeExerciseToTraining as destroyExerciseToTraining, deleteTraining, setTrainingToNextTraining, setTrainingDone, setNextTrainingEmpty } from '../../services/trainings/post'

export const Training:React.FC = () => {

    const { id: trainingId } = useParams<{id?:string}>()
    const { push } = useHistory()
    const { role } = useContext(UserContext)
    const { training, selectTraining, addExercisesToTraining, removeExerciseToTraining, removeLastScheduledTraining, removeLastTraining, nextTraining } = useContext(TrainingContext)

    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const getData = async () => {
            
            if(trainingId) {
                const data = await getTraining(trainingId)
                if(data) {
                    selectTraining(data)
                }
            }
            setIsLoading(false)
        }
        getData()
    },[])

    // Handle add or remove exercise to training
    const [showRegisterExercise, setShowRegisterExercise] = useState<boolean>(false)
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const addNewExercise = async (data:AddNextTrainingExerciseForm) => {
        setIsAdding(true)
        if(!training) return null

        const exercises:string[] = data.exercisesId.split('-')
        await Promise.all(
            exercises.map(async (id) => {
                let exercise = await registerExerciseToTraining(id, training.id)
                addExercisesToTraining(exercise)
            })
        )
        setIsAdding(false)
        setShowRegisterExercise(false)
    }

    // Remove exercise of next training
    const deleteTrainingExercise = async (id:string) => {
        if(!training) return null

        removeExerciseToTraining(id)
        const trainingResp = await destroyExerciseToTraining(id, training.id)
        return trainingResp
    }

    // Handle delete of training
    const handleDeleteTraining = async () => {
        const isDelete = await deleteTraining(trainingId || '')
        await removeLastScheduledTraining(trainingId || '')
        await removeLastTraining(trainingId || '')

        if(nextTraining?.id === trainingId) {
            await setNextTrainingEmpty()
        }

        if(isDelete) {
            push('/trainings')
        }
    }

    const handleTrainingDone = async () => {
        const isDone = await setTrainingDone(trainingId || '')
        await removeLastScheduledTraining(trainingId || '')

        if(nextTraining?.id === trainingId) {
            await setNextTrainingEmpty()
        }
        
        if(isDone) {
            push('/all/trainings')
        }
    }

    const handleSetNextTraining = async () => {
        const isNext = await setTrainingToNextTraining(trainingId || '')
        push('/home')
    }


    // Loading
    if(isLoading) return (<Loading />)

    if(!training) {
        return (
            <DashboardLayout>
                <article className="training training__header">
                    <h1 className="training__header-title">Training 🏋🏾‍♀️</h1>
                    <p className="content__paragraph">You must need select a training first</p>
                </article>
            </DashboardLayout>
        )
    }
    return (
        <DashboardLayout>
            <article className="training training__header">
                <h1 className="training__header-title">Training 🏋🏾‍♀️</h1>
                <h2 className="content__sub-title">Training of: {training.datetime ? format(new Date(training.datetime), FORMAT) : 'There is no date registered'} </h2>
            </article>

            <article className="training training__exercises">
                <h2 className="content__title">Exercises</h2>
                {
                    training.exercises.length > 0 ? (
                        <>
                            <ul className="relative flex flex-row align-start justify-start training__exercises-list">
                                {
                                    training.exercises && training.exercises.length > 0 && training.exercises.map((exercise) => (
                                        <li key={exercise.id} className="home__next-training-exercises-item">
                                            {
                                                !training.state && (
                                                    <ButtonCircle Icon={MdClose} action={() => deleteTrainingExercise(exercise.id)} color="main"  />
                                                )
                                            }
                                            <ExerciseSmallCard 
                                                key={exercise.id}
                                                exerciseName={exercise.title}
                                                exerciseType={exercise.type}
                                                category={exercise.category }
                                                action={() => push(`/exercise/${exercise.id}`)}
                                            />
                                        </li>
                                    )) 
                                }
                            </ul>
                            
                        </>
                    ) : (
                        <p className="content__paragraph">There is no exercises registered for this training</p>
                    )
                }

                {
                    !training.state && (
                        <Button 
                            text="Add Exercise"
                            action={() => setShowRegisterExercise(true)}
                        />
                    )
                }
                    
            </article>

            <article className="training training__players">
                <h2 className="content__title">Players</h2>
                {
                    renderPlayers(training.players || [], (id) => push(`/user/${id}`))
                }
            </article>

            <article className="training training__buttons">
                <h2 className="content__title">State Of Training</h2>
                {
                    training.state ? (
                        <p className="content__paragraph">This training is already done!</p>
                    ) : (
                        <>
                            <p className="content__paragraph">Change the state of the selected training</p>
                            <div className="flex flex-row">
                                <Button 
                                    text="Done!"
                                    action={handleTrainingDone}
                                />
                                {
                                    nextTraining?.id !== trainingId && (
                                        <Button 
                                            text="Next Training"
                                            action={handleSetNextTraining}
                                        />
                                    )
                                }
                            </div>
                        </>
                    )
                }
            </article>

            {
                role === ROLES['COACH'] && (
                    <article className="training training__buttons">
                        <h2 className="content__title">Delete Training</h2>
                        <p className="content__paragraph">Deleting the trainigns means that you won't be able to recover his data or information</p>
                        <div className="flex flex-row">
                            <Button 
                                text="Delete!"
                                color="main"
                                action={handleDeleteTraining}
                            />
                        </div>
                    </article>
                )
            }

            {/* <article className="training training__videos">
                <h2 className="content__title">Videos</h2>
                {
                    renderVideos(training.videos ? training.videos : [])
                }
            </article> */}

{
                showRegisterExercise && (
                    <Modal>
                        <ModalContent onClose={() => setShowRegisterExercise(false)}>
                            {
                                isAdding ? (
                                    <GraphLoading />
                                ) : (
                                    <AddNextTrainingExercise 
                                        onSubmit={addNewExercise}
                                    />
                                )
                            }
                        </ModalContent>
                    </Modal>
                )
            }
        </DashboardLayout>
    )
}