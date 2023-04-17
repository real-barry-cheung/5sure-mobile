import React, {useState} from 'react'
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { StyleSheet, Text, SafeAreaView, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import NavigationButton from '../../components/Login/NavigationButton.jsx'
import CredentialField from '../../components/Login/CredentialField.jsx'
import { verticalScale, horizontalScale, moderateScale } from '../../components/ScreenDimensions.jsx'
import Constants from "expo-constants";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:3001`;



function LoginCredentials({route, navigation}, props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setNumber] = useState('');
    const [SUNetID, setID] = useState('');

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold
    });
    if (!fontsLoaded) {
        return null;
    }

    
    async function validateLoginRequest(username, password) {
        let response = await fetch(uri + '/validate_user_creds', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sunetid: username,
                password: password
            })
        })
        if (response.status != 200) return false;
        return true;
    }

    async function sendRegisterRequest(name, sunetid, phoneNumber, email, password) {
        fetch(uri + '/create_user_creds', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                sunetid: sunetid,
                phoneNumber: phoneNumber,
                email: email,
                password: password
            })
        })
            .then(response => response.text())
            .then(data => { console.log(data); })
            .catch(err => console.error(err.stack))
    }



    let getCredentialsVersion = (name, email, password, phoneNumber, SUNetID) => {
        if (route.params.buttonClicked=='Login') {
            return (
                <View style={styles.credentialContainer}>
                    <Text style={styles.title}> Login </Text>
                    <CredentialField fieldName={'SUNet ID'} 
                    placeholder={'jstanford'} 
                    onChangeText={() => {SUNetID => setID(SUNetID); console.log(SUNetID)}}
                    />
                    <CredentialField fieldName={'Password'} 
                    placeholder={'****************'} 
                    secureTextEntry={true}
                    value={password}
                    onChangeText={() => {password => setPassword(password); console.log(password)}}/>
                    <NavigationButton text={'Submit'} onPress={()=> {async () => {
                        var successfulSignIn = await validateLoginRequest(SUNetID, password);
                        console.log("SIGNED IN ")
                        console.log(successfulSignIn)
                    }; navigation.navigate('RideHome')}}/>
                </View>
            );
        } else {
            return (
                <KeyboardAvoidingView style={styles.credentialContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Text style={styles.title}> Register </Text>
                    <CredentialField fieldName={'Name'} 
                    placeholder={'Jane Stanford'} 
                    onChangeText={name => setName(name)}/>
                    <CredentialField fieldName={'Email'} placeholder={'jstanford@stanford.edu'} />
                    <CredentialField fieldName={'Password'} placeholder={'************'} secureTextEntry={true} />
                    <CredentialField fieldName={'Phone Number'} placeholder={'1234567890'} />
                    <CredentialField fieldName={'SUNet ID'} placeholder={'jstanford1'} />
                    <NavigationButton text={'Submit'} onPress={() => {
                        sendRegisterRequest();
                        navigation.navigate('RideHome')
                    }} />
                   </KeyboardAvoidingView>
                </KeyboardAvoidingView>
            )
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            fontFamily: 'Montserrat_700Bold',
            backgroundColor: '#ffffff',
        },

        title: {
            fontFamily: 'Montserrat_600SemiBold',
            color: '#820000',
            fontSize: moderateScale(44),
            width: horizontalScale(300),
            marginBottom: verticalScale(25)
        },

        credentialContainer: {
            alignSelf: 'center',
            marginTop: verticalScale(50),
            width: '100%',
        },
    });


    return (
        <View style={styles.container}>
            {getCredentialsVersion(name, email, password, phoneNumber, SUNetID)}
        </View>
    );
}
export default LoginCredentials
