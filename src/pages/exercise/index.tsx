import React, { useContext, useState, useEffect } from 'react'
import { MdAdd, MdEdit } from 'react-icons/md'
import { useParams, useHistory } from 'react-router-dom'
import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { UserContext } from '../../contexts/user'

import { ExerciseCategoryCard } from '../../components/exercises/category'
import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'
import { Loading } from '../../components/loading/basic'
import { renderPurposes } from '../../containers/exerciseContainers/purposes'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { RegisterExerciseContainer } from '../../containers/exercisesContainers/forms/registerExercise'
import { UpdateExerciseContainer } from '../../containers/exercisesContainers/forms/updateExercise'

import { getExercise } from '../../services/exercises/get'

import './styles.scss'



export const Exercise:React.FC = () => {

    const { id } = useParams<{id?:string}>()
    const { push } = useHistory()
    const { exercise, selectExercise } = useContext(ExercisesContext)
    const { role } = useContext(UserContext)

    const [showRegisterExercise, setShowRegisterExercise] = useState<boolean>(false)
    const [showUpdateExercise, setShowUpdateExercise] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const toHistory = () => {
        push(`/exercise/${id}/history`)
    }

    // Fetch Data
    useEffect(() => {
        const getData = async () => {
            const data = await getExercise(id || '')
            selectExercise(data)
            setIsLoading(false)
        }
        getData()
    }, [exercise])

    if(isLoading) (<Loading />)
    

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
                    exercise.videoUrl && (
                        <iframe className="exercise__video" src={`https://www.youtube.com/embed/${exercise.videoUrl}`} title={exercise.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen  />
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
                <ButtonCircle 
                    Icon={MdAdd}
                    action={() => setShowRegisterExercise(true)}
                />
                {
                    role === 'coach' && (
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
                    action={toHistory}
                />
            </article>

            {/* <article className="exercise exercise__purposes">
                <h2 className="content__title">Purposes</h2>
                {
                    renderPurposes(exercise.purposes)
                }

            </article> */}

            {
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
            }

            {
                showUpdateExercise && (
                    <Modal>
                        <ModalContent onClose={() => setShowUpdateExercise(false)}>
                            <UpdateExerciseContainer 
                                onSubmit={(data) => console.log(data)}
                            />
                        </ModalContent>
                    </Modal>
                )
            }

        </DashboardLayout>
    )
}