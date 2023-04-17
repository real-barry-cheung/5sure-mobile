import React, { useState, useEffect } from 'react';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { StyleSheet, Text, KeyboardAvoidingView, View, TouchableOpacity} from 'react-native';
import {horizontalScale, verticalScale, moderateScale} from '../../components/ScreenDimensions.jsx'
import NavigationButton from './NavigationButton.jsx'
import ConfirmationDialogBox from './ConfirmationDialogBox.jsx'
import FormField from '../../components/Home/FormField.jsx'
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '90%',
        width: '100%',
        marginTop: '40%',
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
        fontSize: 32,
        textAlign: 'center',
        marginTop: '5%'
    },

    ETAContainer: {
        marginTop: verticalScale(20),
        alignSelf: 'center',
    },

    ETAText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: moderateScale(48),
        textAlign: 'center'
    },
});

export default function RequestForm(props) {
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [rideConfirmed, setRideConfirmation] = useState(false);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Modal isVisible={confirmationOpen} transparent={true} backdropOpacity={0.3} onBackdropPress={() => setConfirmationOpen(false)}>
                <ConfirmationDialogBox yesPress={() => props.rideConfirmation()} 
                noPress={() => setConfirmationOpen(false)}
                confirmationText={'Are you sure you want to request?'}/>
            </Modal>
        <View style={styles.titleContainer}>
            <Text style={styles.title}> Request a Ride </Text>
        </View>
        <View>
            <FormField fieldName={'Location'} placeholder = {'Crothers Hall'}/>
            <FormField fieldName={'Destination'} placeholder = {'Main Quad'}/>
            <FormField fieldName={'Number of Passengers'} placeholder = {'3'}/>
            <FormField fieldName={'Confirm SUNet ID'} placeholder = {'barryc4'}/>
        </View>
        <View style={styles.ETAContainer}>
            <Text style={styles.ETAText}>
                ETA: TBD
            </Text>
        </View>
        <NavigationButton onPress={() => setConfirmationOpen(true)} text={'Request'}/>
    </KeyboardAvoidingView>
    );
}