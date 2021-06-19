import React from 'react'
import './styles.scss'
import { PersonCard } from '../../components/person/card'
import { PersonHeader } from '../../components/person/header'

import PlayerIMG from '../../assets/images/player.jpg'

export const Home:React.FC = () => {

    return (
        <section className="flex flex-col align-center justify-center home">
            <PersonHeader name="Juan Esteban" lastName="Deossa Pertuz" img={PlayerIMG} />
            <PersonCard 
                img={PlayerIMG}
                name="Juan Esteban"
                role="Player"
            />
        </section>
    )
}