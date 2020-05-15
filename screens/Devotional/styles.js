import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../constants/Colors';

const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 20,
        color: colors.primary,
        paddingTop: 10,
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 15,
        color: colors.secondary,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    shareButton: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    icon: {
        color: colors.primary,
        backgroundColor: colors.tintColor + 'aa',
        width: 40,
        height: 40,
        borderRadius: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    picker: {
        textAlign: 'center',
        alignItems: "center",
        width: screenWidth,
        color: colors.primary,
        fontSize: 20,
    },
    publishedAt: {
        fontSize: 10,
        alignItems: 'flex-end',
        textAlign: 'right',
        color: colors.secondary,
        marginVertical: 5
    },
    scroll: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 10
    },
    verseContainer: {
        backgroundColor: colors.backgroundSecondary,
        padding: 10,
        marginTop: 5,
        borderRadius: 10,
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
        flex: 1,
        color: colors.text,
        fontSize: 16,
        textAlign: 'justify'
    },

})