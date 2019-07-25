import React, { Fragment, useState, useEffect } from "react";
import { Card, Image, Button, Form, Modal } from 'semantic-ui-react';
import Webcam from "react-webcam";
import EventPassed from './EventPassed';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import _ from 'underscore';
import Cam from './Cam';
import './EventListPassed.css';

moment.locale('fr');

function EventListPassed(props) {

  const [events, setEvents] = useState([]);
  const [eventsPassed, setEventsPassed] = useState([])
  const [modal, setModal] = useState(false)
  const [event, setEvent] = useState('')
  const [dateEvent, setDateEvent] = useState('')
  const [comment, setComment] = useState('')
  const [picture, setPicture] = useState('')
  const [question, setQuestion] = useState(false);

  useEffect(() => {
    setEvents(props.event.listevent)
  }, []);

  // filtre event passed => infos dans navBar
  useEffect(() => {
    let temp = [...events];
    temp = _.filter(temp, (event) => {
      return moment(event.date_event).format('x') < Date.now();
    })
    props.dispatch({ type: 'LIST_PASSED', payload: temp })
    setEventsPassed(temp);
  }, [events])

  useEffect(() => {
    let temp = [...events];
    temp = _.filter(temp, (event) => {
      return moment(event.date_event).format('x') > Date.now();
    })
    props.dispatch({ type: 'LIST_CURRENT', payload: temp })
  }, [events])


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

    let eventsTemp = [...eventsPassed];
    eventsTemp.splice(index, 1);
    setEventsPassed(eventsTemp);
    props.dispatch({ type: 'LIST_PASSED', payload: eventsTemp })
  }

  const changeEvent = (index) => {
    props.dispatch({ type: 'INDEX_CHANGE', payload: index })
    setModal(true)
    setEvent(eventsPassed[index].event)
    setDateEvent(moment(eventsPassed[index].date_event).format("YYYY-MM-DD"))
    setPicture(eventsPassed[index].picture)
    setComment(eventsPassed[index].comment)
  }

  const changePicture = () => {
    setPicture(props.event.imgsrc)
    setQuestion(true)
    console.log(setPicture)
    props.dispatch({ type: 'TOGGLE_MODAL' })
    props.dispatch({ type: 'ADD_SRC_IMG', payload: '' })
  }

  const validate = () => {
    setQuestion(!question)
    setPicture(props.event.imgsrc)
  }

  const updateInputValue = () => {
      const inputChangeValues = {
        event:event,
        date_event: dateEvent,
        picture: picture,
        comment: comment,
      };
      const newList = [...eventsPassed];
      newList.splice(props.event.indexChange, 1, inputChangeValues);
      setEventsPassed(newList);
      console.log(eventsPassed)
      console.log(events[props.event.indexChange].id)
      props.dispatch({ type: 'LIST_PASSED', payload: newList })
      const url = `http://localhost:3000/api/events/${events[props.event.indexChange].id}`;
        axios.put(url, inputChangeValues)
                .then(res => {
                  console.log(res);
                })
                .catch(error => {
                  console.log(error);
                });

    setModal(!modal)
    
  };
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
                changeEvent={changeEvent}
              />
            </Fragment>
          )) : ""}
        </div>
      </div>
      <Fragment>
      {modal &&
      <Form>
      <Modal defaultOpen={true} dimmer={"blurring"} className='modalPicture'>
  
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-first-name'
            type="text"
            label="Nom de l'évènement"
            defaultValue={event}
            // Value={events[props.event.indexChange].event}
            onChange={(e) => (setEvent(e.target.value))}
            placeholder="Evènement!"
          />
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-last-name'
            type="date"
            label="Date de l'évènement"
            defaultValue={dateEvent}
            onChange={(e) => (setDateEvent(e.target.value))}
            placeholder="Date évènement"
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-first-name'
            type="text"
            label="Commentaire"
            defaultValue={comment}
            onChange={(e) => (setComment(e.target.value))}
            placeholder="Commentaire!"
          />
          <img className='picEvent' src={picture} /> <button class="ui button" onClick={changePicture}>Changer la photo une photo</button>
          {question &&
            <Modal defaultOpen={true} dimmer={"blurring"} className='modalPicture'>
              <Modal.Header>Photo de l'évènement</Modal.Header>
              <Modal.Description className='pictureDescription'>
                <Cam />
                <Button className='closeModalQuestion' onClick={validate}>Fermer</Button>
              </Modal.Description>
            </Modal>}
        </Form.Group>
        <button
          class="ui button"
          onClick={updateInputValue}>
          Enregistrer
      </button>
      </Modal>
      </Form>}
      </Fragment>
    </div>
  );
}



const mapStateToProps = state => ({
  event: state
})

const EventListPassedContainer = connect(mapStateToProps)(EventListPassed)


export default EventListPassedContainer;