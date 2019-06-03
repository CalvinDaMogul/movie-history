import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getMoviesData = () => axios.get(`${firebaseUrl}/movies.json`);

export default { getMoviesData };
