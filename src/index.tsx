import React from 'react'
import ReactDOM from 'react-dom'
import Turnip from './Turnip'
import * as serviceWorker from './serviceWorker'
import { CSSVariables, GlobalStyles } from '@chadlavi/clear'

ReactDOM.render(
  <React.StrictMode>
    <CSSVariables/>
    <GlobalStyles/>
    <Turnip />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
