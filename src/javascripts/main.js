import firebase from 'firebase/app';

import 'bootstrap';
import '../styles/main.scss';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import movies from './components/movies/movies';

import apiKeys from './helpers/data/apiKeys.json';


console.error('lets build movies');


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.authStringBuilder();
  authData.checkLoginStatus();
  movies.getMovies();
};

init();
