import React, { useContext, useState } from 'react'
import { Exercise } from '../../dto/exercise'
import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { UserContext } from '../../contexts/user'
import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'
import { MdAdd } from 'react-icons/md'

import { renderExercises } from '../../containers/exercisesContainers'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { CreateExerciseContainer } from '../../containers/exercisesContainers/forms/createExercise'

import { getMoreExercises } from '../../services/exercises/get'

import './styles.scss'

export const Exercises:React.FC = () => {

    const { exercises, addExercise } = useContext(ExercisesContext)
    const { role } = useContext(UserContext)

    const getData = async () => {
        const data = await getMoreExercises({from: 0, to: 10})
        addExercise(...data)
    }

    const [showCreateExercise, setShowCreateExercise] = useState<boolean>(false)


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
                    action={getData}
                    text="Load More"
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