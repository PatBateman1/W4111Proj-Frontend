import React, { Component } from 'react'

import './login.css'

class Login extends Component {

    constructor( props ) {
        super( props );
        this.state = {
          'Email' : '',
          'Password' : ''
        };
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleInputChange = this.handleInputChange.bind( this );
    }

    handleInputChange = function( event ){
        if ( event.target.className === 'Email' ){
            this.setState({'Email' : event.target.value} )
        } else {
            this.setState({'Password' : event.target.value} )
        }
    };

    handleSubmit = function() {
        alert(this.state.Email + this.state.Password)
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
                               placeholder='Email'
                               value={ this.state.Email }
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
                            <a href='/'>Create one</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login