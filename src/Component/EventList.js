import React, { Component, useState, useEffect } from 'react';
import Event from './Event';
import Form from './FormCalendar'
import axios from 'axios';
import './EventList.css';
import moment from 'moment';
import 'moment/locale/fr';
import { connect } from 'react-redux';
import _ from 'underscore';

moment.locale('fr');

function EventList(props) {

  const [events, setEvents] = useState([]);
  const [eventsPassed, setEventsPassed] = useState([])

  //GET
  useEffect(() => {
    var url = 'http://localhost:3000/api/events';
    axios.get(url)
      .then((takeData) => {
        setEvents(takeData.data.sort(compare))
        props.dispatch({ type: 'LISTEVENT', payload: takeData.data })
        console.log(takeData.data)
        console.log(new Date())
      })
  }, []);

  useEffect(() => {
    let temp = [...events];
    temp = _.filter(temp, (event) => {
      return moment(event.date_event).format('x') < Date.now();
    })
    setEventsPassed(temp);
    props.dispatch({ type: 'LIST_PASSED', payload: temp })
  })

  useEffect(() => {
    setEvents([...props.event.listevent, props.event.addevent].sort(compare));
    props.dispatch({ type: 'LISTEVENT', payload: [...props.event.listevent, props.event.addevent] })

  }, [props.event.addevent]);

  const compare = (a, b) => {
    const dateA = a.date_event;
    const dateB = b.date_event;

    let comparison = 0;
    if (dateA > dateB) {
      comparison = -1;
    } else if (dateA < dateB) {
      comparison = 1;
    }
    return comparison;
  }

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
    console.log("l'id est " + events[index].id);

    let eventsTemp = [...events];
    eventsTemp.splice(index, 1);
    setEvents(eventsTemp);
    props.dispatch({ type: 'LISTEVENT', payload: eventsTemp })
    console.log("l'index est " + index);
    console.log(new Date().getMilliseconds())
  }

  // const removeTemp = (index) => {

  // }

  return (
    <div>
      <div className="mb-4 mr-6 ml-6">
        <div className="row justify-content-center">
          {events ? events.map((event, index) => (
            <Event
              id={event.id}
              event={event.event}
              date_event={moment(event.date_event).format("dddd Do MMMM YYYY")}
              picture={event.picture}
              comment={event.comment}
              key={index}
              index={index}
              removeEvent={removeEvent}
            />
          )) : ""}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  event: state
})

const EventListContainer = connect(mapStateToProps)(EventList)


export default EventListContainer;