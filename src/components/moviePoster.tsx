import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '../interfaces/movieInterfaces';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}
export const MoviePoster = ({movie, height = 300, width = 200}: Props) => {
  console.log(movie.poster_path);
  //el poster.path es la ruta unica de cada imagen y la ruta general antes del path de la imagen es https://image.tmdb.org/t/p/w500
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const navigation = useNavigation() as any;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', movie)} //aqui le mandamos el parametro movie para poder recibir los detalles de la pelicula
      activeOpacity={0.8}
      style={{
        width,
        height,
        marginHorizontal: 5,
        paddingBottom: 5,
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 15,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 15,
  },
});
