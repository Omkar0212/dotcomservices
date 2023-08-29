import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const Profile = () => {
  const [profile, setProfile] = useState([]);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [uerror, setUerror] = useState(false);
  const [popup, setPopup] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleUpdate = async () => {
    setUpdate(true);

    try {
      const id = await AsyncStorage.getItem('id');

      const url = 'https://dotcomservices.in/API/updateprofile.php';
      const data = {
        id: id,
        name: fname,
        phone: phone,
        address: address,
        gender: gender,
        city: city,
        pincode: pin,
      };

      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      setUpdate(false);
      setPopup(false);
    } catch (error) {
      console.log(error);
      setUpdate(false);
      setUerror(true);
    }
  };
  useEffect(() => {
    Promise.all([AsyncStorage.getItem('id')])
      .then(([id]) => {
        console.log(id);
        Promise.all([
          axios.post(
            `https://dotcomservices.in/API/profile.php`,
            {id: JSON.parse(id)},
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          ),
          axios.post(
            `https://dotcomservices.in/API/requests.php`,
            {id: JSON.parse(id)},
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          ),
        ])
          .then(([res1, res2]) => {
            //console.log(res1.data);
            setProfile(res1.data);
            profile.map(item => {
              setFname(item.fname);
              setEmail(item.email);
              setPhone(item.phone);
              setAddress(item.address);
              setPin(item.pincode);
              setCity(item.city);
              setGender(item.gender);
            });
            setBookings(res2.data);
            setLoading(false);
          })
          .catch(([err]) => {
            console.log(err + 'Axios Error');
            setLoading(false);
            setError(true);
          });
      })
      .catch(([err]) => {
        console.log(err + 'Async Error');
        setLoading(false);
        setError(true);
      });

    // const Profile = async () => {
    //   const id = await AsyncStorage.getItem('id');
    //   console.log(id);
    //   const data = {
    //     id: id,
    //   };
    //   let url = `http://dotcomservices.in/API/profile.php`;
    //   try {
    //     const response = await axios.post(url, data, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     setProfile(response.data);
    //     setLoading(false);
    //     console.log(response.data);
    //   } catch (error) {
    //     setLoading(false);
    //     console.log(error);
    //   }
    // };
    // Profile();
  }, [popup]);
  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0', position: 'relative'}}>
      {popup ? (
        <View style={Styles.popup}>
          <ScrollView style={{width: '100%'}}>
            <View
              style={{
                width: '90%',
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

                <View style={Styles.inputContainer}>
                  <TextInput
                    value={fname}
                    onChangeText={val => {
                      setFname(val);
                    }}
                    placeholder="Enter Name"
                    placeholderTextColor={'gray'}
                    style={{color: '#000'}}
                  />
                </View>

                <View style={Styles.inputContainer}>
                  <TextInput
                    onChangeText={val => {
                      setPhone(val);
                    }}
                    placeholderTextColor={'gray'}
                    style={{color: '#000'}}
                    value={phone.toString()}
                    placeholder="Enter Phone"
                  />
                </View>
                <View style={Styles.inputContainer}>
                  <TextInput
                    onChangeText={val => {
                      setAddress(val);
                    }}
                    value={address}
                    placeholderTextColor={'gray'}
                    style={{color: '#000'}}
                    placeholder="Enter Address"
                  />
                </View>
                <View style={Styles.inputContainer}>
                  <TextInput
                    onChangeText={val => {
                      setCity(val);
                    }}
                    value={city}
                    placeholder="Enter City"
                    placeholderTextColor={'gray'}
                    style={{color: '#000'}}
                  />
                </View>
                <View style={Styles.inputContainer}>
                  <TextInput
                    onChangeText={val => {
                      setGender(val);
                    }}
                    placeholder='Enter Gender'
                    value={gender}
                    placeholderTextColor={'gray'}
                    style={{color: '#000'}}
                  />
                </View>
                <View style={Styles.inputContainer}>
                  <TextInput
                    onChangeText={val => {
                      setPin(val);
                    }}
                    value={pin}
                    placeholder="Enter Pincode"
                    placeholderTextColor={'gray'}
                    style={{color: '#000'}}
                  />
                </View>
                <View
                  style={[Styles.inputContainer, {backgroundColor: '#fff'}]}>
                  <TouchableOpacity
                    onPress={() => {
                      handleUpdate();
                    }}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: '#0B2447',
                    }}>
                    {update ? (
                      <ActivityIndicator color={'#fff'} size={'small'} />
                    ) : (
                      <Text style={{textAlign: 'center', color: '#fff'}}>
                        UPDATE
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
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
                    setUerror(false);
                  }}
                  name={'close'}
                  color={'#000'}
                  size={25}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <></>
      )}

      <ScrollView>
        <View style={{padding: 20}}>
          <View
            style={{
              padding: 0,

              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 16,
                color: '#000',
                textAlign: 'center',
              }}>
              Profile
            </Text>
            <View
              style={{
                paddingVertical: 20,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#fff',
                elevation: 2,
                width: '100%',
                marginVertical: 10,
                borderRadius: 10,
              }}>
              <Image
                source={require('../../assets/images/profiledummy.png')}
                style={{
                  width: Width * 0.3,
                  height: Width * 0.3,

                  marginVertical: 10,
                  borderRadius: Width * 0.15,
                }}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'center',
                }}>
                {loading ? (
                  <ActivityIndicator size={'large'} color={'#000'} />
                ) : (
                  profile[0].fname
                )}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 13,
                  color: 'gray',
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                {loading ? <></> : profile[0].email}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 13,
                  color: 'gray',
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                {loading ? <></> : profile[0].phone}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setPopup(true);
                }}
                style={{
                  backgroundColor: '#0B2447',
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  marginTop: 10,
                  borderRadius: 20,
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 16,
                color: '#000',
              }}>
              Service Requests
            </Text>
            {loading ? (
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={180}
                  borderRadius={10}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={180}
                  borderRadius={10}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={180}
                  borderRadius={10}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={180}
                  borderRadius={10}></SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            ) : bookings.length == 0 ? (
              <Image
                source={require('../../assets/images/nodata.png')}
                style={{
                  width: 100,
                  height: 100,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 30,
                }}
              />
            ) : error ? (
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/images/error.webp')}
              />
            ) : (
              bookings.map((item, i) => (
                <View
                  key={i}
                  style={{
                    padding: 10,
                    elevation: 2,
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    marginVertical: 10,
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '20%', padding: 5}}>
                    <Image
                      source={{uri:item.image}}
                      style={{width: '100%', height: 70,resizeMode:'contain'}}
                    />
                  </View>
                  <View style={{width: '80%', padding: 5}}>
                  <Text
                      style={{
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'Montserrat-Medium',
                        marginBottom: 5,
                      }}>Request ID : 
                      {item.id}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'Montserrat-Medium',
                        marginBottom: 5,
                      }}>
                      {item.service_name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Light',
                        fontSize: 11,
                        marginBottom: 5,
                        color:'gray'
                      }}>
                      {item.date}
                    </Text>

                    <Text
                      style={{
                        fontFamily: 'Montserrat-Light',
                        fontSize: 11,
                        marginBottom: 5,
                        color:'gray',
                      }}>
                      {item.book_address}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Light',
                        fontSize: 11,
                        marginBottom: 5,
                        color:'gray'
                      }}>
                      {item.book_phone}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Light',
                        fontSize: 11,
                        marginBottom: 5,
                        color:'gray'
                      }}>
                      {item.msg}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 11,
                        color: '#0B2447',
                        marginBottom: 5,

                      }}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const Styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
});
