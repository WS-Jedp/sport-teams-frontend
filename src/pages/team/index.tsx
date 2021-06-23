import React, { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import { FORMAT } from '../../tools/dateFormats'
import { DashboardLayout } from '../../layouts/dashboard'
import TeamLogo from '../../assets/images/pure-vibes-logo.jpg'

import { TeamContext } from '../../contexts/team'
import { UserContext } from '../../contexts/user'

import { TeamHeader } from '../../components/teams/header'
import { renderTeamVideos, renderPlayers, renderDirectives } from '../../containers/teamContainers'
import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'
import { Loading } from '../../components/loading/basic'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { AddPlayerContainer } from '../../containers/teamContainers/addPlayer'
import { AddDirectiveContainer } from '../../containers/teamContainers/addDirective'

import { getTeam } from '../../services/teams/get'

import './styles.scss'
import { MdAdd } from 'react-icons/md'

export const Team:React.FC = () => {

    const { push } = useHistory()
    const { team, selectTeam } = useContext(TeamContext)
    const { role } = useContext(UserContext)
    const { id } = useParams<{id?:string}>()

    const [showAddPlayer, setShowAddPlayer] = useState<boolean>(false)
    const [showAddDirective, setShowAddDirective] = useState<boolean>(false)

    const onPerson = (id:number) => push(`/user/${id}`)

    // Fetching team data
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const getData = async () => {
            const team = await getTeam(Number(id))
            selectTeam(team)
            setIsLoading(false)
        }
        getData()
    }, [])

    

    if(isLoading) (<Loading />)

    if(!team) {
        return (
            <DashboardLayout>
            <article className="flex flex-col align-start justify-start team team__header">
                <h1>Team 🏀</h1>
                <p className="team__paragraph">You must need select a team first</p>
            </article>
        </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <article className="flex flex-col align-start justify-start team team__header">
                <h1>Team 🏀</h1>
                <TeamHeader name={team.name} location={team.location} photoUrl={team.photoUrl ? team.photoUrl : TeamLogo} />
            </article>

            <article className="flex flex-col align-start justify-start team team__about">
                <h2 className="content__title">Description</h2>
                <p className="content__paragraph">
                    {team.description}
                </p>
                <h2 className="content__sub-title">Next Training</h2>
                <p className="content__paragraph">
                    {team.nextTraining ? format(team.nextTraining, FORMAT) : 'There is no next training schedule'}
                </p>
            </article>

            {/* <article className="flex flex-col align-start justify-start team team__videos">
                <h2 className="content__title">Videos</h2>
                {
                    renderTeamVideos(team.lastVideos)
                }
            </article> */}

            <article className="flex flex-col align-start justify-start team team__players">
                <h2 className="content__title">Players</h2>
                {
                    renderPlayers(team.players, onPerson)
                }
                 <div className="flex flex-row align-start justify-start team__buttons">
                {
                    role === 'coach' && (
                        <Button 
                            text="Add Player"
                            action={() => setShowAddPlayer(true)}
                        />
                    )
                }
            </div>
            </article>

            <article className="flex flex-col align-start justify-start team team__players">
                <h2 className="content__title">Directives</h2>
                {
                    renderDirectives(team.directives, onPerson)
                }
                {
                    role === 'coach' && (
                        <Button 
                            text="Add Directive"
                            action={() => setShowAddDirective(true)}
                        />
                    )
                }
            </article>

            {
                showAddPlayer && (
                    <Modal>
                        <ModalContent onClose={() => setShowAddPlayer(false)}>
                            <AddPlayerContainer 
                                onSubmit={(data) => console.log(data)}
                            />
                        </ModalContent>
                    </Modal>
                )
            }
            {
                showAddDirective && (
                    <Modal>
                        <ModalContent onClose={() => setShowAddDirective(false)}>
                            <AddDirectiveContainer 
                                onSubmit={(data) => console.log(data)}
                            />
                        </ModalContent>
                    </Modal>
                )
            }

        </DashboardLayout>
    )
}