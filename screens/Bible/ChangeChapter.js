import React from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';

import colors from '../../constants/Colors';

import { styles } from './styles';

export default function Chapter({ navigation, route }) {
    const { bookMark, listOfChapters } = route.params;
    const flatListColumns = 5;

    function selectChapter(chapter) {
        const newBookMark = { bookMark: { ...bookMark, chapter } };
        navigation.navigate('Bible', newBookMark);
    }
    function createRows(data, columns) {
        const rows = Math.floor(data.length / columns);
        let lastRowElements = data.length - rows * columns;
        while (lastRowElements !== columns) {
            data.push('');
            lastRowElements += 1;
        } return data;
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textHeader}>Capítulo</Text>
            <FlatList
                ItemSeparatorComponent={({ highlighted }) => (
                    <View style={[ styles.separator, highlighted && { color: colors.effect } ]} />
                )}
                data={createRows(listOfChapters, flatListColumns)}
                numColumns={5}
                style={styles.flatListChapter}
                renderItem={({ item, index, separators }) => (
                    < TouchableHighlight
                        onPress={() => selectChapter(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                        underlayColor={colors.effect}
                        style={styles.chapterList}
                        disabled={item === '' ? true : false}>
                        <View style={item === bookMark.chapter ? styles.chapterListItemSelected : item === '' ? styles.empty : styles.chapterListItem}>
                            <Text style={styles.text}>
                                {item}
                            </Text>
                        </View>
                    </TouchableHighlight>
                )}
                keyExtractor={(item, index) => (item + (Math.random() * Math.pow(10, index)))}

            />
        </SafeAreaView >
    );
}