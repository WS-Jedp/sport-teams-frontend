import React , { useContext } from 'react'
import { TrainingContext } from '../../contexts/training'
import { Calendary } from '../../components/calendary'

export const TrainingSchedule:React.FC = () => {

    const { nextTraining } = useContext(TrainingContext)

    return (
        <>
            <h3 className="content__title">Training Schedule 📅</h3>
            <Calendary 
                nextTrainingDay={nextTraining && nextTraining.datetime ? new Date(nextTraining.datetime) : undefined}
            />
        </>
    )
}