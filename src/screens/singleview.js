import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Linking,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const SingleView = props => {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [CheckPhone, setCheckPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [CheckAddress, setCheckAddress] = useState(false);
  const [CheckMsg, setCheckMsg] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [pin, setPin] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);
  const [uerror, setUerror] = useState(false);
  const [update, setUpate] = useState(false);
  const [popup, setPopup] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(props.route.params.item.title);
  });

  const handleUpdate = async () => {
    setLoading(true);
    Promise.all([AsyncStorage.getItem('id')]).then(res => {
      console.log(JSON.parse(res));
      axios
        .post('https://dotcomservices.in/API/booking.php', {
          address: address,
          msg: msg,
          phone: phone,
          id: props.route.params.item.sid,
          title: props.route.params.item.title,
          uid: JSON.parse(res),
        })
        .then(res => {
          console.log(res.data);
          setPhone('')
          setAddress('')
          setMsg('')
          setLoading(false);
          setSuccess(true);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    });
  };
  const handleInputChange = text => {
    // Remove any non-numeric characters from the input value
    if (typeof text === 'string') {
      // Remove any non-numeric characters from the input value
      const numericValue = text.replace(/[^0-9]/g, '');

      // Check if the numeric value is between 1 and 10 digits
      if (numericValue.length >= 10 && numericValue.length <= 10) {
        setPhone(numericValue);
        handleUpdate();
      } else {
        // If the value is not within the desired range, set an error or show a message
        // For example, you can display an error message here.
        setPhone('');
        alert('Number should be 10 digits and numeric only');
      }
    }
  };

  return (
    <View>
      {popup ? (
        <View style={Styles.popup}>
          <View
            style={{
              width: '80%',
              padding: 15,
              backgroundColor: '#fff',
              borderRadius: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <ScrollView>
              {uerror ? (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    marginBottom: 10,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Something went wrong
                </Text>
              ) : (
                <></>
              )}
              {success ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <FontAwesome name="check-circle" color={'green'} size={65} />
                  <Text
                    style={{
                      color: 'green',
                      fontFamily: 'Montserrat-Bold',
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    Request Submitted Will Call You shortly.
                  </Text>
                </View>
              ) : (
                <>
                  <View
                    style={[
                      Styles.inputContainer,
                      {
                        borderWidth: CheckPhone ? 1 : 0,
                        borderColor: CheckPhone ? 'red' : '#f0f0f0',
                      },
                    ]}>
                    <TextInput
                      onChangeText={val => {
                         setPhone(val);
                     //   handleInputChange();
                      }}
                      value={phone}
                      placeholder="Enter Phone"
                      placeholderTextColor={'gray'}
                      style={{color: '#000'}}
                    />
                  </View>
                  <View
                    style={[
                      Styles.inputContainer,
                      {
                        borderWidth: CheckAddress ? 1 : 0,
                        borderColor: CheckAddress ? 'red' : '#f0f0f0',
                      },
                    ]}>
                    <TextInput
                      numberOfLines={6}
                      multiline={true}
                      onChangeText={val => {
                        setAddress(val);
                      }}
                      value={address}
                      placeholder="Enter Address"
                      placeholderTextColor={'gray'}
                      style={{color: '#000', textAlignVertical: 'top'}}
                    />
                  </View>
                  <View
                    style={[
                      Styles.inputContainer,
                      {
                        borderWidth: CheckMsg ? 1 : 0,
                        borderColor: CheckMsg ? 'red' : '#f0f0f0',
                      },
                    ]}>
                    <TextInput
                      onChangeText={val => {
                        setMsg(val);
                      }}
                      multiline={true}
                      numberOfLines={5}
                      value={msg}
                      placeholder="Enter message"
                      placeholderTextColor={'gray'}
                      style={{color: '#000', textAlignVertical: 'top'}}
                    />
                  </View>

                  <View
                    style={[Styles.inputContainer, {backgroundColor: '#fff'}]}>
                    <TouchableOpacity
                      onPress={() => {
                        setCheckPhone(false);
                        setCheckMsg(false);
                        setCheckAddress(false);
                        if (phone == '') {
                          setCheckPhone(true);
                        } else if (address == '') {
                          setCheckAddress(true);
                        } else if (msg == '') {
                          setCheckMsg(true);
                        } else {
                          setCheckPhone(false);
                          setCheckMsg(false);
                          setCheckAddress(false);
                          handleInputChange(phone)
                          
                        }
                      }}
                      style={{
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: '#0B2447',
                      }}>
                      {loading ? (
                        <ActivityIndicator color={'#fff'} size={'small'} />
                      ) : (
                        <Text style={{textAlign: 'center', color: '#fff'}}>
                          UPDATE
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
            <View
              style={[
                Styles.inputContainer,
                {
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <FontAwesome
                onPress={() => {
                  setPopup(false);
                  setSuccess(false);
                  setUerror(false);
                }}
                name={'close'}
                color={'#000'}
                size={25}
                style={{marginTop: 0}}
              />
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}

      <ScrollView style={{padding: 0, position: 'relative'}}>
        <View style={{padding: 20}}>
          <View style={{padding: 10, backgroundColor: '#fff'}}>
            <Image
              style={{width: '100%', height: 200}}
              source={{uri: props.route.params.item.image}}
            />
            <Text
              style={{
                marginTop: 10,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 22,
              }}>
              {props.route.params.item.title}
            </Text>
            <Text style={{color: 'gray', fontFamily: 'Montserrat-Light'}}>
              {props.route.params.item.description}
            </Text>
            <TouchableOpacity
              onPress={async () => {
                await Linking.openURL('https://wa.me/9483295176');
              }}
              style={{
                backgroundColor: 'green',
                marginVertical: 10,
                padding: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Montserrat-SemiBold',
                  textAlign: 'center',
                }}>
                Whatsapp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await Linking.openURL('tel:9483295176');
              }}
              style={{
                backgroundColor: '#0B2447',
                marginVertical: 10,
                padding: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Montserrat-SemiBold',
                  textAlign: 'center',
                }}>
                Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPopup(true);
              }}
              style={{
                backgroundColor: '#F31559',
                marginVertical: 10,
                padding: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Montserrat-SemiBold',
                  textAlign: 'center',
                }}>
                Request Now
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: '#fff',
              marginVertical: 0,
              marginTop: 10,
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/instrument.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={{fontSize: 11, color: 'gray'}}>
                Best Instruments
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/quality.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={{fontSize: 11, color: 'gray'}}>Quality Service</Text>
            </View>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: '#fff',
              marginVertical: 0,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/technician.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={{fontSize: 11, color: 'gray'}}>
                Best Technicians
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/support.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={{fontSize: 11, color: 'gray'}}>24*7 Support</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleView;

const Styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    zIndex: 999,
    width: Width,
    height: Height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    marginBottom: 5,
  },
});
