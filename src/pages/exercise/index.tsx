import React, { useContext, useState, useEffect } from 'react'
import { MdEdit } from 'react-icons/md'
import { useParams, useHistory } from 'react-router-dom'
import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { UserContext } from '../../contexts/user'

import { ExerciseCategoryCard } from '../../components/exercises/category'
import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'
import { Loading } from '../../components/loading/basic'
import { GraphLoading } from '../../components/loading/graph'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { UpdateExerciseContainer, UpdateExerciseForm } from '../../containers/exercisesContainers/forms/updateExercise'

import { getExercise } from '../../services/exercises/get'
import { updateExercise } from '../../services/exercises/post'

import { ROLES } from '../../dto/roles'
import { Exercise as ExerciseDto } from '../../dto/exercise'

import { defineIdYoutubeVideo } from '../../tools/defineYoutubeVideoId'


import './styles.scss'



export const Exercise:React.FC = () => {

    const { id } = useParams<{id?:string}>()
    const { push } = useHistory()
    const { exercise, selectExercise } = useContext(ExercisesContext)
    const { role, teamId } = useContext(UserContext)


    const [isLoading, setIsLoading] = useState<boolean>(true)

    const toHistory = () => {
        push(`/exercise/${id}/history`)
    }

    const toTeamHistory = (teamId:string) => push(`/exercise/${id}/team/${teamId}/history`)

    // Update exercise
    const [showUpdateExercise, setShowUpdateExercise] = useState<boolean>(false)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const handleUpdateExercise = async (data:UpdateExerciseForm) => {
        setIsUpdating(true)
        const exerciseId = await updateExercise(id || '', data)
        await selectExercise({...data as ExerciseDto, videoId: data.videoId ? defineIdYoutubeVideo(data.videoId) : undefined})
        setIsUpdating(false)
    }

    // Fetch Data
    useEffect(() => {
        const getData = async () => {
            const data = await getExercise(id || '')
            selectExercise(data)
            setIsLoading(false)
        }
        getData()
    }, [])

    if(isLoading || !exercise) (<Loading />)
    

    if(!exercise) {
        return (
            <DashboardLayout>
            <article className="flex flex-col exercise exercise__header">
                <h1 className="exercise__header-title">Exercise 🔥</h1>
                <p className="content__paragraph">You must need select a exercise</p>
            </article>
        </DashboardLayout>
        ) 
    }

    return (
        <DashboardLayout>
            <article className="flex flex-col exercise exercise__header">
                <h1 className="exercise__header-title">Exercise 🔥</h1>
                <h2 className="content__title">{exercise.title}</h2>
                {
                    exercise.videoId && (
                        <iframe className="exercise__video" src={`https://www.youtube.com/embed/${exercise.videoId}`} title={exercise.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen  />
                    )
                }
            </article>


            <article className="exercise exercise__about">
                <h2 className="content__title">Description</h2>
                <p className="content__paragraph">{exercise.description}</p>
                <h3 className="m-t-xl content__sub-title">Category</h3>
                <ExerciseCategoryCard category={exercise.category} />
            </article>

            <article className="flex flex-row align-center justify-start exercise exercise__buttons">
                <Button 
                    text="History"
                    action={toHistory}
                />
                {/* <ButtonCircle 
                    Icon={MdAdd}
                    action={() => setShowRegisterExercise(true)}
                /> */}
                {
                    role === ROLES['COACH'] && (
                        <ButtonCircle 
                            Icon={MdEdit}
                            action={() => setShowUpdateExercise(true)}
                        />
                    )
                }
            </article>

            <article className="exercise m-t-md exercise__buttons">
                <h2 className="content__title">Team</h2>
                <p className="content__paragraph">See the results from the team</p>
                <Button 
                    text="Team History"
                    action={() => toTeamHistory(teamId)}
                />
            </article>

            {/* <article className="exercise exercise__purposes">
                <h2 className="content__title">Purposes</h2>
                {
                    renderPurposes(exercise.purposes)
                }

            </article> */}

            {/* {
                showRegisterExercise && (
                    <Modal>
                        <ModalContent onClose={() => setShowRegisterExercise(false)}>
                            <RegisterExerciseContainer 
                                onSubmit={(data) => console.log(data)}
                                selectedExercise={exercise.id}
                            />
                        </ModalContent>
                    </Modal>
                )
            } */}

            {
                showUpdateExercise && (
                    <Modal>
                        <ModalContent onClose={() => setShowUpdateExercise(false)}>
                            {
                                isUpdating ? (
                                    <GraphLoading />
                                ) : (
                                    <UpdateExerciseContainer 
                                        onSubmit={handleUpdateExercise}
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