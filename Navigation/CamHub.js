import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

const CamHub = ({ navigation }) => {
  const cam = useRef(null);
  //const cam = React.createRef(null);

  async function takePic(){
    if( cam ) {
      console.log('ok');
      const options = {quality: 1, base64: true };
      const data = await cam.current.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  const takePicture = async () =>{
    if( cam) {
      console.log('Take a picture');
      try{
        let photo = await cam.current.takePictureAsync({allowsEditing:true, aspect:[4,3], quality:1, exif: true});
        console.log(cam.current.getSupportedRatiosAsync());
        const source=photo.uri;
        if (source){
          handleSave(source);
        }
        return photo;
      }
      catch (e){
        console.log(e);
      }
    }
  }

  const handleSave = async (source)=>{
    const {status} = await MediaLibrary.requestPermissionsAsync();
    if (status==="granted"){
      console.log("Permisos concedidos");
      await MediaLibrary.createAssetAsync(source);
      console.log("Foto guardada");
    }
    else{
      console.log("No concede permisos");
    }
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={{width:'100%', height:'100%', backgroundColor:'rgba(0,0,250,0)'}}>
      <View style={estilos.containerInicial} ></View>
      <View style={estilos.containerCamera}>
        <View style={estilos.containerOptions}>
          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.touchIcon}>
              <Image
                style={estilos.imagenIcon}
                source={require('../Galery/icon_contrast.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.touchIcon}>
              <Image
                style={estilos.imagenIcon}
                source={require('../Galery/icon_saturation.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.touchIcon}>
              <Image
                style={estilos.imagenIcon}
                source={require('../Galery/icon_matiz.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.touchIcon}>
              <Image
                style={estilos.imagenIcon}
                source={require('../Galery/icon_blur.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.touchIcon}>
              <Image
                style={estilos.imagenIcon}
                source={require('../Galery/icon_filter.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.touchIcon}>
              <Image
                style={estilos.imagenIcon}
                source={require('../Galery/icon_flash.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.touchIcon}>
              <Image
                style={estilos.imagenIcon}
                source={require('../Galery/icon_setting.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={estilos.containerCamSpace}>
          <Camera style={estilos.camera} 
            type={type}
            //ref={ref => (this.cameraEl = ref)}
            ref={cam}
          >

          </Camera>
        </View>
        <View style={estilos.containerCamSub}>
          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.touchIcon}>
              <Image
                style={estilos.imagenIconSec}
                source={require('../Galery/icon_zoom.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.touchIcon}>
              <Image
                style={estilos.imagenIconSec}
                source={require('../Galery/icon_video.png')}
              />
            </TouchableOpacity>
          </View>
          

          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.touchIcon}
              //onPress={ async ()=> {const r=await takePicture();Alert.alert("DEBUG", JSON.stringify(r))}  }
              onPress={ async ()=> await takePicture()}
            >
              <Image
                style={estilos.imagenIcon}
                source={require('../Galery/icon_camera.png')}
              />
            </TouchableOpacity>
          </View>


          <View style={estilos.containerIcons}>
            <TouchableOpacity 
              style={estilos.touchIcon}
              onPress={ ()=> { 
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
                }
              }
            >
              <Image
                style={estilos.imagenIconSec}
                source={require('../Galery/icon_flip.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={estilos.containerIcons}>
            <TouchableOpacity style={estilos.imagenMin}>
              <Image
                style={estilos.imagenIcon}
                //source={require('../Galery/icon_contras.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  containerInicial:{flex:0.15, flexDirection:'row', width:'100%', backgroundColor:'rgba(0,0,40,1)', marginBottom:0},
  containerCamera:{flex:4, flexDirection:'column', width:'100%', backgroundColor:'rgba(0,0,40,1)', marginBottom:0},
  containerOptions:{flex:1,flexDirection:'row', width:'100%', backgroundColor:'rgba(250,250,250,0)', marginBottom:0},
  containerCamSpace:{flex:12,flexDirection:'row', width:'100%', backgroundColor:'rgba(50,50,50,1)', marginBottom:0},
  containerCamSub:{flex:2,flexDirection:'row', width:'100%', backgroundColor:'rgba(0,0,10,0)', marginBottom:0},
  containerIcons:{flex:1, width:'100%' ,flexDirection:'column', backgroundColor:'rgba(0,0,100,0)', marginBottom:0, borderColor:'#000', borderWidth:0},
  
  touchIcon:{width:'100%', height:'100%',padding:'5%' ,justifyContent:'center', alignSelf:'center', backgroundColor:'rgba(0,0,0,0)'},
  imagenIcon:{resizeMode:'contain',width:'70%', height:'70%', justifyContent:'center', alignSelf:'center', alignContent:'center'},
  imagenIconSec:{resizeMode:'contain',width:'40%', height:'40%', justifyContent:'center', alignSelf:'center', alignContent:'center'},
  imagenMin:{resizeMode:'contain',width:'100%', height:'100%', justifyContent:'center', alignSelf:'center', alignContent:'center'},

  textoPrincipal:{fontSize:20, color:'#fff'},
  camera: {flex: 1},
});

export default CamHub;

