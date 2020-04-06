import React, { Component } from 'react'

import './home.css'


class Home extends Component {
    render() {
        return (
            <div className='homePage'>
                <div className='upper'>
                    <h1>NBA STATS</h1>
                    <p>W4111 project  powered by Haokai Ma and Zixiao Zhu</p>
                </div>

                <div className='homeDivOuter'>
                    <div className='homeDiv' onClick={ () => {
                        this.props.history.push('/teamList');
                    } }>TEAMS</div>
                    <div className='homeDiv' onClick={ () => {
                        this.props.history.push('/player');
                    } }>PLAYERS</div>
                    <div className='homeDiv' onClick={ () => {
                        this.props.history.push('/game');
                    } }>GAMES</div>
                </div>
            </div>
        );
    }
}

export default Home;