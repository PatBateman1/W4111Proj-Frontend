import React, { Component } from 'react'

import { BACKEND } from '../../config'

import Header from '../../components/header'

import './games.css'
import {Link} from "react-router-dom";

class Game extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            years : [ 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020 ],
            months : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
            year : 2020,
            month : 1,
            calendar : [ { 0 : [], 1 : [], 2 : [], 3 : [], 4 : [], 5 : [], 6 : [] } ],
            map : {}
        };
        this.getTeamMap = this.getTeamMap.bind(this);
        this.getCalendar = this.getCalendar.bind( this );
        this.chooseYear = this.chooseYear.bind( this );
        this.chooseMonth = this.chooseMonth.bind( this );
    }

    componentDidMount() {
        this.getTeamMap();
        this.getCalendar();
    }

    getCalendar = function() {
      let url = BACKEND + 'games';
      let data = { year : this.state.year, month : this.state.month };
      let req = {
          method : 'POST',
          body : JSON.stringify( data ),
          headers : { 'Content-Type' : 'application/json' }
      };
      fetch( url, req ).then( res => {
          return res.json();
      }).then( data => {
          this.setState( { calendar : data } );
      });
    };

    chooseYear = function( year ) {
        this.setState( { year : year }, this.getCalendar );
    };


    chooseMonth = function( month ) {
        this.setState( { month : month }, this.getCalendar );
    };

    getTeamMap = function() {
        let url = BACKEND + '/teamMap';
        fetch( url ).then( res => {
            return res.json();
        }).then( data => {
            this.setState( { map : data } )
        });
    };

    render() {
        return (
            <div>
                <Header/>
                <div className='gamePageOuter'>
                    <div className='calenderYear'>
                        {
                            this.state.years.map( ( element ) => {
                               return (
                                   <div className='calenderDiv' onClick={ () => { this.chooseYear( element ) } }>{ element }</div>
                               );
                            } )
                        }
                    </div>

                    <div className='calenderMonth'>
                        {
                            this.state.months.map( ( element ) => {
                               return (
                                   <div className='calenderDiv' onClick={ () => { this.chooseMonth( element ) } }>{ element }</div>
                               );
                            } )
                        }
                    </div>

                    <div className='calendar'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sun</th>
                                    <th>Mon</th>
                                    <th>Tue</th>
                                    <th>Wed</th>
                                    <th>Thu</th>
                                    <th>Fri</th>
                                    <th>Sat</th>
                                </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.calendar.map( ( element  ) => {
                                    return (
                                      <tr>
                                          {
                                              [6, 0, 1, 2, 3, 4, 5].map( ( day ) => {

                                                  if ( element[day].length > 1 ) {
                                                      return (
                                                            <td valign='top' className='calendarBoxOuter'>
                                                                <div className='calendarBox'>
                                                                    <div> { element[day][0][3] } </div>
                                                                    {
                                                                      element[day].map( ( game ) => {
                                                                          return (
                                                                              <div>
                                                                                  {
                                                                                      <Link to={ '/games/' + game[0] }>
                                                                                            { `${ this.state.map[game[1]] } VS ${ this.state.map[game[2]] }` }
                                                                                      </Link>
                                                                                  }
                                                                              </div>
                                                                          );
                                                                      } )
                                                                    }
                                                                </div>
                                                          </td>
                                                      );
                                                  } else {
                                                      return ( <td className='calendarBoxOuter'> </td> );
                                                  }
                                              } )
                                          }
                                      </tr>
                                    );
                                } )
                            }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;