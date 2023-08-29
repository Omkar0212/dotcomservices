import React from 'react';
import {Text, Image, StatusBar, StyleSheet} from 'react-native';
import {View, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Loader = () => {
  return (
    <>
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <View style={{padding: 10, position: 'relative'}}>
          <LottieView
            style={{height: 300, width: 300}}
            source={require('./load2.json')}
            autoPlay
            loop
          />
          {/* <Image style={[Styles.image,{ backgroundColor:'#fff', borderRadius:25}]} source={require('../assets/images/shivam.png')} /> */}
        </View>

        {/* <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: 15,
          letterSpacing: 3,
          color:'gray'
        }}>
        LOADING...
      </Text> */}
      </View>
    </>
  );
};

export default Loader;

const Styles = StyleSheet.create({
  image: {
    position: 'absolute',
    width: '25%',
    height: '30%',
    left: '30.5%',

    top: '76.5%',
  },
});
