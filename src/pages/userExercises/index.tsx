import React, { useContext, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { Button } from '../../components/buttons/simple'

import { renderExercises } from '../../containers/exercisesContainers'
import { Loading } from '../../components/loading/basic'


import { getExercises } from '../../services/exercises/get'

export const UserExercises:React.FC = () => {
    
    const { id:userId } = useParams<{id?: string}>()
    const { push } = useHistory()
    const { exercises, setExercises } = useContext(ExercisesContext)

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
                    renderExercises(exercises, (id) => push(`/user/${userId}/exercise/${id}`))
                }
                <div className="flex flex-row align-start justify-start home__exercises-buttons">
                <Button 
                    action={() => getData()}
                    text="Reload"
                    color="purple"
                />
            </div>
            </article>
        </DashboardLayout>
    )
}