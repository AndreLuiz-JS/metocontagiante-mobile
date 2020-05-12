import React from 'react';
import { ImageBackground, Image, Text, TouchableOpacity, View, Linking, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import colors from '../../constants/Colors';

import background from '../../assets/images/bg.png';
import logo from '../../assets/images/icon.png';


export default function HomeScreen() {
  const navigation = useNavigation();
  const icons = [ {
    route: 'Bible',
    iconName: 'book',
    iconType: 'Feather',
    name: 'Bíblia'
  },
  {
    route: 'Cell',
    iconName: 'users',
    iconType: 'Feather',
    name: 'Células'
  },
  {
    route: 'Photo',
    iconName: 'camera',
    iconType: 'Feather',
    name: 'Fotos'
  },
  {
    route: 'Schedule',
    iconName: 'calendar',
    iconType: 'Feather',
    name: 'Agenda'
  },
  {
    route: 'Devotional',
    iconName: 'pray',
    iconType: 'FontAwesome5',
    name: 'Devocional'
  },
  {
    route: 'Home',
    iconName: 'users',
    iconType: 'FontAwesome5',
    name: 'Pastores'
  },
  {
    route: 'Podcast',
    iconName: 'podcast',
    iconType: 'FontAwesome5',
    name: 'Podcast'
  },
  {
    route: 'SocialMedia',
    iconName: 'thumbs-up',
    iconType: 'FontAwesome5',
    name: 'Mídias Sociais'
  },
  {
    openUrl: 'whatsapp://send?phone=5522992797679',
    iconName: 'whatsapp',
    iconType: 'FontAwesome5',
    name: 'Contato'
  },
  {
    route: 'PrayOrder',
    iconName: 'file-signature',
    iconType: 'FontAwesome5',
    name: 'Pedido de Oração'
  },
  {
    route: 'Home',
    iconName: 'id-card',
    iconType: 'FontAwesome5',
    name: 'Quem Somos'
  },
  {
    route: 'Map',
    iconName: 'map-pin',
    iconType: 'Feather',
    name: 'Como Chegar'
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
            onPress={item.route ? () => navigation.navigate(item.route) : () => Linking.openURL(item.openUrl)}
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
}

