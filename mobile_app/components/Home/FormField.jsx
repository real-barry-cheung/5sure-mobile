import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import TextField from './TextField.jsx'
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import {horizontalScale, verticalScale, moderateScale} from '../../components/ScreenDimensions.jsx'


export default function FormField(props) {
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
        marginTop: verticalScale(5),
        height: verticalScale(70),
    },
    text: {
        fontFamily: 'Montserrat_700Bold',
        marginLeft: '10%',
        fontSize: 20,
    },
  });

  return (
    <View style={styles.container}>
        <Text style={styles.text}>{props.fieldName}</Text>
        <TextField placeholder={props.placeholder}></TextField>
    </View>
);
};