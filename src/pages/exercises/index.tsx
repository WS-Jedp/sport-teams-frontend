import React, { useContext, useState, useEffect } from 'react'

import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { UserContext } from '../../contexts/user'
import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'
import { MdAdd } from 'react-icons/md'

import { renderExercises } from '../../containers/exercisesContainers'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { Loading } from '../../components/loading/basic'


import { CreateExerciseContainer } from '../../containers/exercisesContainers/forms/createExercise'

import { getExercises } from '../../services/exercises/get'

import './styles.scss'

export const Exercises:React.FC = () => {
    
    const { exercises, addExercise, setExercises } = useContext(ExercisesContext)
    const { role } = useContext(UserContext)

    // useEffect(() => {
    //     const fetchingData = async () => {
    //         const exercisesData = await getExercises()
    //         setExercises(...exercisesData)
    //     }
    //     fetchingData()
    // }, [])


    const [isReloading, setIsReloading] = useState<boolean>(false)
    const getData = async () => {
        setIsReloading(true)
        const exercisesData = await getExercises()
        setExercises(...exercisesData)
        setIsReloading(false)
    }

    const [showCreateExercise, setShowCreateExercise] = useState<boolean>(false)

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
                    renderExercises(exercises)
                }
                <div className="flex flex-row align-start justify-start home__exercises-buttons">
                <Button 
                    action={() => getData()}
                    text="Reload"
                    color="purple"
                />

                {
                    role === 'coach' && (
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
                            <CreateExerciseContainer 
                                onSubmit={(data) => console.log(data)}
                            />
                        </ModalContent>
                    </Modal>
                )
            }

        </DashboardLayout>
    )
}