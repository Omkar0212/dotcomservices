import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const Home = ({navigation}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef1 = useRef(null);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [homeBan, setHomeBan] = useState([]);
  const [cardBanner, setcardBanner] = useState([]);
  const [sideBanner, setSideBanner] = useState([]);
  const [middleBanner, setMiddleBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setIsError(true);
  };


  useEffect(() => {
    Promise.all([
      axios.post(
        `https://dotcomservices.in/API/homebanner.php`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
      axios.post(
        `https://dotcomservices.in/API/sidebanner.php`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
      axios.post(
        `https://dotcomservices.in/API/middlebanner.php`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
      axios.post(
        `https://dotcomservices.in/API/cardbanner.php`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
      axios.post(
        `https://dotcomservices.in/API/services.php`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    ])
      .then(([b1, b2, b3, b4, serv]) => {
        setHomeBan(b1.data);
        setSideBanner(b2.data);
        setMiddleBanner(b3.data);
        setcardBanner(b4.data);
        setServices(serv.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(true);
        console.error('API Error:', error);
      });
  }, []);

  const getItemLayout = (data, index) => ({
    length: Width ,
    offset: Width * index,
    index,
  });

  const getItemLayout1 = (data, index) => ({
    length: Width ,
    offset: Width  * index,
    index,
  });

  const calculateVisibleItemIndex = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const visibleIndex = Math.floor(contentOffsetX / (Width));
    setCurrentIndex(visibleIndex);
  };

  const calculateVisibleItemIndex1 = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const visibleIndex1 = Math.floor(contentOffsetX / (Width));
    setCurrentIndex1(visibleIndex1);
  };

  useEffect(() => {
    if (!loading && homeBan.length > 0) {
      const timer = setInterval(() => {
        console.log(currentIndex);
        const nextIndex = (currentIndex + 1) % homeBan.length;
        console.log('Next Index Home:', nextIndex);
        setCurrentIndex(nextIndex);
        flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
      }, 1500);

      return () => clearInterval(timer);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!loading && cardBanner.length > 0) {
      const timer = setInterval(() => {
        console.log(currentIndex1);
        const nextIndex = (currentIndex1 + 1) % cardBanner.length;
        console.log('Next Index Card:', nextIndex);
        setCurrentIndex1(nextIndex);
        flatListRef1.current.scrollToIndex({animated: true, index: nextIndex});
      }, 1500);

      return () => clearInterval(timer);
    }
  }, [currentIndex1]);
  const renderItem = ({item}) => (
    <>
      <View
        style={{
          width: Width,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          position: 'relative',
        }}>
          {isLoading && <ActivityIndicator size="large" color={'#fff'} />}
      {isError && <Text>Error loading image</Text>}
        <Image
          style={{
            width: Width * 0.95,
            height: Height * 0.35,
            margin: 0,
            borderRadius: 10,
          }}
          onLoad={handleImageLoad}
        onError={handleImageError}
          source={{uri: item.image}}
        />

        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 10,
          }}></View>
      </View>
    </>
  );

  const renderItem1 = ({item}) => (
    <View
      style={{
        width: Width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        position: 'relative',
      }}>
      <Image
        style={{
          width: Width * 0.95,
          height: Height * 0.35,
          margin: 0,
          borderRadius: 10,
        }}
        source={{uri: item.image}}
      />
    </View>
  );

  return (
    <ScrollView>
      {loading ? (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            borderRadius={10}
            width={Width}
            height={Height * 0.35}></SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <View style={{padding: 0, position: 'relative'}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            data={homeBan}
            keyExtractor={(item, i) => item.id}
            horizontal
            pagingEnabled
            renderItem={renderItem}
            onScroll={calculateVisibleItemIndex}
            scrollEventThrottle={16}
            getItemLayout={getItemLayout}
          />
          <View
            style={{
              width: Width,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'absolute',
              bottom: '8%',
              zIndex: 2,
            }}>
            {homeBan.map((_, i) => (
              <View
                key={i}
                style={{
                  width: currentIndex === i ? 20 : 8,
                  height: 8,
                  backgroundColor: currentIndex === i ? '#fff' : '#f0f0f0',
                  marginHorizontal: 4,
                  borderRadius: 4,
                }}></View>
            ))}
          </View>
        </View>
      )}

      <View style={{padding: 20}}>
        <Text
          style={{
            color: '#000',
            fontFamily: 'Montserrat-SemiBold',
            marginLeft: 5,
            fontSize: 16,
            marginBottom: 7,
          }}>
          Services
        </Text>
        <View
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {loading ? (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="space-around">
                <SkeletonPlaceholder.Item
                  height={150}
                  width={'31%'}
                  borderRadius={10}
                  margin={2}
                  marginBottom={5}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  height={150}
                  width={'31%'}
                  borderRadius={10}
                  margin={2}
                  marginBottom={5}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  height={150}
                  width={'31%'}
                  borderRadius={10}
                  margin={2}
                  marginBottom={5}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  height={150}
                  width={'31%'}
                  borderRadius={10}
                  margin={2}
                  marginBottom={5}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  height={150}
                  width={'31%'}
                  borderRadius={10}
                  margin={2}
                  marginBottom={5}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  height={150}
                  width={'31%'}
                  borderRadius={10}
                  margin={2}
                  marginBottom={5}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  height={150}
                  width={'31%'}
                  borderRadius={10}
                  margin={2}
                  marginBottom={5}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  height={150}
                  width={'31%'}
                  borderRadius={10}
                  margin={2}
                  marginBottom={5}></SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  height={150}
                  width={'31%'}
                  borderRadius={10}
                  margin={2}
                  marginBottom={5}></SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          ) : error ? (
            <Image
              source={require('../../assets/images/error.webp')}
              style={{width: 100, height: 100}}
            />
          ) : services.length == 0 ? (
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Montserrat-SemiBold',
                color: '#000',
              }}>
              No Services
            </Text>
          ) : (
            services.map((item, i) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Service Detail', {item: item});
                }}
                key={i}
                style={Styles.serviceBox}>
                <Image source={{uri: item.image}} style={Styles.serviceImage} />
                <Text style={Styles.serviceTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
      <View style={{width: Width, paddingBottom: 20}}>
        {loading ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={Width * 0.38}></SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          middleBanner.map((item, i) => (
            <View key={i}>
              <Image
                style={{width: '100%', height: Width * 0.38}}
                source={{uri: item.image}}
              />
            </View>
          ))
        )}
      </View>
      {loading ? (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            borderRadius={10}
            width={Width * 0.95}
            height={Height * 0.35}></SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <View style={{padding: 0, position: 'relative'}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            ref={flatListRef1}
            data={cardBanner}
            keyExtractor={(item, i) => item.id}
            horizontal
            pagingEnabled
            renderItem={renderItem1}
            onScroll={calculateVisibleItemIndex1}
            scrollEventThrottle={16}
            getItemLayout={getItemLayout1}
          />
          <View
            style={{
              width: Width,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'absolute',
              bottom: '8%',
              zIndex: 2,
            }}>
            {cardBanner.map((_, i) => (
              <View
                key={i}
                style={{
                  width: currentIndex1 === i ? 20 : 8,
                  height: 8,
                  backgroundColor: currentIndex1 === i ? '#fff' : '#f0f0f0',
                  marginHorizontal: 4,
                  borderRadius: 4,
                }}></View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Home;

const Styles = StyleSheet.create({
  serviceBox: {
    backgroundColor: '#fff',
    width: '31%',
    elevation: 5,
    height: 150,
    margin: 2,
    marginVertical: 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 4,
  },
  serviceImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  serviceTitle: {
    textAlign: 'center',
    color: '#0B2447',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
});
