import { Switch, Route } from 'react-router-dom'

import { Home, Login } from '../pages'

export default () => (
    <Switch>
        <Route exact path='/' >
            <Home />
        </Route>
        <Route path='/login' >
            <Login />
        </Route>
    </Switch>
)