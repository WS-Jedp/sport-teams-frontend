import React from 'react'
import { createPortal } from 'react-dom'

const el = window.document.getElementById('app-modal') as HTMLElement

export const Modal:React.FC = ({ children }) => createPortal((
    <section className="flex align-center justify-center modal">
            {
                children
            }
    </section>
), el)