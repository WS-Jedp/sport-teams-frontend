import { Person } from '../../dto/person'
import { Player } from '../../dto/player'

export const DirectivesMock:Person[] = [
    {
        id: 1,
        biography: 'Just a little bio for the directives',
        birthdate: new Date(2001, 5, 2),
        email: 'jedp082@gmail.com',
        lastName: 'Deossa Pertuz',
        name: 'Juan Esteban',
        phoneNumber: '+57 310 645 2609',
        role: 'directive'
    },
    {
        id: 2,
        biography: 'Just a little bio for the second directive',
        birthdate: new Date(2001, 10, 2),
        email: 'mariana@gmail.com',
        lastName: 'Rodas',
        name: 'Mariana',
        phoneNumber: '+57 323 665 2609',
        role: 'directive'
    }
]

export const PlayersMock:Player[] = [
    {
        id: 1,
        name: 'Jacobo',
        position: 'Pivot'
    },
    {
        id: 2,
        name: 'Brayan',
        position: 'Pivot'
    },
]

export const UserPlayerMock:Person = {
    id: 1,
    name: 'Juno',
    biography: 'Hi I\'m the programmer of this app',
    birthdate: new Date(2001, 5, 2),
    email: 'juanes@gmail.com',
    lastName: 'Deus',
    phoneNumber: '00',
    role: 'player'
}

export const UserDirectiveMock:Person = {
    id: 1,
    name: 'Mariana',
    biography: 'Hi I\'m the physcologist of this app',
    birthdate: new Date(2001, 5, 2),
    email: 'mariana@gmail.com',
    lastName: 'Rodas',
    phoneNumber: '00',
    role: 'directive'
}

export const UserCoachMock:Person = {
    id: 1,
    name: 'Jacobo',
    biography: 'Hi I\'m the coach of this app',
    birthdate: new Date(2001, 5, 2),
    email: 'jacobo@gmail.com',
    lastName: 'Montoya',
    phoneNumber: '00',
    role: 'coach'
}