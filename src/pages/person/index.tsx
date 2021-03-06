import React, { useContext, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { UserContext } from '../../contexts/user'
import { format } from 'date-fns'
import { FORMAT } from '../../tools/dateFormats'
import { DashboardLayout } from '../../layouts/dashboard'

import { Person as PersonDTO } from '../../dto/person'
import { PersonHeader } from '../../components/person/header'
import { Loading } from '../../components/loading/basic'
import { Button } from '../../components/buttons/simple'

import { getRandomPhotoUrl } from '../../tools/default'

import { getUser } from '../../services/user/get'

export const Person:React.FC = () => {

    const { id } = useContext(UserContext)
    const { push } = useHistory()
    const { id: idPage } = useParams<{id?: string}>()
    const [person, setPerson] = useState<PersonDTO | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if(id === idPage) {
            return push('/user')
        }

        const getData = async () => {
            const user = await getUser(idPage || '')
            setPerson(user)
            setIsLoading(false)
        }
        getData()


    },[id])

    if(isLoading) {
        return (
            <Loading />
        )
    }

    if(!person) {
        return (
            <DashboardLayout>
                <article className="user user__header">
                    <p className="content__paragraph">Request for the data of the user</p>
                </article>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <article className="user user__header">
                <PersonHeader 
                    name={person.name}
                    lastName={person.lastName}
                    img={person.photoUrl || getRandomPhotoUrl()}
                />
            </article>

            <article className="user user__biography">
                <h2 className="content__title">Biography</h2>
                <p className="content__paragraph">{person.biography}</p>
            </article>

            <article className="user user__about">
                <h2 className="content__title">About</h2>
                <h3 className="content__sub-title">Role</h3>
                <p className="content__paragraph">{person.role}</p>
            </article>

            <article className="user user__information">
                <h2 className="content__title">Information</h2>
                <h3 className="content__sub-title">Phone Number</h3>
                <p className="content__paragraph">{person.phoneNumber}</p>
                <h3 className="content__sub-title">Email</h3>
                <p className="content__paragraph">{person.email}</p>
                <h3 className="content__sub-title">Birthdate</h3>
                <p className="content__paragraph">{format(new Date(person.birthdate), FORMAT)}</p>
            </article>

            <div className="user m-t-xl">
                <Button 
                    text="Results"
                    action={() => push(`/user/${idPage}/exercises`)}
                />
            </div>
        </DashboardLayout>
    )
}