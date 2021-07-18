import React, { useContext, useState, useEffect } from 'react'
import { MdAdd } from 'react-icons/md'
import { useHistory } from 'react-router'
import { Exercise, ExerciseSmall } from '../../dto/exercise'

import { DashboardLayout } from '../../layouts/dashboard'
import { TrainingSchedule } from '../../containers/trainingSchedule'

import { renderPlayers } from '../../containers/nextTrainingContainers/players'
import { renderLastTrainings } from '../../containers/nextTrainingContainers/lastTrainings'
import { renderScheduledTrainings } from '../../containers/nextTrainingContainers/scheduledTrainings'
import { renderExercisesToCoach, renderExercisesToPlayers } from '../../containers/nextTrainingContainers/exercises'

import { TrainingContext } from '../../contexts/training'
import { UserContext } from '../../contexts/user'

import { GraphLoading } from '../../components/loading/graph'
import { Loading } from '../../components/loading/basic'
import { Button } from '../../components/buttons/simple'
import { ButtonCircle } from '../../components/buttons/circle'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'

import { AddNextTrainingExercise, AddNextTrainingExerciseForm } from '../../containers/nextTrainingContainers/exercises/add'
import { AddExerciseRegisterContainer, AddExerciseRegisterForm } from '../../containers/nextTrainingContainers/addExerciseRegister'
import { CreateTraining, TrainingForm } from '../../containers/trainingContainers/create'

import { ROLES } from '../../dto/roles'
import { Training } from '../../dto/training'

import { getLastTrainings, getLastScheduledTrainings } from '../../services/trainings/get'
import { addExerciseToTraining, addPlayerToTraining, removeExerciseToTraining, createTraining } from '../../services/trainings/post'
import { registerUserExercise } from '../../services/exercises/post'
import { NextTrainingForm } from 'containers/nextTrainingContainers/defineNextTraining'

