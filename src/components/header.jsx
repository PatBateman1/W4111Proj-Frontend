import React, { Component } from 'react'

import { BACKEND } from '../config'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'

import './header.css'

class Header extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            id : cookie.load('user_id'),
            username : '',
            login : '',
            logout : ''
        };
        this.logout = this.logout.bind( this );
    }

    componentDidMount() {
        if ( this.state.id ) {
            let url = BACKEND + 'user/' + this.state.id;
            fetch( url ).then( res => {
                return res.json();
            }).then( data => {
                this.setState( { username : data.username, logout : 'notShow', login : 'show' } );
            });
        } else {
            this.setState( { username : '', login : 'notShow', logout : 'show' } );
        }
    }

    logout = function() {
        cookie.remove( 'user_id', { path : '/' } );
        this.setState( { username : '', login : 'notShow', logout : 'show' } );
    };

    render() {
        return (
            <div className='header'>
                <div className='left'>
                    <div className='menuItem'>
                        <Link to='/teamList'> TEAM </Link>
                    </div>

                    <div className='menuItem'>
                        <Link to='/player'> PLAYER </Link>
                    </div>

                    <div className='menuItem'>
                        <Link to='/game'> GAME </Link>
                    </div>
                </div>
                <div className='right'>
                    <div className={ this.state.login + ' menuItem'}> { this.state.username } </div>
                    <div className={ this.state.login + ' menuItem'} onClick={ this.logout }> logout </div>
                    <div className={ this.state.logout + ' menuItem'}> <Link to='/login'> login </Link> </div>

                </div>
            </div>
        )
    }
}

export default Header;