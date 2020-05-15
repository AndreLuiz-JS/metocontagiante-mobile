import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, Image, Linking } from 'react-native';

import api from '../../services/api';
import Loading from '../../components/Loading';

import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    const weekdays = [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado' ];


    useEffect(() => {
        async function getcell() {
            try {
                const response = await api.get('/cells');
                const cells = response.data.map((item, index) => {
                    if (item.phone) {
                        const whatsapp = 'whatsapp://send?phone=' + item.phone.replace(/ /g, '').replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '');
                        return { ...item, whatsapp }
                    }
                    return item;
                })
                setCellContent(cells)
                setLoading(false);
            } catch (err) {
                console.log(err)
                setLoading(false);
            }
        }
        getcell();
    }, [])

    if (loading) return (<Loading message='carregando lista de células' />)

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Células</Text>
                <Text style={styles.subTitle}>Metodista Contagiante</Text>
            </View>
            <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    data={cellContent}
                    renderItem={({ item }) =>
                        (
                            <View style={styles.cellContainer}>
                                <Text style={styles.cellName}>{item.name}</Text>
                                <View style={styles.cellContent}>
                                    <View style={styles.cellImage}>
                                        {(item.image !== '') && (<Image style={styles.cellImage} source={{ uri: item.image }} alt="" />)}
                                    </View>
                                    <View style={styles.cellInfoContainer}>
                                        <Text style={styles.cellInfoItem}>Líder: {item.leader}</Text>
                                        <Text style={styles.cellInfoItem}>Dia da semana: {weekdays[ item.weekday ]}</Text>
                                        <Text style={styles.cellInfoItem}>Horário: {item.hour}</Text>
                                        <Text style={styles.cellInfoItem}>Endereço: {item.location}</Text>
                                        {item.whatsapp && (
                                            <TouchableOpacity onPress={() => Linking.openURL(item.whatsapp)}>
                                                <Text style={styles.cellInfoItem}>Whatsapp: {item.phone}</Text>
                                            </TouchableOpacity>
                                        )}
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