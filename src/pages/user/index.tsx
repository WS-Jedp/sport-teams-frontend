import React, { useContext, useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useHistory } from 'react-router'
import { format, addDays } from 'date-fns'

import { UserContext } from '../../contexts/user'

import { DEFAULT_PHOTO_URL } from '../../tools/default'

import { PersonHeader } from '../../components/person/header'
import { Button } from '../../components/buttons/simple'
import { ButtonCircle } from '../../components/buttons/circle'

import { EditUserContainer, EditUserForm } from '../../containers/user/editUser'
import { EditUserPhotoContainer, EditUserPhotoForm } from '../../containers/user/editPhoto'

import { GraphLoading } from '../../components/loading/graph'
import { Modal } from '../../components/modals/basic'
import { ModalContent } from '../../components/modals/content'

import { editUser, editPhoto } from '../../services/user/post'
import { getUser } from '../../services/user/get'
import { logout } from '../../services/auth'

import { FORMAT, HTML_DATE_FORMAT } from '../../tools/dateFormats'
import { DashboardLayout } from '../../layouts/dashboard'

export const User:React.FC = () => {

    const { push } = useHistory()

    const { id, name, role, userInformation, handleUserInformation, setIsAuth, handlePhoto } = useContext(UserContext)

    const [showEditUser, setShowEditUser] = useState<boolean>(false)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)

    const handleEditUser = async (data:EditUserForm) => {
        setIsUpdating(true)
        const userData = await editUser(data)
        handleUserInformation({...userData, birthdate: format(addDays(new Date(userData.birthdate), 1), HTML_DATE_FORMAT)})
        setIsUpdating(false)
    }

    const [showEditPhoto, setShowEditPhoto] = useState<boolean>(false)
    const [isChangingPhoto, setIsChangingPhoto] = useState<boolean>(false)
    const handleProfilePicture = async (data:EditUserPhotoForm) => {
        setIsChangingPhoto(true)
        const newPhoto:string = await editPhoto(data) 
        if(newPhoto) {
            handlePhoto(newPhoto)
        }
        setIsChangingPhoto(false)
    }

    // Handle logout
    const handleLogout = async () => {
        await setIsAuth(false)
        const data = await logout()
        push('/login')
    }

    // Fetching user data
    useEffect(() => {
        const fetchingData = async () => {
            const userData = await getUser(id)
            if(!userData.id) {
                setIsAuth(false)
                await logout()
            }
            handleUserInformation({...userData})
        }
        if(!userInformation) {
            fetchingData()
        }
    }, [])

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
                    img={userInformation.photoUrl || DEFAULT_PHOTO_URL}
                    action={() => setShowEditPhoto(true)}
                />
            </article>

            <article className="user user__biography">
                <h2 className="content__title">Biography</h2>
                <p className="content__paragraph">{userInformation.biography ? userInformation.biography : 'There is no biography'}</p>
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
                <p className="content__paragraph">{format(new Date(userInformation.birthdate), FORMAT)}</p>
            </article>

            <div className="flex flex-row user user__buttons m-t-xl">
                <Button 
                    text="Edit"
                    action={() => setShowEditUser(true)}
                />
                <ButtonCircle 
                    Icon={AiOutlineLogout}
                    color="main"
                    action={handleLogout}
                />
            </div>

            {
                showEditUser && (
                    <Modal>
                        <ModalContent onClose={() => setShowEditUser(false)}>
                            {
                                isUpdating ? (
                                    <GraphLoading />
                                ) : (
                                    <EditUserContainer 
                                        onSubmit={handleEditUser}
                                    />
                                )
                            }
                        </ModalContent>
                    </Modal>
                )
            }
            {
                showEditPhoto && (
                    <Modal>
                        <ModalContent onClose={() => setShowEditPhoto(false)}>
                            {
                                isChangingPhoto ? (
                                    <GraphLoading />
                                ) : (
                                    <EditUserPhotoContainer 
                                        onSubmit={handleProfilePicture}
                                    />
                                )
                            }
                        </ModalContent>
                    </Modal>
                )
            }
        </DashboardLayout>
    )
}