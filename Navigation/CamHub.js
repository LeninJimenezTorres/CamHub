import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, Alert, AppState} 
        from 'react-native';
import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import * as Location from 'expo-location';

let count = 0;

const get = async () => {
  console.log('get permissions');
  try {
    return await MediaLibrary.getPermissionsAsync();
  } catch (err) {
    throw err;
  }
};

const request = async () => {
  console.log('request permissions');
  try {
    return await MediaLibrary.requestPermissionsAsync();
  } catch (err) {
    throw err;
  }
};

const CamHub = ({ navigation }) => {
  console.log('Camera Open--------------------------------------------');
  const cam = useRef(null);
  //const [isPreview, setIsPreview] = useState(false);

  const [permissions, setPermissions] = React.useState(null);
  const [isAlreadyAsked, setAsked] = React.useState(null);
  const appState = React.useRef(AppState.currentState);
  
  React.useEffect(() => {
    console.log('First time running', permissions);
    (async () => {
      const currentPermissions = await MediaLibrary.getPermissionsAsync();
      if (currentPermissions.status === 'undetermined') {
        const newPermissions = await MediaLibrary.requestPermissionsAsync();
        setAsked(true);
        console.log('got new permissions', newPermissions);
        setPermissions(newPermissions);
      }
      console.log('Getting permissions status:', currentPermissions.granted);
      return setPermissions(currentPermissions);
    })();
  }, []);

  React.useEffect(() => {
    console.log('Action useEffect run =>', count++);
    (async () => {
      console.log('async () =>');
      if (!permissions) return; // first time dont execute !
      console.log('Run and check if we can ask again');
      if (!permissions?.granted && permissions?.canAskAgain) {
        console.log('Permission is not granted and we allow to ask again.');
        // if the user already asked , we just get the new permissions.
        if (isAlreadyAsked) {
          console.log('isAlreadyAsked');
          const newPermissions = await MediaLibrary.getPermissionsAsync();
          console.log('getPermissionsAsync() =>');
          return setPermissions(newPermissions);
        }

        // if the user never asked in this app life cycle we will request.
        console.log('We prompt user and get new permissions');
        const currentPermissions = await MediaLibrary.requestPermissionsAsync();
        console.log('requestPermissionsAsync() =>', currentPermissions);
        setAsked(true);
        if (currentPermissions.granted) {
          return setPermissions(currentPermissions);
        }
      } else {
        console.log('Not allowed to Ask again', count);
      }
    })();
  }, []);

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
        const options ={allowsEditing:true, ratio:[16,9], quality:1, exif: true};//
        let photo = await cam.current.takePictureAsync(options);
        console.log(cam.current.getSupportedRatiosAsync());

        //FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+'/CamHub', { intermediates: true })
        //console.log(FileSystem.documentDirectory);
        
        const source=photo.uri;
        if (source){
          //await cam.current.pausePreview();
          
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
      //const permisoAlbum = await MediaLibrary.requestPermissionsAsync();
      const permisoAlbum = await MediaLibrary.requestPermissionsAsync();
      console.log('Estado del permiso: '+permisoAlbum.status);
      if (permisoAlbum.status='granted'){
        console.log("Funcion guardar");
        const asset = await MediaLibrary.createAssetAsync(source);
        if (asset){
          console.log("Asset created");
          //await MediaLibrary.saveToLibraryAsync(asset);
          await MediaLibrary.createAlbumAsync('CamHub',asset, false);
          //await MediaLibrary.addAssetsToAlbumAsync(asset, 'CamHub', false)
          //await FileSystem.deleteAsync(asset.uri)
          //await MediaLibrary.deleteAssetsAsync(asset);
          console.log("Foto guardada");
        }
        else {console.log("Asset not created")};

      }
      else{
        auxA=false;
        console.log("No se pudo completar la operacion por falta de permisos");
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

