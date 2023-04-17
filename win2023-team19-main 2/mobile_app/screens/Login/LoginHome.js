import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import NavigationButton from '../../components/Login/NavigationButton.jsx'
import { verticalScale, moderateScale} from '../../components/ScreenDimensions.jsx'


export default function LoginHome(props) {

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
          flex: 1,
          fontFamily: 'Montserrat_700Bold',
          backgroundColor: '#ffffff',
          justifyContent: 'center',
        },
      
        titleContainer: {
            alignItems: 'center',
            backgroundColor: '#ffffff',
        },
    
        homeTitle: {
          fontFamily: 'Montserrat_700Bold',
          color: '#820000',
          fontSize: moderateScale(40),
          textAlign: 'center',
        },
      });

    return(
    <View style={styles.container}>
        <View style = {styles.titleContainer}>
            <Text style={styles.homeTitle}> Welcome to 5-SURE </Text>
        </View>
        <View style={{flex: 1, position:'absolute', alignSelf:'center', bottom: verticalScale(100)}}>
          <NavigationButton text={'Login'} 
          onPress={() => {props.navigation.navigate('LoginCredentials', {buttonClicked: 'Login'})}} />
          <NavigationButton text={'Register'} 
          onPress={() => {props.navigation.navigate('LoginCredentials', {buttonClicked: 'Register'})}}/>
        </View>
    </View>
    );
}
