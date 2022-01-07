import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootScreenParams} from '../../navigation/Navigation';
import {MovieDetails} from '../components/MovieDetails';
// import Icon from 'react-native-vector-icons/Ionicons';
import {useMoviesDetails} from '../hooks/useMoviesDetails';

//esta interfaces que extiende a StackScreenProps va de la mano con el type RootScreenProps que creaste en el navigation principal porque este stack recibe dos parametros los cuales son el que Root que creaste y la ruta en la que estas actualmente
//aqui al tu poner la ruta 'DetailScreen' autoimaticamente podras extraer todas las propiedades de Moviue[] ya que asi lo definimos en el RootStackScreen

//usamos Dimensions para extraer las dimensiones de la pantalla del dispositivo y la imagen encaje perfectamente en el
const screenHeight = Dimensions.get('screen').height;
interface Props extends StackScreenProps<RootScreenParams, 'DetailScreen'> {}
export const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  console.log(movie.popularity);
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const {isLoading, cast, movieFull} = useMoviesDetails(movie.id);
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image source={{uri}} style={styles.imageDetails} />
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
        {isLoading ? (
          <ActivityIndicator color="red" size={20} />
        ) : (
          <MovieDetails movieFull={movieFull!} cast={cast} />
        )}
      </View>

      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.goBack()}>
        <View>
          <Icon name="chevron-back-outline" color="white" size={40} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageDetails: {
    flex: 1,
    // borderRadius: 25,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    // paddingBottom: 15,
    // backgroundColor: 'red',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 12,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  marginContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    // backgroundColor: 'white',
  },
  subtitle: {
    fontSize: 10,
    opacity: 0.8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 9999,
    elevation: 19,
    // bottom: 300,
    // top: 50,
    flexDirection: 'row',
    top: 0,
    left: 10,
  },
});
