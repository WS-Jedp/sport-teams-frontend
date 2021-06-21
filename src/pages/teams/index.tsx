import React, { useContext } from 'react'
import { DashboardLayout } from '../../layouts/dashboard'
import { Button } from '../../components/buttons/simple'
import './styles.scss'

import { TeamContext } from '../../contexts/team'
import { UserContext } from '../../contexts/user'
import { renderTeams } from '../../containers/teamsContainers'

export const Teams:React.FC = () => {

    const { teams } = useContext(TeamContext)
    const { role } = useContext(UserContext)

    return (
        <DashboardLayout>
            <section className="teams teams__header">
                <h1 className="teams__header-title">Teams 🏀</h1>
                {
                    renderTeams(teams)
                }
                {
                    role === 'directive' && (
                        <div className="teams__list-add">
                            <Button
                                text="Add New"
                                action={() => {}}
                            />
                        </div>
                    ) 
                }
            </section>
        </DashboardLayout>
    )
}