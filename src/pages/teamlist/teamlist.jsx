import React, { Component } from 'react'

import { BACKEND } from '../../config'
import TeamInfo from './teamInfo'
import './teamlist.css'

class TeamList extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            team : '0',
            players : [],
            teams : []
        };
        this.chooseTeam = this.chooseTeam.bind( this );
        this.getTeams = this.getTeams.bind( this );
        this.getPlayers = this.getPlayers.bind( this );

    }

    componentDidMount() {
        this.getTeams();
        this.getPlayers();
    }

    // get all team as an array from backend
    getTeams = function() {
        let url = BACKEND + 'teamList';
        fetch( url ).then( res => {
            return res.json();
        }).then( data => {
            this.setState( {teams : data} );
            console.log(this.state);
        });
    };

    // get all players of the team chosen from backend
    getPlayers = function() {
        let url = BACKEND + 'team/' + this.state.team;
        fetch( url ).then( res => {
            return res.json();
        }).then( data => {
            this.setState( { players : data } );
        })
    };

    // set the team in the list as the chosen team
    chooseTeam = function( event ) {
        this.setState( { team : event.target.id} );
        this.getPlayers();

    };

    render() {
        return (
            <div className='teamList'>
                <div className='teams'>
                    {
                        this.state.teams.map( ( element ) => {
                            return (<div id={ element.id }
                                         className='teamBox'
                                         onClick={ this.chooseTeam }> { element.name } </div>)
                        } )
                    }
                </div>
                < TeamInfo players={ this.state.players } team={ this.state.team } />

                {/*<div className='teamInfo'>*/}
                {/*    <div className='teamBox'> { this.state.team } </div>*/}
                {/*    <div className='playerBox'>*/}
                {/*        {*/}
                {/*            this.state.players.map( ( element ) => {*/}
                {/*                return ( <div className='player'> { element.name } </div> )*/}

                {/*            })*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
        )
    }
}

export default TeamList;