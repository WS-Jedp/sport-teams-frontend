import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonForm } from '../../buttons/form'

import { useForm } from 'react-hook-form'

export interface LoginForm {
    username: string,
    password: string
}
interface Login {
    onSubmit: (data:LoginForm) => void
}

export const Login:React.FC<Login> = ({ onSubmit }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

    return (
        <form className="flex flex-col align-center justify-center login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col align-center justify-center form-input">
                <label className="form-input__label" htmlFor="username">Username</label>
                <input 
                    className="text-center" 
                    type="text" 
                    placeholder="Write your username" 
                    id="username"
                    {...register('username', { required: true, minLength: 3, maxLength: 30 })}
                />
                {
                    errors.username?.message &&  (
                        <small className="form-input__error">
                            {errors.username?.message}    
                        </small>
                    )
                }
            </div>
            <div className="flex flex-col align-center justify-center form-input">
                <label className="form-input__label" htmlFor="password">Password</label>
                <input 
                    className="text-center" 
                    type="password"
                    id="password"
                    placeholder="Write your password" 
                    {...register('password', { required: true })}
                />
                {
                    errors.password &&  (
                        <small className="form-input__error">
                            {errors.password?.message}    
                        </small>
                    )
                }
            </div>
            <ButtonForm 
                text="Login"
            />
            <Link className="text-center login-form__small" to="/register">Don't have an account register here!</Link>
        </form>
    )
}