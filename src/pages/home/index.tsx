import React from 'react'
import { Header } from '../../components/commons/header'
import { Menu } from '../../components/commons/menu'
import './styles.scss'


export const Home:React.FC = () => {

    return (
        <section className="flex flex-row align-center justify-center home">
            <Header />
        </section>
    )
}