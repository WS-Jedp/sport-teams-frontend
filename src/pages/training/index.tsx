import React, { useContext, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { TrainingContext } from '../../contexts/training'

import { DashboardLayout } from '../../layouts/dashboard'
import { renderExercises } from '../../containers/trainingContainers/exercises' 
import { renderPlayers } from '../../containers/trainingContainers/players' 
import { renderVideos } from '../../containers/trainingContainers/videos' 
import { Loading } from '../../components/loading/basic'
import { ExerciseSmallCard } from '../../components/exercises/smallCard'

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
            
            if(id) {
                const data = await getTraining(id)
                if(data) {
                    selectTraining(data)
                }
            }
            setIsLoading(false)
        }
        getData()
    },[])

    if(isLoading) return (<Loading />)

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
                <h2 className="content__sub-title">Training of: {training.datetime ? format(new Date(training.datetime), FORMAT) : 'There is no date registered'} </h2>
            </article>

            <article className="training training__exercises">
                <h2 className="content__title">Exercises</h2>
                {
                    training.exercises.length > 0 ? (
                        <ul className="relative flex flex-row align-center justify-center next-training__last-trainings-list">
                            {
                                training.exercises.length > 0 && training.exercises.map((exercise) => (
                                    <ExerciseSmallCard 
                                    key={exercise.id}
                                        exerciseName={exercise.title}
                                        exerciseType={exercise.type}
                                        action={() => push(`/exercise/${exercise.id}`)}
                                    />
                                )) 
                            }
                    </ul>
                    ) : (
                        <p className="content__paragraph">There is no exercises registered for this training</p>
                    )
                }
                    
            </article>

            <article className="training training__players">
                <h2 className="content__title">Players</h2>
                {
                    renderPlayers(training.players || [], (id) => push(`/user/${id}`))
                }
            </article>

            {/* <article className="training training__videos">
                <h2 className="content__title">Videos</h2>
                {
                    renderVideos(training.videos ? training.videos : [])
                }
            </article> */}
        </DashboardLayout>
    )
}