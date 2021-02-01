import { Switch, Route } from 'react-router-dom'

import { Home, Login, Register, Hotel, Search, Booking, Profile } from '../pages'

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
        <Route path='/hotels/:hotel_id'>
            <Hotel />
        </Route>
        <Route path='/search' >
            <Search />
        </Route>
        <Route path='/bookings'>
            <Booking />
        </Route>
        <Route path='/profile'>
            <Profile />
        </Route>
    </Switch>
)