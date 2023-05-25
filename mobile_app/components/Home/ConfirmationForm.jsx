import React, { useState } from 'react';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { StyleSheet, Text, View} from 'react-native';
import NavigationButton from './NavigationButton.jsx'
import Modal from 'react-native-modal';
import ConfirmationDialogBox from './ConfirmationDialogBox.jsx'
import {horizontalScale, verticalScale, moderateScale} from '../../components/ScreenDimensions.jsx'

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';



function ConfirmationForm(props) {
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    let rideState = {
        state: false,
        password: ''
    }
    let ridePassword = '';
    console.log("hi " +rideState.state)

    function generateString(length, rideState) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        rideState.state = true
        console.log("within" + rideState.state)
        rideState.password = result;
    }

    console.log("yo" + rideState.state)

    let [fontsLoaded] = useFonts({
      Montserrat_400Regular,
      Montserrat_500Medium,
      Montserrat_600SemiBold, 
      Montserrat_700Bold
    });
  
    if (!fontsLoaded) {
      return null;
    } 

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            height: verticalScale(500),
            width: '100%',
            position: 'absolute'
        },
    
        titleContainer: {
            borderBottomColor: 'black',
            backgroundColor: 'white',
            borderBottomWidth: 5,
            width: '90%',
            alignSelf: 'center',
            marginBottom: '10%'
        },
    
        title: {
            fontFamily: 'Montserrat_700Bold',
            fontSize: moderateScale(32),
            textAlign: 'center',
            marginTop: '5%'
        },
    
        ETAContainer: {
            alignSelf: 'center',
        },
    
        ETAText: {
            fontFamily: 'Montserrat_600SemiBold',
            fontSize: moderateScale(40),
            textAlign: 'center'
        },

        passwordContainer: {
            alignSelf: 'center',
        },

        passwordText: {
            fontFamily: 'Montserrat_500Medium',
            fontSize: moderateScale(32),
            textAlign: 'center',
            marginTop: '5%'
        }
    });

    return (
        <View style={styles.container}>
            <Modal isVisible={confirmationOpen} transparent={true} backdropOpacity={0.4} onBackdropPress={() => setConfirmationOpen(false)}>
                <ConfirmationDialogBox yesPress={props.rideCancellation} 
                noPress={() => setConfirmationOpen(false)}
                confirmationText={'Are you sure you want to cancel?'}/>
            </Modal>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> Ride Confirmed </Text>
            </View>
            <View style={styles.ETAContainer}>
                <Text style ={styles.ETAText}> ETA: 20 minutes </Text>
            </View>
            <View style={styles.passwordContainer}>
                <Text style={styles.passwordText}>
                    Ride Password: {'o320fcp'}
                </Text>
            </View>
            <NavigationButton style={{height: verticalScale(50), bottom: '5%'}}text='Cancel Ride' onPress={() => setConfirmationOpen(true)}/>
        </View>
  );
  };

  export default ConfirmationForm