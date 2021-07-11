import React from 'react'

interface Button {
    color?: 'purple' | 'main',
    text: string,
    action: () => void
}

export const Button:React.FC<Button> = ({ action, color = 'purple', text, }) => {

    return (
        <button type="button" onClick={action} title={text} className={`flex align-center justify-center bg-${color == 'purple' ? 'purple' : 'main'} button`}>
            {text}
        </button>
    )
}