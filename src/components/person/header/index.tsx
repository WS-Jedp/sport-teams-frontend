import React from 'react'
import { Content } from '../../content'
import './styles.scss'

interface PersonHeader {
    name: string,
    lastName:string,
    img?: string,
    action?: () => void
}

export const PersonHeader:React.FC<PersonHeader> = ({ name, lastName, img, action = () => {} }) => {

    return (
        <section className="flex flex-row align-center justify-start person-header" data-testid="person-header-container">
            <figure className="person-header__figure" onClick={action}>
                <img title={name} alt={`Picture of ${name}`} src={img} />
            </figure>

            <Content position="start" size="full">
                <h2 className="person-header__name">{name}</h2>
                <h2 className="person-header__last-name">{lastName}</h2>
            </Content>
        </section>
    )
}