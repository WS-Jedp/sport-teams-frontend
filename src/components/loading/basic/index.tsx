import React from 'react'
import { DashboardLayout } from '../../../layouts/dashboard' 

export const Loading:React.FC = () => {

    return (
        <DashboardLayout>
            <article className="flex flex-col align-center justify-center loading">
                <div className="loading__circle" />
                <p className="content__paragraph">Loading</p>
            </article>
        </DashboardLayout>
    )
}