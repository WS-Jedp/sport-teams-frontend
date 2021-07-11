import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { UserContext } from '../../contexts/user'
import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'

import { renderExercises } from '../../containers/exercisesContainers'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { Loading } from '../../components/loading/basic'
import { GraphLoading } from '../../components/loading/graph'

import { CreateExerciseContainer, CreateExerciseForm } from '../../containers/exercisesContainers/forms/createExercise'

import { getExercises } from '../../services/exercises/get'
import { createExercise } from '../../services/exercises/post'

import { ROLES } from '../../dto/roles'

import { defineIdYoutubeVideo } from '../../tools/defineYoutubeVideoId'

import './styles.scss'

export const Exercises:React.FC = () => {

    const { push } = useHistory()
    const { exercises, addExercise, setExercises } = useContext(ExercisesContext)
    const { role } = useContext(UserContext)

    useEffect(() => {
        const fetchingData = async () => {
            const exercisesData = await getExercises()
            setExercises(...exercisesData)
        }
        if(exercises.length === 0) {
            fetchingData()
        }
    }, [])


    // Reload and get more exercises
    const [isReloading, setIsReloading] = useState<boolean>(false)
    const getData = async () => {
        setIsReloading(true)
        const exercisesData = await getExercises()
        setExercises(...exercisesData)
        setIsReloading(false)
    }

    // Create a new exercise
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [showCreateExercise, setShowCreateExercise] = useState<boolean>(false)
    const registerNewExercise = async (data:CreateExerciseForm) => {
        setIsCreating(true)
        const id = await createExercise({...data, videoId: data.videoId ? defineIdYoutubeVideo(data.videoId) : undefined})
        addExercise({
            ...data,
            purposes: [],
            videoId: data.videoId ? defineIdYoutubeVideo(data.videoId) : undefined,
            id
        })
        setIsCreating(false)
        setShowCreateExercise(false)
    }

    if(isReloading) (
        <Loading />
    )

    return (
        <DashboardLayout>
            <article className="exercises exercises__header">
                <h1 className="exercises__header-title">Exercises</h1>
            </article>

            <article className="exercises exercises__list">
                {
                    renderExercises(exercises, (id) => push(`/exercise/${id}`))
                }
                <div className="flex flex-row align-start justify-start home__exercises-buttons">
                <Button 
                    action={() => getData()}
                    text="Reload"
                    color="purple"
                />

                {
                    role !== ROLES['PLAYER'] && (
                        <ButtonCircle 
                            action={() => setShowCreateExercise(true)}
                            Icon={MdAdd}
                            color="purple"
                        />
                    )
                }
            </div>
            </article>

            {
                showCreateExercise && (
                    <Modal>
                        <ModalContent onClose={() => setShowCreateExercise(false)}>
                            {
                                isCreating ? (
                                    <GraphLoading />
                                ) : (
                                    <CreateExerciseContainer 
                                        onSubmit={registerNewExercise}
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