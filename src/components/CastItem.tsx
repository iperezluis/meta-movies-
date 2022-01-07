import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Cast} from '../interfaces/creditsMovie';

interface Props {
  actor: Cast;
}
export const CastItem = ({actor}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
  return (
    <>
      <View style={styles.container}>
        {actor.profile_path && (
          <Image
            source={{uri}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
            }}
          />
        )}

        <View style={styles.actorInfo}>
          <Text style={{fontWeight: 'bold', fontSize: 12}}>{actor.name}</Text>
          <Text style={{fontSize: 10, opacity: 0.7}}>{actor.character}</Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
    flexDirection: 'row',
    borderRadius: 10,
    // paddingBottom: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    marginRight: 15,
    elevation: 6,
  },
  actorInfo: {
    marginLeft: 5,
  },
});
