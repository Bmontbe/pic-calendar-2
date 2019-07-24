import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import EventList from './Component/EventList';
import Navbar from './Component/Navbar';
import FormCalendar from './Component/FormCalendar';
import EventListPassed from './Component/EventListPassed';

import 'moment/locale/fr';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">

            <div className="Edit">
              <Navbar />
              <FormCalendar />
            </div>
            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={EventList} />
              <Route path={`${process.env.PUBLIC_URL}/evenements_passés`} component={EventListPassed} />
            </Switch>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
