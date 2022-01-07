import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {MoviePoster} from './moviePoster';
import {Movie} from '../interfaces/movieInterfaces';

interface Props {
  title?: string;
  movies: Movie[];
}
export default function HorizontalSlider({title, movies}: Props) {
  return (
    <View style={{height: title ? 165 : 160}}>
      <Text>{title}</Text>
      <FlatList
        data={movies}
        renderItem={({item}: any) => (
          <MoviePoster movie={item} width={100} height={140} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}
