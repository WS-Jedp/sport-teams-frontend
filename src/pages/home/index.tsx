import React from 'react'
import './styles.scss'
import { MdEdit } from 'react-icons/md'
import { Calendary } from '../../components/calendary'
import { addDays } from 'date-fns'


export const Home:React.FC = () => {

    return (
        <section className="flex flex-row align-center justify-center home">
            <Calendary 
            />
        </section>
    )
}