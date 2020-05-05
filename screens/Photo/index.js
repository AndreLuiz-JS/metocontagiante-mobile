import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

import api from '../../services/api';
import Loading from '../../components/Loading';

import { styles } from './styles';

export default function PhotoScreen({ navigation }) {
    const [ loading, setLoading ] = useState(true);
    const [ albumArray, setAlbumArray ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await api.get('/photos');
                setAlbumArray(data.albums);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    function navigateToDetail(album) {
        navigation.navigate('PhotoDetail', { album });
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading && (<Loading message="carregando" />)}
            <Text style={styles.title}> Galeria de Fotos </Text>
            <View style={styles.albumList}>
                <FlatList
                    style={{ flex: 1, width: '100%' }}
                    data={albumArray}
                    renderItem={({ item, index }) => (
                        <View style={styles.album}>
                            <TouchableOpacity onPress={() => navigateToDetail({ id: item.id, title: item.title })}>
                                <Image style={styles.albumImage} source={{ uri: item.coverPhotoBaseUrl }} />
                                <Text style={styles.albumTitle}>{item.title}</Text>
                            </TouchableOpacity>
                            {(index === albumArray.length - 1) ? setLoading(false) : setLoading(true)}
                        </View>
                    )}
                    keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))}
                />
            </View>
        </SafeAreaView>
    )
}
