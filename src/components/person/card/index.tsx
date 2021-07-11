import React from 'react'
import { Content } from '../../content'

import { getRandomPhotoUrl } from '../../../tools/default'
import './styles.scss'

interface PersonCard {
    id: string,
    name: string,
    role?: string,
    img?: string,
    action: () => void
}

export const PersonCard:React.FC<PersonCard> = ({ name, role, img, id, action }) => {
 
    return (
        <article className="flex flex-col align-center justify-center person-card" data-testid="person-card-container" onClick={action}>
            <figure className="person-card__figure">
                <img title={name} alt={name} src={img ? img : getRandomPhotoUrl()} />
            </figure>

            <Content position="center" size="full">
                <h2 className="person-card__name">{name}</h2>
                <strong className="font-light person-card__role">{role}</strong>
            </Content>
        </article>
    )
}