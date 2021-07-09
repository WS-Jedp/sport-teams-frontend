import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'

import { UserContext } from '../../../contexts/user'

import { ButtonForm } from '../../../components/buttons/form'

import { HTML_DATE_FORMAT } from '../../../tools/dateFormats'

export interface EditUserForm {
    id: string,
    username: string,
    email: string,
    birthdate: Date,
    phone: number,
    biography: string,
    name: string,
    lastName: string
}

interface EditUserContainer {
    onSubmit: (data:EditUserForm) => void
}

export const EditUserContainer:React.FC<EditUserContainer> = ({ onSubmit }) => {

    const { id, name, role, userInformation } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors } } = useForm<EditUserForm>()

    if(!userInformation) {
        return null
    }

    return (
        <form className="flex flex-col align-start justify-start" onSubmit={handleSubmit(onSubmit)}>
            <input type="string" hidden value={id} {...register('id', {required: true})} />

            <div className="form-input">
                <label className="form-input__label" id="name">Name</label>
                <input 
                    {...register('name', { required: true, minLength: 5, maxLength: 60 })}
                    type="text" 
                    defaultValue={name} 
                    placeholder="Write your first name" 
                    id="name"
                />
            </div>
            <div className="form-input">
                <label className="form-input__label" id="lastName">Last Name</label>
                <input 
                    {...register('lastName', { required: true, minLength: 5, maxLength: 60 })}
                    type="text" 
                    defaultValue={userInformation.lastName} 
                    placeholder="Write your last name" 
                    id="lastName"
                />
            </div>
            <div className="form-input">
                <label className="form-input__label" id="bio">Biography</label>
                <textarea 
                    {...register('biography', { required: true, minLength: 5, maxLength: 90 })}
                    defaultValue={userInformation.biography} 
                    rows={9}
                    placeholder="Write a short biography" 
                    id="bio"
                />
            </div>
            <div className="form-input">
                <label className="form-input__label" id="email">Email</label>
                <input 
                    {...register('email', { required: true, minLength: 5, maxLength: 60 })}
                    type="email" 
                    defaultValue={userInformation.email} 
                    placeholder="Write your email" 
                    id="email"
                />
            </div>
            <div className="form-input">
                <label className="form-input__label" id="phone">Phone Number</label>
                <input 
                    {...register('phone', { required: true, minLength: 6, maxLength: 21 })}
                    type="number" 
                    defaultValue={userInformation.phoneNumber} 
                    placeholder="Write your phone number" 
                    id="phone"
                />
            </div>
            <div className="form-input">
                <label className="form-input__label" id="birthdate">Birthdate</label>
                <input 
                    {...register('birthdate', { required: true })}
                    type="date" 
                    defaultValue={format(new Date(userInformation.birthdate), HTML_DATE_FORMAT)} 
                    placeholder="Select your birthdate" 
                    id="birthdate"
                />
            </div>
            <ButtonForm 
                text="Update!"
                color="purple"
            />
        </form>
    )
}