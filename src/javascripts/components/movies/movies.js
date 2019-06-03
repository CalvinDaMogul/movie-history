import moviesData from '../../data/moviesData';
import util from '../../helpers/util';


const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const moviesResults = resp.data.movies;
      // movies = moviesResults;
      // domStringBuilder();
      const movieValues = Object.values(moviesResults);
      let domString = '';
      movieValues.forEach((movie) => {
        domString += '<div class="wrapper">';
        domString += `<div class="rating-card-top">RATED: ${movie.filmRating}</div>`;
        domString += `<div id="${movie.id}" class="card movie" style="width: 18rem;">`;
        domString += `<img class="card-img-top" src=${movie.imageURL} alt="${movie.name}">`;
        domString += '</div>';
        domString += '</div>';
      });
      util.printToDom('movies', domString);
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };
