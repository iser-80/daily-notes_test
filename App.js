import { useFonts } from 'expo-font';
import AppNavigator from './src/navigator/appNavigator';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Exo-bold': require('./assets/fonts/Exo2-Bold.ttf'),
    'Exo-extraBold': require('./assets/fonts/Exo2-ExtraBold.ttf'),
    'Exo-italic': require('./assets/fonts/Exo2-Italic.ttf'),
    'Exo-light': require('./assets/fonts/Exo2-Light.ttf'),
    'Exo-medium': require('./assets/fonts/Exo2-Medium.ttf'),
    'Exo-regular': require('./assets/fonts/Exo2-Regular.ttf'),
    'Exo-semiBold': require('./assets/fonts/Exo2-SemiBold.ttf'),

    'Nunito-bold': require('./assets/fonts/NunitoSans_7pt_Condensed-Bold.ttf'),
    'Nunito-extraBold': require('./assets/fonts/NunitoSans_7pt_Condensed-ExtraBold.ttf'),
    'Nunito-italic': require('./assets/fonts/NunitoSans_7pt_Condensed-Italic.ttf'),
    'Nunito-light': require('./assets/fonts/NunitoSans_7pt_Condensed-Light.ttf'),
    'Nunito-medium': require('./assets/fonts/NunitoSans_7pt_Condensed-Medium.ttf'),
    'Nunito-regular': require('./assets/fonts/NunitoSans_7pt_Condensed-Regular.ttf'),
    'Nunito-semiBold': require('./assets/fonts/NunitoSans_7pt_Condensed-SemiBold.ttf'),
  })

  if(!fontsLoaded){
    return null
  }

  return (
    <MenuProvider>
      <AppNavigator />
    </MenuProvider>
  )
}

