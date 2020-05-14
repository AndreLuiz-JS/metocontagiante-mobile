import React from 'react';
import { ImageBackground, Image, Text, TouchableOpacity, View, Linking, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import colors from '../../constants/Colors';

import background from '../../assets/images/bg.png';
import logo from '../../assets/images/icon.png';


export default function HomeScreen() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
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
  }, ]
  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>
      <FlatList
        contentContainerStyle={styles.icons}
        numColumns={3}
        data={icons}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.ico}
            onPress={() => handlePressPageIcon(item)}
          >
            {item.iconType === 'Feather' && (<Feather name={item.iconName} size={40} color={colors.primary} />)}
            {item.iconType === 'FontAwesome5' && (<FontAwesome5 name={item.iconName} size={40} color={colors.primary} />)}
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))}
      />

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

