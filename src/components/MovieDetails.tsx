import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {FullMovie} from '../interfaces/FullMovie';
import {Cast} from '../interfaces/creditsMovie';
import Icon from 'react-native-vector-icons/Ionicons';
import {CastItem} from './CastItem';

interface Props {
  movieFull: FullMovie;
  cast: Cast[];
}
export const MovieDetails = ({movieFull, cast}: Props) => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Icon name="star-outline" size={18} color="#000" />
        <Text> {movieFull.vote_average}</Text>
        <Text> - {movieFull.genres.map(g => g.name).join(', ')}</Text>
      </View>

      {/* Historia */}
      <Text style={{fontSize: 12, fontWeight: 'bold'}}>History</Text>
      <Text style={{fontSize: 10}}>{movieFull.overview}</Text>
      <Text style={{fontSize: 12, fontWeight: 'bold'}}>Budget</Text>
      <Text style={{fontSize: 12}}>
        $
        {movieFull.budget.toString().slice(0, 2) +
          ',' +
          //con el substr le digo que empiece en la posicion 3 y me muestre 3 posiciones  apartir de la posicion 3
          movieFull.budget.toString().substr(3, 3) +
          ',' +
          movieFull.budget.toString().slice(-3) +
          '.00' +
          ' USD'}
      </Text>
      <Text style={{fontWeight: 'bold', fontSize: 13}}>Actors</Text>
      <View style={{marginTop: 7, marginHorizontal: -8}}>
        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{}}
        />
      </View>
    </>
  );
};
