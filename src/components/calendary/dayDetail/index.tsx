import React, { useContext } from 'react'
import { UserContext } from '../../../contexts/user'
import { format, getDate } from 'date-fns'
import { DAY_NAME, FORMAT, MONTH_NAME } from '../../../tools/dateFormats'

interface DayDetail {
    dayNumber: number,
    trainingDay: Date
}

export const DayDetail:React.FC<DayDetail> = ({ dayNumber, trainingDay }) => {

    const { role } = useContext(UserContext)
    


    const month = Number(format(new Date(), 'M'))
    const monthName = format(new Date(), MONTH_NAME)
    const year = Number(format(new Date(), 'yyyy'))
    const date = new Date(year, month, dayNumber)

    const day = format(date, FORMAT)

    const isTrainingDay = Number(format(date, 'd')) === Number(format(trainingDay, 'd'))
    
    return (
        <article className="day-detail">
                <h3>{day}</h3>

            {
                isTrainingDay ? (
                    <p>
                        Training Day
                    </p>
                ) : (
                    <p>
                        There is no traning schedule for this day
                    </p>
                )
            }
            
        </article>
    )
}