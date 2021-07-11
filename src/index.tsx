import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './routes'
import { Contexts } from './contexts'
import firebase from 'firebase'

import './assets/styles/main.scss'

firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
});


ReactDOM.render((
    <Contexts>
        <App />
    </Contexts>
), window.document.getElementById('app'))

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
}
