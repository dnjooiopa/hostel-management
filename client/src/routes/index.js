import { Switch, Route } from 'react-router-dom'

import { Home, Login, Register } from '../pages'

export default () => (
    <Switch>
        <Route exact path='/' >
            <Home />
        </Route>
        <Route path='/login' >
            <Login />
        </Route>
        <Route path='/register'>
            <Register />
        </Route>
    </Switch>
)