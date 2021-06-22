import React from 'react'

export const renderPurposes = (purposes:string[]) => {

    if(purposes.length === 0) {
        return (
            <p className="content__paragrahp">This exercise doesn't have any purpose registered</p>
        )
    }

    return (
        <>
            <ul className="flex flex-col align-start justify-start exercise__purposes-list">
                {
                    purposes.map((purpose, i) => (
                        <li key={i} className="content__paragraph">
                            - {purpose}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}