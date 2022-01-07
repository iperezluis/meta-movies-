import React, {useRef} from 'react';
import {View, Text, Animated} from 'react-native';

export const useFade = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  //aqui vamos a defirnir un callback asignandole un type function para usarlo en el .start()
  const FadeIn = (callback?: () => void) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => (callback ? callback() : null)); //este callback se va a disparar cuando se termine de hacer la animacion de entrada si no, no
  };
  const FadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return {FadeIn, FadeOut, opacity};
};
