import React, {useState} from 'react';
import {View, StyleSheet,StatusBar} from 'react-native';
import AnimatedComponent from './demo';
import {useEffect} from 'react';

import Loader from './Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Logo = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [isInstalled, setIsInstalled] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  
    Promise.all([
      AsyncStorage.getItem('isInstalled'),
      AsyncStorage.getItem('isLogged'),
    ]).then(([installed, logged]) => {
      setIsInstalled(installed);
  
      if (installed !== '') {
        if (installed === 'true') {
          setTimeout(() => {
            if (logged === 'true') {
              navigation.replace('MyTabs');
            } else {
             navigation.replace('Login');
            }
          }, 6000);
        } else {
          setTimeout(() => {
           navigation.replace('Splash Screen');
          }, 6000);
        }
      }
    });
  }, []);
  
  return (
    <>
    <StatusBar hidden />
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <AnimatedComponent />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  circle1: {
    padding: 20,
    backgroundColor: 'tomato',
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  circle2: {
    padding: 20,
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  circle3: {
    padding: 20,
    backgroundColor: 'tomato',
    position: 'absolute',
    bottom: '20%',
    right: '5%',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});

export default Logo;
