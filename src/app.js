import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/login/login'
import TeamList from './pages/teamlist/teamlist'
import Players from "./pages/players/players"
import Games from './pages/games/games';

// virtual root dom
class App extends Component{
    render() {

        return (
            <BrowserRouter>
                {/*<Switch>*/}

                    <Route path='/teamList' component={ TeamList }/>

                    <Route path='/login' component={ Login }/>

                    <Route path='/players/:playerId' component={ Players }/>

                    <Route path='/games/:gameId' component={ Games }/>
                    {/*<Route path='/' component={ TeamList }/>*/}
                {/*</Switch>*/}
            </BrowserRouter>
        );

    };
}

export default App;