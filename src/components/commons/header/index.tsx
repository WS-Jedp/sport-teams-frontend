import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from '../menu'

export const Header:React.FC = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false)

    return (
        <header className="flex flex-row align-center justify-between header">

            <div className="relative flex flex-row align-center justify-between header-container">


                <Link to="/" className="flex flex-row align-center justify-center header__logo">
                    <p>🏀</p>
                    <h1>Sport Teams</h1>
                </Link>

                <div className="relative flex flex-col align-center justify-center header__container-menu">
                    <div className="flex flex-col align-center justify-center header__menu" onClick={() => setShowMenu(!showMenu)}>
                        <div className="header__menu-line" />
                        <div className="header__menu-line" />
                    </div>

                    {
                        showMenu && (
                            <div className="header__menu-menu">
                                <Menu onClose={() => setShowMenu(false)} />
                            </div>
                        )
                    }
                </div>
            </div>
            

        </header>
    )
}