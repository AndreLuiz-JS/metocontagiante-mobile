import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, Dimensions, Image } from 'react-native';

import api from '../../services/api';
import Loading from '../../components/Loading';

import { styles } from './styles';

export default function PhotoDetailScreen({ route }) {
    const [ loading, setLoading ] = useState({ status: true, message: 'carregando' });
    const [ photoArray, setPhotoArray ] = useState([]);
    const { id, title } = route.params.album;
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await api.get('/photos/' + id);
                const photos = [];
                data.mediaItems.map(photo => {
                    const { baseUrl, mediaMetadata } = photo;
                    const { width, height } = mediaMetadata;
                    const imgHeight = (windowWidth - 20) / width * height;
                    photos.push({ baseUrl, width: windowWidth - 20, height: imgHeight })
                });
                setPhotoArray(photos);
                setLoading({ status: false });
            } catch (err) {
                console.log(err);
                setLoading({ status: false });
            }
        }
        fetchData();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {loading.status && (<Loading message={loading.message} />)}
            <Text style={styles.title}> {title} </Text>
            <View style={styles.albumList}>
                <FlatList
                    data={photoArray}
                    renderItem={({ item, index }) => (
                        <View style={[ styles.album, { padding: 5, marginHorizontal: 5 } ]}>
                            <Image style={{ width: item.width, height: item.height, borderRadius: 10 }} source={{ uri: item.baseUrl }} />
                            {(index === photoArray.length - 1) ? setLoading(false) : setLoading(true)}
                        </View>
                    )}
                    keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))}
                />
            </View>
        </SafeAreaView>
    )
}
