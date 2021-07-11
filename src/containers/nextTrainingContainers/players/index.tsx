import React from 'react'
import { Player } from '../../../dto/player'
import { PersonCard } from '../../../components/person/card'

export const renderPlayers = (players:Player[], action: (id:string) => void ) => {

    if(players.length === 0) {
        return (
            <p className="content__paragraph">
                There is no players registered for the next training!
            </p>
        )
    }

    return (
        <>
            <p className="content__paragraph">These are the players that will go</p>
            <ul className="flex flex-row align-center justify-start next-training__players-list">
                {
                    players.map(player => (
                        <li key={player.id} className="flex align-center justify-center">
                            <PersonCard 
                                id={player.id}
                                action={() => action(player.id)}
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