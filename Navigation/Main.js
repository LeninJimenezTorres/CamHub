import {
    View, Text, StyleSheet,
    Alert, Button, TouchableOpacity,
    Image, ImageBackground, Linking,
    Dimensions, FlatList, Animated,
} from 'react-native';
import React, {useState} from 'react';
import { Video, AVPlaybackStatus } from 'expo-av';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Link, NavigationContainer } from '@react-navigation/native';
import Camera from './Camera';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createNativeStackNavigator();

const FUNCIONES = [ 
    {comando: require("../Galery/xsd.jpg"), name:'Saturation'},
    {comando: require("../Galery/xsd.jpg"), name:'Contrast'},
    {comando: require("../Galery/xsd.jpg"), name:'Lighting'},
    {comando: require("../Galery/xsd.jpg"), name:'Hue'},
    {comando: require("../Galery/xsd.jpg"), name:'Blur'},
    {comando: require("../Galery/xsd.jpg"), name:'Filters'},   
]


const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'Fourth Item',
    },
  ];
  
const Item = ({ title }) => (
    <View style={estilos.posterImage}>
      <Text style={estilos.textoAlter}>{title}</Text>
    </View>
  );

const ancho = Dimensions.get("window").width;
const alto = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = ancho * 0.7;
const ESPACIO = 10;

