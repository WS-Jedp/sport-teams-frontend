import React, { useContext, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { TrainingContext } from '../../contexts/training'

import { DashboardLayout } from '../../layouts/dashboard'
import { renderExercises } from '../../containers/trainingContainers/exercises' 
import { renderPlayers } from '../../containers/trainingContainers/players' 
import { renderVideos } from '../../containers/trainingContainers/videos' 
import { Loading } from '../../components/loading/basic'

import { format } from 'date-fns'
import { FORMAT } from '../../tools/dateFormats'

import { getTraining } from '../../services/trainings/get'

import './styles.scss'

export const Training:React.FC = () => {

    const { id } = useParams<{id?:string}>()
    const { push } = useHistory()
    const { training, selectTraining } = useContext(TrainingContext)

    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const getData = async () => {
            const data = await getTraining(Number(id))
            selectTraining(data)
            setIsLoading(false)
        }
        getData()
    },[])

    if(isLoading) (<Loading />)

    if(!training) {
        return (
            <DashboardLayout>
                <article className="training training__header">
                    <h1 className="training__header-title">Training 🏋🏾‍♀️</h1>
                    <p className="content__paragraph">You must need select a training first</p>
                </article>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <article className="training training__header">
                <h1 className="training__header-title">Training 🏋🏾‍♀️</h1>
                <h2 className="content__sub-title">Training of: {training.datetime ? format(training.datetime, FORMAT) : 'There is no date registered'} </h2>
            </article>

            <article className="training training__exercises">
                <h2 className="content__title">Exercises</h2>
                {
                    renderExercises(training.exercises, (id) => {})
                }
            </article>

            <article className="training training__players">
                <h2 className="content__title">Players</h2>
                {
                    renderPlayers(training.players, (id) => push(`/user/${id}`))
                }
            </article>

            <article className="training training__videos">
                <h2 className="content__title">Videos</h2>
                {
                    renderVideos(training.videos ? training.videos : [])
                }
            </article>
        </DashboardLayout>
    )
}