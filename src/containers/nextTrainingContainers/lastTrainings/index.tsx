import React from 'react'
import { Training } from '../../../dto/training'
import { useHistory } from 'react-router-dom'
import { TrainingSmallCard } from '../../../components/training/smallCard'
import { Button } from '../../../components/buttons/simple'

export const renderLastTrainings = (trainings:Training[]) => {

    const { push } = useHistory()

    if(trainings.length === 0) {
        return (
            <p className="content__paragraph">
                There is no trainings registered!
            </p>
        )
    }

    return (
        <>
            <p className="content__paragraph">These are the last trainings registered</p>
            <ul className="flex flex-col align-start justify-start next-training__last-trainings-list">
                {
                    trainings.map(training => (
                        <li key={training.id} className="flex align-center justify-center">
                            <TrainingSmallCard 
                                action={() => push(`/trainings/${training.id}`)}
                                date={training.datetime}
                            />
                        </li>
                    ))
                }
            </ul>
            <Button 
                text="See All"
                action={() => push('all/trainings')}
            />
        </>
    )

}