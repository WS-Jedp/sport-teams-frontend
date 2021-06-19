import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './routes'
import { UserContextProvicder } from './contexts/user'

import './assets/styles/main.scss'

ReactDOM.render((
    <UserContextProvicder>
        <App />
    </UserContextProvicder>
), window.document.getElementById('app'))
