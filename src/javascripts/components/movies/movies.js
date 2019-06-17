import firebase from 'firebase/app';
import 'firebase/auth';

import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

const createNewMovie = (e) => {
  e.preventDefault();
  const newEvent = {
    name: document.getElementById('name').value,
    imageUrl: document.getElementById('image').value,
    rating: document.getElementById('rating').value,
    date: document.getElementById('date').value,
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

const addToWatch = (e) => {
  const getCurrentId = e.target.closest('.eventCard').id;
  console.error(getCurrentId, 'test');
  const updatedMovie = {
    name: document.getElementById(`${getCurrentId}-name`).textContent,
    imageUrl: document.getElementById(`${getCurrentId}-url`).src,
    rating: document.getElementById(`${getCurrentId}-rating`).textContent,
    date: document.getElementById(`${getCurrentId}-date`).textContent,
    uid: firebase.auth().currentUser.uid,
    watched: true,
  };
  console.error(updatedMovie);
  moviesData.editMovie(getCurrentId, updatedMovie)
    .then(() => {
      getMovies(firebase.auth().currentUser.uid);// eslint-disable-line no-use-before-define
    });
};

const watchList = () => {
  const watchButton = document.getElementsByClassName('addWatchList');
  for (let i = 0; i < watchButton.length; i += 1) {
    watchButton[i].addEventListener('click', addToWatch);
  }
};

const movieBuilder = (movies) => {
  let domString = ' ';
  movies.forEach((movie) => {
    domString += `<div class="card eventCard m-2" id="${movie.id}" style="width: 18rem;">`;
    domString += `<h5 class="card-title" id="${movie.id}-name">${movie.name}</h5>`;
    domString += `<img class="card-img-top" id="${movie.id}-url" src="${movie.imageUrl}" alt="Card image cap" />`;
    domString += `<p class="card-text" id="${movie.id}-rating">${movie.rating}</p>`;
    domString += `<p class="card-text" id="${movie.id}-date"> Date of Movie:${movie.date}</p>`;
    domString += '<button type="button" id="clicks" class="btn btn-light editButton">edit</button>';
    domString += '<button type="button" id="click" class="btn btn-light deleteButton">delete</button>';
    domString += `<button type="button" id="" class="btn btn-light addWatchList">${(movie.watched === true) ? 'remove from watch' : 'add to watch'}</button>`;
    domString += '</div>';
    // domString += '</div>';
  });
  util.printToDom('movie', domString);
  addMovie();
  watchList();
};

const getMovies = (uid) => {
  moviesData.getMoviesByUid(uid)
    .then((movies) => {
      console.error(movies);
      movieBuilder(movies);
    })
    .catch(err => console.error('no movies here', err));
};

export default { getMovies };
