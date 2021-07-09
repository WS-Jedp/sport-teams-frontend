import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

import { UserContext } from '../../contexts/user'
import { ExercisesContext } from '../../contexts/exercises'
import { TrainingContext } from '../../contexts/training'

import { DashboardLayout } from '../../layouts/dashboard'
import './styles.scss'

import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'
import { TrainingSchedule } from '../../containers/trainingSchedule'
import { renderLastExercises, renderNextTraining } from '../../containers/homeExercises'

import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { AddNextTrainingExercise } from '../../containers/nextTrainingContainers/exercises/add'

import { getUserLastExercise } from '../../services/exercises/get'
import { getExercises } from '../../services/exercises/get'



export const Home:React.FC = () => {

    const { push } = useHistory()

    const { name, role, id: userId, teamId } = useContext(UserContext)
    const { userLastExercises, handleUserLastExercises, setExercises} = useContext(ExercisesContext)
    const { nextTrainingExercises, removeNextTrainingExercise } = useContext(TrainingContext)

    const [ showRegisterExercise, setShowRegisterExercise ] = useState<boolean>(false)

    const onLastExercise = (id:string) => push(`/exercise/${id}`)

    useEffect(() => {
        const fetchData = async () => {
            const allExercises = await getExercises()
            setExercises(...allExercises)
            const lastExercises = await getUserLastExercise(userId)
            handleUserLastExercises(...lastExercises)
        }
        fetchData()
    }, [])


    return (
        <DashboardLayout>
            <article className="home__welcome">
                <h2 className="home__welcome-greeting">
                    Welcome Back, {name} 👋🏾
                </h2>
                <TrainingSchedule />
                
            </article>

            <article className="home__exercises">
                <h2 className="content__title">
                    {
                        role === 'coach' ? ('Next Training 🔥') : ('My Exercises 🏆')
                    }
                </h2>
                {
                    role === 'coach' ? renderNextTraining(nextTrainingExercises, (id) => push(`/exercise/${id}`), (id) => removeNextTrainingExercise(id)) : renderLastExercises(userLastExercises, onLastExercise)
                }
                <div className="flex flex-row align-start justify-start home__exercises-buttons">
                    <Button 
                        action={() => push('/exercises')}
                        text="See All"
                        color="purple"
                    />
                    {
                        role === 'Coach' && (
                            <ButtonCircle 
                                action={() => setShowRegisterExercise(true)}
                                Icon={MdAdd}
                                color="purple"
                            />
                        )
                    }
                </div>
            </article>

            {
                showRegisterExercise && (
                    <Modal>
                        <ModalContent onClose={() => setShowRegisterExercise(false)}>
                            <AddNextTrainingExercise 
                                onSubmit={data => console.log(data)}
                            />
                        </ModalContent>
                    </Modal>
                )
            }
        </DashboardLayout>
    )
}