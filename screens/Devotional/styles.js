import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        backgroundColor: colors.background,
        padding: 10,
    },
    title: {
        fontSize: 20,
        color: colors.primary,
        paddingTop: 10,
        textAlign: 'center'

    },
    publishedAt: {
        fontSize: 10,
        width: '100%',
        alignItems: 'flex-end',
        textAlign: 'right',
        color: colors.secondary
    },
    verseContainer: {
        backgroundColor: colors.backgroundSecondary,
        padding: 10,
        marginTop: 5,
        borderRadius: 10,
        maxHeight: 200
    },
    verseTitle: {
        fontSize: 10,
        color: colors.secondary,
    },
    verse: {
        color: colors.effect
    },
    paragraph: {
        color: colors.secondary,
        textAlign: 'justify',
    },
    verseText: {
        color: colors.secondary,
        fontSize: 12,
    },
    devotionalContainer: {
        marginTop: 5,
    },
    devotionalContent: {
        color: colors.text,
        fontSize: 16,
        textAlign: 'justify'
    },
})