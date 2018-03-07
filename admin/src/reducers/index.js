import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import settings from './settings';

import contactReducer from '../routes/app/routes/contact/reducers/contact-reducer';

const reducers = {
  routing: routerReducer,
  settings,
  form: formReducer,
  contactReducer
};

module.exports = combineReducers(reducers);
