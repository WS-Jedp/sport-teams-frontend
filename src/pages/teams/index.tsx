import React, { useContext, useEffect, useState } from 'react'
import { DashboardLayout } from '../../layouts/dashboard'

import { Button } from '../../components/buttons/simple'
import { GraphLoading } from '../../components/loading/graph'

import './styles.scss'

import { TeamContext } from '../../contexts/team'
import { UserContext } from '../../contexts/user'
import { renderTeams } from '../../containers/teamsContainers'

import { getTeams } from '../../services/teams/get'

export const Teams:React.FC = () => {

    const { teams, addTeams } = useContext(TeamContext)
    const { role } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchingData = async () => {
            const teams = await getTeams()
            addTeams(...teams)
            setIsLoading(false)
        }
        fetchingData()
    }, [])

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