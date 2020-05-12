import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import Calendar from './Calendar';
import Adverts from './Adverts';

import { styles } from './styles';

export default function Schedule() {
    const [ page, setPage ] = useState('adverts');

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={(page === 'adverts') ? styles.buttonSelected : styles.button}
                    onPress={() => setPage('adverts')}>
                    <Text style={styles.headerTitle}>Anúncios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={(page === 'calendar') ? styles.buttonSelected : styles.button}
                    onPress={() => setPage('calendar')}>
                    <Text style={styles.headerTitle}>Eventos</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.headerSubTitle}>Metodista Contagiante</Text>
            <View style={{ flex: 1 }}>
                {(page === 'calendar') && <Calendar />}
                {(page === 'adverts') && <Adverts />}
            </View>
        </SafeAreaView>
    )
}