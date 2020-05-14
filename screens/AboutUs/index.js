import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { styles } from './styles';

export default function AboutUs() {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Quem Somos</Text>
            <Text style={styles.subTitle}>Metodista Contagiante</Text>
        </SafeAreaView>
    )
} 