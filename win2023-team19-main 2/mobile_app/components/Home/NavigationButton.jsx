import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import {horizontalScale, verticalScale, moderateScale} from '../../components/ScreenDimensions.jsx'


export default function TextField({text, onPress, style}) {
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
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      height: verticalScale(50),
      width: horizontalScale(250),
      bottom: '15%'
  },

  text: {
      fontFamily: 'Montserrat_700Bold',
      color: '#ffffff',
      alignSelf: 'center',
      fontSize: moderateScale(28),
      padding: 5
  },
  
});

  return (<View style={[styles.container, style]}>
            <TouchableOpacity onPress={onPress}>
                <Text style ={styles.text}> {text} </Text>
            </TouchableOpacity>
        </View>
  )
};