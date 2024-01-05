import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Slider from '../components/slider';
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {  
  return (
    <View className='flex-1 bg-gray-400 ' >
      <LinearGradient className='absolute w-full h-full' colors={['#F0EEED', 'transparent']} />
      <Slider />
      <StatusBar style="auto" />
    </View>
  );
}
