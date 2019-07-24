import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

//REDUCERS
import eventReducer from './Reducers/eventReducer';
import modalReducer from './Reducers/modalReducer';
import imgSrcReducer from './Reducers/imgSrcReducer';
import listEventReducer from './Reducers/listEventReducer';
import eventPassedReducer from './Reducers/eventPassedReducer';
import indexChangeReducer from './Reducers/indexChangeReducer';

const allReducers = combineReducers({
  listevent: listEventReducer,
  listPassedevent: eventPassedReducer,
  indexChange : indexChangeReducer,
  addevent: eventReducer,
  modal: modalReducer,
  imgsrc: imgSrcReducer
})

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
