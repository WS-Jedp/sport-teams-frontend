import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './routes'
import { Contexts } from './contexts'

import './assets/styles/main.scss'

ReactDOM.render((
    <Contexts>
        <App />
    </Contexts>
), window.document.getElementById('app'))
