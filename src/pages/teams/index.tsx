import React, { useContext } from 'react'
import { DashboardLayout } from '../../layouts/dashboard'
import './styles.scss'

import { TeamContext } from '../../contexts/team'
import { renderTeams } from '../../containers/teamsContainers'

export const Teams:React.FC = () => {

    const { teams } = useContext(TeamContext)

    return (
        <DashboardLayout>
            <section className="teams teams__header">
                <h1 className="teams__header-title">Teams 🏀</h1>
                {
                    renderTeams(teams)
                }
            </section>
        </DashboardLayout>
    )
}