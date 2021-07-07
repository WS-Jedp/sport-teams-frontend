import React, { useContext, useState } from 'react'

import { Exercise, ExerciseSmall } from '../../dto/exercise'

import { DashboardLayout } from '../../layouts/dashboard'
import { TrainingSchedule } from '../../containers/trainingSchedule'

import { renderPlayers } from '../../containers/nextTrainingContainers/players'
import { renderLastTrainings } from '../../containers/nextTrainingContainers/lastTrainings'
import { renderExercisesToCoach, renderExercisesToPlayers } from '../../containers/nextTrainingContainers/exercises'

import { TrainingContext } from '../../contexts/training'
import { UserContext } from '../../contexts/user'

import { Button } from '../../components/buttons/simple'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { AddNextTrainingExercise } from '../../containers/nextTrainingContainers/exercises/add'
import { AddExerciseRegisterContainer } from '../../containers/nextTrainingContainers/addExerciseRegister'

import './styles.scss'

export const NextTraining:React.FC = () => {

    const { nextTraining, lastTrainings, removeNextTrainingExercise, nextTrainingExercises } = useContext(TrainingContext)
    const { role, id } = useContext(UserContext)

    const [showAddExercise, setShowAddExercise] = useState<boolean>(false)

    const [showAddExerciseRegister, setShowAddExerciseRegister] = useState<boolean>(false)
    const [exercise, setExercise] = useState<ExerciseSmall | undefined>(undefined)
    const handleShowAddExerciseRegister = (exercise:ExerciseSmall) => {
        setShowAddExerciseRegister(true)
        setExercise(exercise)

    } 


    return (
        <DashboardLayout>
            <article className="flex flex-col next-training next-training__header">
                <h1 className="next-training__header-title">Next Training 🔥</h1>
                <TrainingSchedule />
            </article>

            <article className="next-training next-training__exercises">
                <h2 className="content__title">Exercises</h2>
                {
                    role === 'coach' ? renderExercisesToCoach(nextTrainingExercises, (exercise) => handleShowAddExerciseRegister(exercise), (id) => removeNextTrainingExercise(id)) : renderExercisesToPlayers(nextTraining ? nextTraining.exercises : [])
                }
                {
                    role === 'coach' && (
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
                    renderPlayers(nextTraining ? nextTraining.players : [])
                }
                {
                    role === 'player' && nextTraining && !nextTraining.players.map(player => player.id).includes(id) && (
                        <Button 
                            text="I'll Go!"
                            action={() => {}}
                        />
                    )
                }
            </article>

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
                            <AddNextTrainingExercise 
                                onSubmit={data => console.log(data)}
                            />
                        </ModalContent>
                    </Modal>
                )
            }
            {
                exercise && showAddExerciseRegister && (
                    <Modal>
                        <ModalContent onClose={() => setShowAddExerciseRegister(false)}>
                            <AddExerciseRegisterContainer 
                                exercise={exercise}
                                players={nextTraining ? nextTraining.players : []}
                                onSubmit={(data) => console.log(data)}
                            />
                        </ModalContent>
                    </Modal>
                )
            }
        </DashboardLayout>
    )
}