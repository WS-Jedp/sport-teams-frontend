import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../contexts/user'
import { TrainingContext } from '../../../contexts/training'
import { format } from 'date-fns'
import { DAY_NAME, FORMAT, MONTH_NAME, MYSQL_FORMAT, MYSQL_FORMAT_TIME } from '../../../tools/dateFormats'
import { Button } from '../../buttons/simple'

import { NextTrainingForm } from '../../../containers/nextTrainingContainers/defineNextTraining'
import { DefineNextTraining } from '../../../containers/nextTrainingContainers/defineNextTraining'

interface DayDetail {
    dayNumber: number,
    trainingDay?: Date,
    action: (data:NextTrainingForm) => void
}

export const DayDetail:React.FC<DayDetail> = ({ dayNumber, trainingDay, action }) => {

    const { id, role } = useContext(UserContext)
    const { nextTraining } = useContext(TrainingContext)
    const { push } = useHistory()
    
    const month = Number(format(new Date(), 'M'))
    const monthName = format(new Date(), MONTH_NAME)
    const year = Number(format(new Date(), 'yyyy'))
    const date = new Date(year, month, dayNumber)

    const day = format(date, FORMAT)

    const playersNextTraining = nextTraining.players.map(player => player.id)

    let numberTrainingDay:number
    if(trainingDay) {
        numberTrainingDay = Number(format(trainingDay, 'd')) 
    } else {
        numberTrainingDay = 0
    }

    const isTrainingDay = Number(format(date, 'd')) === numberTrainingDay

    
    
    return (
        <article className="day-detail">
                <h3>{day}</h3>

            {
                isTrainingDay && nextTraining.datetime ? (
                    <div className="flex flex-col align-center justify-center m-lg">
                        <h2 className="content__title">Training Day! </h2>
                        <h3 className="content__sub-title">At: {format(nextTraining.datetime, 'p')}</h3>
                        {
                            role === 'player' && !playersNextTraining.includes(id) && (
                                <Button 
                                    text="I'll Go!"
                                    action={() => {}}
                                />
                            )
                        }
                        {
                            playersNextTraining.includes(id) && (
                                <p className="content__paragraph">You are going!</p>
                            )
                        }

                    </div>
                ) : (
                    <>
                        <p className="content__paragraph">
                            There is no traning schedule for this day
                        </p>
                        {
                            role === 'coach' && (
                                <DefineNextTraining 
                                    onSubmit={action}
                                    date={format(date, MYSQL_FORMAT)}
                                />
                            )
                        }
                    </>
                )
            }
            
        </article>
    )
}