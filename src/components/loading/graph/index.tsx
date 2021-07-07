import React from 'react'
import '../basic/styles.scss'

export const GraphLoading:React.FC = () => {

    return (
            <article className="flex flex-col align-center justify-center">
                <div className="loading__circle" />
            </article>
    )
}