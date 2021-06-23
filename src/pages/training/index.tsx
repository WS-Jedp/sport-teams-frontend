import React, { useContext, useState } from 'react'

import { TrainingContext } from '../../contexts/training'

import { DashboardLayout } from '../../layouts/dashboard'
import { renderExercises } from '../../containers/trainingContainers/exercises' 
import { renderPlayers } from '../../containers/trainingContainers/players' 
import { renderVideos } from '../../containers/trainingContainers/videos' 

import './styles.scss'
import { format } from 'date-fns'
import { FORMAT } from '../../tools/dateFormats'

export const Training:React.FC = () => {

    const { training } = useContext(TrainingContext)

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
                    renderExercises(training.exercises)
                }
            </article>

            <article className="training training__players">
                <h2 className="content__title">Players</h2>
                {
                    renderPlayers(training.players)
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