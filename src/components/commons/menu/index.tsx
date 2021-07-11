import React from 'react'
import { Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'

interface Menu {
    onClose: () => void
}

export const Menu:React.FC<Menu> = ({ onClose }) => {

    return (
        <menu className="flex flex-col align-center justify-around menu">
            <div className="flex flex-row align-center justify-between menu__header">
                <h2>Menu</h2>
                <MdClose size="30" onClick={onClose} />
            </div>

            <ul className="flex flex-col align-center justify-center menu__links">
                <li className="menu__item">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/login">
                        Login
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/register">
                        Register
                    </Link>
                </li>
            </ul>

            <small className="menu__copyright">
                All rights reserved - Sport Teams  2021
            </small>
        </menu>
    )
}