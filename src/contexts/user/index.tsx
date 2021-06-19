import React, { createContext, useState } from 'react'

type InitialState = {
    name: string,
    setName: (name:string) => void,
    role: string,
    setRole: (role:string) => void
}
const initialState:InitialState = {
    name: '',
    setName: () => {},
    role: '',
    setRole: () => {}
}


export const UserContext = createContext(initialState)


export const UserContextProvicder:React.FC = ({ children }) => {

    const [name, setName] = useState<string>('')
    const [role, setRole] = useState<string>('')

    const handleName = (name:string) =>  {
        setName(name)
    }

    const handleRole = (role:string) => {
        setRole(role)
    }

    const initialState:InitialState = {
        name,
        setName: handleName,
        role,
        setRole: handleRole
    }

    return (
        <UserContext.Provider value={initialState}>
            {
                children
            }
        </UserContext.Provider>
    )
}