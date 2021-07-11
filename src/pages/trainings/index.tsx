import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { TrainingContext } from '../../contexts/training'
import { DashboardLayout } from '../../layouts/dashboard'

import { TrainingSmallCard } from '../../components/training/smallCard'
import { Loading } from '../../components/loading/basic'

import { getTrainings } from '../../services/trainings/get'

import './styles.scss'

export const Trainings:React.FC = () => {

    const { push } = useHistory()
    const { trainings, addTrainings } = useContext(TrainingContext)

    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const getData = async () => {
            const resp = await getTrainings()
            addTrainings(...resp)
            setIsLoading(false)
        }
        getData()
    }, [])

    if(isLoading) return (<Loading />)

    if(trainings.length === 0) {
        <DashboardLayout>
            <article className="trainings trainings__header">
                <h1 className="trainings__header-title">Trainings 🏋🏾‍♀️</h1>
                <p className="content__paragraph">There is no trainings registered</p>
            </article>
        </DashboardLayout>
    }

    return (
        <DashboardLayout>
            <article className="trainings trainings__header">
                <h1 className="trainings__header-title">Trainings 🏋🏾‍♀️</h1>
                <p className="content__paragraph">Find all the trainings done by the team</p>
            </article>

            <ul className="trainings rainings__list">
                {
                    trainings.map(training => (
                        <TrainingSmallCard 
                            key={training.id}
                            date={training.datetime && new Date(training.datetime)}
                            action={() => push(`/trainings/${training.id}`)}
                        />
                    ))
                }
            </ul>
        </DashboardLayout>
    )
}
