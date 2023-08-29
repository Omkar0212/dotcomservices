import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  ImageBackground,
  Dimensions,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const SplashScreen = ({navigation}) => {
  const ref = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerArray = [
    {
      image: require('../../assets/images/splash2.jpg'),
      title: 'Find the Right Repair Service Provider',
      subTitle:
        ' In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate',
    },
    {
      image: require('../../assets/images/splash1.jpg'),
      title: 'Look For The Trained Professionals',
      subTitle:
        ' In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate',
    },
    
    {
      image: require('../../assets/images/splash3.jpg'),
      title: 'Get Done Job At Your Door Step',
      subTitle:
        ' In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate',
    },
  ];
  const Next = () => {
    // console.log(currentIndex)
    setCurrentIndex(currentIndex + 1);
    console.log(currentIndex);
    ref.current.scrollToIndex({
      animated: true,
      index: parseInt(currentIndex) + 1,
    });
  };
  const Prev = () => {
    setCurrentIndex(currentIndex - 1);
    console.log(currentIndex);
    ref.current.scrollToIndex({
      animated: true,
      index: parseInt(currentIndex) - 1,
    });
  };
  return (
   <>
   <StatusBar hidden/>
      <View style={{padding: 0,flex:1, backgroundColor: '#fff'}}>
        <Animated.FlatList
          style={{}}
          ref={ref}
          showsHorizontalScrollIndicator={false}
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex((x / Width).toFixed(0));
          }}
          horizontal
          pagingEnabled
          keyExtractor={(item, index) => {
            return index;
          }}
          data={bannerArray}
          renderItem={(item, i) => (
            <Animated.View
              style={{
                width: Width,
                paddingTop: 100,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: '90%',
                  height: '45%',
                  margin: 0,
                  resizeMode: 'contain',
                  backgroundColor: '#fff',

                  marginBottom: 0,

                  borderRadius: 10,
                }}
                source={item.item.image}
              />
              <View style={{padding: 20}}>
                <Text style={Styles.title}>{item.item.title}</Text>
                <Text style={Styles.subTitle}>{item.item.subTitle}</Text>
                {currentIndex == bannerArray.length - 1 ? (
                  <TouchableOpacity
                    onPress={() => {
                      AsyncStorage.setItem('isInstalledFirst', 'true');
                      AsyncStorage.setItem('isInstalled', 'true');
                      navigation.replace('Login');
                    }}
                    style={Styles.btn}>
                    <Text style={Styles.btnText}>Start</Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            </Animated.View>
          )}
        />
      </View>
      {currentIndex == bannerArray.length - 1 ?<></>:
      <View
        style={{
          width: Width,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          bottom: '4%',
        }}>

        {bannerArray.map((item, i) => (
          <View
            key={i}
            style={{
              width: currentIndex == i ? 20 : 8,
              height: 8,
              backgroundColor: currentIndex == i ? '#0B2447' : '#f0f0f0',
              marginHorizontal: 4,
              borderRadius: 4,
            }}></View>
        ))}
      </View>}
   </>
  );
};

export default SplashScreen;

const Styles = StyleSheet.create({
  box: {
    width: Width * 0.8,
    height: Height * 0.8,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: '#0B2447',
    width: 150,
    height: 40,
    padding: 10,
    marginTop: 30,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    textAlignVertical: 'center',
  },
  title: {
    fontSize: 26,
    letterSpacing: 1,
    lineHeight: 40,
    color: '#0B2447',
    fontFamily: 'Montserrat-ExtraBold',
  },
  subTitle: {
    fontSize: 12,
    marginTop: 10,
    color: 'gray',
    fontFamily: 'Montserrat-Light',
    letterSpacing: 1,
    lineHeight: 25,
  },
});
