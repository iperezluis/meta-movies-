import axios from 'axios';

//aqu especificamos los datos de la Api estos datos los podemos sacar del mismo POSTMAN, recuerda que la api_key en este caso debes crearla y colocar la URL en donde se usara la App y la url es tu direccion IP
const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '71c9f951c7a7becb0c148b3977918a26',
    language: 'en-US',
  },
});

export default movieDB;
