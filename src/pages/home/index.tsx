import React from 'react'
import './styles.scss'
import { Calendary } from '../../components/calendary'


export const Home:React.FC = () => {

    return (
        <section className="flex flex-col align-center justify-center home">
            <Calendary 
               nextTrainingDay={new Date()}
            />
        </section>
    )
}