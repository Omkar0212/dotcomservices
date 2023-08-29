import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Alert} from 'react-native';
import Loader from './Loader';
import axios from 'axios';
import {useRef, useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Login = ({navigation}) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [checkPass, setCheckPass] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, seterror] = useState(false);

  const handleLogin = async () => {
    setCheckPass(false);
    setCheckUser(false);
    if (email === '') {
      setCheckUser(true);
    } else if (pass === '') {
      setCheckPass(true);
    } else {
      setLoading(true);
      const data = {
        user: email,
        pass: pass,
      };

      let url = `https://dotcomservices.in/API/login.php`;
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data === false) {
          seterror(true);
          setLoading(false);
        } else {
          setLoad(true);
          AsyncStorage.setItem('isLogged', 'true');
          AsyncStorage.setItem('id', JSON.stringify(response.data));
          setLoading(false);
          setLoad(false);
          navigation.replace('MyTabs');
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert(error);
      }
    }
  };
  return (
    <>
      <StatusBar hidden />
      {load ? (
        <Loader />
      ) : (
        <View style={{flex: 1, paddingVertical: 0, backgroundColor: '#0B2447'}}>
          
          {/* <View style={{backgroundColor:'#090580', padding:8,position:'absolute', width:350,height:350, borderRadius:175, bottom:'-20%', right:'-50%'}}></View> */}
          {/* <View style={{backgroundColor:'#090580', padding:8,position:'absolute', width:350,height:350, borderRadius:175, bottom:'-30%', left:'0%'}}></View> */}
          <View style={Styles.box}>
            
              <View>
                <Image
                  source={require('../../assets/images/dotcom.png')}
                  style={{
                    width: 130,
                    borderRadius: 10,
                    height: 100,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: 20,
                  }}
                />
                <Text
                  style={[Styles.Title, {marginTop: 0, textAlign: 'center'}]}>
                  SIGN IN
                </Text>
                {error ? (
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    Invalid Username & Password
                  </Text>
                ) : (
                  <></>
                )}

                <View>
                  <View
                    style={[
                      Styles.inputconatiner,
                      {borderColor: checkUser ? 'tomato' : '#A1C2F1'},
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TextInput
                        value={email}
                        onChangeText={val => {
                          setEmail(val);
                        }}
                        style={Styles.input}
                        placeholder="Enter email"
                        placeholderTextColor={'gray'}
                      />
                      <FontAwesome style={Styles.icon} name="user" size={22} />
                    </View>
                  </View>

                  <View
                    style={[
                      Styles.inputconatiner,
                      {borderColor: checkPass ? 'tomato' : '#A1C2F1'},
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TextInput
                        value={pass}
                        onChangeText={val => {
                          setPass(val);
                        }}
                        placeholder="Enter password"
                        placeholderTextColor={'gray'}
                        style={Styles.input}
                      />
                      <MaterialCommunityIcons
                        style={Styles.icon}
                        name="key"
                        size={22}
                      />
                    </View>
                  </View>

                  <View
                    style={[
                      Styles.inputconatiner,
                      {borderWidth: 0, padding: 0},
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                      
                        handleLogin();
                      }}
                      style={Styles.btn}>
                      {loading ? (
                        <ActivityIndicator color={'#000'} />
                      ) : (
                        <Text style={Styles.btnText}>SIGN IN</Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => {
                      navigation.navigate('Signup');
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: 15,
                        fontFamily: 'OpenSans-Regular',
                        color: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        verticalAlign: 'middle',
                      }}>
                      Don't you have an account ? Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            
          </View>
        </View>
      )}
    </>
  );
};
export default Login;

const Styles = StyleSheet.create({
  box: {
    paddingHorizontal:20,
    width:'100%',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logBox: {
    width: '90%',
    marginVertical: 10,

    borderRadius: 20,

    paddingHorizontal: 20,
  },
  input: {
    width: '85%',
    color: '#fff',
    paddingLeft: 10,
    fontFamily: 'Montserrat-Regular',
  },
  icon: {
    backgroundColor: '#f0f0f0',
    padding: 9,
    color: '#000',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
  },

  btn: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 60,
  },
  btnText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  label: {
    position: 'absolute',
    top: '-20%',
    left: '7%',

    fontFamily: 'Montserrat-Bold',
    color: '#000',
    paddingHorizontal: 8,
  },
  inputconatiner: {
    marginTop: 25,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#fff',
    paddingLeft: 0,
    borderRadius: 60,
  },
  contactForm: {
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
    paddingVertical: 20,
    borderRadius: 30,
  },
  section: {
    padding: 10,
  },
  Title: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    fontSize: 20,
  },
});
