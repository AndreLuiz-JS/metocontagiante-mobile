import React from 'react';
import { View, ScrollView, SafeAreaView, Text, Image } from 'react-native';

import { styles } from './styles';
import brand from '../../assets/images/brand.png'

export default function AboutUs() {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Quem Somos</Text>
            <Text style={styles.subTitle}>Metodista Contagiante</Text>
            <ScrollView style={styles.content}>
                <Image source={brand} style={styles.image} />
                <Text style={styles.text}>Somos a Igreja Metodista Contagiante</Text>

                <Text style={styles.text}>Localizada na Rua Francisco de Souza Beltrão, nº 318
                São Pedro da Aldeia/RJ</Text>

                <Text style={styles.text}>Venha nos fazer uma visita!</Text>
                <Text style={styles.text}>Esperamos por você e sua família!!</Text>
                <View style={styles.section}>
                    <Text style={styles.title}>Cultos</Text>
                    <Text style={styles.subTitle}>Domingo às 18h</Text>
                    <Text style={styles.subTitle}>Terça às 20h</Text>
                    <Text style={styles.title}>Escola de Maturidade</Text>
                    <Text style={styles.subTitle}>Domingo às 10h</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
} 