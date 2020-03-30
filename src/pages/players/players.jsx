import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { BACKEND } from '../../config'
import './players.css'

/**
 *  The player info page
 */

class Players extends Component {


    constructor( props ) {
        super( props );
        this.state = {
            player : {
                id : this.props.match.params.playerId,
                name : null,
                height : null,
                weight : null,
                dob : null,
                image : ''
            },
            page : 0,
            stats : [],
            image : '',
            map : {}
        };
        this.getPlayerInfo = this.getPlayerInfo.bind( this );
        this.getStats = this.getStats.bind( this );
        this.nextPage = this.nextPage.bind( this );
        this.prevPage = this.prevPage.bind( this );
        this.getTeamMap = this.getTeamMap.bind(this)
    }

    componentDidMount() {
        this.getPlayerInfo();
        this.getTeamMap();
        this.getStats( this.state.player.id, this.state.page );
    }

    /**
     * get the basic information of the player and update the state to refresh the page
     */
    getPlayerInfo = function() {
        let url = BACKEND + '/player/' + this.state.player.id;
        fetch( url ).then( res => {
            return res.json();
        }).then( data => {
            this.setState( { player : data} );
        })
    };

    /**
     * get the stats of the player and update the state to refresh the page
     * @param id : id of the player
     * @param page : index of the page, each page shows 20 games'stat of that player
     */
    getStats = function( id, page ) {
        let url = BACKEND + `/stats/${ id }?page=${ page }`;
        fetch( url ).then( res => {
            return res.json();
        }).then( data => {
            if ( !data.err ) {
                this.setState({ stats : data })
            } else {
                alert( 'reach the end' )
            }
        })
    };

    /**
     * the click event of the next button, click to get the next page's stat
     */
    nextPage = function() {
        this.getStats( this.state.player.id, this.state.page+1 );
        this.setState( { page : this.state.page+1 } );
    };

    /**
     * the click event of the prev button, click to get previous page's stat
     */
    prevPage = function() {
        if ( this.state.page > 0 ) {
            this.getStats(this.state.player.id, this.state.page - 1);
            this.setState({page: this.state.page - 1});
        }
    };

    /**
     * get a map which maps the id of a team to the name of the team
     */
    getTeamMap = function() {
        let url = BACKEND + '/teamMap';
        fetch( url ).then( res => {
            return res.json();
        }).then( data => {
            this.setState( { map : data } )
        })
    };

    render() {
        return (
            <div>
                <div className='playerInfo'>
                    <img src={ this.state.player.image } className='playerImgDetail'/>
                    <div>
                        <div>name: { this.state.player.name }</div>
                        <div>height: { this.state.player.height }m</div>
                        <div>weight:{ this.state.player.weight }kg</div>
                        <div>birthday: { this.state.player.dob }</div>

                    </div>


                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>GAME</th>
                                <th>PTS</th>
                                <th>REB</th>
                                <th>AST</th>
                                <th>STL</th>
                                <th>BLK</th>
                                <th>TOV</th>
                                <th>3PA</th>
                                <th>3PM</th>
                                <th>FGA</th>
                                <th>FGM</th>
                                <th>MIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.stats.map( ( element, idx) => {
                                let row = 'odd';
                                if ( idx % 2 === 0) {
                                    row = 'even';
                                }
                                return (
                                    <tr className={ row }>
                                        <th>{ element.date }</th>
                                        <th><Link to={ '/games/' + element.game_id }>
                                            { `${ this.state.map[element.team1_id] } VS ${ this.state.map[element.team2_id] }` }
                                        </Link></th>
                                        <th>{ element.scores }</th>
                                        <th>{ element.rebounds }</th>
                                        <th>{ element.assists }</th>
                                        <th>{ element.steals }</th>
                                        <th>{ element.blocks }</th>
                                        <th>{ element.turnovers }</th>
                                        <th>{ element.three_hit }</th>
                                        <th>{ element.three_made }</th>
                                        <th>{ element.hit }</th>
                                        <th>{ element.made }</th>
                                        <th>{ element.time }</th>
                                    </tr>
                                )
                            } ) }
                        </tbody>
                    </table>
                </div>
                <button onClick={ this.prevPage }>prev</button>
                <button onClick={ this.nextPage }>next</button>

            </div>
        );
    }
}

export default Players