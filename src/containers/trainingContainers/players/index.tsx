import React from 'react'
import { Player } from '../../../dto/player'
import { Button } from '../../../components/buttons/simple'
import { PersonCard } from '../../../components/person/card'

export const renderPlayers = (players:Player[]) => {

    if(players.length === 0) {
        return (
            <>
                <p className="content__paragraph">
                    This training did not have registered players
                </p>
            </>
        )
    }

    return (
        <>
            <p className="content__paragraph">See the players that went to this training</p>
            <ul className="flex flex-row align-center justify-start next-training__players-list">
                {
                    players.map(player => (
                        <li key={player.id} className="flex align-center justify-center">
                            <PersonCard 
                                id={player.id}
                                action={() => {}}
                                name={player.name}
                                role={player.position}
                                img={player.photoUrl}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    )

}