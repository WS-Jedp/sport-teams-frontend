import React from 'react'
import { Purpose } from '../../../dto/purposes'

export const renderPurposes = (purposes:Purpose[]) => {

    if(purposes.length === 0) {
        return (
            <p className="content__paragrahp">This exercise doesn't have any purpose registered</p>
        )
    }

    return (
        <>
            <ul className="flex flex-col align-start justify-start exercise__purposes-list">
                {
                    purposes.map(purpose => (
                        <li key={purpose.id} className="content__paragraph">
                            - {purpose.title}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}