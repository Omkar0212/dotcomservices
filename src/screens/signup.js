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
import Loader from './Loader';
import axios from 'axios';
import {useRef, useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Signup = ({navigation}) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [checkPass, setCheckPass] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [fname, setFname] = useState('');
  const [error, seterror] = useState(false);
  const [errorEmail, seterrorEmail] = useState(false);
  const [errorPhone, seterrorPhone] = useState(false);
  const [success, setSuccess] = useState(false);

  const Register = async () => {
    setCheckPass(false);
    setCheckUser(false);
    setCheckEmail(false);
    setCheckPhone(false);
    if (fname === '') {
      setCheckUser(true);
    } else if (email == '') {
      setCheckEmail(true);
    } else if (phone == '') {
      setCheckPhone(true);
    } else if (pass === '') {
      setCheckPass(true);
    } else {
      setCheckPass(false);
      setCheckUser(false);
      setLoading(true);
      seterror(false);
      seterrorEmail(false);
      seterrorPhone(false);
      const data = {
        name: fname,
        pass: pass,
        email: email,
        phone: phone,
      };
      let url = `https://dotcomservices.in/API/register.php`;
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        if (response.data === 'email') {
          //  seterror(true);
          seterrorEmail(true);
          setLoading(false);
          //alert("Email")
        } else if (response.data == 'phone') {
          //  seterror(true);
          seterrorPhone(true);
          // alert("Phone")
          setLoading(false);
          // setLoad(true);

          // AsyncStorage.setItem('isLogged', 'true');
          // AsyncStorage.setItem('id', JSON.stringify(response.data));
          // setLoading(false);
          // setLoad(false);
          // navigation.replace('Drawer');
        } else if (response.data == 'registered') {
          //  seterror(true);
          setLoading(false);
          setFname('')
          setEmail('')
          setPass('')
          setPhone('')
          setSuccess(true);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  return (
    <>
      <StatusBar hidden />
      {load ? (
        <Loader />
      ) : (
        <View style={{flex: 1, paddingVertical: 0, position: 'relative'}}>
          {success ? (
            <View
              style={{
                width: Width,
                height: Height,
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                zIndex: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  width: '80%',
                  borderRadius:10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome name="check-circle" color={'green'} size={45} />
                <Text style={{color: 'green', textAlign: 'center'}}>
                  Registered Succesfully
                </Text>
                <TouchableOpacity onPress={()=>{
                  setSuccess(false)
                  navigation.navigate('Login')
                }} style={{backgroundColor:'#000',padding:8,marginTop:10,borderRadius:10}}>
                  <Text style={{color:'#fff',textAlign:'center',fontFamily:'Montserrat-Regular',fontSize:10}}>Login Please</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <></>
          )}

          {/* <View style={{backgroundColor:'#090580', padding:8,position:'absolute', width:350,height:350, borderRadius:175, bottom:'-20%', right:'-50%'}}></View> */}
          {/* <View style={{backgroundColor:'#090580', padding:8,position:'absolute', width:350,height:350, borderRadius:175, bottom:'-30%', left:'0%'}}></View> */}
          <View style={Styles.box}>
            <View style={Styles.logBox}>
              <View>
                <Image
                  source={require('../../assets/images/dotcom.png')}
                  style={{
                    width: 100,
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
                {errorEmail ? (
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    Email Already Exist
                  </Text>
                ) : (
                  <></>
                )}
                {errorPhone ? (
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    Phone Number Already Exist
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
                        value={fname}
                        onChangeText={val => {
                          setFname(val);
                        }}
                        placeholder="Enter Full name"
                        placeholderTextColor={'gray'}
                        style={Styles.input}
                      />
                      <FontAwesome style={Styles.icon} name="user" size={22} />
                    </View>
                  </View>

                  <View
                    style={[
                      Styles.inputconatiner,
                      {borderColor: checkEmail ? 'tomato' : '#A1C2F1'},
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
                      <MaterialCommunityIcons
                        style={Styles.icon}
                        name="email"
                        size={22}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      Styles.inputconatiner,
                      {borderColor: checkPhone ? 'tomato' : '#A1C2F1'},
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TextInput
                        value={phone}
                        onChangeText={val => {
                          setPhone(val);
                        }}
                        placeholder="Enter mobile"
                        placeholderTextColor={'gray'}
                        style={Styles.input}
                      />
                      <FontAwesome
                        style={Styles.icon}
                        name="mobile-phone"
                        size={22}
                      />
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
                        Register();
                      }}
                      style={Styles.btn}>
                      {loading ? (
                        <ActivityIndicator color={'#000'} />
                      ) : (
                        <Text style={Styles.btnText}>SIGN IN</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={()=>{
                    navigation.navigate('Login')
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 15,
                      fontFamily: 'Montserrat-Regular',
                      color: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      verticalAlign: 'middle',
                    }}>
                    Log in{' '}
                  </Text></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
export default Signup;

const Styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#0B2447',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logBox: {
    width: '90%',
    marginVertical: 10,

    borderRadius: 20,

    padding: 20,
  },
  input: {
    width: '85%',
    color: '#fff',
    paddingLeft: 10,
    fontFamily:'Montserrat-Regular'
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
