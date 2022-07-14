import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './Router'
import { HashRouter } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Router />
  </HashRouter>
)
