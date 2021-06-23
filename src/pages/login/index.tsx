import React, { useContext } from 'react'
import { LandingLayout } from '../../layouts/landing'
import { Login as LoginForm , LoginForm as LoginFormData} from '../../components/auth/login'

import { UserContext } from '../../contexts/user'

import './styles.scss'

export const Login:React.FC = () => {

    const { setIsAuth, handleId, setName, setRole, setToken, handleUserInformation } = useContext(UserContext)

    const onLogin = (data:LoginFormData) => {
        
    }

    return (
        <LandingLayout>
            <article className="flex flex-col align-start justify-center login login__header">
                <h1 className="login__header-title">Login</h1>
                <p className="content__paragraph">Get updated with the news of your team</p>
            </article>
            <article className="flex flex-col align-center justify-center login login__form">
                <LoginForm onSubmit={(data) => console.log(data)} />
            </article>
        </LandingLayout>
    )
}