const Main = ({ navigation }) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const renderItem = ({ item }) => <Item title={item.title} />;

    return (
        <View style={estilos.containerMain}>
            <View style={estilos.containerLogo}>
                <Text style={estilos.textoClaro}>CAM
                    <Text> </Text>
                    <LinearGradient
                        colors={['#FF34E3', '#1999A0']}
                        start={[0.0, 0.0]}
                        end={[1.0, 1.0]}
                        style={estilos.contenedorHub}>
                        <Text style={estilos.textoHub}>hub</Text>
                    </LinearGradient>
                </Text>
            </View>
            <View style={estilos.containerPresen}>
                <View style={estilos.containerControlF1}>
                    <View style={estilos.containerContrF1C1}>
                        <Text style={estilos.textoClaro2}>Realtime camera controls</Text>
                    </View>
                    <View style={estilos.containerContrF1C2}>
                        <Image source={require('../Galery/icon_settings.png')} style={estilos.iconSettings} />
                    </View>
                </View>
                <View style={estilos.containerControlF2}>
                    <View style={estilos.containerContrF2C0}>
                        
                        <FlatList
                            data={FUNCIONES}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={ ({ item }) => 
                                <View style={estilos.posterImage}>
                                    <Image style={{backgroundColor:'rgba(255,255,255,0.1)',width:'100%', height:'100%', resizeMode:'cover', justifyContent:'center', alignContent:'center', alignSelf:'center', alignItems:'center'}}
                                            source={item.comando}
                                    />
                                    <Text style={estilos.textoAlter}>{item.name}</Text>
                                </View>
                            } 
                            keyExtractor={item => item.id}
                        />

                        {/* <FlatList 
                            data={DATA}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItem} 
                            keyExtractor={item => item.id} 
                        /> */}

                    </View>
                </View>
            </View>
            <View style={estilos.containerCam}>
                <View style={estilos.containerCamInter}>
                    <View style={estilos.containerCamInter2}>
                        <ImageBackground
                            source={require('../Galery/camera2.png')}
                            resizeMode='cover'
                            style={estilos.iconCamera}>
                            <TouchableOpacity style={estilos.botonCamara}
                                title="Go to Camera"
                                onPress={() => navigation.navigate('Camera')}>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                </View>
            </View>
            <View style={estilos.containerDonation}>
                <View style={estilos.containerDonaF1}>
                    <View style={estilos.containerDonaF1C1}>
                        <Text style={estilos.textoClaro2}>Help us</Text>
                    </View>
                    <View style={estilos.containerDonaF1C2}>
                        <Image source={require('../Galery/icon_donate.png')} style={estilos.iconDonate} />
                    </View>
                </View>
                <View style={estilos.containerDonaF2}>
                    <View style={estilos.containerDonaF2C1}>
                        <TouchableOpacity
                            title='Watch a video'
                            onPress={() => Alert.alert('Este es el video')}
                            style={estilos.botonVideo}>
                            <Text style={estilos.textoClaro2}>Wath a video</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={estilos.containerDonaF2C2}>
                        <View style={estilos.containerDonaF2C2_2}>
                            <ImageBackground
                                source={require('../Galery/icon_paypal.png')}
                                resizeMode='contain'
                                style={estilos.iconPaypal}>
                                <TouchableOpacity style={estilos.botonPaypal}
                                    onPress={() => Linking.openURL("https://www.paypal.me/leninjimeneztorres")}>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
            </View>
            <View style={estilos.containerCreator}>
                <TouchableOpacity
                    title='Creator'
                    onPress={() => Linking.openURL("https://www.paypal.me/leninjimeneztorres")}
                    style={estilos.botonCreator}>
                    <Text style={estilos.textoClaroSmall}>Created by Led</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const estilos = StyleSheet.create({
    containerMain: { backgroundColor: "#171726", flex: 1 },
    containerLogo: { flex: 0.5, backgroundColor: "#0D0D16", justifyContent: "center", alignItems: "center", paddingTop: 45, paddingBottom: 15 },
    contenedorHub: { height: 23, width: 45, justifyContent: "center", alignItems: "center", borderRadius: 4 },
    containerCam: { flex: 3, backgroundColor: "#0D0D16", justifyContent: "center", alignItems: "center" },
    containerCamInter: { backgroundColor: "#171726", height: 120, width: 120, justifyContent: "center", alignItems: "center", borderRadius: 10 },
    containerCamInter2: { backgroundColor: "rgba(210,50,10,1)", height: 90, width: 90, justifyContent: "center", alignItems: "center", borderRadius: 50 },
    containerPresen: { flex: 5, backgroundColor: "#171726", justifyContent: "center", alignItems: "center" },
    containerDonation: { flex: 2, backgroundColor: "#171726", justifyContent: "center", alignItems: "center" },
    containerCreator: { flex: 0.5, backgroundColor: "#0D0D16", justifyContent: "center", alignItems: "center" },

    containerDonaF1: { flex: 1, flexDirection: 'row', backgroundColor: "rgba(255,0,0,0)", justifyContent: "center", alignItems: "center", width: '100%', paddingTop: '1%' },
    containerDonaF2: { flex: 3, flexDirection: 'row', backgroundColor: "rgba(255,0,0,0)", justifyContent: "center", alignItems: "center", width: '100%' },
    containerDonaF1C1: { flex: 1, flexDirection: 'column', backgroundColor: "rgba(255,0,0,0)", justifyContent: "center", alignItems: "flex-start" },
    containerDonaF1C2: { flex: 1, flexDirection: 'column', backgroundColor: "rgba(255,0,0,0)", justifyContent: 'center', alignItems: "flex-end", padding: '1%', paddingRight: '5%' },
    containerDonaF2C1: { flex: 1, flexDirection: 'column', backgroundColor: "rgba(255,0,0,0)", justifyContent: "center", alignItems: "center" },
    containerDonaF2C2: { flex: 1, flexDirection: 'column', backgroundColor: "rgba(0,255,0,0)", justifyContent: 'center', alignItems: "center" },
    containerDonaF2C2_2: { flex: 1, flexDirection: 'row', backgroundColor: "#0D0D16", justifyContent: 'center', alignItems: "center", width: '70%', marginTop: '9%', marginBottom: '9%', borderRadius: 7, paddingLeft: '13%' },

    containerControlF1: { flex: 1, flexDirection: 'row', backgroundColor: "rgba(255,0,0,0)", justifyContent: "center", alignItems: "center", width: '100%' },
    containerControlF2: { flex: 6, backgroundColor: "rgba(255,0,0,0)", justifyContent: "center", alignItems: "center", width: '100%' },
    containerContrF1C1: { flex: 1, flexDirection: 'column', backgroundColor: "rgba(255,0,0,0)", justifyContent: "center", alignItems: "flex-start" },
    containerContrF1C2: { flex: 1, flexDirection: 'column', backgroundColor: "rgba(255,0,0,0)", justifyContent: 'center', alignItems: "flex-end", paddingRight: '5%' },
    containerContrF2C0: { flex: 1, flexDirection: 'column', backgroundColor: "rgba(0,0,0,1)", justifyContent: 'center', alignItems: "center"},

    iconCamera: { height: 90, width: 90, borderRadius: 50 },
    iconDonate: { height: '100%', width: '10%' },
    iconSettings: { height: '40%', width: '10%' },
    iconPaypal: { flex: 1, height: 90, width: 90, justifyContent: 'center', alignSelf: 'center' },

    botonCamara: { width: 90, height: 90, backgroundColor: 'rgba(0,0,0,0)', borderRadius: 50 },
    botonVideo: { flex: 0.5, justifyContent: 'center', alignItems: "center", backgroundColor: "#0D0D16", width: '70%', borderRadius: 7, padding: 4 },
    botonPaypal: { flex: 1.5, justifyContent: 'center', alignItems: "center", alignContent: 'center', backgroundColor: 'rgba(0,0,0,0)', width: '100%', borderColor: 'rgba(1,0,0,1)', borderWidth: 0 },
    botonCreator: { flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "#0D0D16", width: '100%', borderRadius: 0 },

    textoOscuro: { color: "#0D0D16", fontSize: 20, padding: 1 },
    textoClaro: { color: "#fff", fontSize: 24, paddingBottom: 1 },
    textoClaro2: { color: "#fff", fontSize: 14, paddingLeft: '9%' },
    textoClaroSmall: { color: "#fff", fontSize: 10, padding: 0 },
    textoHub: { color: "#fff", fontSize: 17, paddingBottom: 0 },
    textoAlter: { color: "#fff", fontSize: 17, padding: 7 },
    

    videoMain: { flex: 1, width: '50%', alignItems: 'stretch', borderRadius: 7 },

    posterImage: { flex:1, width:200,height: '95%', resizeMode: 'cover', borderRadius: 7, backgroundColor:'rgba(0,255,0,0.1)', margin:5, justifyContent:'center', alignItems:'center' }
});

export default Main;