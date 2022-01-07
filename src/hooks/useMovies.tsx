import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {Movie, MovieDBResponses} from '../interfaces/movieInterfaces';

interface moviesStates {
  nowPlaying: Movie[];
  popular: Movie[];
  upcoming: Movie[];
  topRated: Movie[];
}
export default function useMovies() {
  //colocamos en true el loading cuando empiece a cargar el home
  const [isLoading, setIsLoading] = useState(true);
  const [movieState, setMovieState] = useState<moviesStates>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    try {
      const resNowPlaying = movieDB.get<MovieDBResponses>('/now_playing');
      const resPopular = movieDB.get<MovieDBResponses>('/popular');
      const resUpcoming = movieDB.get<MovieDBResponses>('/upcoming');
      const resTopRated = movieDB.get<MovieDBResponses>('/top_rated');

      const res = await Promise.all([
        resNowPlaying,
        resPopular,
        resUpcoming,
        resTopRated,
      ]);

      setMovieState({
        nowPlaying: res[0].data.results,
        popular: res[1].data.results,
        upcoming: res[2].data.results,
        topRated: res[3].data.results,
      });
      setIsLoading(false);

      throw new Error('Ocurrio un error');

      // const peliculas = res.data.results;
    } catch (error) {
      console.log('ocurrio un error:' + error);
    }
    // throw new Error('ocurrio un error');
  };
  //usamos un useEffect para que al cargar por primera vez el home se dispare una sola vez la funcion getMovies()
  useEffect(() => {
    //now_playing
    getMovies();
  }, []);

  // const getMovies = ()=>{
  //        movieDB
  //          .get<MovieDBInterface>('/now_playing')
  //          .then(res => console.log(res.data.results[0]))
  //          .catch(err => console.log(err));
  // }
  return {...movieState, isLoading};
}
