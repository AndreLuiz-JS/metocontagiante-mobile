import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';

import api from '../../services/api';
import normalizeDate from '../../services/normalizeDate';
import Loading from '../../components/Loading';

import { styles } from './styles';

export default function DevotionalScreen() {

    const [ devotionalContent, setDevotionalContent ] = useState({
        title: '',
        verses: [],
        content: [],
        verseContent: [],
        date: ''
    })
    const [ showVerses, setShowVerses ] = useState(true)
    const [ loading, setLoading ] = useState(true);
    async function getDevotional() {
        try {
            const devotional = await api.get('/devotional');
            const title = devotional.data.title;
            const content = devotional.data.content ? devotional.data.content.split(/(?:\r\n|\r|\n)/g) : false;
            const hasDevotional = content ? true : false;
            const date = normalizeDate(devotional.data.available_at);
            const { verses, verseContent } = await getVerses();
            setDevotionalContent({ title, verses, content, verseContent, date, hasDevotional });
            setLoading(false);
            async function getVerses() {
                const bibleIndexes = devotional.data.verses.split(';');
                const verseContent = new Array(bibleIndexes.length);
                const verses = new Array(bibleIndexes.length);
                for (let i = 0; i < bibleIndexes.length; i++) {
                    const book = bibleIndexes[ i ].split('.');
                    const chapter = book[ 1 ].split(':');
                    const verseRange = chapter[ 1 ];
                    const content = await api.get(`/bible/${book[ 0 ]}/${chapter[ 0 ]}/${verseRange}`);
                    verseContent[ i ] = content.data;
                    const verseInit = verseRange.split('-')[ 0 ];
                    const verseEnd = verseRange.split('-')[ 1 ];
                    if (verseInit === verseEnd) { verses[ i ] = `${book[ 0 ]} ${chapter[ 0 ]} : ${verseInit}` }
                    else { verses[ i ] = `${book[ 0 ]} ${chapter[ 0 ]} : ${verseRange}` }
                }
                return { verses, verseContent }
            }
        } catch (err) {
            console.log(err)
            setShowVerses(false);
            setLoading(false);
            return { verses: [], verseContent: [] }
        }
    }



    useEffect(() => {
        getDevotional();
    }, [])
    if (loading) return (<Loading message='carregando devocional' />)
    if (!devotionalContent.hasDevotional)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Devocional</Text>
            </View>
        )

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{devotionalContent.title}</Text>
            <Text style={styles.publishedAt}>Publicado {devotionalContent.date}</Text>
            <View style={styles.verseContainer}>
                {showVerses && (<>
                    <Text style={styles.verseTitle}>Versículos base: {devotionalContent.verses.join(', ')}</Text>
                    <FlatList
                        data={devotionalContent.verses}
                        renderItem={({ item, index }) =>
                            (<>
                                <Text style={styles.verse}>{item}</Text>
                                {
                                    devotionalContent.verseContent[ index ].map((paragraph, paragraphIndex) => (
                                        <Text style={styles.paragraph} key={paragraphIndex} >
                                            {'\t\t'}
                                            {paragraph.map((verse, verseIndex) => (
                                                <Text style={styles.verseText} key={verseIndex} > {verse.verseText}</Text>
                                            ))}
                                        </Text>
                                    ))
                                }
                            </>)
                        }
                        keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))} />
                </>)}
            </View>
            <FlatList style={styles.devotionalContainer}
                data={devotionalContent.content}
                renderItem={({ item }) => (
                    <Text style={item.startsWith('#') ? styles.title : styles.devotionalContent}>{item.startsWith('#') ? '' : '\t\t\t\t\t\t\t\t'}{item}</Text>
                )}
                keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))} />
        </SafeAreaView >
    )



}