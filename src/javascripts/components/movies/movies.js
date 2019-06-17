import firebase from 'firebase/app';
import 'firebase/auth';

import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

const createNewMovie = (e) => {
  e.preventDefault();
  const newEvent = {
    eventName: document.getElementById('name').value,
    imageUrl: document.getElementById('image').value,
    eventDate: document.getElementById('rating').value,
    eventLocation: document.getElementById('date').value,
    uid: firebase.auth().currentUser.uid,
  };
  moviesData.addNewMovie(newEvent)
    .then(() => {
      document.getElementById('name').value = '';
      document.getElementById('image').value = '';
      document.getElementById('rating').value = '';
      document.getElementById('date').value = '';
      getMovies(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new events for you', err));
};

const deleteMovie = (e) => {
  const movieId = e.target.closest('.eventCard').id;
  console.error(movieId);
  moviesData.deleteMovie(movieId)
    .then(() => getMovies(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const addMovie = () => {
  document.getElementById('post-event').addEventListener('click', createNewMovie);
  const deleteButtons = document.getElementsByClassName('deleteButton');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteMovie);
  }
};

const movieBuilder = (movies) => {
  let domString = ' ';
  movies.forEach((movie) => {
    domString += `<div class="card eventCard m-2" id=${movie.id} style="width: 18rem;">`;
    domString += `<h5 class="card-title">${movie.name}</h5>`;
    domString += `<img class="card-img-top" id="event-pic" src="${movie.imageUrl}" alt="Card image cap" />`;
    domString += `<p class="card-text">${movie.eventDate}</p>`;
    domString += `<p class="card-text"> Locations:${movie.date}</p>`;
    domString += '<button type="button" id="clicks" class="btn btn-light editButton">edit</button>';
    domString += '<button type="button" id="click" class="btn btn-light deleteButton">delete</button>';
    domString += '</div>';
    // domString += '</div>';
  });
  util.printToDom('movie', domString);
  addMovie();
};

const getMovies = (uid) => {
  moviesData.getMoviesByUid(uid)
    .then((movies) => {
      movieBuilder(movies);
    })
    .catch(err => console.error('no movies here', err));
};

export default { getMovies };
