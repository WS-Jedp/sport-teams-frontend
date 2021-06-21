import React, { useContext } from 'react'

import { ExerciseSmall, LastExercises } from '../../dto/exercise'
import { UserContext } from '../../contexts/user'
import { ExercisesContext } from '../../contexts/exercises'
import { TrainingContext } from '../../contexts/training'

import { DashboardLayout } from '../../layouts/dashboard'
import './styles.scss'

import { Calendary } from '../../components/calendary'
import { TrainingSchedule } from '../../containers/trainingSchedule'
import { renderLastExercises, renderNextTraining } from '../../containers/homeExercises'



export const Home:React.FC = () => {

    const { name, role } = useContext(UserContext)
    const { userLastExercises } = useContext(ExercisesContext)
    const { nextTrainingExercises } = useContext(TrainingContext)

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
                    role === 'coach' ? renderNextTraining(nextTrainingExercises) : renderLastExercises(userLastExercises)
                }
            </article>
        </DashboardLayout>
    )
}