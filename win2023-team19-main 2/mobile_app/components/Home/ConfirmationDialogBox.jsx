import React, { useState } from 'react';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Header, Image, TextInput } from 'react-native';
import {horizontalScale, verticalScale, moderateScale} from '../../components/ScreenDimensions.jsx'

//import BottomSheet from '../../components/5sure-mobile/BottomSheet.tsx'

const styles = StyleSheet.create({

    confirmationContainer: {
        borderRadius: 15,
        width: horizontalScale(300),
        height: verticalScale(180),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: verticalScale(180),
        alignItems: 'center'
    },

    confirmationText: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 24,
        textAlign: 'center',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: '5%'
    },

    buttonRowContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: verticalScale(15)
    },

    confirmationButton: {
        width: horizontalScale(100),
        height: verticalScale(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,

    },

    confirmationButtonText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: moderateScale(24),
        textAlign: 'center'
    }

});

export default function RequestForm(props) {

    return (
        <View style={styles.confirmationContainer}>
        <Text style={styles.confirmationText}>
            {props.confirmationText}
        </Text>
        <View style={styles.buttonRowContainer}>
            <TouchableOpacity style={[styles.confirmationButton, { backgroundColor: '#92C28B', marginRight: '3%' }]} 
            onPress={() => {props.yesPress(); props.noPress()}}>
                <Text style={styles.confirmationButtonText}>
                    Yes
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.confirmationButton, { backgroundColor: '#C58585', marginLeft: '3%' }]} 
            onPress={() => props.noPress()}>
                <Text style={styles.confirmationButtonText}>
                    No
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}