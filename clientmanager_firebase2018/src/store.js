//https://github.com/prescottprue/react-redux-firebase

import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

// config
const firebaseConfig = {
  apiKey: 'AIzaSyDOilpwpgqR2naKSW7xEWs5camWi8ABza4',
  authDomain: 'clientmanager-48434.firebaseapp.com',
  databaseURL: 'https://clientmanager-48434.firebaseio.com',
  projectId: 'clientmanager-48434',
  storageBucket: 'clientmanager-48434.appspot.com',
  messagingSenderId: '74578134374'
};

// react redux firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

// init firebase
firebase.initializeApp(firebaseConfig);
// init firestore
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  // pass reducer
  notify: notifyReducer,
  settings: settingsReducer
});

// check settings in local storage
if (localStorage.getItem('settings_loc') == null) {
  // default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };
  // set to ls
  localStorage.setItem('settings_loc', JSON.stringify(defaultSettings));
}

// Create store with reducers and initial state
const initialState = {
  // local storage
  settings: JSON.parse(localStorage.getItem('settings_loc'))
};

// create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
