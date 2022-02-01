import * as React from 'react';
import { View, StyleSheet, Button, PermissionsAndroid, Alert, Text} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Camera } from 'expo-camera';


async function requestCameraPermission () {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera ",
        //buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
      console.log("You can use the camera");
    } else {
      return false;
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const CamHub = ({ navigation }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const validar=requestCameraPermission();
  return (
    <View style={estilos.container}>
      <Text style={estilos.textoPrincipal}>Aprobado</Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  container:{flex:1, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,1)'},
  textoPrincipal:{fontSize:20, color:'#fff'},
  videoMain: { flex: 1, width: '50%', alignItems: 'stretch', borderRadius: 7 },
});

export default CamHub;
