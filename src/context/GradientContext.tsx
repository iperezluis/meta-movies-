import React, {useState} from 'react';

import {createContext} from 'react';
import {StringLiteralLike} from 'typescript';

interface ImageColor {
  primary: string;
  secondary: string;
}
interface ContextProps {
  colors: ImageColor;
  prevcolors: ImageColor;
  setMainColor: (colors: ImageColor) => void;
  setMainPrevColor: (colors: ImageColor) => void;
}
export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [colors, setColors] = useState<ImageColor>({
    primary: 'white',
    secondary: 'blue',
  });
  const [prevcolors, setPrevColors] = useState<ImageColor>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const setMainColor = (colors: ImageColor) => {
    setColors(colors);
  };
  const setMainPrevColor = (colors: ImageColor) => {
    setPrevColors(colors);
  };
  return (
    <GradientContext.Provider
      value={{colors, prevcolors, setMainPrevColor, setMainColor}}>
      {children}
    </GradientContext.Provider>
  );
};
