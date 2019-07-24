import React, { Fragment, Component, useState, useEffect } from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import Event from './Event';
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
  const [modal, setModal] = useState(false)

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

  const changeEvent = (index) => {
    props.dispatch({ type: 'INDEX_CHANGE', payload: index })
    setModal(true)
    console.log(index)
  }

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
              changeEvent={changeEvent}
            />
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
            value={events[props.event.indexChange].event}
            // onChange={handleEvent}
            placeholder="Evènement!"
          />
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-last-name'
            type="date"
            label="Date de l'évènement"
            value={moment(events[props.event.indexChange].date_event).format("YYYY-MM-DD")}
            // onChange={handleDate_Event}
            placeholder="Date évènement"
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-first-name'
            type="text"
            label="Commentaire"
            value={events[props.event.indexChange].comment}
            // onChange={handleComment}
            placeholder="Commentaire!"
          />
          {/* {picture ? <img className='picEvent' src={props.event.imgsrc} /> : <button class="ui button" onClick={toggleModal}>Ajouter une photo</button>} */}
          {/* {question &&
            <Modal defaultOpen={true} dimmer={"blurring"} className='modalPicture'>
              <Modal.Header>Photo de l'évènement</Modal.Header>
              <Modal.Description className='pictureDescription'>
                <Cam />
                <Button className='closeModalQuestion' onClick={validate}>Fermer</Button>
              </Modal.Description>
            </Modal>} */}
        </Form.Group>
        <button
          class="ui button"
          onClick={() => setModal(!modal)}>
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

const EventListContainer = connect(mapStateToProps)(EventList)


export default EventListContainer;