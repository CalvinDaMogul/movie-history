import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/Auth/auth';
import '../styles/main.scss';

console.error('hi');

const init = () => {
  auth.authStringBuilder();
  firebase.initializeApp(apiKeys.firebaseKeys);
};

init();
