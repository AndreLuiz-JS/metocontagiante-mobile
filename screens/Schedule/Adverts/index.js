import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';

import Loading from '../../../components/Loading';
import api from '../../../services/api';

import PDFViewer from 'rn-pdf-reader-js';

import { styles } from './styles';

export default function AdvertsScreen() {
    const [ loading, setLoading ] = useState(true);
    const [ adverts, setAdverts ] = useState();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/advert');
                const { pdf, mdate } = response.data;
                const base64url = 'data:application/pdf;base64,' + pdf;
                AsyncStorage.setItem('pdf', JSON.stringify({ base64url, date: mdate }));
                setAdverts(base64url);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        async function fetchLocalData() {
            try {
                setLoading(true);
                const { base64url, date } = AsyncStorage.getItem('pdf');
                setAdverts(base64url);
                const timeResponse = await api.get('/advert/time');
                const serverDate = timeResponse.data.mtime;
                if (date !== serverDate) fetchData()
                else setLoading(false);
            } catch (err) {
                fetchData();
            }
        }
        fetchLocalData();
    }, [])

    if (loading) return (<Loading message="carregando" />);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.adverts}>
                {adverts && (<PDFViewer
                    source={{
                        uri: adverts,
                        base64: adverts,
                        cache: true
                    }}

                />)}

            </View>
        </SafeAreaView>
    )
} 