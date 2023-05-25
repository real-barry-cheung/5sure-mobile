import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, useWindowDimensions} from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import { horizontalScale, verticalScale, moderateScale} from '../../components/ScreenDimensions.jsx'


export default function TextField({text, onPress}) {

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
        backgroundColor: '#b1040e',
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        height: verticalScale(70),
        width: horizontalScale(150),
        bottom: verticalScale(0),
        marginTop: verticalScale(30)
    },

    text: {
        fontFamily: 'Montserrat_700Bold',
        color: '#ffffff',
        fontSize: moderateScale(28),
        alignSelf: 'center',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style ={styles.text}> {text} </Text>
    </TouchableOpacity>
  )
};