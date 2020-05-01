import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import colors from '../../constants/Colors';

import background from '../../assets/images/bg.png';


export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>METODISTA CONTAGIANTE</Text>
      </View>
      <View style={styles.icons}>

        <TouchableOpacity
          style={styles.ico}
          onPress={() => navigation.navigate('Bible')}
        >
          <Feather name="book" size={40} color={colors.primary} />
          <Text style={styles.text}>Bíblia</Text>
        </TouchableOpacity>

        <View style={styles.ico}>
          <Feather name="users" size={40} color={colors.primary} />
          <Text style={styles.text}>Células</Text>
        </View>

        <View style={styles.ico}>
          <Feather name="camera" size={40} color={colors.primary} />
          <Text style={styles.text}>Fotos</Text>
        </View>

      </View>

      <View style={styles.icons}>

        <View style={styles.ico}>
          <Feather name="calendar" size={40} color={colors.primary} />
          <Text style={styles.text}>Agenda</Text>
        </View>

        <TouchableOpacity
          style={styles.ico}
          onPress={() => navigation.navigate('Devotional')}
        >
          <FontAwesome5 name="pray" size={40} color={colors.primary} />
          <Text style={styles.text}>Devocional</Text>
        </TouchableOpacity>

        <View style={styles.ico}>
          <FontAwesome5 name="users" size={40} color={colors.primary} />
          <Text style={styles.text}>Pastores</Text>
        </View>

      </View>

      <View style={styles.icons}>

        <TouchableOpacity
          style={styles.ico}
          onPress={() => navigation.navigate('Podcast')}
        >
          <FontAwesome5 name="podcast" size={40} color={colors.primary} />
          <Text style={styles.text}>Podcast</Text>
        </TouchableOpacity>

        <View style={styles.ico}>
          <FontAwesome5 name="thumbs-up" size={40} color={colors.primary} />
          <Text style={styles.text}>Redes Sociais</Text>
        </View>

        <View style={styles.ico}>
          <FontAwesome5 name="whatsapp" size={40} color={colors.primary} />
          <Text style={styles.text}>Contato</Text>
        </View>

      </View>

      <View style={styles.icons}>

        <View style={styles.ico}>
          <FontAwesome5 name="file-signature" size={40} color={colors.primary} />
          <Text style={styles.text}>Pedidos de Oração</Text>
        </View>

        <View style={styles.ico}>
          <FontAwesome5 name="id-card" size={40} color={colors.primary} />
          <Text style={styles.text}>Quem Somos</Text>
        </View>

        <View style={styles.ico}>
          <Feather name="map-pin" size={40} color={colors.primary} />
          <Text style={styles.text}>Como chegar</Text>
        </View>

      </View>

    </ImageBackground>
  );
}

