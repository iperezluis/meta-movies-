import ImageColors from 'react-native-image-colors';

// interface Colors {
//   primary: undefined[];
//   secondary: undefined[];
// }
//changeColors la suamos para extraer los colores d ela imgen con la libreria react-native-image-colors'
export const changeColors = async (uri: string) => {
  let primary, secondary;
  try {
    const colors = await ImageColors.getColors(uri, {cache: true});
    switch (colors.platform) {
      case 'android':
        // android result properties
        primary = colors.lightVibrant;
        secondary = colors.dominant;
        console.log('estas en android');
        break;
      case 'web':
        // web result properties
        primary = colors.vibrant;
        secondary = colors.dominant;
        break;
      case 'ios':
        primary = colors.primary;
        secondary = colors.secondary;
        break;
      default:
        // console.log('ejecuatndo el getColor');
        throw new Error('The platform is not exist');
    }
  } catch (error) {
    console.log('hubo un error' + error);
  }
  // recuerda que aqui las propiedades para android y ios son de nombres diferentes por eso en el case 'ios' pruedes elegir primary y secondary y en android vibrant y otros, eso esta en la documentacion https://github.com/osamaqarem/react-native-image-colors

  return [primary, secondary];
};
