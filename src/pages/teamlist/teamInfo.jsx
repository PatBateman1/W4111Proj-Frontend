import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BACKEND, TEAM_IMAGE } from '../../config'


/**
 * The team info part of the teamList page, choose different team on the left of the page
 * to get different detail information of that team
 */
class TeamInfo extends Component {


    constructor( props ) {
        super( props );
        this.state = { coach : '' };
        this.getCoach = this.getCoach.bind( this );
    }


    getCoach = function() {
        let url = BACKEND + 'coach/' + this.props.team.id;
        fetch( url ).then( res => {
            return res.json();
        }).then( data => {
            this.setState( { coach : data.name } );
        })
    };

    render() {
        return (
            <div className='teamInfo'>
                <div className='teamBox'>
                    <img src={ TEAM_IMAGE + this.props.team.short + '_logo.svg' }
                                                 className='team_img_large'
                                                 alt='lost'
                                            />
                    { this.props.team.name }
                    <span>region : { this.props.team.region }</span>
                    <span>coach : { this.state.coach }</span>
                </div>
                <div className='playerBox'>
                    {
                        this.props.players.map( ( element ) => {
                            return (<div className='player'>
                                        <img src={ element.image } className='playerImg'/>
                                        <Link to={ '/players/' + element.id }>
                                            <div className='playerName' id={ element.id }> { element.name } </div>
                                        </Link>
                                    </div>
                                    )
                        })
                    }
                </div>
            </div>
        );
    }

}

export default TeamInfo;