export const NextTraining:React.FC = () => {

    const { push } = useHistory()
    const 
    { 
        nextTraining, removeNextTrainingExercise, addNextTrainingExercise,
        lastTrainings, setLastTrainings,  addNextTrainingPlayer, 
        lastScheduledTrainings, setLastScheduledTrainings, addTrainingToLastScheduledTrainings
    } = useContext(TrainingContext)
    const { role, id } = useContext(UserContext)

    const [showAddExercise, setShowAddExercise] = useState<boolean>(false)

    const [showAddExerciseRegister, setShowAddExerciseRegister] = useState<boolean>(false)
    const [exercise, setExercise] = useState<ExerciseSmall | undefined>(undefined)
    const handleShowAddExerciseRegister = (exercise:ExerciseSmall) => {
        setShowAddExerciseRegister(true)
        setExercise(exercise)
    }

    // Fetching last trainings
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchingData = async () => {
            const trainings = await getLastTrainings()
            const scheduledTrainings = await getLastScheduledTrainings()
            setLastScheduledTrainings(scheduledTrainings)
            await setLastTrainings(...trainings)
            setIsLoading(false)
        }
        if(lastTrainings.length === 0) {
            fetchingData()
        }
    }, [])


    // Adding a new exercise to the next training
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const addNewExercise = async (data:AddNextTrainingExerciseForm) => {
        if(!nextTraining) return null
        setIsAdding(true)
        const exercises:string[] = data.exercisesId.split('-')
        await Promise.all(
            await exercises.map(async (id) => {
                let exercise = await addExerciseToTraining(id, nextTraining.id)
                addNextTrainingExercise(exercise)
            })
        )
        setIsAdding(false)
        setShowAddExerciseRegister(false)
    }

    // Remove exercise of next training
    const removeTrainingExercise = async (id:string) => {
        if(!nextTraining) return null

        removeNextTrainingExercise(id)
        const training = await removeExerciseToTraining(id, nextTraining.id)
        return training
    }

    // Add Player to training
    const addPlayerToNextTraining = async  () => {
        if (!nextTraining) return null
        const user = await addPlayerToTraining(id, nextTraining.id)
        addNextTrainingPlayer(user)
    }

    // Register exercise for a user
    const [isRegisteringUserExercise, setIsRegisteingUserExercise] = useState<boolean>(false)
    const registerExerciseForUser = async (data:AddExerciseRegisterForm) => {
        setIsRegisteingUserExercise(true)
        const exercise = await registerUserExercise(data)
        setIsRegisteingUserExercise(false)
    }


    // Create new training
    const [isCreatingTraining, setIsCreatingTraining] = useState<boolean>(false)
    const [showCreateTraining, setShowCreateTraining] = useState<boolean>(false)
    const createNewTraining = async (body:TrainingForm) => {
        setIsCreatingTraining(true)
        const training = await createTraining(body as NextTrainingForm)   
        await addTrainingToLastScheduledTrainings(training)
        setIsCreatingTraining(false)
        setShowCreateTraining(false)
    }


    // if(isLoading) {
    //     return (
    //         <DashboardLayout>
    //             <Loading />
    //         </DashboardLayout>
    //     )
    // }

    return (
        <DashboardLayout>
            <article className="flex flex-col next-training next-training__header">
                <h1 className="next-training__header-title">Next Training 🔥</h1>
                <TrainingSchedule />
            </article>

            <article className="next-training next-training__exercises">
                <h2 className="content__title">Exercises</h2>
                {
                    role === ROLES['COACH'] 
                        ? renderExercisesToCoach(nextTraining?.exercises || [], (exercise) => handleShowAddExerciseRegister(exercise), removeTrainingExercise) 
                            : renderExercisesToPlayers(nextTraining ? nextTraining.exercises : [], (id) => push(`/exercise/${id}`) )
                }
                {
                    role === ROLES['COACH'] && (
                        <Button 
                            text="Add New"
                            action={() => setShowAddExercise(true)}
                        />
                    )
                }
            </article>

            <article className="next-training next-training__players">
                <h2 className="content__title">Players</h2>
                {
                    renderPlayers(nextTraining ? nextTraining.players : [], id => push(`/user/${id}`) )
                }
                {
                    role === ROLES['PLAYER'] && nextTraining && !nextTraining.players.map(player => player.id).includes(id) && (
                            <Button 
                                text="I'll Go!"
                                action={addPlayerToNextTraining}
                            />
                    )
                }
            </article>

            {
                role === ROLES['COACH'] && (
                    <article className="next-training next-training__last-training">
                        <h2 className="content__title">Scheduled Trainings</h2>
                        {
                            renderScheduledTrainings(lastScheduledTrainings)
                        }
                        <div className="flex flex-flow">
                            <Button 
                                text="See All"
                                action={() => push('all/trainings/scheduled')}
                            />
                            <ButtonCircle 
                                Icon={MdAdd}
                                action={() => setShowCreateTraining(true)}
                            />
                        </div>
                    </article>
                )
            }

            <article className="next-training next-training__last-training">
                <h2 className="content__title">Last Trainings</h2>
                {
                    renderLastTrainings(lastTrainings)
                }
            </article>

            {
                showAddExercise && (
                    <Modal>
                        <ModalContent onClose={() => setShowAddExercise(false)}>
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
            {
                exercise && showAddExerciseRegister && (
                    <Modal>
                        <ModalContent onClose={() => setShowAddExerciseRegister(false)}>
                            {
                                isRegisteringUserExercise ? (
                                    <GraphLoading />
                                ) : (
                                    <AddExerciseRegisterContainer 
                                        exercise={exercise}
                                        players={nextTraining ? nextTraining.players : []}
                                        onSubmit={registerExerciseForUser}
                                    />
                                )
                            }
                        </ModalContent>
                    </Modal>
                )
            }
            {
                showCreateTraining && (
                    <Modal>
                        <ModalContent onClose={() => setShowCreateTraining(false)}>
                            {
                                isCreatingTraining ? (
                                    <GraphLoading />
                                ) : (
                                    <CreateTraining
                                        onSubmit={createNewTraining}
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