import firebase from 'firebase/app';
import 'firebase/auth';
import movies from '../../components/movies/movies';


const authDiv = document.getElementById('auth');
const logoutDiv = document.getElementById('nav-button-logout');
const eventsDiv = document.getElementById('events-div');


const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      logoutDiv.classList.remove('hide');
      eventsDiv.classList.remove('hide');
      movies.getMovies(user.uid);
    } else {
      authDiv.classList.remove('hide');
      logoutDiv.classList.add('hide');
      eventsDiv.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
