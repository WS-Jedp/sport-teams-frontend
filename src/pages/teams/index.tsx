import React, { useContext, useEffect, useState } from 'react'
import { DashboardLayout } from '../../layouts/dashboard'

import { Button } from '../../components/buttons/simple'
import { Loading } from '../../components/loading/basic'

import { TeamContext } from '../../contexts/team'
import { UserContext } from '../../contexts/user'
import { renderTeams } from '../../containers/teamsContainers'

import { getTeams } from '../../services/teams/get'

export const Teams:React.FC = () => {

    const { teams, addTeams } = useContext(TeamContext)
    const { role } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchingData = async () => {
            setIsLoading(true)
            const teams = await getTeams()
            addTeams(...teams)
            setIsLoading(false)
        }
        if(teams.length < 1) {
            fetchingData()
        } 
    }, [])

    if(isLoading) {
        return (
            <DashboardLayout>
                <Loading />
            </DashboardLayout>
        )
    }

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