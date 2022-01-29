import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

const Camera = ({ navigation }) => {
  const video = React.useRef(null);
  const video2 = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={estilos.container}>
    </View>
  );
};
const estilos = StyleSheet.create({
  container:{flex:1, width:'100%', height:'100%'},
  videoMain: { flex: 1, width: '50%', alignItems: 'stretch', borderRadius: 7 },
});
export default Camera;
