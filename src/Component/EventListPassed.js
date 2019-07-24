import React, { Fragment, useState, useEffect } from "react";
import { Card, Image, Button } from 'semantic-ui-react';
import Webcam from "react-webcam";
import EventPassed from './EventPassed';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import _ from 'underscore';

moment.locale('fr');

function EventListPassed(props) {

  const [events, setEvents] = useState([]);
  const [eventsPassed, setEventsPassed] = useState([])

  useEffect(() => {
    setEvents(props.event.listevent)
  }, []);

  // filtre event passed => infos dans navBar
  useEffect(() => {
    let temp = [...events];
    temp = _.filter(temp, (event) => {
      return moment(event.date_event).format('x') < Date.now();
    })
    setEventsPassed(temp);
  })


  const removeEvent = (index) => {
    const url = `http://localhost:3000/api/events/${events[index].id}`;
    axios.delete(url)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    let eventsTemp = [...events];
    eventsTemp.splice(index, 1);
    setEvents(eventsTemp);
    props.dispatch({ type: 'LISTEVENT', payload: eventsTemp })
    props.dispatch({ type: 'LIST_PASSED', payload: eventsTemp })
    console.log("l'index est " + index);
  }

  return (
    <div>
      <div className="mb-4 mr-6 ml-6">
        <div className="row justify-content-center">
          {eventsPassed ? eventsPassed.map((event, index) => (
            <Fragment>
              <EventPassed
                id={event.id}
                event={event.event}
                date_event={moment(event.date_event).format("dddd Do MMMM YYYY")}
                picture={event.picture}
                comment={event.comment}
                key={index}
                index={index}
                removeEvent={removeEvent}
              />
            </Fragment>
          )) : ""}
        </div>
      </div>
    </div>
  );
}



const mapStateToProps = state => ({
  event: state
})

const EventListPassedContainer = connect(mapStateToProps)(EventListPassed)


export default EventListPassedContainer;