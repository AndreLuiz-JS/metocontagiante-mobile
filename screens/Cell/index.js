import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, Image } from 'react-native';

import api from '../../services/api';
import Loading from '../../components/Loading';

import { styles } from './styles';

export default function CellScreen() {

    const [ cellContent, setCellContent ] = useState([ {
        id: 0,
        image: '',
        name: '',
        leader: '',
        weekday: 0,
        hour: '',
        location: '',
        phone: '',
        type: ''
    } ])
    const [ loading, setLoading ] = useState(true);
    const weekdays = [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ];
    async function getcell() {
        try {
            const response = await api.get('/cells');
            setCellContent(response.data)
            setLoading(false);
        } catch (err) {
            console.log(err)
            setLoading(false);
        }
    }


    useEffect(() => {
        getcell();
    }, [])

    if (loading) return (<Loading message='carregando lista de células' />)

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Células</Text>
                <Text style={styles.subTitle}>Metodista Contagiante</Text>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={cellContent}
                    renderItem={({ item }) =>
                        (
                            <View style={styles.cellContainer}>
                                <Text style={styles.cellName}>{item.name}</Text>
                                <View style={styles.cellContent}>
                                    <Image style={styles.cellImage} source={{ uri: item.image }} alt="" />
                                    <View style={styles.cellInfoContainer}>
                                        <Text style={styles.cellInfoItem}>Líder: {item.leader}</Text>
                                        <Text style={styles.cellInfoItem}>Dia da semana: {weekdays[ item.weekday ]}</Text>
                                        <Text style={styles.cellInfoItem}>Hora: {item.hour}</Text>
                                        <Text style={styles.cellInfoItem}>Endereço: {item.location}</Text>
                                        <Text style={styles.cellInfoItem}>Whatsapp: {item.phone}</Text>
                                        <Text style={styles.cellInfoItem}>Célula {item.type}</Text>
                                    </View>
                                </View>
                            </View>)
                    }
                    keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))} />
            </View>
        </SafeAreaView >
    )



}