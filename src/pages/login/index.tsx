import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { LandingLayout } from '../../layouts/landing'
import { Login as LoginForm , LoginForm as LoginFormData} from '../../components/auth/login'
import { GraphLoading } from '../../components/loading/graph'

import { UserContext } from '../../contexts/user'

import { auth } from '../../services/auth'

import './styles.scss'

export const Login:React.FC = () => {

    const { setIsAuth, handleId, setName, setRole, setToken, handleUserInformation } = useContext(UserContext)
    const { push } = useHistory()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onLogin = async (data:LoginFormData) => {
        setIsLoading(true)
        const user = await auth({
            email: data.username,
            password: data.password
        })
        if(!user) push('/login')
        
        setIsAuth(true)
        handleId(user.id)
        setName(user.userInformation.name)
        setRole(user.userInformation.role)
        setToken(user.token ? user.token : '')
        localStorage.setItem('token', user.token ? user.token : '')
        setIsLoading(false)
        push('/')
    }

    return (
        <LandingLayout>
            <article className="flex flex-col align-start justify-center login login__header">
                <h1 className="login__header-title">Login</h1>
                <p className="content__paragraph">Get updated with the news of your team</p>
            </article>
            <article className="flex flex-col align-center justify-center login login__form">
                {
                    isLoading ? (
                        <GraphLoading />
                    ) : (
                        <LoginForm onSubmit={onLogin} />
                    )
                }
            </article>
        </LandingLayout>
    )
}