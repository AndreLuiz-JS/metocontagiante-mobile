import React, { useState, useEffect, Fragment } from 'react';
import { SafeAreaView, ScrollView, View, Text, FlatList } from 'react-native';

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
            <ScrollView style={styles.scroll}>
                <View style={styles.verseContainer}>
                    {showVerses && (
                        <>
                            <Text style={styles.verseTitle} key={devotionalContent.date}>Versículos base: {devotionalContent.verses.join(', ')}</Text>
                            {devotionalContent.verses.map((item, index) =>
                                (<Fragment key={Math.random() * Math.pow(5, index)}>
                                    <Text style={styles.verse} key={Math.random() * Math.pow(10, index)}>{item}</Text>
                                    {
                                        devotionalContent.verseContent[ index ].map((paragraph, paragraphIndex) => (
                                            <Text style={styles.paragraph} key={Math.random() * Math.pow(10, paragraphIndex)} >
                                                {'\t\t'}
                                                {paragraph.map((verse, verseIndex) => (
                                                    <Text style={styles.verseText} key={Math.random() * Math.pow(10, verseIndex)} > {verse.verseText}</Text>
                                                ))}
                                            </Text>
                                        ))
                                    }
                                </Fragment>)
                            )}
                        </>)}
                </View>
                <View style={styles.devotionalContainer}>
                    {devotionalContent.content.map((item, index) => (
                        <Text key={Math.random() * Math.pow(10, index)} style={(item.startsWith('#') || index === 0) ? styles.title : styles.devotionalContent}>{(item.startsWith('#') || index === 0) ? '' : '\t\t\t\t\t\t\t\t'}{item}</Text>
                    ))}

                </View>
            </ScrollView>
        </SafeAreaView >
    )



}