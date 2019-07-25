import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import Cam from './Cam';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import { connect } from 'react-redux';
import _ from 'underscore';
import './FormCalendar.css';


moment.locale('fr');

function FormCalendar(props) {

  const [comment, setComment] = useState('');
  const [picture, setPicture] = useState('');
  const [date_event, setDate_Event] = useState('');
  const [event, setEvent] = useState('');
  const [question, setQuestion] = useState(false);
  const [clickValidate, setClickValidate] = useState(false);


  const handleComment = (e) => {
    setComment(e.target.value)
  };

  // const handlePicture = (e) => {
  //   setPicture(props.event.imgsrc)
  // };

  const toggleModal = () => {
    setPicture(props.event.imgsrc)
    setQuestion(true)
    console.log(setPicture)
    props.dispatch({ type: 'TOGGLE_MODAL' })
  }

  const handleDate_Event = (e) => {
    setDate_Event(e.target.value)
  }

  const handleEvent = (e) => {
    setEvent(e.target.value)
  }

  const clickPost = () => {
    const url = 'http://localhost:3000/api/events';
    const picture = props.event.imgsrc;
    const inputEvent = {
      event: event,
      date_event: date_event,
      picture: picture,
      comment: comment
    }
    axios.post(url, inputEvent)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    props.dispatch({ type: 'ADDEVENT', payload: inputEvent })
    props.dispatch({ type: 'ADD_SRC_IMG', payload: '' })
    setEvent('');
    setDate_Event('');
    setPicture('');
    setComment('');
  };

  const validate = () => {
    setQuestion(!question)
    setClickValidate(false)
    setPicture(props.event.imgsrc)
  }

  return (
    <div>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-first-name'
            type="text"
            label="Nom de l'évènement"
            value={event}
            onChange={handleEvent}
            placeholder="Evènement!"
          />
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-last-name'
            type="date"
            label="Date de l'évènement"
            value={date_event}
            onChange={handleDate_Event}
            placeholder="Date évènement"
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-first-name'
            type="text"
            label="Commentaire"
            value={comment}
            onChange={handleComment}
            placeholder="Commentaire!"
          />
          {picture ? <img className='picEvent' src={props.event.imgsrc} /> : <button class="ui button" onClick={toggleModal}>Ajouter une photo</button>}
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
          onClick={() => clickPost()}>
          Ajouter mon évènement
      </button>
      </Form>
    </div>
  );
}
const mapStateToProps = state => ({
  event: state
})

const FormCalendarContainer = connect(mapStateToProps)(FormCalendar)


export default FormCalendarContainer;