import React from 'react'
import { useForm } from 'react-hook-form'
import { ButtonForm } from '../../../components/buttons/form'

import { ROLES } from '../../../dto/roles'

export interface AddPlayerForm {
    name: string,
    lastName: string,
    email: string,
    phoneNumber?: number,
    birthdate: Date,
    role: 'Player'
}

interface AddPlayerContainer {
    onSubmit: (data:AddPlayerForm) => void
}

export const AddPlayerContainer:React.FC<AddPlayerContainer> = ({ onSubmit }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<AddPlayerForm>()

    return (
        <form className="flex flex-col align-start justify-start register-exercise" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="content__title">Add A New Player</h2>
            <p className="content__paragraph">Add a new player to the team!</p>
        
            <input type="text" hidden value={ROLES['PLAYER']} {...register('role', { required: true })} />
            <div className="form-input">
                <label className="form-input__label" htmlFor="name">
                    Name
                </label>
                <input 
                    type="text" 
                    id="name" 
                    placeholder="Write the name of the player" 
                    {...register('name', { required: true, minLength: 3, maxLength: 60 })}
                />
                {
                    errors.name && <small className="form-input__error">{errors.name.message}</small>
                }
            </div>
            <div className="form-input">
                <label className="form-input__label" htmlFor="lastName">
                    Last Name
                </label>
                <input 
                    type="text" 
                    id="lastName" 
                    placeholder="Write the last name of the player" 
                    {...register('lastName', { required: true, minLength: 3, maxLength: 60 })}
                />
                {
                    errors.lastName && <small className="form-input__error">{errors.lastName.message}</small>
                }
            </div>
            <div className="form-input">
                <label className="form-input__label" htmlFor="email">
                    Email
                </label>
                <input 
                    type="text" 
                    id="email" 
                    placeholder="Write the email of the player" 
                    {...register('email', { required: true, minLength: 3, maxLength: 60 })}
                />
                {
                    errors.email && <small className="form-input__error">{errors.email.message}</small>
                }
            </div>
            <div className="form-input">
                <label className="form-input__label" htmlFor="birthdate">
                    Birthdate
                </label>
                <input 
                    type="date" 
                    id="birthdate" 
                    {...register('birthdate', { required: true })}
                />
                {
                    errors.birthdate && <small className="form-input__error">{errors.birthdate.message}</small>
                }
            </div>
            <div className="form-input">
                <label className="form-input__label" htmlFor="phoneNumber">
                    Phone Number
                </label>
                <input 
                    type="number" 
                    id="phoneNumber" 
                    placeholder="Write the phone number of the player (optional)"
                    {...register('phoneNumber', { required: false, minLength: 6, maxLength: 20 })}
                />
                {
                    errors.phoneNumber && <small className="form-input__error">{errors.phoneNumber.message}</small>
                }
            </div>

            <ButtonForm 
                text="Add"
            />

        </form>
    )
}