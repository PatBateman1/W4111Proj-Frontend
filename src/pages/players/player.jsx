import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/header'

import { BACKEND } from '../../config'
import './player.css'

class Player extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            name : '',
            results : [],
            show : [],
            hide : ''
        };
        this.handleInputChange = this.handleInputChange.bind( this );
        this.handleClick = this.handleClick.bind( this );
        this.search = this.search.bind( this );
        this.abort = this.abort.bind( this );
        this.focus = this.focus.bind( this );
    }

    handleInputChange = function( event ) {
        this.setState( { name : event.target.value }, this.search );

    };


    search = function() {
        if ( this.state.name === '' ) {
            this.setState( { results : [] } );
            return;
        }
        let pattern = this.state.name.replace( ' ', '%' );
        let url = BACKEND + 'player/name/' + pattern;
        fetch( url ).then( res => {
            return res.json();
        }).then( data  => {
            this.setState( { results : data} );

        });

    };

    handleClick = function() {
        this.setState( { show : JSON.parse( JSON.stringify( this.state.results ) ) } );
    };

    abort = function() {
        setTimeout( () => {
            this.setState( { hide : 'notShow' } );
        }, 100);

    };

    focus = function() {
        this.setState( { hide : 'showSelect' } );
    };

    render() {
        return (
            <div>
                <Header/>
                <div className='playerOuter'>
                    <div className='searchOuter'>
                        <div>
                            <input onInput={ this.handleInputChange } onBlur={ this.abort } onFocus={ this.focus } className='searchPlayer'/>
                            <button onClick={ this.handleClick } className='searchBtn'>Search for player</button>
                        </div>
                        <div className={ 'select ' + this.state.hide }>
                            { this.state.results.map( ( element, index ) => {
                                return (
                                    <div> <Link to={ '/players/' + element.id }>{ element.name }</Link> </div>

                                )
                            } ) }
                        </div>

                        <div className='searchResults'>
                            { this.state.show.map( ( element, index ) => {
                                return (
                                    <div className='searchDetail'>
                                        <img src={ element.image } className='searchImg'/>
                                        <Link to={ '/players/' + element.id }>{ element.name }</Link>
                                    </div>

                                )
                            } ) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player;