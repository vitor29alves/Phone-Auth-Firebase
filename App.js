import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Screen from './src/screen';

export default function App() {
  return (
    <View style={{flex:1}}>
      <Screen />
    </View>
  );
}

