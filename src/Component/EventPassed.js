import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import './Event.css';


const EventPassed = props => (
  <div className="cardEvent">
    <Card>
      <Card.Header className="event">{props.event}</Card.Header>
      <Card.Meta>
        <span className='date_event'>{props.date_event}</span>
      </Card.Meta>
      <hr />
      <Image className="picture" src={props.picture} alt="pic_event" />
      <Card.Description className="comment">{props.comment}</Card.Description>
      <Button onClick={() => props.removeEvent(props.index)}> Supprimer </Button>
    </Card>
  </div>
)
export default EventPassed;