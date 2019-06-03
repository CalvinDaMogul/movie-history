import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../javascripts/helpers/data/util';
import friendsData from '../../javascripts/helpers/data/moviessData';

const createNewMovie = (e) => {
  e.preventDefault();
  const newFriend = {
    movie: document.getElementById('name').value,
    genre: document.getElementById('email').value,
    uid: firebase.auth().currentUser.uid,
  };
  moviesData.addNewFriend(newFriend)
    .then(() => {
      document.getElementById('movie').value = '';
      document.getElementById('genre').value = '';
      document.getElementById('img').classList.remove('hide');
      document.getElementById('filmRated').classList.add('hide');
    })
    .catch(err => console.error('no new friend for you', err));
};

const newMovieButton = () => {
  document.getElementById('add-movie-btn').classList.add('hide');
  document.getElementById('hideTitle').classList.remove('hide');
  movieDiv.classList.add('hide');
  newMovieDiv.classList.remove('hide');
  document.getElementById('saveNewMovie').addEventListener('click', createNewMovie);
};


const addMovies = () => {
  let domString = '<h2 id="" class="">Add New Movie</h2>';
  domString += '<button id="add-movie-btn" class="btn btn-info">Add Movie</button>';
  util.printToDom('add', domString);
  document.getElementById('add-movie-btn').addEventListener('click', newMovieButton);
};

export default { addMovies };
