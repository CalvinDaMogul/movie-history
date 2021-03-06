import axios from 'axios';
import apiKeys from './apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewMovie = eventsObject => axios.post(`${firebaseUrl}/movies.json`, eventsObject);


const getMoviesByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/movies.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const moviesResults = results.data;
      const movies = [];
      Object.keys(moviesResults).forEach((moviesId) => {
        moviesResults[moviesId].id = moviesId;
        movies.push(moviesResults[moviesId]);
      });
      resolve(movies);
    })
    .catch(err => reject(err));
});

const deleteMovie = movieId => axios.delete(`${firebaseUrl}/movies/${movieId}.json`);

const editMovie = (movieId, movie) => axios.put(`${firebaseUrl}/movies/${movieId}.json`, movie);

export default {
  getMoviesByUid,
  addNewMovie,
  deleteMovie,
  editMovie,
};
