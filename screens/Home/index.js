import React, { useState, useEffect, useRef } from 'react';
import { Animated, ImageBackground, Image, Text, TouchableOpacity, TouchableHighlight, View, Linking, FlatList, Alert, AsyncStorage, Modal } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import { Feather, FontAwesome5 } from '@expo/vector-icons';
import colors from '../../constants/Colors';

import Carousel from '../../components/Carousel';

import api from '../../services/api';

import background from '../../assets/images/bg.png';
import logo from '../../assets/images/icon.png';

import { styles } from './styles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [ images, setImages ] = React.useState([]);
  const [ showArrow, setShowArrow ] = useState({ top: false, bottom: true, maxOffsetY: 0.1, calculate: true })
  const moveAnimation = useRef(new Animated.Value(0.1)).current;

  const icons = [ {
    route: 'Bible',
    iconName: 'book',
    iconType: 'Feather',
    name: 'Bíblia',
    onLine: false
  },
  {
    route: 'Cell',
    iconName: 'users',
    iconType: 'Feather',
    name: 'Células',
    onLine: true,
  },
  {
    route: 'Photo',
    iconName: 'camera',
    iconType: 'Feather',
    name: 'Fotos',
    onLine: true
  },
  {
    route: 'Schedule',
    iconName: 'calendar',
    iconType: 'Feather',
    name: 'Agenda',
    onLine: true
  },
  {
    route: 'Devotional',
    iconName: 'pray',
    iconType: 'FontAwesome5',
    name: 'Devocional',
    onLine: true
  },
  {
    route: 'Shepherds',
    iconName: 'users',
    iconType: 'FontAwesome5',
    name: 'Pastores',
    onLine: false
  },
  {
    route: 'Podcast',
    iconName: 'podcast',
    iconType: 'FontAwesome5',
    name: 'Podcast',
    onLine: true
  },
  {
    route: 'SocialMedia',
    iconName: 'thumbs-up',
    iconType: 'FontAwesome5',
    name: 'Mídias Sociais',
    onLine: false
  },
  {
    openUrl: 'whatsapp://send?phone=5522992797679',
    iconName: 'whatsapp',
    iconType: 'FontAwesome5',
    name: 'Contato',
    onLine: false
  },
  {
    route: 'PrayOrder',
    iconName: 'file-signature',
    iconType: 'FontAwesome5',
    name: 'Pedido de Oração',
    onLine: true
  },
  {
    route: 'AboutUs',
    iconName: 'id-card',
    iconType: 'FontAwesome5',
    name: 'Quem Somos',
    onLine: false
  },
  {
    route: 'Map',
    iconName: 'map-pin',
    iconType: 'Feather',
    name: 'Como Chegar',
    onLine: true
  },
  {
    route: 'CompanyServices',
    iconName: 'briefcase',
    iconType: 'Feather',
    name: 'Empresas e Serviços',
    onLine: false
  },
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/carousel/lastUpdate');
        const { lastUpdated: serverLastUpdated } = response.data;
        const localLastUpdated = await AsyncStorage.getItem('lastUpdatedCarousel');
        if (!localLastUpdated || localLastUpdated !== serverLastUpdated) {
          const { data } = await api.get('/carousel');
          const imgs = data.map(img => { return { source: img.base64 } });
          await AsyncStorage.setItem('lastUpdatedCarousel', serverLastUpdated);
          await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + '/carouselImages.json', JSON.stringify(imgs));
          setImages(imgs);
        } else {
          const carouselImages = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + '/carouselImages.json');
          if (carouselImages)
            setImages(JSON.parse(carouselImages));
        }

      } catch (err) {
        console.log(err);
        await AsyncStorage.removeItem('carouselImages');
      }
    }
    if (netInfo.isConnected && images.length === 0) fetchData();

  }, [ netInfo.isConnected ])

  useEffect(() => {
    const moveUp = () => {
      Animated.timing(moveAnimation, {
        toValue: 5,
        duration: 500
      }).start();
      setTimeout(moveDown, 700)
    };

    const moveDown = () => {
      Animated.timing(moveAnimation, {
        toValue: 0,
        duration: 500
      }).start();
      setTimeout(moveUp, 700)
    };
    moveUp();
  }, [])

  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.header}>
        {images.length === 0 && (<Image source={logo} style={styles.logo} />)}
        {images.length > 0 && (<Carousel
          images={images}
        />)}
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.icons}
          numColumns={3}
          data={icons}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.ico}
              onPress={() => handlePressPageIcon(item)}
            >
              {item.iconType === 'Feather' && (<Feather name={item.iconName} size={40} color={colors.tintColor} />)}
              {item.iconType === 'FontAwesome5' && (<FontAwesome5 name={item.iconName} size={40} color={colors.tintColor} />)}
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))}
          onScroll={(e) => {
            const { y: offsetY } = e.nativeEvent.contentOffset;
            //   const showArrowTop = (offsetY > 0);
            const showArrowTop = false;
            const showArrowBottom = (Math.round(showArrow.maxOffsetY) !== Math.round(offsetY))
            if (showArrow.bottom)
              setShowArrow({ ...showArrow, top: showArrowTop, bottom: showArrowBottom })
          }}
          onEndReached={(e) => {
            if (showArrow.calculate) {
              const { distanceFromEnd } = e;
              const maxOffsetY = Math.max(distanceFromEnd, showArrow.maxOffsetY)
              setShowArrow({ ...showArrow, maxOffsetY, calculate: false })
            }
          }
          }
        />
        {showArrow.top && <Animated.Text style={[ styles.top_arrow, { transform: [ { translateY: moveAnimation } ] } ]}>
          <FontAwesome5 name="sort-up" size={40} />
        </Animated.Text>}

        {showArrow.bottom && <Animated.Text style={[ styles.bottom_arrow, { transform: [ { translateY: moveAnimation } ] } ]}>
          <FontAwesome5 name="sort-down" size={40} />
        </Animated.Text>}

      </View>
    </ImageBackground >
  );

  function handlePressPageIcon(item) {
    if (!netInfo.isConnected && item.onLine) {
      Alert.alert('Sem conexão com a internet', 'Verifique sua conexão com a internet, essa funcionalidade não está disponível off-line.');
    } else {
      if (item.route) navigation.navigate(item.route);
      if (item.openUrl) Linking.openURL(item.openUrl);
    }
  }
}

