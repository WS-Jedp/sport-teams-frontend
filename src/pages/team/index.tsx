import React, { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import TeamLogo from '../../assets/images/pure-vibes-logo.jpg'

import { FORMAT, MYSQL_FORMAT } from '../../tools/dateFormats'
import { DashboardLayout } from '../../layouts/dashboard'
import { TeamContext } from '../../contexts/team'
import { UserContext, UserInformation } from '../../contexts/user'

import { TeamHeader } from '../../components/teams/header'
import { renderTeamVideos, renderPlayers, renderDirectives } from '../../containers/teamContainers'
import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'
import { Loading } from '../../components/loading/basic'
import { GraphLoading } from '../../components/loading/graph'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'
import { AddPlayerContainer, AddPlayerForm } from '../../containers/teamContainers/addPlayer'
import { AddDirectiveContainer, AddDirectiveForm } from '../../containers/teamContainers/addDirective'
import { EditUserForm } from '../../containers/user/editUser'


import { ROLES } from '../../dto/roles'

import { getTeam } from '../../services/teams/get'
import { editUser, registerDirective as registerDirectiveService, registerPlayer as registerPlayerService } from '../../services/user/post'

import './styles.scss'

const PLAYERS_DEFAULT_PASSWROD = process.env.PLAYERS_DEFAULT_PASSWORD
const DIRECTIVES_DEFAULT_PASSWORD = process.env.DIRECTIVES_DEFAULT_PASSWORD

export const Team:React.FC = () => {

    const { push } = useHistory()
    const { team, selectTeam, addDirectiveUserTeam, addPlayerUserTeam } = useContext(TeamContext)
    const { role } = useContext(UserContext)
    const { id } = useParams<{id?:string}>()

    const [showAddPlayer, setShowAddPlayer] = useState<boolean>(false)
    const [showAddDirective, setShowAddDirective] = useState<boolean>(false)

    const onPerson = (id:string) => push(`/user/${id}`)

    // Fetching team data
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            const team = await getTeam(id || '')
            selectTeam(team)
            setIsLoading(false)
        }
        if(!team) {
            getData()
        }
    }, [])


    const [isRegistering, setIsRegistering] = useState<boolean>(false)
    const registerPlayer = async (body:AddPlayerForm) => {
        setIsRegistering(true)
        const { email, ...rest } = body
        const user = await registerPlayerService({...rest, phoneNumber: rest.phoneNumber?.toString(), email, birthdate: format(new Date(rest.birthdate), MYSQL_FORMAT)})
        await addPlayerUserTeam(user)
        setIsRegistering(false)
    }

    const registerDirective = async (body:AddDirectiveForm) => {
        setIsRegistering(true)
        const { email, ...rest } = body
        const user = await registerDirectiveService({...rest, phoneNumber: rest.phoneNumber?.toString(), email, birthdate: format(new Date(rest.birthdate), MYSQL_FORMAT)})
        await addDirectiveUserTeam(user)
        setIsRegistering(false)
    }


    if(!id) {
        push('/teams')
        return null
    }
    

    if(isLoading) {
        return (
            <DashboardLayout>
                <Loading />
            </DashboardLayout>
        )
    }

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
                {/* <h2 className="content__sub-title">Next Training</h2>
                <p className="content__paragraph">
                    {team.nextTraining ? format(team.nextTraining, FORMAT) : 'There is no next training schedule'}
                </p> */}
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
                    renderPlayers(team.players || [], onPerson)
                }
                 <div className="flex flex-row align-start justify-start team__buttons">
                {
                    role === ROLES['COACH'] && (
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
                    renderDirectives(team.directives || [], onPerson)
                }
                {
                    role === ROLES['COACH'] && (
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
                            {
                                isRegistering ? (
                                    <GraphLoading />
                                ) : (
                                    <AddPlayerContainer 
                                        onSubmit={registerPlayer}
                                        teamId={id}
                                    />
                                )
                            }
                        </ModalContent>
                    </Modal>
                )
            }
            {
                showAddDirective && (
                    <Modal>
                        <ModalContent onClose={() => setShowAddDirective(false)}>
                            {
                                isRegistering ? (
                                    <GraphLoading />
                                ) : (
                                    <AddDirectiveContainer 
                                        onSubmit={registerDirective}
                                        teamId={id}
                                    />
                                )
                            }
                        </ModalContent>
                    </Modal>
                )
            }

        </DashboardLayout>
    )
}