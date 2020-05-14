import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { parseString } from 'react-native-xml2js';

import anchorFm from '../../services/anchorfm';
import normalizeDate from '../../services/normalizeDate';
import Loading from '../../components/Loading';

import { styles } from './styles';

export default function PodcastScreen() {
    const [ podcasts, setPodcasts ] = useState([ { link: '', description: '' } ]);
    const [ currentPodcast, setCurrentPodcast ] = useState({ link: '', description: '' });
    const [ loading, setLoading ] = useState(true);

    async function fetchData() {
        try {
            const response = await anchorFm.get();
            const xmlData = response.data;
            parseString(xmlData, function (err, result) {
                const podcastArray = result.rss.channel[ 0 ].item.map(podcast => {
                    const title = podcast.title[ 0 ];
                    const author = podcast.description[ 0 ].replace(/<[^>]*>/g, '').replace(/&[^;]*;/g, '').trim();
                    const image = podcast[ 'itunes:image' ][ 0 ][ '$' ].href;
                    const date = normalizeDate(podcast.pubDate[ 0 ]);
                    const link = podcast.link[ 0 ].replace('episodes', 'embed/episodes');
                    const iframe =
                    {
                        html: `<iframe src="${link}" height="100%" width="100%" frameborder="0" scrolling="no"></iframe>`
                    }
                    if (title && author && image && date && link) return {
                        title,
                        author,
                        image,
                        date,
                        link,
                        iframe
                    }
                })
                setPodcasts(podcastArray);
                setCurrentPodcast(podcastArray[ 0 ]);
                setLoading(false);
            })
        } catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        fetchData();
    }, [])
    if (loading) return (<Loading message='carregando' />)
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Podcast</Text>
            <Text style={styles.subTitle}>Metodista Contagiante</Text>
            <View style={styles.header}>
                <Text style={styles.headerAuthor} >Gravado por {currentPodcast.author}</Text>
                <Text style={styles.headerPubDate} >Publicado: {currentPodcast.date}</Text>
                <View style={styles.podcast}>
                    <WebView
                        style={{ borderRadius: 10 }}
                        scalesPageToFit={false}
                        source={currentPodcast.iframe} />
                </View>
            </View>
            <View style={styles.lastsPodcastsContainer}>
                <Text style={styles.title}>Últimos Podcasts</Text>
                <FlatList
                    data={podcasts}
                    renderItem={({ item }) => (
                        <View style={[ styles.lastsPodcastsContent, item === currentPodcast ? styles.selected : null ]}>
                            <TouchableOpacity onPress={() => setCurrentPodcast(item)}>
                                <Text style={styles.lastsPodcastsTitle}>{item.title}</Text>
                                <View style={styles.lastsPodcastsItem}>
                                    <Image style={{ width: 80, height: 80, borderRadius: 10 }} source={{ uri: item.image }} />
                                    <View>
                                        <Text style={[ styles.lastsPodcastsAuthor, { textTransform: 'lowercase' } ]}>por{' '}
                                            <Text style={styles.lastsPodcastsAuthor}>
                                                {item.author}
                                            </Text>
                                        </Text>
                                        <Text style={styles.lastsPodcastsDate}>{item.date}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))}
                />
            </View>
        </SafeAreaView>
    )

}