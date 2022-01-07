import React, {useRef} from 'react';
import {View, Animated, Button} from 'react-native';
import {useFade} from '../hooks/useFade';

export const FadeScreen = () => {
  const {FadeIn, FadeOut, opacity} = useFade();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={{
          backgroundColor: '#000',
          width: 50,
          height: 50,
          borderColor: 'white',
          borderWidth: 5,
          marginBottom: 10,
          opacity: opacity,
        }}
      />
      <Button title="FadeIn" onPress={() => FadeIn()} />
      <Button title="FadeOut" onPress={() => FadeOut()} />
    </View>
  );
};
