import React, { Component } from 'react'

import TeamList from '../teamlist/teamlist'
import './login.css'
import { BACKEND } from '../../config'
import { Redirect } from 'react-router-dom'

class Register extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            Username : '',
            Password : '',
            Password2 : ''
        };
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleInputChange = this.handleInputChange.bind( this );
    }

    handleInputChange = function( event ){
        if ( event.target.className === 'Email' ){
            this.setState({ Username : event.target.value} )
        } else if ( event.target.className === 'Password' ) {
            this.setState({ Password : event.target.value} )
        } else {
            this.setState({ Password2 : event.target.value} )
        }
    };

    handleSubmit = function( event ) {

        event.preventDefault();

        if ( this.state.Password !== this.state.Password2 ) {
            alert( 'two passwords are not same' );
            return;
        }
        let data = {username : this.state.Username, password: this.state.Password};
        let url = BACKEND + 'register';
        let req = {
            method : 'POST',
            body : JSON.stringify( data ),
            headers : { 'Content-Type': 'application/json' }
        };

        fetch( url, req ).then( res => {
            return res.json()
        }).then( data => {
            if ( data.err ) {
                alert( 'username has been used' );
            } else {
                this.props.history.push('/teamList');
            }
        });
    };

    render() {
        return (
            <div className='outer'>
                <div className='inner'>
                    <h1>Register</h1>
                    <form onSubmit={ this.handleSubmit }>
                        <p>Username</p>
                        <input type='text'
                               className='Email'
                               placeholder='Username'
                               value={ this.state.Email }
                               onChange={ this.handleInputChange }
                        />
                        <p>Password</p>
                        <input type='password'
                               className='Password'
                               placeholder='Password'
                               value={ this.state.Password }
                               onChange={ this.handleInputChange }/>

                        <p>Repeat Password</p>
                        <input type='password'
                               className='Password2'
                               placeholder='Password'
                               value={ this.state.Password2 }
                               onChange={ this.handleInputChange }/>
                        <p> </p>
                        <button>Submit</button>
                        <p className='text'>Don't have an account?
                            <a href='/'>Create one</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;