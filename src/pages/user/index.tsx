import React, { useContext } from 'react'
import { format } from 'date-fns'
import { FORMAT } from '../../tools/dateFormats'
import { DashboardLayout } from '../../layouts/dashboard'
import { UserContext } from '../../contexts/user'

import Img from '../../assets/images/player-2.jpg'

import { PersonHeader } from '../../components/person/header'
import { Button } from '../../components/buttons/simple'

import './styles.scss'

export const User:React.FC = () => {

    const { id, name, role, userInformation } = useContext(UserContext)

    if(!userInformation) {
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
                    name={name}
                    lastName={userInformation.lastName}
                    img={userInformation.photoUrl || Img}
                />
            </article>

            <article className="user user__biography">
                <h2 className="content__title">Biography</h2>
                <p className="content__paragraph">{userInformation.biography}</p>
            </article>

            <article className="user user__about">
                <h2 className="content__title">About</h2>
                <h3 className="content__sub-title">Role</h3>
                <p className="content__paragraph">{role}</p>
            </article>

            <article className="user user__information">
                <h2 className="content__title">Information</h2>
                <h3 className="content__sub-title">Phone Number</h3>
                <p className="content__paragraph">{userInformation.phoneNumber}</p>
                <h3 className="content__sub-title">Email</h3>
                <p className="content__paragraph">{userInformation.email}</p>
                <h3 className="content__sub-title">Birthdate</h3>
                <p className="content__paragraph">{format(userInformation.birthdate, FORMAT)}</p>
            </article>

            <div className="user m-t-xl">
                <Button 
                    text="Edit"
                    action={() => {}}
                />
            </div>
        </DashboardLayout>
    )
}