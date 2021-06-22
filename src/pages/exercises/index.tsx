import React, { useContext } from 'react'
import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { UserContext } from '../../contexts/user'
import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'
import { MdAdd } from 'react-icons/md'

import { renderExercises } from '../../containers/exercisesContainers'

import './styles.scss'

export const Exercises:React.FC = () => {

    const { exercises } = useContext(ExercisesContext)
    const { role } = useContext(UserContext)

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
                    action={() => {}}
                    text="Load More"
                    color="purple"
                />

                {
                    role === 'coach' && (
                        <ButtonCircle 
                            action={() => {}}
                            Icon={MdAdd}
                            color="purple"
                        />
                    )
                }
            </div>
            </article>

        </DashboardLayout>
    )
}