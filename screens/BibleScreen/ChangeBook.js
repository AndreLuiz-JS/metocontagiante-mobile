import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';

import colors from '../../constants/Colors';

import { styles } from './styles';


export default function Book({ navigation, route }) {
    const { bookMark, listOfBooks } = route.params;
    const [ flatListRef, setFlatListRef ] = useState(null);

    function selectBook(book) {
        const newBookMark = { bookMark: { bookName: book, chapter: 1 } };
        navigation.navigate('Bible', newBookMark);
    }

    function centerOn() {
        const index = listOfBooks.indexOf(bookMark.bookName);
        flatListRef.scrollToIndex({ animated: true, index, viewOffset: 100, viewPosition: 0 });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textHeader}>Livro</Text>
            <FlatList
                ItemSeparatorComponent={({ highlighted }) => (
                    <View style={[ styles.separator, highlighted && { color: colors.effect } ]} />
                )}
                ref={ref => setFlatListRef(ref)}
                style={styles.content}
                data={listOfBooks}
                renderItem={({ item, index, separators }) => (
                    < TouchableHighlight
                        key={index}
                        onPress={() => selectBook(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                        underlayColor={colors.effect} >
                        <View style={index === 0 ? styles.first : styles.paragraph}>
                            <Text style={item === bookMark.bookName ? styles.selected : styles.text}>
                                {item}
                            </Text>
                        </View>
                    </TouchableHighlight>
                )}
                getItemLayout={(data, index) => ({ length: 44, offset: 44 * index, index })}
                initialNumToRender={listOfBooks.length}
                onContentSizeChange={centerOn}
                keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))}
            />
        </SafeAreaView >
    );
}
