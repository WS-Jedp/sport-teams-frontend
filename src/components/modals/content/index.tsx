import React from 'react'
import { MdClose } from 'react-icons/md'
import './styles'

interface ModalContent {
    onClose: () => void
}

export const ModalContent:React.FC<ModalContent> = ({ children, onClose }) => {

    return (
        <article className="modal-content">
            <div className="flex flex-col align-center justify-center modal-content__close" onClick={onClose}>
                <MdClose size="21" />
            </div>
            {
                children
            }
        </article>
    )

}