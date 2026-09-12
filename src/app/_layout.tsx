import * as SplashScreen from 'expo-splash-screen';
import { Text, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <View>
      <Text>Hello!</Text>
    </View>
  );
}
