import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Home from './home';
import {StatusBar} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();

function MyTabs({navigation}) {
  return (
    <>
      <StatusBar hidden />
      <Tab.Navigator
        tabBarShowLabel={false}
        screenOptions={{
          tabBarShowLabel: false,
          headerTitle: () => {
            return <></>;
          },
          headerLeft: () => {
            return (
              <View>
                <Image
                  style={{width: 80, height: 40}}
                  source={require('../../assets/images/dotcom.png')}
                />
              </View>
            );
          },
          headerRight: () => {
            return (
              <View>
                <FontAwesome
                  onPress={() => {
                    Promise.all([
                      AsyncStorage.setItem('isLogged', 'false'),
                      AsyncStorage.setItem('id', '0'),
                    ]).then(([res1, res2]) => {
                      navigation.replace('Login');
                    });
                  }}
                  name="power-off"
                  size={25}
                  style={{marginRight: 20, color: '#000'}}
                />
              </View>
            );
          },
        }}>
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Feather
                  name="home"
                  size={focused ? 22 : 16}
                  style={{color: focused ? '#0B2447' : 'gray'}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 11,
                    fontFamily: 'Montserrat-Medium',
                    color: focused ? '#0B2447' : 'gray',
                  }}>
                  Home
                </Text>
              </View>
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome
                  name="user"
                  size={focused ? 22 : 16}
                  style={{color: focused ? '#0B2447' : 'gray'}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 11,
                    fontFamily: 'Montserrat-Medium',
                    color: focused ? '#0B2447' : 'gray',
                  }}>
                  Profile
                </Text>
              </View>
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
}

export default MyTabs;
