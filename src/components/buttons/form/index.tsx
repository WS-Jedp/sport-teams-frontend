import React from 'react'
import './styles.scss'

interface ButtonForm {
    color?: 'purple' | 'main',
    text: string,
}

export const ButtonForm:React.FC<ButtonForm> = ({ color = 'purple', text, }) => {

    return (
        <button type="submit" title={text} className={`flex align-center justify-center bg-${color == 'purple' ? 'purple' : 'main'} button`}>
            {text}
        </button>
    )
}