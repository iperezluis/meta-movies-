import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GradientContext} from '../context/GradientContext';
import {useFade} from '../hooks/useFade';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function GradienteBackground({children}: Props) {
  const {colors, prevcolors, setMainColor, setMainPrevColor} =
    useContext(GradientContext);

  const {FadeIn, FadeOut, opacity} = useFade();

  useEffect(() => {
    //cuanod el FadeIn termina ejecutamos la callback que sera el setMainPrevColors para mantener los colores anteriores mientras hace el cambio
    FadeIn(() => {
      setMainPrevColor(colors);
      FadeOut();
    });
  }, [colors]);
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[prevcolors.primary, prevcolors.secondary, 'white']}
        style={{...StyleSheet.absoluteFillObject}}
        start={{x: 0.1, y: 0.3}}
        end={{x: 0.5, y: 0.7}}
      />
      <Animated.View style={{...StyleSheet.absoluteFillObject, opacity}}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, 'white']}
          style={{...StyleSheet.absoluteFillObject}}
          start={{x: 0.1, y: 0.3}}
          end={{x: 0.5, y: 0.7}}
        />
      </Animated.View>
      {children}
    </View>
  );
}
