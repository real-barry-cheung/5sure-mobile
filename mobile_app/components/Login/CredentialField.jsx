import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import TextField from './TextField.jsx'
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import {horizontalScale, verticalScale, moderateScale} from '../../components/ScreenDimensions.jsx'


export default function FormField(props) {
  console.log(props.onChangeText)
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
        marginTop: verticalScale(25),
        height: verticalScale(80),
        width: horizontalScale(300),
        alignSelf: 'center',
        justifyContent: 'center',
    },
    text:{
        fontFamily: 'Montserrat_700Bold',
        color: '#820000',
        fontSize: moderateScale(30),
    },
  });

  return (
    <SafeAreaView>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Text style={styles.text}>{props.fieldName}</Text>
            <TextField placeholder={props.placeholder} 
            secureTextEntry={props.secureTextEntry} 
            onChangeText={props.onChangeText}/>
        </KeyboardAvoidingView>
    </SafeAreaView>
   
);
};