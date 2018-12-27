//-------- Main react dom renderer from components --------//
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers';

const persistedState = localStorage.getItem('final_state') ? JSON.parse(localStorage.getItem('final_state')) : {};
const store=createStore(reducers,persistedState, applyMiddleware(ReduxPromise,thunk));
store.subscribe(()=>{
    localStorage.setItem('final_state',JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
