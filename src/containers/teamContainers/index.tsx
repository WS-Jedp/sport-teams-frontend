import React from 'react'
import { MdAdd } from 'react-icons/md'

import { TeamVideo as TeamVideoDTO } from '../../dto/teamVideo'
import { Player } from '../../dto/player'
import { Directive } from '../../dto/directive'

import { TeamVideo } from '../../components/teams/video'
import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'
import { PersonCard } from '../../components/person/card'

export const renderTeamVideos = (videos:TeamVideoDTO[]) => {

    if(videos.length === 0) {
        return (
            <>
                <p className="content__paragraph">The team hasn't uploaded videos</p>
            </>
        )
    }

    return (
        <>
            <p className="content__paragraph">Look the last videos uploaded from the team</p>
            <div className="flex flex-row team__videos-video">
                {
                    videos.map(video => (
                        <TeamVideo 
                            key={video.id}
                            date={video.date}
                            title={video.title}
                            videoId={video.videoUrl}
                        />
                    ))
                }
            </div>
        </>

    )

}


export const renderPlayers = (players:Player[], action: (id:string) => void ) => {

    if(players.length === 0) {
        return (
            <>
                <p className="content__paragraph">This team doesn't have players yet</p>
            </>
        )
    }

    return (
        <>
            <p className="content__paragraph">See all the players of the team</p>
            <div className="flex flex-row team__players-list">
                {
                    players.map(player => (
                        <PersonCard 
                            id={player.id}
                            key={player.id}
                            name={player.name}
                            role={player.position}
                            img={player.photoUrl}
                            action={() => action(player.id)}
                        />
                    ))
                }
            </div>
        </>

    )
}


export const renderDirectives = (directives:Directive[], action: (id:string) => void) => {

    if(directives.length === 0) {
        return (
            <>
                <p className="content__paragraph">This team doesn't have directives yet</p>
            </>
        )
    }

    return (
        <>
            <p className="content__paragraph">Meet the people that can help you</p>
            <div className="flex flex-row team__players-list">
                {
                    directives.map(directive => (
                        <PersonCard 
                            key={directive.id}
                            name={directive.name}
                            role={directive.role}
                            id={directive.id}
                            img={directive.photoUrl}
                            action={() => action(directive.id)}
                        />
                    ))
                }
            </div>
        </>

    )

}