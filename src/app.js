import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login/login'
import TeamList from './pages/teamlist/teamlist'
import Players from './pages/players/players'
import Games from './pages/games/games'
import Register from './pages/login/register'
import Player from './pages/players/player'
import Home from './pages/home/home'
import Game from './pages/games/game'

class App extends Component{
    render() {

        return (
            <BrowserRouter>
                <Switch>

                    <Route path='/teamList' component={ TeamList }/>

                    <Route path='/login' component={ Login }/>

                    <Route path='/register' component={ Register }/>

                    <Route path='/players/:playerId' component={ Players }/>

                    <Route path='/player' component={ Player }/>

                    <Route path='/games/:gameId' component={ Games }/>

                    <Route path='/game' component={ Game }/>

                    <Route path='/' component={ Home }/>

                </Switch>
            </BrowserRouter>
        );

    };
}

export default App;