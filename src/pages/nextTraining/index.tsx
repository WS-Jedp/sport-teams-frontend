import React, { useContext } from 'react'

import { DashboardLayout } from '../../layouts/dashboard'
import { TrainingSchedule } from '../../containers/trainingSchedule'

import { renderPlayers } from '../../containers/nextTrainingContainers/players'
import { renderExercisesToCoach, renderExercisesToPlayers } from '../../containers/nextTrainingContainers/exercises'

import { TrainingContext } from '../../contexts/training'
import { UserContext } from '../../contexts/user'

import { Button } from '../../components/buttons/simple'

import './styles.scss'

export const NextTraining:React.FC = () => {

    const { nextTraining } = useContext(TrainingContext)
    const { role, id } = useContext(UserContext)

    return (
        <DashboardLayout>
            <article className="flex flex-col next-training next-training__header">
                <h1 className="next-training__header-title">Next Training 🔥</h1>
                <TrainingSchedule />
            </article>

            <article className="next-training next-training__exercises">
                <h2 className="content__title">Exercises</h2>
                {
                    role === 'coach' ? renderExercisesToCoach(nextTraining.exercises) : renderExercisesToPlayers(nextTraining.exercises)
                }
            </article>

            <article className="next-training next-training__players">
                <h2 className="content__title">Players</h2>
                {
                    renderPlayers(nextTraining.players)
                }
                {
                    role === 'player' && !nextTraining.players.map(player => player.id).includes(id) && (
                        <Button 
                            text="I'll Go!"
                            action={() => {}}
                        />
                    )
                }
            </article>
        </DashboardLayout>
    )
}