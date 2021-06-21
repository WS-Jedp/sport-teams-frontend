import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.scss'

export const Nav = () => {

    return (
        <nav className="flex flex-row align-center justify-around nav">
            <NavLink to="/teams" className="flex flex-col align-center justify-center nav__link" activeClassName="nav__link--selected">
                <p>🏀</p>
                <h2>Teams</h2>
            </NavLink>

            <NavLink to="/exercises" className="flex flex-col align-center justify-center nav__link" activeClassName="nav__link--selected">
                <p>🔥</p>
                <h2>Exercises</h2>
            </NavLink>

            <NavLink to="/trainings" className="flex flex-col align-center justify-center nav__link" activeClassName="nav__link--selected">
                <p>🏋🏾‍♀️</p>
                <h2>Trainings</h2>
            </NavLink>

            <NavLink to="/home" className="flex flex-col align-center justify-center nav__link" activeClassName="nav__link--selected">
                <p>🏠</p>
                <h2>Home</h2>
            </NavLink>

            <NavLink to="/user" className="flex flex-col align-center justify-center nav__link" activeClassName="nav__link--selected">
                <p>🏆</p>
                <h2>User</h2>
            </NavLink>
        </nav>
    )
}