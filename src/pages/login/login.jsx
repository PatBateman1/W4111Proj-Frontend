import React, { Component } from 'react'

import { BACKEND } from '../../config'
import cookie from 'react-cookies'

import './login.css'

class Login extends Component {

    constructor( props ) {
        super( props );
        this.state = {
          Username : '',
          Password : ''
        };
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleInputChange = this.handleInputChange.bind( this );
    }

    /**
     * make the input blank responsive
     * @param event
     */
    handleInputChange = function( event ){
        if ( event.target.className === 'Email' ){
            this.setState({ Username : event.target.value } )
        } else {
            this.setState({ Password : event.target.value } )
        }
    };

    /**
     * handle the submit event of the form
     * pass the username and password to backend
     * @param event
     */
    handleSubmit = function( event ) {

        event.preventDefault();

        let data = {username : this.state.Username, password: this.state.Password};
        let url = BACKEND + 'login';
        let req = {
            method : 'POST',
            body : JSON.stringify( data ),
            headers : { 'Content-Type' : 'application/json' }
        };

        fetch( url, req ).then( res => {
            return res.json()
        }).then( data => {
            if ( data.err ) {
                alert( data.err );
            } else {
                cookie.save( "user_id", data.user_id, { path : '/' } );
                this.props.history.push('/teamList');
            }
        });
    };

    render() {
        return (
            <div className='outer'>
                <div className='inner'>
                    <h1>Login</h1>
                    <form onSubmit={ this.handleSubmit }>
                        <p>Email Address</p>
                        <input type='text'
                               className='Email'
                               placeholder='Username'
                               value={ this.state.Username }
                               onChange={ this.handleInputChange }
                        />
                        <p>Password</p>
                        <input type='password'
                               className='Password'
                               placeholder='Password'
                               value={ this.state.Password }
                               onChange={ this.handleInputChange }/>
                        <p> </p>
                        <button>Submit</button>
                        <p className='text'>Don't have an account?
                            <a href='/register'>Create one</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login