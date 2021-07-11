import React, { MouseEventHandler } from 'react'

interface Day {
    isSelected?: boolean,
    number: number,
    name?: string,
    action: MouseEventHandler
}

export const Day:React.FC<Day> = ({ number, isSelected = false, name = '', action = () => {} }) => {

    return (
        <article className={`flex flex-col align-center justify-center day ${isSelected && 'day--selected'}`} onClick={action}>
            <strong className="day__number">{number}</strong>
            {
                isSelected && (
                    <p>{name}</p>
                )
            }
        </article>
    )
}