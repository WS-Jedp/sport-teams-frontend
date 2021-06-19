import React, {useEffect, useState, MouseEventHandler} from 'react'
import { format, startOfWeek, getWeekOfMonth } from 'date-fns'
import { DAY_NAME, MONTH_NAME } from '../../tools/dateFormats'
import { Day } from './day'
import { Modal } from '../modals/basic'
import { ModalContent } from '../modals/content'
import { DayDetail } from './dayDetail'
import './styles.scss'

interface Calendary {
    nextTrainingDay: Date
}

export const Calendary:React.FC<Calendary> = ({ nextTrainingDay }) => {
    
    const today = new Date()
    const startWeek = Number(format(startOfWeek(today, { weekStartsOn: 1 }), 'd'))
    const numberDayNextTraining = Number(format(nextTrainingDay, 'd'))
    const numberOfWeek = Number(getWeekOfMonth(today))
    

    const [currentMonth, setCurrentMonth] = useState<string>(format(today, MONTH_NAME))
    const [daysOfWeek, setDaysOfWeek] = useState<number[]>(Array.from(Array(7)))
    const [nameTrainingDay, setNameTrainingDay] = useState<string>('')

    const [dayDetail, setDayDetail] = useState<boolean>(false)
    const [dayDetailNumber, setDayDetailNumber] = useState<number>(0)

    const getNameOfDay = () => {
        setNameTrainingDay(format(nextTrainingDay, DAY_NAME))
    }

    const isTraningDay = ({numberDay}:{numberDay: number}):boolean => {
        return numberDayNextTraining === numberDay
    }


    useEffect(() => {
        getNameOfDay()
    }, [])


    const handleDayDetail = ({ numberDay }:{numberDay:number}) => {
        setDayDetail(true)
        setDayDetailNumber(numberDay)
    } 
    
    return (
        <article className="flex flex-col align-start justify-start calendary">
            <h2 className="calendary__month">{currentMonth}</h2>
            <b className="calendary__week">Week {numberOfWeek}</b>
            <ul className="flex flex-row align-start justify-start calendary__days">
                {
                    daysOfWeek.map((e, i) => (
                        <li key={i}>
                            <Day
                                isSelected={isTraningDay({ numberDay: startWeek+i })}
                                action={(ev) => handleDayDetail({ numberDay: startWeek+i })}
                                number={startWeek + i}
                                name={isTraningDay({ numberDay: startWeek+i }) === true ? nameTrainingDay : '' }
                            />
                        </li>
                    ))
                }
            </ul>
            
            {
                dayDetail && (
                    <Modal>
                        <ModalContent onClose={() => setDayDetail(false)}>
                            <DayDetail 
                                trainingDay={nextTrainingDay}
                                dayNumber={dayDetailNumber}
                            />
                        </ModalContent>
                    </Modal>
                )
            }
        </article>
    )
}