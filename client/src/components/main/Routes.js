import React from 'react'
import { Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import history from '../../stores/history'

import App from './App'
import Hello from './Hello'
import UsersList from '../users/list'

const Routes = () => (
    <Router history={history}>
        <div>
            <App>
                <Route exact path="/" component={Hello} />
                <Route exact path="/users" component={UsersList} />
            </App>
        </div>
    </Router>
)

export default Routes