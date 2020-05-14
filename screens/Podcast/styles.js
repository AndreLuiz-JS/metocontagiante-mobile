import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';
import constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: constants.statusBarHeight

    },
    header: {
        padding: 10,
        margin: 10,
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 10
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
    headerAuthor: {
        fontSize: 16,
        color: colors.primary,
    },
    headerPubDate: {
        fontSize: 12,
        color: colors.secondary
    },
    podcast: {
        height: 102,
        width: 400,
        marginVertical: 10,
        borderRadius: 10,
    },
    lastsPodcastsContainer: {
        flex: 1,
        width: '100%'
    },
    lastsPodcastsContent: {
        padding: 10,
        color: colors.text,
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 10,
        margin: 5
    },
    selected: {
        backgroundColor: colors.effect + 'aa',
    },
    lastsPodcastsTitle: {
        fontSize: 16,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: colors.primary
    },
    lastsPodcastsItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    lastsPodcastsAuthor: {
        fontSize: 14,
        textTransform: 'capitalize',
        textAlign: 'left',
        paddingHorizontal: 10,
        color: colors.secondary,
        marginTop: -5,
    },
    lastsPodcastsDate: {
        fontSize: 14,
        textTransform: 'lowercase',
        textAlign: 'left',
        paddingHorizontal: 10,
        color: colors.primary
    }
})