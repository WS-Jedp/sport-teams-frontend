import React, { createContext, useState } from 'react'

export type UserInformation = {
    lastName: string,
    biography: string,
    photoUrl?: string,
    phoneNumber: string,
    email: string,
    birthdate: string | Date
}

type InitialState = {
    id: string,
    handleId: (id:string) => void,
    name: string,
    setName: (name:string) => void,
    role: string,
    setRole: (role:string) => void,
    isAuth: boolean,
    setIsAuth: (auth:boolean) => void,
    token: string,
    setToken: (token:string) => void,
    userInformation?: UserInformation,
    handleUserInformation: (userData:UserInformation) => void,
    teamId: string,
    handleTeamId: (id:string) => void
}
const initialState:InitialState = {
    id: '',
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
    handleUserInformation: () => {},
    teamId: '',
    handleTeamId: () => {}
}


export const UserContext = createContext(initialState)


export const UserContextProvider:React.FC = ({ children }) => {

    const [id, setId] = useState<string>('')
    const [teamId, setTeamId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [token, setToken] = useState<string>('')
    const [userInformation, setUserInformation] = useState<UserInformation | undefined>(undefined)

    const handleId = (id:string) =>  setId(id)
    const handleTeamId = (id:string) => setTeamId(id)

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
        handleUserInformation,
        teamId,
        handleTeamId
    }

    return (
        <UserContext.Provider value={initialState}>
            {
                children
            }
        </UserContext.Provider>
    )
}