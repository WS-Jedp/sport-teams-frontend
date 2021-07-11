import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { UserContext } from '../../../contexts/user'

import { ButtonForm } from '../../../components/buttons/form'

import { getRandomPhotoUrl } from '../../../tools/default'


export interface EditUserPhotoForm {
    userId: string,
    file: File[]
}

interface EditUserPhotoContainer {
    onSubmit: (data:EditUserPhotoForm) => void
}

export const EditUserPhotoContainer:React.FC<EditUserPhotoContainer> = ({ onSubmit }) => {

    const { id, name, userInformation } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors } } = useForm<EditUserPhotoForm>()

    if(!userInformation) {
        return null
    }

    return (
        <form className="flex flex-col align-start justify-start" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <input type="string" hidden value={id} {...register('userId', {required: true})} />

            <div className="relative flex align-start justify-center w-100 m-auto form-input">
                <label className="form-input__label">Current Photo</label>
                <figure className="person-header__figure">
                    <img title={name} alt={`Picture of ${name}`} src={userInformation.photoUrl || getRandomPhotoUrl()} />
                </figure>
            </div>

            <div className="form-input">
                <label className="form-input__label" id="name">New Picture</label>
                <input 
                    {...register('file', { required: true })}
                    type="file" 
                    placeholder="Select the new picture" 
                    id="file"
                />
            </div>
           
            <ButtonForm 
                text="Update!"
                color="purple"
            />
        </form>
    )
}