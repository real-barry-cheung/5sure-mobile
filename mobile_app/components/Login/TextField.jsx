import React from 'react';
import { StyleSheet, TextInput} from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import {verticalScale, horizontalScale} from '../ScreenDimensions.jsx'

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
        marginTop: verticalScale(3),
        borderColor: 'black',
        borderWidth: 0.5,
        padding: 10,
        fontFamily: 'Montserrat_400Regular'
  },
  });
  console.log(props.onChangeText)
  console.log("this is the textfield")

  return (<TextInput style={[styles.textInputContainer, props.style]} 
    clearTextOnFocus={false} 

    clearButtonMode={'while-editing'} 
    secureTextEntry={props.secureTextEntry}
    placeholder={props.placeholder}
    onChangeText={props.onChangeText}
    >

  </TextInput>);
  
};