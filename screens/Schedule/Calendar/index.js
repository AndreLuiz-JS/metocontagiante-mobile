import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, Image } from 'react-native';

import normalizeDate from '../../../services/normalizeDate'

import Loading from '../../../components/Loading';
import api from '../../../services/api';

import { styles } from './styles';

export default function CalendarScreen() {
    const [ loading, setLoading ] = useState(true);
    const [ events, setEvents ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/calendar');
                const eventMap = response.data.events.map(event => {
                    const title = event.summary ? event.summary : null;
                    const description = event.description ? event.description.replace(/<br>/g, '\n\t\t\t\t').replace(/<[^>]*>/g, '').replace(/&[^;]*;/g, '').trim() : null;
                    const imgUrl = event.attachments ? 'https://drive.google.com/uc?export=view&id=' + event.attachments[ 0 ].fileId : null;
                    const date = normalizeDate(event.start.dateTime || event.start.date);
                    return { title, description, imgUrl, date }
                })

                setEvents(eventMap);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    if (loading) return (<Loading message="carregando" />);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.events}>
                {events.length === 0 && (
                    <>
                        <Text style={styles.noEvent}>Nenhum evento na agenda</Text>
                        <Text style={styles.noEvent}>Em breve novos eventos</Text>
                    </>
                )}
                {events.length !== 0 && (
                    <FlatList
                        data={events}
                        renderItem={({ item }) => (
                            <View style={styles.eventContainer}>
                                <View style={styles.event}>
                                    {item.imgUrl && <Image style={styles.image} source={{ uri: item.imgUrl }} />}
                                    <View style={styles.textContainer}>
                                        {item.title && (<Text style={styles.title}>{item.title}</Text>)}
                                        {item.description && (<Text style={styles.description}>{item.description}</Text>)}
                                        {item.date && (<Text style={styles.date}>{item.date}</Text>)}
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))}
                    />
                )}
            </View>
        </SafeAreaView>
    )
} 