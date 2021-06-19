import React from 'react'
import { Content } from '../../content'
import './styles.scss'

interface PersonCard {
    name: string,
    role: string,
    img?: string
}

export const PersonCard:React.FC<PersonCard> = ({ name, role, img }) => {
 
    return (
        <article className="flex flex-col align-center justify-center person-card" data-testid="person-card-container">
            <figure className="person-card__figure">
                <img title={name} alt={name} src={img} />
            </figure>

            <Content position="center" size="full">
                <h2 className="person-card__name">{name}</h2>
                <strong className="font-light person-card__role">{role}</strong>
            </Content>
        </article>
    )
}