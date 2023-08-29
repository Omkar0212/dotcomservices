import { createStackNavigator } from '@react-navigation/stack';
import Logo from './logo';
import SplashScreen from './SplashScreen';
import Login from './login';
import Signup from './signup';
import MyTabs from './bottomTab';
import SingleView from './singleview';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Logo'
    screenOptions={{
      headerTitleStyle:{
        color:'#000',
        fontSize:14,
        fontFamily:'Montserrat-Bold'
      }
    }}
    >
      <Stack.Screen options={{
          headerShown: false,
        }} name="Signup" component={Signup} />
      <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Logo" component={Logo} />
      <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Splash Screen" component={SplashScreen} />
      <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="MyTabs" 
      
      component={MyTabs} />
      <Stack.Screen
      options={{
        headerShown: true,
      }}
      name="Service Detail" 
      
      component={SingleView} />
      <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default MyStack