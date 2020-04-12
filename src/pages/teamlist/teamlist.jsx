import React, { Component } from 'react'
import Header from '../../components/header'
import { BACKEND, TEAM_IMAGE } from '../../config'
import TeamInfo from './teamInfo'
import './teamlist.css'


/**
 *  Team List page
 */

class TeamList extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            team : { id : 0,  name : 'Atlanta Hawks', region : 'Southeast', short : 'ATL'},
            players : [],
            teams : [],
            coach : {}
        };
        this.chooseTeam = this.chooseTeam.bind( this );
        this.getTeams = this.getTeams.bind( this );
        this.getPlayers = this.getPlayers.bind( this );
        this.getCoach = this.getCoach.bind( this );

    }

    componentDidMount() {
        this.getTeams();
        this.getPlayers();
        this.getCoach();
    }


    // get all team as an array from backend
    getTeams = function() {
        let url = BACKEND + 'teamList';
        fetch( url ).then( res => {
            return res.json();
        }).then( data => {
            this.setState( { teams : data } );
        });
    };

    // get all players of the team chosen from backend
    getPlayers = function() {
        let url = BACKEND + 'team/' + this.state.team.id;
        fetch( url ).then( res => {
            return res.json();
        }).then( data => {
            this.setState( { players : data } );
        })
    };

    // set the team in the list as the chosen team
    chooseTeam = function( event ) {
        let id = event.target.localName === 'div' ? event.target.id : event.target.parentNode.id;
        this.setState( { team : this.state.teams[id]} , () => {
            this.getPlayers();
            this.getCoach();
        } );

    };

    getCoach = function() {
        let url = BACKEND + 'coach/' + this.state.team.id;
        fetch( url ).then( res => {
            return res.json();
        }).then( data => {
            console.log(data)
            this.setState( { coach : data } );
        })
    };

    render() {
        return (
            <div>
                <Header/>
                <div className='teamList'>
                    <div className='teams'>
                        {
                            this.state.teams.map( ( element ) => {
                                return (<div id={ element.id }
                                             className='team'
                                             onClick={ this.chooseTeam }>
                                                <img src={ TEAM_IMAGE + element.short + '_logo.svg' }
                                                     className='team_img_small'
                                                     alt='lost'
                                                />
                                                { element.name } </div>)
                            } )
                        }
                    </div>
                    <TeamInfo players={ this.state.players } team={ this.state.team } coach={ this.state.coach } />


                </div>
            </div>
        )
    }
}

export default TeamList;