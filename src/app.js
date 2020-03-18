import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/login/login'
import TeamList from './pages/teamlist/teamlist'

// virtual root dom
class App extends Component{
    render() {

        return (
            <BrowserRouter>
                {/*<Switch>*/}

                    <Route path='/teamList' component={ TeamList }/>

                    <Route path='/login' component={ Login }/>
                    {/*<Route path='/' component={ TeamList }/>*/}
                {/*</Switch>*/}
            </BrowserRouter>
        );

    };
}

export default App;