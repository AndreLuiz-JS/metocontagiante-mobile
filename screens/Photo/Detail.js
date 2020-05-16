import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Dimensions } from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

import api from '../../services/api';
import Loading from '../../components/Loading';

import { styles } from './styles';

export default function PhotoDetailScreen({ navigation, route }) {

    const [ loading, setLoading ] = useState({ status: true, message: 'carregando' });
    const [ photoArray, setPhotoArray ] = useState();
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
                    photos.push({ url: baseUrl });
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
            {photoArray && (<ImageViewer backgroundColor="transparent" saveToLocalByLongPress={false} imageUrls={photoArray} onSwipeDown={() => console.log('navigation')} />)}
        </SafeAreaView>
    )
}
