import React, {useContext, useEffect} from 'react';
import {View, ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import ImageColors from 'react-native-image-colors';
import Carousel from 'react-native-snap-carousel';
import GradienteBackground from '../components/GradienteBackground';
import HorizontalSlider from '../components/HorizontalSlider';

import {MoviePoster} from '../components/moviePoster';
import useMovies from '../hooks/useMovies';
import {changeColors} from '../helpers/getColors';
import {GradientContext} from '../context/GradientContext';

//aqui desestructuramos el Dimensions y sacamos el width y lo renombramos widthDimensions esto lo usamso para que las tarjetas queden centradas en ambos dispositivos ios y android
//el itemWidt del carousel es la separacion entre cada tarjeta
const {width: windowWidth} = Dimensions.get('window');
export default function HomeScreen() {
  // const navigation = useNavigation();
  /* aqui usamos el useEffect es lo mismo que usar el addEventListener('DOMContentedLoaded') */
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  const {setMainColor} = useContext(GradientContext);
  const getColors = async (index: number) => {
    try {
      let movie = nowPlaying[index];
      const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      const [primary = 'blue', secondary = 'red'] = await changeColors(uri);
      setMainColor({primary, secondary});
      console.log({primary, secondary});

      throw new Error('Hubo un error');
    } catch (error) {
      console.log('hubo un error' + error);
    }
  };
  useEffect(() => {
    nowPlaying.length > 0 ? getColors(0) : '';
  }, [nowPlaying]);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={60} />
      </View>
    );
  }

  return (
    <GradienteBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* Carousel principal */}
          <View style={{height: 320}}>
            <Carousel
              data={nowPlaying!}
              renderItem={({item, index}) => (
                <MoviePoster key={index} movie={item} />
              )}
              sliderWidth={windowWidth}
              itemWidth={200}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getColors(index)}
              // onBeforeSnapToItem={}//el onSnapToItem es el que usamos para ejecutar la funcion changeColors cada vez que cambiamos un item por el siguiente
            />
          </View>
          {/* Carousel de peliculas populares */}
          {/* OJO: tambien puedes agregarle el '!' al final del nowPlaying y los demas en caso de que typescript los marque como undefined porque como son peticiones y como tal aun no aparecen en el home los va amarcar como undefined entonces le decimos confia en mi el va a aparecer */}
          <HorizontalSlider title="Now Playing" movies={nowPlaying!} />
          <HorizontalSlider title="Populars" movies={popular!} />
          <HorizontalSlider title="Top Rated" movies={topRated!} />
          <HorizontalSlider title="Upcoming" movies={upcoming!} />
        </View>
      </ScrollView>
    </GradienteBackground>
  );
}
