import React from 'react'
import { useForm } from 'react-hook-form'
import { ButtonForm } from '../../../components/buttons/form'

interface AddDirectiveForm {
    name: string,
    lastName: string,
    email: string,
    phoneNumber?: number,
    birthdate: Date,
    role: 'directive' | 'coach'
}

interface AddDirectiveContainer {
    onSubmit: (data:AddDirectiveForm) => void
}

export const AddDirectiveContainer:React.FC<AddDirectiveContainer> = ({ onSubmit }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<AddDirectiveForm>()

    return (
        <form className="flex flex-col align-start justify-start register-exercise" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="content__title">Add A New Directive</h2>
            <p className="content__paragraph">Add a new directive to the team!</p>
        
            <div className="form-input">
                <label className="form-input__label" htmlFor="name">
                    Name
                </label>
                <input 
                    type="text" 
                    id="name" 
                    placeholder="Write the name of the directive" 
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
                    placeholder="Write the last name of the directive" 
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
                    placeholder="Write the email of the directive" 
                    {...register('email', { required: true, minLength: 3, maxLength: 60 })}
                />
                {
                    errors.email && <small className="form-input__error">{errors.email.message}</small>
                }
            </div>

            <div className="form-input">
                <label className="form-input__label" htmlFor="role">
                    Role
                </label>
                <p className="content__paragraph">Select the role of the new directive</p>
                <select id="role" {...register('role', { required: true })}>
                    <option value="coach">Coach</option>
                    <option value="directive">Directive</option>
                </select>
                {
                    errors.role && <small className="form-input__error">{errors.role.message}</small>
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
                    placeholder="Write the phone number of the directive (optional)"
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