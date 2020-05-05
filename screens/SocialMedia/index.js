import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Linking, Image } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

import { styles } from './styles';

import instagram from '../../assets/images/instagram.png';

export default function SocialMedia() {
    const [ uri, setUri ] = useState('https://www.instagram.com/metodistacontagiante');

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Redes Sociais</Text>
            <Text style={styles.subTitle}>Metodista Contagiante</Text>
            <View style={styles.links}>
                <View style={styles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://www.instagram.com/metodistacontagiante')}
                        style={styles.button}>
                        <Image style={styles.instagram} source={instagram} />
                        <Text style={styles.linkText}>Instagram</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://www.facebook.com/metocontagiante')}
                        style={styles.button}>
                        <Feather name='facebook' size={35} style={styles.facebook} />
                        <Text style={styles.linkText}>Facebook</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://www.youtube.com/c/MetodistaContagiante')}
                        style={styles.button}>
                        <Feather name='youtube' size={35} style={styles.youtube} />
                        <Text style={styles.linkText}>Youtube</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://twitter.com/metocontagiante')}
                        style={styles.button}>
                        <Feather name='twitter' size={35} style={styles.twitter} />
                        <Text style={styles.linkText}>Twitter</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://open.spotify.com/show/6OoyLH8GoZwmCrwzjlw1rR?si=ClZSV0w3SQWjT4KlP5tKnw')}
                        style={styles.button}>
                        <FontAwesome5 name='spotify' size={40} style={styles.spotify} />
                        <Text style={styles.linkText}>Spotify</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
