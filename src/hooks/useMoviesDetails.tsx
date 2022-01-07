import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {CreditsMovie, Cast} from '../interfaces/creditsMovie';
import {FullMovie} from '../interfaces/FullMovie';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: FullMovie;
  cast: Cast[];
}

export const useMoviesDetails = (movieId: number) => {
  //aqui pondremos los valores del estado inicial dentro del objeto
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMoviesCredits = async () => {
    try {
      let resFullMovie = movieDB.get<FullMovie>(`/${movieId}`);
      let resCredistMovie = movieDB.get<CreditsMovie>(`/${movieId}/credits`);
      const res = await Promise.all([resFullMovie, resCredistMovie]);

      setState({
        isLoading: false,
        movieFull: res[0].data,
        cast: res[1].data.cast,
      });

      throw new Error('Ocurrio un error');
    } catch (error) {
      console.log('ocurrio un error:' + error);
    }
  };
  useEffect(() => {
    getMoviesCredits();
  }, []);

  return {
    ...state,
  };
};
