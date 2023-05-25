import React, { useState } from 'react';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { StyleSheet, Text, ScrollView,SafeAreaView, View, TouchableOpacity, Header, Image, TextInput } from 'react-native';
import {horizontalScale, verticalScale, moderateScale} from '../../components/ScreenDimensions.jsx'
import NavigationButton from '../../components/Home/NavigationButton.jsx'
import RequestForm from '../../components/Home/RequestForm.jsx'
import ConfirmationForm from '../../components/Home/ConfirmationForm.jsx'
import Modal from 'react-native-modal';
import Constants from "expo-constants";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:3001`;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Montserrat_700Bold',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    header: {
        backgroundColor: '#820000',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: verticalScale(120),
        width: '100%',
        top: '0%'
    },

    headerTitle: {
        fontFamily: 'Montserrat_700Bold',
        color: '#D1D2D4',
        fontSize: moderateScale(40),
        alignSelf: 'center',
    },

    menuIcon: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        left: '5%',
        marginLeft: '5%'
    },

    map: {
        width: '100%',
        height: '100%'
    },

    ETAContainer: {
        flex: 1,
        flexDirection: 'row',
        flexGrow: 1,
        position: 'absolute',
        bottom: '25%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: horizontalScale(250),
        height: verticalScale(80),
        
    },

    ETAText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: moderateScale(20)
    },

});

function sendRequest() {
    fetch(uri + '/ride_requested', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "sunet": "erickha",
            "name": "Erick",
            "numPassengers": 3,
            "origin": "EVGR",
            "destination": "BOB",
            "phone_number": "8888888888"
        })
    })
        .then(response => response.text())
        .then(data => { console.log(data); })
        .catch(err => console.error(err.stack))
}

export default function LoginHome(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [rideConfirmed, setRideConfirmation] = useState(false);
    const [passwordGenerated, setRidePassword] = useState(false);

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold
    });
    if (!fontsLoaded) {
        return null;
    }

    let getModalVersion = () => {
        if (rideConfirmed == true) {
            return (<ConfirmationForm rideCancellation = {() => setRideConfirmation(false)} rideState={false}/>);
        } else {
            return (<RequestForm rideConfirmation = {() => setRideConfirmation(true)}/>);
        }
    }
    return (
        <View style={styles.container}>
            <Modal isVisible={modalOpen} transparent={true} backdropOpacity={0.2} onBackdropPress={() => setModalOpen(false)}>
            {getModalVersion()}
            </Modal>
            <Image style={styles.map} source={require('../../assets/map.png')} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}> 5-SURE </Text>
            </View>
            <SafeAreaView style={styles.ETAContainer}>
                <Text style={styles.ETAText}>Average Wait: 25 min</Text>
            </SafeAreaView>
            <NavigationButton text={'Request a Ride'} onPress={()=>setModalOpen(true)}/>
        </View>
    );
}
