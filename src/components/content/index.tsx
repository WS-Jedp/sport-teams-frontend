import React from 'react'

interface ContentProps {
    position?: 'start' | 'center' | 'end',
    size?: 'mid' | 'full',
    color?: 'white' | 'black'
}

export const Content:React.FC<ContentProps> = ({ position = 'start', size = 'full', color = 'black', children  }) => {

    return (
        <section 
            className={`
                content 
                color-${color == 'black' ? 'primary' : 'secondary'} 
                content-position--${position} 
                content-size--${size}`}
        >
            {
                children
            }
        </section>
    )
}