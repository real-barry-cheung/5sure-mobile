import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginHome from "./screens/Login/LoginHome.js"
import LoginCredentials from "./screens/Login/LoginCredentials.js"
import RideHome from "./screens/Home/RideHome.js"


const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer> 
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        >
          <Stack.Screen name="LoginHome" component={LoginHome}/>
          <Stack.Screen name="LoginCredentials" component={LoginCredentials} initialParams={{buttonPressed: 'Login'}}/>
          <Stack.Screen name="RideHome" component={RideHome}/>

        </Stack.Navigator>
    </NavigationContainer>
  );
}
