import React from 'react'
import { IconType } from 'react-icons/lib'

interface ButtonCircle {
    Icon: IconType,
    action: () => void,
    color?: 'purple' | 'main'
}

export const ButtonCircle:React.FC<ButtonCircle> = ({ action, color = 'purple',  Icon }) => {

    return (
        <button onClick={action} type="button" className={`flex align-center justify-center bg-${color == 'purple' ? 'purple' : 'main'} button-circle`}>
            <Icon />
        </button>
    )
}