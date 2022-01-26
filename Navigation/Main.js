import { View, Text, StyleSheet, Alert, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
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

const Main = ({ navigation }) => {
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
            <View style={estilos.containerCam}>
                <View style={estilos.containerCamInter}>
                    <View style={estilos.containerCamInter2}>
                        <ImageBackground
                            source={require('../Galery/camera2.png')}
                            resizeMode='cover'
                            style={estilos.iconCamera}>
                            <TouchableOpacity style={estilos.botonCamara}
                                title="Go to Camera"
                                onPress={() => navigation.navigate('Camera')}
                            >
                            </TouchableOpacity>
                        </ImageBackground>


                    </View>
                </View>
            </View>
        </View>
    );
};
const estilos = StyleSheet.create({
    containerMain: { backgroundColor: "#171726", flex: 1 },
    containerLogo: { backgroundColor: "#0D0D16", height: 95, justifyContent: "center", alignItems: "center", marginTop: 0, paddingTop: 45, paddingBottom: 15 },
    containerCam: { backgroundColor: "#0D0D16", height: 180, justifyContent: "center", alignItems: "center", marginTop: 300 },
    containerCamInter: { backgroundColor: "#171726", height: 120, width: 120, justifyContent: "center", alignItems: "center", borderRadius: 10 },
    containerCamInter2: { backgroundColor: "rgba(0,0,0,0)", height: 90, width:90, justifyContent: "center", alignItems: "center", borderRadius: 50 },
    iconCamera: { height: 90, width: 90, borderRadius: 50 },
    textoOscuro: { color: "#0D0D16", fontSize: 20, padding: 1 },
    textoClaro: { color: "#fff", fontSize: 24, paddingBottom: 4 },
    textoHub: { color: "#fff", fontSize: 17, paddingBottom: 0 },
    contenedorHub: { height: 23, width: 45, flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 4, paddingBottom: 0, marginTop: 2 },
    botonCamara: { width: 90, height: 90, backgroundColor: 'rgba(0,0,0,0)', borderRadius:50 }
});

export default Main;
