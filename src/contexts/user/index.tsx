import React, { createContext, useState } from 'react'

type UserInformation = {
    lastName: string,
    biography: string,
    photoUrl?: string,
    phoneNumber: string,
    email: string,
    birthdate: Date
}

type InitialState = {
    id: number,
    handleId: (id:number) => void,
    name: string,
    setName: (name:string) => void,
    role: string,
    setRole: (role:string) => void,
    isAuth: boolean,
    setIsAuth: (auth:boolean) => void,
    token: string,
    setToken: (token:string) => void,
    userInformation?: UserInformation,
    handleUserInformation: (userData:UserInformation) => void
}
const initialState:InitialState = {
    id: 0,
    handleId: () => {},
    name: '',
    setName: () => {},
    role: '',
    setRole: () => {},
    isAuth: false,
    setIsAuth: () => {},
    token: '',
    setToken: () => {},
    userInformation: undefined,
    handleUserInformation: () => {}
}


export const UserContext = createContext(initialState)


export const UserContextProvider:React.FC = ({ children }) => {

    const [id, setId] = useState<number>(1)
    const [name, setName] = useState<string>('Mariana')
    const [role, setRole] = useState<string>('coach')
    const [isAuth, setIsAuth] = useState<boolean>(true)
    const [token, setToken] = useState<string>('')
    const [userInformation, setUserInformation] = useState<UserInformation | undefined>({ biography: 'Bio of the user', birthdate: new Date(), email: 'juanes@gmail.com', lastName: 'Deossa Pertuz', phoneNumber: '+57 310 645 2609' })

    const handleId = (id:number) =>  setId(id)

    const handleName = (name:string) =>  setName(name)

    const handleRole = (role:string) => setRole(role)
    
    const handleAuth = (auth:boolean) => setIsAuth(auth)

    const handleToken = (token:string) => setToken(token)

    const handleUserInformation = (userInformation: UserInformation) => setUserInformation(userInformation)

    const initialState:InitialState = {
        id,
        handleId,
        name,
        setName: handleName,
        role,
        setRole: handleRole,
        isAuth,
        setIsAuth: handleAuth,
        token,
        setToken: handleToken,
        userInformation,
        handleUserInformation
    }

    return (
        <UserContext.Provider value={initialState}>
            {
                children
            }
        </UserContext.Provider>
    )
}