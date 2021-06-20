import React from 'react'
import { Header } from '../../components/commons/header'
import './styles.scss'

export const LandingLayout:React.FC = ({ children }) => {

    return (
        <section className="landing-layout">
            <div className="landing-layout__header">
                <Header />
            </div>
            <div className="landing-layout__content">
                {
                    children
                }
            </div>
        </section>
    )
}