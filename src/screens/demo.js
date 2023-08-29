import React, { useEffect, useRef } from 'react';
import { Animated, View,Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AnimatedComponent = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    startAnimation()
  })

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            opacity,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <Image source={require('../../assets/images/dotcom.png')} style={{width:100, height:100}}/>
        
      </Animated.View>
      {/* <TouchableOpacity >
        <Text style={styles.button}>Start Animation</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius:10,
    elevation:1,
    borderBottomColor:'#11009E',
    borderBottomWidth:0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 18,
  },
});

export default AnimatedComponent;

