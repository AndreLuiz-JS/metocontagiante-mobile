import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../constants/Colors';



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.background,
        justifyContent: 'space-evenly'

    },
    header: {
        position: 'absolute',
        top: Constants.statusBarHeight + 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'transparent',
        zIndex: 1

    },
    textHeader: {
        padding: 10,
        color: colors.effect,
        backgroundColor: colors.backgroundSecondary + 'fa',
        borderRadius: 8,
        minWidth: 120,
        textAlign: 'center'
    },
    content: {
        paddingHorizontal: 15,
        zIndex: 0
    },
    flatListChapter: {
        padding: 15
    },
    chapterList: {
        alignItems: 'center',
        margin: 4,
        flexGrow: 1,
        flexBasis: 0,
    },
    chapterListItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: 50,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: colors.effect,
    },
    chapterListItemSelected: {
        backgroundColor: colors.effect,
        width: '100%',
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    empty: {
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    paragraph: {
        textAlign: 'justify',
        color: colors.text,
        marginBottom: 10,
    },
    selected: {
        backgroundColor: colors.effect + 'da',
        color: colors.backgroundSecondary,
        padding: 10,
        marginVertical: -5,
        borderRadius: 10,
    },
    text: {
        color: colors.text,
        padding: 10,
        marginVertical: -5,
        borderRadius: 10,

    },
    separators: {
        color: colors.backgroundSecondary
    },
    verseNumber: {
        color: colors.effect,
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,

    },
    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: colors.background,
        backgroundColor: colors.effect + 'cc',
        padding: 10,
        borderRadius: 20
    },
    changeBook: {
        position: 'absolute',
        top: Constants.statusBarHeight + 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary + 'fa',
        zIndex: 1
    }
});
