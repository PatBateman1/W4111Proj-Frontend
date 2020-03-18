import React, { Component } from 'react'


class TeamInfo extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className='teamInfo'>
                <div className='teamBox'> { this.props.team } </div>
                <div className='playerBox'>
                    {
                        this.props.players.map( ( element ) => {
                            return ( <div className='player'> { element.name } </div> )

                        })
                    }
                </div>
            </div>
        );
    }

}

export default TeamInfo;