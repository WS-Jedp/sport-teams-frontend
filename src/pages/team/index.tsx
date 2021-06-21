import React, { useContext } from 'react'
import { format } from 'date-fns'
import { FORMAT } from '../../tools/dateFormats'
import { DashboardLayout } from '../../layouts/dashboard'
import TeamLogo from '../../assets/images/pure-vibes-logo.jpg'

import { TeamContext } from '../../contexts/team'

import { TeamHeader } from '../../components/teams/header'
import { renderTeamVideos, renderPlayers, renderDirectives } from '../../containers/teamContainers'

import './styles.scss'

export const Team:React.FC = () => {

    const { team } = useContext(TeamContext)

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

            <article className="flex flex-col align-start justify-start team team__videos">
                <h2 className="content__title">Videos</h2>
                {
                    renderTeamVideos(team.lastVideos)
                }
            </article>

            <article className="flex flex-col align-start justify-start team team__players">
                <h2 className="content__title">Players</h2>
                {
                    renderPlayers(team.players)
                }
            </article>

            <article className="flex flex-col align-start justify-start team team__players">
                <h2 className="content__title">Directives</h2>
                {
                    renderDirectives(team.directives)
                }
            </article>

        </DashboardLayout>
    )
}