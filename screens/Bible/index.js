import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity, View, AsyncStorage, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Loading from '../../components/Loading';
import bibleData from '../../json/bible.json';

import { styles } from './styles';

export default function BibleScreen({ navigation, route }) {
    const [ buttonNextDisabled, setButtonNextDisabled ] = useState(false);
    const [ buttonPreviousDisabled, setButtonPreviousDisabled ] = useState(false);
    const [ bookMark, setBookMark ] = useState({ bookName: '', chapter: 0 });
    const [ loading, setLoading ] = useState({ status: false, message: '' });
    const [ chapterContentFlatList, setChapterContentFlatList ] = useState(false);
    const [ listOfBooks, setListOfBooks ] = useState('');
    const [ listOfChapters, setListOfChapters ] = useState({ bookName: '', list: [] });
    const [ textToShow, setTextToShow ] = useState([ [ { verseNumber: '', verseText: '' } ] ]);

    useEffect(() => {
        if (route.params?.bookMark) {
            if (bookMark.bookName !== route.params.bookMark)
                getListOfChapters(route.params.bookMark.bookName);
            setBookMark(route.params.bookMark);
        }
    }, [ route.params?.bookMark ]);

    useEffect(() => {
        async function fetchData() {
            setLoading({ status: true, message: 'Carregando' });
            if (!bookMark.bookName || !bookMark.chapter) {
                const localBookMark = JSON.parse(await AsyncStorage.getItem("bookMark"));
                if (!localBookMark || !localBookMark.bookName || !localBookMark.chapter) {
                    setInitialState();
                    setLoading({ status: false });
                } else {
                    await getListOfBooks();
                    await getListOfChapters(localBookMark.bookName);
                    setLoading({ status: false });
                    setBookMark(localBookMark);
                }
            }
            else {
                try {
                    const chapterContent = getChapterContent();
                    setTextToShow(chapterContent);
                    setButtonNextDisabled(bookMark.bookName === "Apocalipse" && bookMark.chapter === 22);
                    setButtonPreviousDisabled(bookMark.bookName === "Gênesis" && bookMark.chapter === 1);
                    setLoading({ status: false, message: 'Capítulo Carregado!' });
                    AsyncStorage.setItem("bookMark", JSON.stringify(bookMark));
                    AsyncStorage.setItem(bookMark.bookName, String(bookMark.chapter));
                } catch (err) {
                    console.log(err)
                    setLoading({ status: false });
                }
            }
        }
        fetchData();
    }, [ bookMark ]);

    async function setInitialState() {
        try {
            const bookList = await getListOfBooks();
            const bookName = bookList[ 0 ];
            const chapterList = await getListOfChapters(bookName);
            const chapter = chapterList[ 0 ];
            setBookMark({ bookName, chapter });
            AsyncStorage.setItem("bookMark", JSON.stringify({ bookName, chapter }));
        } catch (err) {
            console.log(err);
        }
    }

    async function getListOfBooks() {
        if (listOfBooks) return listOfBooks;
        const localListOfBooks = JSON.parse(await AsyncStorage.getItem('listOfBooks'));
        if (localListOfBooks) {
            setListOfBooks(localListOfBooks);
            return localListOfBooks;
        }
        try {
            const listOfBooks = bibleData.map(book => book.bookName);
            setListOfBooks(listOfBooks);
            await AsyncStorage.setItem('listOfBooks', JSON.stringify(listOfBooks));
            return listOfBooks;
        } catch (err) {
            console.log('error function getListOfBooks');
            console.log(err);
        }

    }

    function getListOfChapters(bookName = bookMark.bookName) {
        try {
            const book = bibleData.find(book => book.bookName === bookName);
            const chaptersCount = Object.keys(book.chapters).length;
            const list = [];
            for (let i = 0; i < chaptersCount; i++) {
                list.push(i + 1)
            }
            setListOfChapters({ bookName, list });
            return list;
        } catch (err) {
            console.log('error function getListOfChapters');
            console.log(err);
        }
    }

    function getChapterContent() {
        const { bookName, chapter } = bookMark;
        if (bookName !== '' && listOfBooks && chapter)
            try {
                const book = listOfBooks.indexOf(bookName);
                const chapterContent = bibleData[ book ].chapters[ chapter - 1 ].paragraphs;
                return chapterContent;
            } catch (err) {
                console.log('error function  getChapterContent');
                console.log(err);
            }

    }

    async function nextChapter() {
        if (bookMark.bookName === "Apocalipse" && bookMark.chapter === 22) {
            console.log('Não há mais próximos capítulos');
            return;
        }
        const chapterIndex = listOfChapters.list.indexOf(bookMark.chapter) + 1;
        const chapter = listOfChapters.list[ chapterIndex ];
        if (chapter !== undefined) {
            setBookMark({ ...bookMark, chapter });
            return;

        }
        const bookIndex = listOfBooks.indexOf(bookMark.bookName) + 1;
        const bookName = listOfBooks[ bookIndex ];
        if (bookName !== undefined) {
            await getListOfChapters(bookName);
            setBookMark({ bookName, chapter: 1 })
            return;
        }
        console.log(`Error: nextChapter function returned a invalid state.`)

    }
    async function previousChapter() {

        if (bookMark.bookName === "Gênesis" && bookMark.chapter === 1) {
            alert('Não há mais capítulos anteriores.');
            return;
        }
        const chapterIndex = listOfChapters.list.indexOf(bookMark.chapter) - 1;
        const chapter = listOfChapters.list[ chapterIndex ];
        if (chapter !== undefined) {
            setBookMark({ ...bookMark, chapter });
            return;

        }
        const bookIndex = listOfBooks.indexOf(bookMark.bookName) - 1;
        const bookName = listOfBooks[ bookIndex ];
        if (bookName !== undefined) {
            const chapterList = await getListOfChapters(bookName);
            const chapter = chapterList[ chapterList.length - 1 ]
            setBookMark({ bookName, chapter })
            return;
        }
        console.log(`Error: previousChapter function returned a invalid state.`)
    }

    function navigateToChangeBook(page) {
        navigation.navigate(page, { bookMark, listOfBooks, listOfChapters: listOfChapters.list });
    }

    return (
        <SafeAreaView style={styles.container} >
            {loading.status && <Loading message={loading.message} />}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigateToChangeBook('ChangeBook')}><Text style={styles.textHeader}>{bookMark.bookName}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToChangeBook('ChangeChapter')}><Text style={styles.textHeader}>{bookMark.chapter}</Text></TouchableOpacity>
            </View>
            <FlatList
                ref={(ref) => setChapterContentFlatList(ref)}
                style={styles.content}
                data={textToShow}
                keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))}
                renderItem={({ item, index }) => (
                    <Text style={styles.paragraph}>
                        {index === 0 ? '\n\n\n' : '\n'}
                        {'\t\t\t\t'}
                        {item.map((verse, index) => (
                            <Text key={index} style={styles.text}>
                                {'\t'}
                                <Text style={styles.verseNumber}>{verse.verseNumber}</Text>
                                {'\t'}
                                {verse.verseText}
                            </Text>
                        ))}
                        {textToShow.length === (index + 1) ? '\n\n\n\n' : ''}
                    </Text>
                )
                }
                keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))}
                onContentSizeChange={() => chapterContentFlatList.scrollToOffset({ animated: true, y: 0 })}
            />
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomButton} disabled={buttonPreviousDisabled} onPress={previousChapter}>
                    <Feather name="chevron-left" size={20} style={styles.bottomButtonText} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomButton} disabled={buttonNextDisabled} onPress={nextChapter}>
                    <Feather name="chevron-right" size={20} style={styles.bottomButtonText} />
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )

}
