import React, { useState, useEffect, Fragment } from 'react';
import { SafeAreaView, ScrollView, View, Text, Picker, Share, TouchableOpacity } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'

import api from '../../services/api';
import normalizeDate from '../../services/normalizeDate';
import Loading from '../../components/Loading';

import { styles } from './styles';

export default function DevotionalScreen() {
    const [ devotionalContent, setDevotionalContent ] = useState({
        id: 0,
        title: '',
        verses: [],
        content: [],
        verseContent: [],
        date: ''
    })
    const [ devotionalContentArray, setDevotionalContentArray ] = useState([ devotionalContent ]);
    const [ showVerses, setShowVerses ] = useState(true)
    const [ loading, setLoading ] = useState(true);

    async function getDevotionalData(devotional) {
        try {
            const { id, title } = devotional;
            const content = devotional.content ? devotional.content.split(/(?:\r\n|\r|\n)/g) : false;
            const hasDevotional = content ? true : false;
            const date = normalizeDate(devotional.available_at);
            const { verses, verseContent } = await getVerses();
            setDevotionalContent({ id, title, verses, content, verseContent, date, hasDevotional });
            setLoading(false);
            async function getVerses() {
                const bibleIndexes = devotional.verses.split(';');
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
        async function fetchData() {
            try {
                const { data: devotionals } = await api.get('/devotional');
                setDevotionalContentArray(devotionals);
                getDevotionalData(devotionals[ 0 ]);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    async function handleShareContent() {
        const verse = devotionalContent.verses.map((item, index) => {
            const verseTitle = '_[' + item + ']_';
            const verseText = devotionalContent.verseContent[ index ]
                .map(paragraph => paragraph.map(verse => verse.verseText + '\n').join('\n')).join('\n');
            return verseTitle + '\n\n' + verseText
        }).join('\n');
        const message = '*#DevocionalContagiante*\n\n\n' + verse + '\n\n' + '```_________________________```' + '\n\n\n' + devotionalContent.content.join('\n\n');
        try {
            const result = await Share.share({ message });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    if (loading) return (<Loading message='carregando devocional' />)
    if (!devotionalContent.hasDevotional)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Devocional</Text>
            </View>
        )

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.shareButton} onPress={handleShareContent} title="compartilhar">
                <FontAwesome5 style={styles.icon} name="share-alt" size={20} />
            </TouchableOpacity>
            <Text style={styles.title}>Devocional</Text>
            <Text style={styles.subTitle}>Metodista Contagiante</Text>
            <Picker
                selectedValue={devotionalContent.id}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => getDevotionalData(devotionalContentArray.find(item => item.id === itemValue))}
                itemStyle={styles.title}
                mode='dropdown'
            >
                {devotionalContentArray.map((item, index) => (
                    <Picker.Item label={item.title} value={item.id} key={item.id} />
                ))}
            </Picker>
            <Text style={styles.publishedAt}>Publicado {devotionalContent.date}</Text>
            <ScrollView style={styles.scroll}>
                <View style={styles.verseContainer}>
                    {showVerses && (
                        <>
                            <Text style={styles.verseTitle} key={devotionalContent.date}>Versículos base: </Text>
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