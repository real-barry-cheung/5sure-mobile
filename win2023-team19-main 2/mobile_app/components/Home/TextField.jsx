import React from 'react';
import { StyleSheet, TextInput} from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import {horizontalScale, verticalScale, moderateScale} from '../../components/ScreenDimensions.jsx'


export default function TextField(props) {
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
    textInputContainer: {
      backgroundColor: '#FFFFFF',
      height: verticalScale(40),
      width: horizontalScale(250),
      borderRadius: '15%',
      marginLeft: '10%',
      marginTop: verticalScale(3),
      borderColor: 'black',
      borderWidth: 0.5,
      padding: 10,
      fontFamily: 'Montserrat_400Regular'
  },
  });

  return (<TextInput style={styles.textInputContainer} 
    clearTextOnFocus={true} 
    clearButtonMode={'while-editing'} 
    placeholderTextColor={'gray'}
    placeholder={props.placeholder}>
  </TextInput>);
  
};